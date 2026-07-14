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
    <div className="flex h-screen overflow-hidden bg-bg text-text-primary">
      {/* ── Left: Chat Panel (~65%) ─────────────────────────── */}
      <main className="flex flex-col" style={{ width: '65%', borderRight: '1px solid #262b31' }}>
        <ChatPanel
          onStageChange={handleStageChange}
          activeCategory={activeCategory}
        />
      </main>

      {/* ── Right: Process Map Panel (~35%) ─────────────────── */}
      <aside
        className="flex flex-col overflow-hidden"
        style={{ width: '35%', background: '#131619' }}
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
