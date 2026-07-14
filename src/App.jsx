import { useState, useCallback } from 'react';
import { MessageSquare, Map } from 'lucide-react';
import ChatPanel from './components/ChatPanel';
import ProcessMapPanel from './components/ProcessMapPanel';

export default function App() {
  const [activeStage, setActiveStage]       = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [mobileTab, setMobileTab]           = useState('chat'); // 'chat' or 'map'

  const handleStageChange = useCallback((stage) => {
    setActiveStage(stage);
  }, []);

  const handleStageClick = useCallback((stage) => {
    setActiveStage(stage);
    // When a stage is clicked on the map, filter chips to that stage's categories
  }, []);

  const handleCategoryChange = useCallback((cat) => {
    setActiveCategory(cat);
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-bg text-text-primary flex-col md:flex-row">
      
      {/* Mobile Tab Navigation (Only visible on small screens) */}
      <div className="md:hidden flex border-b border-border bg-panel flex-shrink-0">
        <button
          onClick={() => setMobileTab('chat')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
            mobileTab === 'chat' ? 'text-amber border-b-2 border-amber bg-panel-light' : 'text-text-dim'
          }`}
        >
          <MessageSquare size={16} />
          Chat
        </button>
        <button
          onClick={() => setMobileTab('map')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
            mobileTab === 'map' ? 'text-amber border-b-2 border-amber bg-panel-light' : 'text-text-dim'
          }`}
        >
          <Map size={16} />
          Process Map
        </button>
      </div>

      {/* ── Left: Chat Panel (responsive) ─────────────────────────── */}
      <main 
        className={`${mobileTab === 'chat' ? 'flex' : 'hidden'} md:flex flex-col md:w-[65%] w-full flex-1 min-h-0 md:border-r border-border`}
      >
        <ChatPanel
          onStageChange={handleStageChange}
          activeCategory={activeCategory}
        />
      </main>

      {/* ── Right: Process Map Panel (responsive) ─────────────────── */}
      <aside
        className={`${mobileTab === 'map' ? 'flex' : 'hidden'} md:flex flex-col md:w-[35%] w-full flex-1 min-h-0 bg-panel`}
      >
        <ProcessMapPanel
          activeStage={activeStage}
          onStageClick={handleStageClick}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      </aside>
    </div>
  );
}
