import React from 'react';
import Icon from '../common/Icon';
import Badge from '../common/Badge';
import { money, fmtDate } from '../../utils/helpers';

export default function OrderTable({ orders, onView }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-[860px]">
        <thead>
          <tr className="border-b border-line bg-panel2">
            <th className="text-left px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink">Order ID</th>
            <th className="text-left px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink">Customer</th>
            <th className="text-left px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink">Date</th>
            <th className="text-left px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink">Items</th>
            <th className="text-left px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink">Total</th>
            <th className="text-left px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink">Payment</th>
            <th className="text-left px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink">Status</th>
            <th className="text-left px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-b border-line last:border-0 hover:bg-panel2">
              <td className="px-4 py-2.5 font-mono text-xs text-ink">{o.id}</td>
              <td className="px-4 py-2.5 text-ink">{o.customer}</td>
              <td className="px-4 py-2.5 text-mut">{fmtDate(o.date)}</td>
              <td className="px-4 py-2.5 text-mut">{o.items.reduce((s, i) => s + i.qty, 0)}</td>
              <td className="px-4 py-2.5 text-ink">{money(o.total)}</td>
              <td className="px-4 py-2.5"><Badge value={o.payment} /></td>
              <td className="px-4 py-2.5"><Badge value={o.status} /></td>
              <td className="px-4 py-2.5">
                <button onClick={() => onView(o)} className="p-1.5 text-ink hover:text-ink rounded hover:bg-line">
                  <Icon name="eye" size={15} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}