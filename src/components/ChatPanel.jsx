import { useState, useRef, useEffect, useCallback } from 'react';
import Fuse from 'fuse.js';
import { Send, Bot } from 'lucide-react';
import { knowledgeBase } from '../data/knowledgeBase';
import { UserBubble, AssistantBubble, FallbackBubble, TypingIndicator } from './MessageBubble';
import SuggestionChips from './SuggestionChips';

// Fuse.js config — search across title + question_variants + summary
const fuse = new Fuse(knowledgeBase, {
  keys: [
    { name: 'title',             weight: 0.4 },
    { name: 'question_variants', weight: 0.45 },
    { name: 'summary',           weight: 0.15 },
  ],
  threshold: 0.45,      // 0 = perfect match, 1 = match anything
  includeScore: true,
  minMatchCharLength: 2,
  ignoreLocation: true,
});

// Welcome message shown on load
const WELCOME = {
  id: 'welcome',
  type: 'welcome',
  text: "Hello! I'm your SAP SD process guide. Ask me anything about the Order-to-Cash cycle — sales orders, pricing, credit management, delivery, billing, and the blocks that stall orders.",
};

export default function ChatPanel({ onStageChange, activeCategory }) {
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput]       = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleQuery = useCallback(async (query) => {
    if (!query.trim()) return;

    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: query }]);
    setInput('');
    setIsTyping(true);

    // Brief typing delay so the UI feels alive
    await new Promise(r => setTimeout(r, 500));

    const results = fuse.search(query);
    const best    = results[0];

    if (best && (best.score ?? 1) < 0.45) {
      // Good local match — show the answer card
      const entry = best.item;
      onStageChange(entry.stage);
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'assistant', entry }]);
    } else {
      // No confident match — offer the 3 closest topics as suggestions
      const suggestions = results.slice(0, 3).map(r => r.item);
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'fallback',
        suggestions: suggestions.length ? suggestions : knowledgeBase.slice(0, 3),
      }]);
    }
  }, [onStageChange]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) handleQuery(input.trim());
  };

  const handleSuggestionClick = (question) => handleQuery(question);

  return (
    <div className="flex flex-col h-full">

      {/* ── Header ────────────────────────────────────────── */}
      <div className="px-5 pt-5 pb-4 border-b border-border/60">
        <p className="font-mono text-[10px] text-text-dim uppercase tracking-widest mb-1">
          Portfolio Project 2 / 5
        </p>
        <h1 className="font-serif text-text-primary text-xl font-semibold leading-tight">
          SAP SD Process Chatbot
        </h1>
        <p className="text-text-dim text-xs mt-1">
          Order-to-Cash knowledge base · 19 topics · fuzzy search
        </p>
      </div>

      {/* ── Message thread ─────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-1">
        {messages.map(msg => {
          if (msg.type === 'welcome') {
            return (
              <div key={msg.id} className="flex justify-start mb-5 msg-animate">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber/20 border border-amber/40 flex items-center justify-center mr-3 mt-1">
                  <Bot size={14} className="text-amber" />
                </div>
                <div className="max-w-[86%] rounded-2xl rounded-tl-sm border border-border bg-panel px-4 py-3 shadow-lg">
                  <p className="text-text-dim text-sm leading-relaxed">{msg.text}</p>
                  <p className="font-mono text-[10px] text-text-dim/40 mt-2">
                    Type a question or click a suggestion below ↓
                  </p>
                </div>
              </div>
            );
          }
          if (msg.type === 'user')      return <UserBubble key={msg.id} text={msg.text} />;
          if (msg.type === 'assistant') return <AssistantBubble key={msg.id} entry={msg.entry} />;
          if (msg.type === 'fallback')  return (
            <FallbackBubble
              key={msg.id}
              suggestions={msg.suggestions}
              onSuggestionClick={handleSuggestionClick}
            />
          );
          return null;
        })}

        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* ── Suggestion chips ───────────────────────────────── */}
      <SuggestionChips activeCategory={activeCategory} onChipClick={handleSuggestionClick} />

      {/* ── Input bar ─────────────────────────────────────── */}
      <div className="px-4 pb-4 pt-2">
        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
          <input
            ref={inputRef}
            id="chat-input"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about SAP SD… e.g. what is VA01 or how does pricing work"
            className="chat-input flex-1 bg-panel-light border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-dim/50 font-sans transition-all"
            disabled={isTyping}
            autoComplete="off"
          />
          <button
            type="submit"
            id="send-button"
            disabled={isTyping || !input.trim()}
            className="flex-shrink-0 w-11 h-11 rounded-xl bg-amber flex items-center justify-center transition-all hover:bg-amber/90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send size={16} className="text-bg" />
          </button>
        </form>
      </div>

    </div>
  );
}
