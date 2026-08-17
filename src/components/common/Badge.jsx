import React from 'react';

const styles = {
  'In Stock': 'bg-accent text-accent-ink',
  'Low Stock': 'bg-line2 text-ink',
  'Out of Stock': 'border border-line2 text-ink',
  Delivered: 'bg-accent text-accent-ink',
  Shipped: 'bg-line2 text-ink',
  Processing: 'bg-panel2 border border-line2 text-mut',
  Pending: 'border border-line text-ink',
  Cancelled: 'border border-line text-dim line-through',
  Paid: 'bg-accent text-accent-ink',
  Refunded: 'border border-line text-ink',
  Active: 'bg-accent text-accent-ink',
  Inactive: 'border border-line2 text-ink',
};

export default function Badge({ value }) {
  const s = styles[value] || 'border border-line2 text-mut';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-[11px] font-medium whitespace-nowrap ${s}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
      {value}
    </span>
  );
}