import React from 'react';

/* Intentional: clickable div-based toggle, no semantics, no keyboard support. */
export default function Checkbox({ checked, onChange, label, description }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 cursor-pointer select-none" onClick={() => onChange(!checked)}>
      <div>
        <div className="text-sm text-ink">{label}</div>
        {description && <div className="text-xs text-ink mt-0.5">{description}</div>}
      </div>
      <div className={`w-9 h-5 rounded-full p-0.5 shrink-0 transition-colors ${checked ? 'bg-accent' : 'bg-line2'}`}>
        <div className={`w-4 h-4 rounded-full transition-transform ${checked ? 'bg-accent-ink translate-x-4' : 'bg-panel'}`} />
      </div>
    </div>
  );
}