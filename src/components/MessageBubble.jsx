import { CheckCircle, Terminal, Tag, Layers } from 'lucide-react';

const STAGE_COLORS = {
  'Order Created': 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  'Credit Check':  'text-danger bg-danger/10 border-danger/30',
  'Delivery Due':  'text-teal bg-teal/10 border-teal/30',
  'Goods Issued':  'text-amber bg-amber/10 border-amber/30',
  'Billing Due':   'text-purple-400 bg-purple-400/10 border-purple-400/30',
  'Completed':     'text-green-400 bg-green-400/10 border-green-400/30',
};

const CAT_COLORS = {
  'Order Management':  'text-blue-400',
  'Pricing':           'text-amber',
  'Credit Management': 'text-danger',
  'Delivery':          'text-teal',
  'Billing':           'text-purple-400',
  'Master Data':       'text-text-dim',
};

function UserBubble({ text }) {
  return (
    <div className="flex justify-end mb-4">
      <div className="max-w-[72%] px-4 py-3 rounded-2xl rounded-tr-sm bg-panel-light border border-border text-text-primary text-sm leading-relaxed">
        {text}
      </div>
    </div>
  );
}

function AssistantBubble({ entry, isAi }) {
  if (!entry) return null;

  const stageClass = STAGE_COLORS[entry.stage] || 'text-text-dim bg-text-dim/10 border-text-dim/30';
  const catColor   = CAT_COLORS[entry.category] || 'text-text-dim';

  return (
    <div className="flex justify-start mb-5 msg-animate">
      {/* Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber/20 border border-amber/40 flex items-center justify-center mr-3 mt-1">
        <span className="font-mono text-amber text-xs font-bold">SD</span>
      </div>

      {/* Card */}
      <div className="max-w-[86%] rounded-2xl rounded-tl-sm border border-border bg-panel overflow-hidden shadow-lg">
        {/* Header */}
        <div className="px-4 pt-4 pb-3 border-b border-border/60">
          <h3 className="font-serif text-text-primary text-base font-semibold leading-snug mb-2">
            {entry.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            <span className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full border ${stageClass}`}>
              <Layers size={9} />
              {entry.stage}
            </span>
            <span className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full border border-border/60 bg-panel-light ${catColor}`}>
              <Tag size={9} />
              {entry.category}
            </span>
          </div>
        </div>

        {/* Summary */}
        <div className="px-4 py-3">
          <p className="text-text-primary text-sm leading-relaxed">{entry.summary}</p>
        </div>

        {/* Key Points */}
        {entry.key_points?.length > 0 && (
          <div className="px-4 pb-3">
            <p className="text-[10px] font-mono text-amber uppercase tracking-widest mb-2">Key Points</p>
            <ul className="space-y-2">
              {entry.key_points.map((pt, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <CheckCircle size={13} className="text-teal flex-shrink-0 mt-0.5" />
                  <span className="text-text-dim text-xs leading-relaxed">{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer: T-codes & Tables */}
        <div className="px-4 pb-3 pt-2 border-t border-border/50 flex flex-wrap gap-x-4 gap-y-1 items-center">
          {entry.tcodes?.length > 0 && (
            <div className="flex items-center gap-2">
              <Terminal size={10} className="text-text-dim flex-shrink-0" />
              <span className="font-mono text-[10px] text-text-dim">
                {entry.tcodes.join(' · ')}
              </span>
            </div>
          )}
          {entry.tables?.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-border">|</span>
              <span className="font-mono text-[10px] text-text-dim">
                {entry.tables.join(' / ')}
              </span>
            </div>
          )}
        </div>

        {/* AI disclaimer */}
        {isAi && (
          <div className="px-4 py-2 bg-amber/5 border-t border-amber/20">
            <p className="text-[10px] font-mono text-amber/70">
              ⚠ AI-generated — verify against official SAP documentation
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function FallbackBubble({ suggestions, onSuggestionClick }) {
  return (
    <div className="flex justify-start mb-5 msg-animate">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber/20 border border-amber/40 flex items-center justify-center mr-3 mt-1">
        <span className="font-mono text-amber text-xs font-bold">SD</span>
      </div>
      <div className="max-w-[86%] rounded-2xl rounded-tl-sm border border-border bg-panel px-4 py-4 shadow-lg">
        <p className="text-text-dim text-sm mb-3">
          I don't have a specific entry for that topic yet. Here are some closely related topics you might find helpful:
        </p>
        <div className="flex flex-col gap-2">
          {suggestions.map((s) => (
            <button
              key={s.id}
              onClick={() => onSuggestionClick(s.question_variants[0])}
              className="chip-btn text-left text-xs text-teal font-mono bg-teal/5 border border-teal/20 px-3 py-2 rounded-lg hover:bg-teal/10"
            >
              → {s.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4 msg-animate">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber/20 border border-amber/40 flex items-center justify-center mr-3">
        <span className="font-mono text-amber text-xs font-bold">SD</span>
      </div>
      <div className="px-4 py-3 rounded-2xl rounded-tl-sm border border-border bg-panel flex items-center gap-1.5">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  );
}

export { UserBubble, AssistantBubble, FallbackBubble, TypingIndicator };
