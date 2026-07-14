import { knowledgeBase } from '../data/knowledgeBase';

// A curated set of starter chips shown on load
const STARTERS = [
  'how do you create a sales order',
  'how does SAP pricing work',
  'what is a credit block',
  'how does delivery creation work',
  'what is PGI',
  'how does billing work in SAP SD',
];

export default function SuggestionChips({ activeCategory, onChipClick }) {
  // Filter pool by category (or show starters if "All" / no category)
  const pool = activeCategory === 'All' || !activeCategory
    ? knowledgeBase.filter(k => STARTERS.includes(k.question_variants[0]))
    : knowledgeBase.filter(k => k.category === activeCategory);

  // Pick up to 6 chips
  const chips = pool.slice(0, 6).map(k => ({
    id: k.id,
    label: k.title,
    question: k.question_variants[0],
    category: k.category,
  }));

  if (chips.length === 0) return null;

  return (
    <div className="px-4 pt-2 pb-3 border-t border-border/50">
      <p className="text-[10px] font-mono text-text-dim uppercase tracking-widest mb-2">
        {activeCategory === 'All' ? 'Suggested Questions' : `${activeCategory} Questions`}
      </p>
      <div className="flex flex-wrap gap-2">
        {chips.map(chip => (
          <button
            key={chip.id}
            id={`chip-${chip.id}`}
            onClick={() => onChipClick(chip.question)}
            className="chip-btn text-xs font-mono px-3 py-1.5 rounded-full border border-border bg-panel-light text-text-dim whitespace-nowrap transition-all"
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}
