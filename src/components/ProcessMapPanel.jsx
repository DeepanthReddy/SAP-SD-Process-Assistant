import { CheckCircle2, Circle, ChevronRight } from 'lucide-react';
import CategoryFilter from './CategoryFilter';

const STAGES = [
  { id: 'Order Created',  label: 'Order Created',  desc: 'VA01 / VBAK·VBAP' },
  { id: 'Credit Check',   label: 'Credit Check',   desc: 'FD32 / KNKK' },
  { id: 'Delivery Due',   label: 'Delivery Due',   desc: 'VL01N / LIKP·LIPS' },
  { id: 'Goods Issued',   label: 'Goods Issued',   desc: 'VL02N / MSEG' },
  { id: 'Billing Due',    label: 'Billing Due',    desc: 'VF01 / VBRK·VBRP' },
  { id: 'Completed',      label: 'Completed',      desc: 'O2C cycle closed' },
];

const STAGE_ACCENT = {
  'Order Created': '#5b8cc4',
  'Credit Check':  '#d8614f',
  'Delivery Due':  '#4fa89a',
  'Goods Issued':  '#e7a13c',
  'Billing Due':   '#a78bfa',
  'Completed':     '#4ade80',
};

export default function ProcessMapPanel({ activeStage, onStageClick, activeCategory, onCategoryChange }) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-border/60">
        <p className="font-mono text-[10px] text-text-dim uppercase tracking-widest mb-1">Process Map</p>
        <h2 className="font-serif text-text-primary text-lg font-semibold leading-tight">
          Order-to-Cash
        </h2>
        <p className="text-text-dim text-xs mt-1">Stage lights up with each answer</p>
      </div>

      {/* Stage tracker */}
      <div className="px-5 py-5 flex flex-col gap-0">
        {STAGES.map((stage, idx) => {
          const isActive = activeStage === stage.id;
          const accent   = STAGE_ACCENT[stage.id];
          const isPast   = activeStage
            ? STAGES.findIndex(s => s.id === activeStage) > idx
            : false;

          return (
            <div key={stage.id} className="flex items-stretch gap-3">
              {/* Timeline line + node */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => onStageClick(stage.id === activeStage ? null : stage.id)}
                  className="flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-10"
                  style={{
                    borderColor: isActive ? accent : isPast ? accent + '80' : '#262b31',
                    backgroundColor: isActive ? accent + '25' : 'transparent',
                    boxShadow: isActive ? `0 0 12px 3px ${accent}45` : 'none',
                  }}
                  title={`Filter: ${stage.label}`}
                >
                  {isActive
                    ? <CheckCircle2 size={13} style={{ color: accent }} />
                    : isPast
                    ? <Circle size={10} style={{ color: accent + '80' }} fill={accent + '40'} />
                    : <Circle size={10} className="text-border" />
                  }
                </button>
                {/* Connector line */}
                {idx < STAGES.length - 1 && (
                  <div
                    className="w-px flex-1 my-1 transition-all duration-300"
                    style={{
                      background: isPast
                        ? `linear-gradient(to bottom, ${accent}70, ${STAGE_ACCENT[STAGES[idx + 1].id]}40)`
                        : '#262b31',
                      minHeight: '20px',
                    }}
                  />
                )}
              </div>

              {/* Stage card */}
              <div
                className={`
                  flex-1 mb-${idx < STAGES.length - 1 ? '1' : '0'} rounded-xl border px-3 py-2.5 cursor-pointer transition-all duration-300
                  ${isActive ? 'stage-active bg-panel-light' : 'border-border/50 bg-transparent hover:bg-panel-light/50'}
                `}
                style={{
                  borderColor: isActive ? accent : undefined,
                  marginBottom: idx < STAGES.length - 1 ? '4px' : '0',
                }}
                onClick={() => onStageClick(stage.id === activeStage ? null : stage.id)}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-medium transition-all duration-200"
                    style={{ color: isActive ? accent : isPast ? accent + 'cc' : '#8b9299' }}
                  >
                    {stage.label}
                  </span>
                  {isActive && <ChevronRight size={11} style={{ color: accent }} />}
                </div>
                <p className="font-mono text-[10px] text-text-dim/50 mt-0.5 leading-tight">{stage.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Divider */}
      <div className="mx-5 border-t border-border/40" />

      {/* Category filter */}
      <div className="px-5 py-5 flex-1 overflow-y-auto">
        <CategoryFilter activeCategory={activeCategory} onCategoryChange={onCategoryChange} />
      </div>
    </div>
  );
}
