import React from 'react';
import Icon from './Icon';

export default function EmptyState({ icon = 'box', title, subtitle, children }) {
  return (
    <div className="py-14 flex flex-col items-center text-center px-6">
      <div className="w-12 h-12 rounded-full border border-line2 bg-panel2 flex items-center justify-center text-ink mb-4">
        <Icon name={icon} size={20} />
      </div>
      <div className="text-sm font-medium text-ink">{title}</div>
      {subtitle && <div className="text-xs text-ink mt-1 max-w-xs">{subtitle}</div>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}