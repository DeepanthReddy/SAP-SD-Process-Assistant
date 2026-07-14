import { useState, useCallback } from 'react';
import ChatPanel from './components/ChatPanel';
import ProcessMapPanel from './components/ProcessMapPanel';

export default function App() {
  const [activeStage, setActiveStage]       = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

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
    <div className="flex h-screen w-full overflow-hidden bg-bg text-text-primary md:flex-row flex-col">
      {/* ── Left: Chat Panel (responsive) ─────────────────────────── */}
      <main className="flex flex-col md:w-[65%] w-full min-h-0 border-r border-border md:border-r-0 md:border-b-0 border-b-0">
        <ChatPanel
          onStageChange={handleStageChange}
          activeCategory={activeCategory}
        />
      </main>

      {/* ── Right: Process Map Panel (responsive) ─────────────────── */}
      <aside
        className="flex flex-col md:w-[35%] w-full md:min-h-0 min-h-[300px] bg-panel"
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
