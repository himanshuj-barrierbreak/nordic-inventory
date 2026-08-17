import React from 'react';
import Icon from '../common/Icon';
import Badge from '../common/Badge';
import { money, productImage } from '../../utils/helpers';

export default function ProductTable({ products, onView, onEdit, onDelete, onAddToCart }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-[820px]">
        <thead>
          <tr className="border-b border-line bg-panel2">
            <th className="text-left px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink">Product</th>
            <th className="text-left px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink">SKU</th>
            <th className="text-left px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink">Category</th>
            <th className="text-left px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink">Price</th>
            <th className="text-left px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink">Stock</th>
            <th className="text-left px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink">Status</th>
            <th className="text-left px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b border-line last:border-0 hover:bg-panel2">
              <td className="px-4 py-2.5">
                <div className="flex items-center gap-3">
                  <img src={productImage(p.name, 40)} width="32" height="32" className="w-8 h-8 rounded-md border border-line shrink-0" />
                  <div className="text-ink">{p.name}</div>
                </div>
              </td>
              <td className="px-4 py-2.5 text-mut font-mono text-xs">{p.sku}</td>
              <td className="px-4 py-2.5 text-mut">{p.category}</td>
              <td className="px-4 py-2.5 text-ink">{money(p.price)}</td>
              <td className="px-4 py-2.5 text-mut">{p.stock}</td>
              <td className="px-4 py-2.5"><Badge value={p.status} /></td>
              <td className="px-4 py-2.5">
                <div className="flex items-center gap-1">
                  <button onClick={() => onView(p)} className="p-1.5 text-ink hover:text-ink rounded hover:bg-line">
                    <Icon name="eye" size={15} />
                  </button>
                  <button onClick={() => onEdit(p)} className="p-1.5 text-ink hover:text-ink rounded hover:bg-line">
                    <Icon name="pencil" size={14} />
                  </button>
                  <button onClick={() => onDelete(p)} className="p-1.5 text-ink hover:text-ink rounded hover:bg-line">
                    <Icon name="trash" size={14} />
                  </button>
                  <button onClick={() => onAddToCart(p)} className="p-1.5 text-ink hover:text-ink rounded hover:bg-line">
                    <Icon name="plus" size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}