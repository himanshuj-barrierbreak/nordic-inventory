import React from 'react';
import Icon from '../common/Icon';
import Badge from '../common/Badge';
import { money } from '../../utils/helpers';

export default function CustomerTable({ rows, onView }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-[820px]">
        <thead>
          <tr className="border-b border-line bg-panel2">
            <th className="text-left px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink">Customer</th>
            <th className="text-left px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink">Email</th>
            <th className="text-left px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink">Phone</th>
            <th className="text-left px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink">Orders</th>
            <th className="text-left px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink">Total spent</th>
            <th className="text-left px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink">Status</th>
            <th className="text-left px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((c) => {
            const initials = c.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
            return (
              <tr key={c.id} className="border-b border-line last:border-0 hover:bg-panel2">
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-panel2 border border-line2 text-[10px] font-semibold text-mut flex items-center justify-center shrink-0">
                      {initials}
                    </span>
                    <span className="text-ink">{c.name}</span>
                  </div>
                </td>
                <td className="px-4 py-2.5 text-mut">{c.email}</td>
                <td className="px-4 py-2.5 text-mut">{c.phone}</td>
                <td className="px-4 py-2.5 text-mut">{c.orderCount}</td>
                <td className="px-4 py-2.5 text-ink">{money(c.spent)}</td>
                <td className="px-4 py-2.5"><Badge value={c.status} /></td>
                <td className="px-4 py-2.5">
                  <button onClick={() => onView(c)} className="p-1.5 text-ink hover:text-ink rounded hover:bg-line">
                    <Icon name="eye" size={15} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}