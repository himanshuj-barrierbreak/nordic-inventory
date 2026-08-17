import React, { useEffect, useState } from 'react';
import Dialog, { DialogHeader } from './Dialog';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Select from '../forms/Select';
import { ORDER_STATUSES } from '../../data/mockData';
import { useAppContext } from '../../context/AppContext';
import { money, fmtDate } from '../../utils/helpers';

const Row = ({ k, v, strong }) => (
  <div className="flex justify-between">
    <span className="text-mut">{k}</span>
    <span className={strong ? 'text-ink font-semibold' : 'text-ink'}>{v}</span>
  </div>
);

export default function OrderDialog({ open, onClose, order }) {
  const { updateOrderStatus, notify } = useAppContext();
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (order) setStatus(order.status);
  }, [open, order]);

  if (!open || !order) return null;

  const apply = () => {
    updateOrderStatus(order.id, status);
    notify('success', 'Order status updated.');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} width="max-w-2xl">
      <DialogHeader title={order.id} subtitle={`Placed ${fmtDate(order.date)}`} onClose={onClose} />

      <div className="px-5 py-4 grid md:grid-cols-2 gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-ink mb-2">Customer</div>
          <div className="text-sm text-ink">{order.customer}</div>
          <div className="text-xs text-mut mt-0.5">{order.email}</div>
          <div className="text-xs text-mut">{order.phone}</div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-ink mb-2">Shipping address</div>
          <div className="text-sm text-mut leading-relaxed">
            {order.address.street}
            <br />
            {order.address.city}
            {order.address.state ? ', ' + order.address.state : ''} {order.address.zip}
            <br />
            {order.address.country}
          </div>
        </div>
      </div>

      <div className="px-5">
        <div className="text-[10px] uppercase tracking-wider text-ink mb-2">Products</div>
        <div className="border border-line rounded-md overflow-hidden">
          {order.items.map((it, i) => (
            <div key={i} className="flex items-center justify-between px-3 py-2 text-sm border-b border-line last:border-0 bg-panel2">
              <div>
                <span className="text-ink">{it.name}</span> <span className="text-ink text-xs">× {it.qty}</span>
              </div>
              <div className="text-mut">{money(it.price * it.qty)}</div>
            </div>
          ))}
        </div>
        <div className="ml-auto max-w-[240px] mt-3 space-y-1 text-sm">
          <Row k="Subtotal" v={money(order.subtotal)} />
          <Row k="Discount" v={'−' + money(order.discount)} />
          <Row k="Shipping" v={order.shipping === 0 ? 'Free' : money(order.shipping)} />
          <Row k="Tax" v={money(order.tax)} />
          <div className="border-t border-line pt-1">
            <Row k="Total" v={money(order.total)} strong />
          </div>
        </div>
      </div>

      <div className="px-5 py-4 mt-4 border-t border-line flex flex-wrap items-end gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-ink mb-1">Payment</div>
          <Badge value={order.payment} />
        </div>
        <div className="ml-auto flex items-end gap-2">
          <div className="w-40">
            <div className="text-[10px] uppercase tracking-wider text-ink mb-1">Order status</div>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              {ORDER_STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Select>
          </div>
          <Button onClick={apply}>Update status</Button>
        </div>
      </div>
    </Dialog>
  );
}