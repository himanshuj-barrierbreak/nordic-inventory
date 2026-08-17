import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAppContext } from './AppContext';
import { loadLS, saveLS, r2 } from '../utils/helpers';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { products } = useAppContext();
  const [rawItems, setRawItems] = useState(() =>
    loadLS('na_cart_v1', [
      { productId: 'p2', qty: 2 },
      { productId: 'p3', qty: 1 },
    ])
  );

  useEffect(() => saveLS('na_cart_v1', rawItems), [rawItems]);

  const addToCart = (productId, qty = 1) =>
    setRawItems((list) => {
      const found = list.find((i) => i.productId === productId);
      if (found) return list.map((i) => (i.productId === productId ? { ...i, qty: i.qty + qty } : i));
      return [...list, { productId, qty }];
    });

  const increment = (productId) => setRawItems((l) => l.map((i) => (i.productId === productId ? { ...i, qty: i.qty + 1 } : i)));
  const decrement = (productId) => setRawItems((l) => l.map((i) => (i.productId === productId ? { ...i, qty: Math.max(1, i.qty - 1) } : i)));
  const removeItem = (productId) => setRawItems((l) => l.filter((i) => i.productId !== productId));
  const clearCart = () => setRawItems([]);

  const items = useMemo(
    () =>
      rawItems
        .map((i) => ({ ...i, product: products.find((p) => p.id === i.productId) }))
        .filter((i) => i.product),
    [rawItems, products]
  );

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.qty * i.product.price, 0);
  const discount = subtotal >= 100 ? 12 : 0;
  const shipping = items.length === 0 ? 0 : subtotal - discount >= 150 ? 0 : 6;
  const tax = Math.max(0, subtotal - discount) * 0.08;
  const totals = { subtotal: r2(subtotal), discount, shipping, tax: r2(tax), total: r2(subtotal - discount + shipping + tax) };

  return (
    <CartContext.Provider value={{ items, count, totals, addToCart, increment, decrement, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);