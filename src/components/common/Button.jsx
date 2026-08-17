import React from 'react';

const variants = {
  primary: 'bg-accent text-accent-ink hover:opacity-85',
  secondary: 'border border-line2 text-ink hover:bg-panel2',
  ghost: 'text-mut hover:text-ink hover:bg-panel2',
};

const sizes = {
  sm: 'text-xs px-2.5 py-1.5',
  md: 'text-sm px-3.5 py-2',
};

export default function Button({ variant = 'primary', size = 'md', className = '', children, ...rest }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-colors disabled:opacity-40 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}