import React from 'react';

export default function Input({ className = '', invalid, ...rest }) {
  return (
    <input
      className={`w-full bg-panel2 border rounded-md px-3 py-2 text-sm text-ink ${invalid ? 'border-mut' : 'border-line hover:border-line2'} ${className}`}
      {...rest}
    />
  );
}