import React, { useState } from 'react';
import Dialog, { DialogHeader } from './Dialog';
import FormField from '../forms/FormField';
import Input from '../forms/Input';
import Select from '../forms/Select';
import Button from '../common/Button';
import { useAppContext } from '../../context/AppContext';
import { useCart } from '../../context/CartContext';
import { COUNTRIES } from '../../data/mockData';
import { money, nextOrderId, todayISO, r2 } from '../../utils/helpers';

const empty = {
  fullName: '', email: '', phone: '', address: '', city: '', state: '', zip: '',
  country: 'United States', payment: 'Credit card',
};

export default function CheckoutDialog({ open, onClose }) {
  const { orders, addOrder, notify } = useAppContext();
  const { items, totals, clearCart } = useCart();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required.';
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email address.';
    if (!form.address.trim()) e.address = 'Address is required.';
    if (!form.city.trim()) e.city = 'City is required.';
    if (!form.zip.trim()) e.zip = 'ZIP code is required.';
    return e;
  };

  const placeOrder = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      notify('error', 'Please fix the highlighted fields.');
      return;
    }
    const order = {
      id: nextOrderId(orders),
      customer: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || '—',
      address: {
        street: form.address.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        zip: form.zip.trim(),
        country: form.country,
      },
      date: todayISO(),
      items: items.map((i) => ({ name: i.product.name, sku: i.product.sku, qty: i.qty, price: i.product.price })),
      subtotal: totals.subtotal,
      discount: totals.discount,
      shipping: totals.shipping,
      tax: totals.tax,
      total: totals.total,
      payment: 'Pending',
      status: 'Processing',
    };
    addOrder(order);
    clearCart();
    setForm(empty);
    notify('success', 'Order placed successfully.');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} width="max-w-3xl">
      <DialogHeader title="Checkout" subtitle="Complete the order details below" onClose={onClose} />
      <div className="px-5 py-4 grid md:grid-cols-[1fr_240px] gap-6">
        <div>
          <div className="grid sm:grid-cols-2 gap-x-4">
            <FormField label="Full Name" error={errors.fullName}>
              <Input value={form.fullName} invalid={!!errors.fullName} onChange={(e) => set('fullName', e.target.value)} />
            </FormField>
            <FormField label="Email" error={errors.email}>
              <Input value={form.email} invalid={!!errors.email} onChange={(e) => set('email', e.target.value)} />
            </FormField>
            <FormField label="Phone">
              <Input value={form.phone} onChange={(e) => set('phone', e.target.value)} />
            </FormField>
            <FormField label="Payment Method">
              <Select value={form.payment} onChange={(e) => set('payment', e.target.value)}>
                <option>Credit card</option>
                <option>PayPal</option>
                <option>Bank transfer</option>
              </Select>
            </FormField>
          </div>
          <FormField label="Address" error={errors.address}>
            <Input value={form.address} invalid={!!errors.address} onChange={(e) => set('address', e.target.value)} />
          </FormField>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4">
            <FormField label="City" error={errors.city}>
              <Input value={form.city} invalid={!!errors.city} onChange={(e) => set('city', e.target.value)} />
            </FormField>
            <FormField label="State">
              <Input value={form.state} onChange={(e) => set('state', e.target.value)} />
            </FormField>
            <FormField label="ZIP" error={errors.zip}>
              <Input value={form.zip} invalid={!!errors.zip} onChange={(e) => set('zip', e.target.value)} />
            </FormField>
            <FormField label="Country">
              <Select value={form.country} onChange={(e) => set('country', e.target.value)}>
                {COUNTRIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </Select>
            </FormField>
          </div>
        </div>

        <div className="border border-line rounded-md p-3 h-fit bg-panel2">
          <div className="text-[10px] uppercase tracking-wider text-ink mb-2">Order summary</div>
          <div className="space-y-1.5 max-h-40 overflow-auto pr-1">
            {items.map((i) => (
              <div key={i.productId} className="flex justify-between gap-2 text-xs">
                <span className="text-mut truncate">
                  {i.product.name} × {i.qty}
                </span>
                <span className="text-ink shrink-0">{money(i.product.price * i.qty)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-line mt-3 pt-2 space-y-1 text-xs">
            <div className="flex justify-between text-mut"><span>Subtotal</span><span>{money(totals.subtotal)}</span></div>
            <div className="flex justify-between text-mut"><span>Discount</span><span>−{money(totals.discount)}</span></div>
            <div className="flex justify-between text-mut"><span>Shipping</span><span>{totals.shipping === 0 ? 'Free' : money(totals.shipping)}</span></div>
            <div className="flex justify-between text-mut"><span>Tax</span><span>{money(totals.tax)}</span></div>
            <div className="flex justify-between text-ink font-semibold text-sm border-t border-line pt-1.5 mt-1.5">
              <span>Total</span>
              <span>{money(totals.total)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 py-4 border-t border-line flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button onClick={placeOrder}>Place order</Button>
      </div>
    </Dialog>
  );
}