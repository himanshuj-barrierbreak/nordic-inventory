import React from 'react';
import Icon from '../common/Icon';

/* Intentional: no dialog role, no focus trap, no initial/restore focus,
   no Escape handling. Overlay click closes. */
export default function Dialog({ open, onClose, children, width = 'max-w-lg' }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80]">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="absolute inset-0 overflow-y-auto">
        <div className="min-h-full flex items-start justify-center p-4 md:p-8">
          <div className={`relative w-full ${width} bg-panel border border-line2 rounded-lg shadow-2xl`}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export function DialogHeader({ title, subtitle, onClose }) {
  return (
    <div className="flex items-start justify-between px-5 py-4 border-b border-line">
      <div>
        <h5 className="text-base font-semibold text-ink">{title}</h5>
        {subtitle && <p className="text-xs text-ink mt-0.5">{subtitle}</p>}
      </div>
      <button onClick={onClose} className="p-1 text-ink hover:text-ink">
        <Icon name="close" size={16} />
      </button>
    </div>
  );
}