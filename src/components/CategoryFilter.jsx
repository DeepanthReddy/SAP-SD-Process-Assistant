import { knowledgeBase } from '../data/knowledgeBase';

const CATEGORIES = ['All', 'Order Management', 'Pricing', 'Credit Management', 'Delivery', 'Billing', 'Master Data'];

const CAT_ACCENT = {
  'All':               'border-text-dim/40 text-text-dim hover:border-text-primary hover:text-text-primary',
  'Order Management':  'border-blue-400/40 text-blue-400 hover:border-blue-400 hover:bg-blue-400/10',
  'Pricing':           'border-amber/40 text-amber hover:border-amber hover:bg-amber/10',
  'Credit Management': 'border-danger/40 text-danger hover:border-danger hover:bg-danger/10',
  'Delivery':          'border-teal/40 text-teal hover:border-teal hover:bg-teal/10',
  'Billing':           'border-purple-400/40 text-purple-400 hover:border-purple-400 hover:bg-purple-400/10',
  'Master Data':       'border-text-dim/40 text-text-dim hover:border-text-primary hover:text-text-primary',
};

export default function CategoryFilter({ activeCategory, onCategoryChange }) {
  return (
    <div>
      <p className="text-[10px] font-mono text-text-dim uppercase tracking-widest mb-3">Filter by Category</p>
      <div className="flex flex-col gap-1.5">
        {CATEGORIES.map((cat) => {
          const count = cat === 'All' ? knowledgeBase.length : knowledgeBase.filter(k => k.category === cat).length;
          const isActive = activeCategory === cat;
          const accent = CAT_ACCENT[cat] || CAT_ACCENT['All'];

          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`
                chip-btn flex items-center justify-between text-left px-3 py-2 rounded-lg border text-xs font-mono transition-all
                ${isActive
                  ? `bg-panel-light ${accent.replace('hover:', '')}`
                  : `bg-transparent ${accent}`
                }
                ${isActive ? 'shadow-sm' : ''}
              `}
            >
              <span>{cat}</span>
              <span className="opacity-50 text-[10px]">{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
