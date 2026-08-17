import React from 'react';
import Icon from '../common/Icon';

export default function Select({ className = '', children, ...rest }) {
  return (
    <div className="relative">
      <select
        className={`w-full appearance-none bg-panel2 border border-line hover:border-line2 rounded-md pl-3 pr-8 py-2 text-sm text-ink ${className}`}
        {...rest}
      >
        {children}
      </select>
      <Icon name="chevronDown" size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink pointer-events-none" />
    </div>
  );
}