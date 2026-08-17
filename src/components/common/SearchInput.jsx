import React from 'react';
import Icon from './Icon';

export default function SearchInput({ value, onChange, placeholder, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <Icon name="search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink pointer-events-none" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-panel2 border border-line hover:border-line2 rounded-md pl-9 pr-3 py-2 text-sm text-ink"
      />
    </div>
  );
}