import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { seedProducts, seedOrders, seedCustomers } from '../data/mockData';
import { loadLS, saveLS } from '../utils/helpers';

const AppContext = createContext(null);

/* Bumped from v1 so previously saved settings (old profile name) are ignored */
const SETTINGS_KEY = 'na_settings_v2';

const defaultSettings = {
  profile: { name: 'BB Admin', email: 'bbadmin@nordicadmin.co', phone: '+1 555 0100' },
  store: { name: 'Nordic Supply Co.', currency: 'USD ($)', timezone: '(GMT+01:00) Oslo' },
  notifications: { email: true, orders: true, lowStock: false },
  theme: 'dark',
};

export function AppProvider({ children }) {
  const [products, setProducts] = useState(() => loadLS('na_products_v1', seedProducts));
  const [orders, setOrders] = useState(() => loadLS('na_orders_v1', seedOrders));
  const [settings, setSettings] = useState(() => ({ ...defaultSettings, ...loadLS(SETTINGS_KEY, {}) }));
  const [toasts, setToasts] = useState([]);

  useEffect(() => saveLS('na_products_v1', products), [products]);
  useEffect(() => saveLS('na_orders_v1', orders), [orders]);
  useEffect(() => saveLS(SETTINGS_KEY, settings), [settings]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const apply = () => {
      const t = settings.theme;
      document.documentElement.dataset.theme = t === 'system' ? (mq.matches ? 'light' : 'dark') : t;
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [settings.theme]);

  const notify = useCallback((type, message) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, type, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200);
  }, []);

  const dismissToast = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  const addProduct = (p) => setProducts((list) => [p, ...list]);
  const updateProduct = (p) => setProducts((list) => list.map((x) => (x.id === p.id ? p : x)));
  const deleteProduct = (id) => setProducts((list) => list.filter((x) => x.id !== id));

  const addOrder = (o) => setOrders((list) => [o, ...list]);
  const updateOrderStatus = (id, status) => setOrders((list) => list.map((o) => (o.id === id ? { ...o, status } : o)));

  const saveSettings = (patch) => setSettings((s) => ({ ...s, ...patch }));
  const setTheme = (theme) => setSettings((s) => ({ ...s, theme }));

  return (
    <AppContext.Provider
      value={{
        products, orders, customers: seedCustomers, settings, toasts,
        notify, dismissToast,
        addProduct, updateProduct, deleteProduct,
        addOrder, updateOrderStatus,
        saveSettings, setTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);