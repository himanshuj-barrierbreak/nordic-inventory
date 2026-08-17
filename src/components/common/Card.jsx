import React from 'react';

export default function Card({ className = '', children, ...rest }) {
  return (
    <div className={`bg-panel border border-line rounded-lg ${className}`} {...rest}>
      {children}
    </div>
  );
}