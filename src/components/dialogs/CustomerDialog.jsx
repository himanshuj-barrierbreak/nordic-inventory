import React from 'react';
import Dialog, { DialogHeader } from './Dialog';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { useAppContext } from '../../context/AppContext';
import { money, fmtDate } from '../../utils/helpers';

export default function CustomerDialog({ open, onClose, customer }) {
  const { orders } = useAppContext();
  if (!open || !customer) return null;

  const theirOrders = orders
    .filter((o) => o.customer === customer.name)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  const spent = theirOrders.filter((o) => o.status !== 'Cancelled').reduce((s, o) => s + o.total, 0);

  const fields = [
    ['Name', customer.name],
    ['Email', customer.email],
    ['Phone', customer.phone],
    ['Address', customer.address],
  ];

  return (
    <Dialog open={open} onClose={onClose} width="max-w-2xl">
      <DialogHeader title="Customer details" subtitle={`Member since ${fmtDate(customer.joined)}`} onClose={onClose} />

      <div className="px-5 py-4 grid md:grid-cols-2 gap-x-6 gap-y-2">
        {fields.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-3 text-sm border-b border-line pb-2">
            <span className="text-ink shrink-0">{k}</span>
            <span className="text-ink text-right">{v}</span>
          </div>
        ))}
        <div className="flex justify-between text-sm border-b border-line pb-2">
          <span className="text-ink">Status</span>
          <Badge value={customer.status} />
        </div>
        <div className="flex justify-between text-sm border-b border-line pb-2">
          <span className="text-ink">Total orders</span>
          <span className="text-ink">{theirOrders.length}</span>
        </div>
        <div className="flex justify-between text-sm border-b border-line pb-2">
          <span className="text-ink">Total spent</span>
          <span className="text-ink">{money(spent)}</span>
        </div>
      </div>

      <div className="px-5 pb-4">
        <div className="text-[10px] uppercase tracking-wider text-ink mb-2">Recent orders</div>
        {theirOrders.length === 0 ? (
          <div className="text-sm text-ink py-4 text-center border border-line rounded-md">No orders yet.</div>
        ) : (
          <div className="overflow-x-auto border border-line rounded-md">
            <table className="w-full text-sm min-w-[420px]">
              <thead>
                <tr className="bg-panel2 border-b border-line">
                  <th className="text-left px-3 py-2 text-[10px] font-medium uppercase tracking-wider text-ink">Order</th>
                  <th className="text-left px-3 py-2 text-[10px] font-medium uppercase tracking-wider text-ink">Date</th>
                  <th className="text-left px-3 py-2 text-[10px] font-medium uppercase tracking-wider text-ink">Status</th>
                  <th className="text-right px-3 py-2 text-[10px] font-medium uppercase tracking-wider text-ink">Total</th>
                </tr>
              </thead>
              <tbody>
                {theirOrders.slice(0, 5).map((o) => (
                  <tr key={o.id} className="border-b border-line last:border-0">
                    <td className="px-3 py-2 font-mono text-xs text-ink">{o.id}</td>
                    <td className="px-3 py-2 text-mut">{fmtDate(o.date)}</td>
                    <td className="px-3 py-2"><Badge value={o.status} /></td>
                    <td className="px-3 py-2 text-right text-ink">{money(o.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="px-5 py-4 border-t border-line flex justify-end">
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </div>
    </Dialog>
  );
}