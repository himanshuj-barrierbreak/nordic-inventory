import React from 'react';
import Dialog, { DialogHeader } from './Dialog';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { money, productImage } from '../../utils/helpers';

export default function ViewProductDialog({ open, onClose, product }) {
  if (!product) return null;
  const rows = [
    ['SKU', product.sku],
    ['Category', product.category],
    ['Price', money(product.price)],
    ['Stock', String(product.stock)],
  ];
  return (
    <Dialog open={open} onClose={onClose} width="max-w-md">
      <DialogHeader title="Product details" subtitle={product.name} onClose={onClose} />
      <div className="px-5 py-4">
        <div className="flex items-center gap-4">
          <img src={productImage(product.name, 96)} width="64" height="64" className="w-16 h-16 rounded-lg border border-line" />
          <div>
            <div className="text-sm font-semibold text-ink">{product.name}</div>
            <div className="mt-1">
              <Badge value={product.status} />
            </div>
          </div>
        </div>
        <div className="mt-4 border border-line rounded-md divide-y divide-[var(--line)]">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between px-3 py-2 text-sm">
              <span className="text-ink">{k}</span>
              <span className="text-ink">{v}</span>
            </div>
          ))}
        </div>
        {product.description && <p className="text-sm text-mut mt-4 leading-relaxed">{product.description}</p>}
      </div>
      <div className="px-5 py-4 border-t border-line flex justify-end">
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </div>
    </Dialog>
  );
}