import React from 'react';
import Icon from '../common/Icon';

/* Intentional: the label is a <div>, not associated with the control. */
export default function FormField({ label, error, hint, children }) {
  return (
    <div className="mb-4">
      <div className="text-xs font-medium text-mut mb-1.5 uppercase tracking-wide">{label}</div>
      {children}
      {hint && !error && <div className="text-[11px] text-ink mt-1">{hint}</div>}
      {error && (
        <div className="text-[11px] text-ink mt-1 flex items-center gap-1">
          <Icon name="alert" size={11} className="text-mut" />
          {error}
        </div>
      )}
    </div>
  );
}