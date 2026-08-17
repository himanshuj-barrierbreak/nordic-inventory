import React, { useEffect, useState } from 'react';
import Dialog, { DialogHeader } from './Dialog';
import FormField from '../forms/FormField';
import Input from '../forms/Input';
import Select from '../forms/Select';
import Button from '../common/Button';
import { CATEGORIES, STOCK_FILTERS } from '../../data/mockData';
import { useAppContext } from '../../context/AppContext';

const empty = { name: '', sku: '', category: 'Electronics', price: '', stock: '', description: '', status: 'In Stock' };

export default function ProductDialog({ open, onClose, product }) {
  const { addProduct, updateProduct, notify } = useAppContext();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setErrors({});
      setForm(
        product
          ? {
              name: product.name,
              sku: product.sku,
              category: product.category,
              price: String(product.price),
              stock: String(product.stock),
              description: product.description || '',
              status: product.status,
            }
          : empty
      );
    }
  }, [open, product]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Product name is required.';
    if (!form.sku.trim()) e.sku = 'SKU is required.';
    const price = parseFloat(form.price);
    if (form.price === '' || isNaN(price) || price <= 0) e.price = 'Enter a price greater than 0.';
    const stock = parseInt(form.stock, 10);
    if (form.stock === '' || isNaN(stock) || stock < 0) e.stock = 'Enter a stock quantity of 0 or more.';
    return e;
  };

  const save = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      notify('error', 'Please fix the highlighted fields.');
      return;
    }
    const data = {
      name: form.name.trim(),
      sku: form.sku.trim(),
      category: form.category,
      price: Math.round(parseFloat(form.price) * 100) / 100,
      stock: parseInt(form.stock, 10),
      description: form.description.trim(),
      status: form.status,
    };
    if (product) {
      updateProduct({ ...product, ...data });
      notify('success', 'Product updated successfully.');
    } else {
      addProduct({ id: 'p' + Date.now(), ...data });
      notify('success', 'Product added successfully.');
    }
    if (data.stock === 0) notify('warning', 'This product was saved with zero stock.');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} width="max-w-xl">
      <DialogHeader title={product ? 'Edit product' : 'Add product'} subtitle={product ? product.sku : 'Create a new catalog item'} onClose={onClose} />
      <div className="px-5 py-4">
        <FormField label="Product Name" error={errors.name}>
          <Input value={form.name} invalid={!!errors.name} onChange={(e) => set('name', e.target.value)} />
        </FormField>
        <div className="grid sm:grid-cols-2 gap-x-4">
          <FormField label="SKU" error={errors.sku}>
            <Input value={form.sku} invalid={!!errors.sku} onChange={(e) => set('sku', e.target.value)} />
          </FormField>
          <FormField label="Category">
            <Select value={form.category} onChange={(e) => set('category', e.target.value)}>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Select>
          </FormField>
          <FormField label="Price" error={errors.price}>
            <Input value={form.price} invalid={!!errors.price} onChange={(e) => set('price', e.target.value)} />
          </FormField>
          <FormField label="Stock Quantity" error={errors.stock}>
            <Input value={form.stock} invalid={!!errors.stock} onChange={(e) => set('stock', e.target.value)} />
          </FormField>
        </div>
        <FormField label="Description">
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            className="w-full bg-panel2 border border-line hover:border-line2 rounded-md px-3 py-2 text-sm text-ink resize-none"
          />
        </FormField>
        <FormField label="Product Status">
          <Select value={form.status} onChange={(e) => set('status', e.target.value)}>
            {STOCK_FILTERS.filter((s) => s !== 'All statuses').map((s) => (
              <option key={s}>{s}</option>
            ))}
          </Select>
        </FormField>
      </div>
      <div className="px-5 py-4 border-t border-line flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button onClick={save}>Save Product</Button>
      </div>
    </Dialog>
  );
}