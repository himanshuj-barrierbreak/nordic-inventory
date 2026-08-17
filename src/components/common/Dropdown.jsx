import React, { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

/* Intentional: mouse-driven custom dropdown. Options are plain divs,
   no keyboard support, closes on mouse leave. */
export default function Dropdown({ value, options, onChange, className = '' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-2 bg-panel2 border border-line hover:border-line2 rounded-md px-3 py-2 text-sm text-ink"
      >
        <span className="truncate">{value}</span>
        <Icon name="chevronDown" size={14} className="text-ink shrink-0" />
      </button>
      {open && (
        <div className="absolute left-0 right-0 z-30 mt-1 max-h-64 overflow-auto bg-panel border border-line2 rounded-md shadow-2xl py-1">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`px-3 py-1.5 text-sm cursor-pointer ${opt === value ? 'bg-line text-ink' : 'text-mut hover:bg-panel2 hover:text-ink'}`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}