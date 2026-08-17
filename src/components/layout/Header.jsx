import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { useClickOutside } from '../../hooks/useClickOutside';
import Icon from '../common/Icon';

const NOTIFICATIONS = [
  { t: 'New order ORD-1055 placed', d: 'Lena Fischer · 12 minutes ago' },
  { t: 'Low stock: Nordic Linen Shirt', d: '6 units remaining' },
  { t: 'Payment received $351.62', d: 'ORD-1052 · paid via card' },
];

export default function Header({ onMenu }) {
  const { settings, products, orders, customers, notify, setTheme } = useAppContext();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const searchRef = useRef(null);
  const bellRef = useRef(null);
  const profileRef = useRef(null);
  useClickOutside(searchRef, () => setSearchOpen(false));
  useClickOutside(bellRef, () => setBellOpen(false));
  useClickOutside(profileRef, () => setProfileOpen(false));

  const q = query.trim().toLowerCase();
  const results = q
    ? {
        products: products.filter((p) => (p.name + ' ' + p.sku).toLowerCase().includes(q)).slice(0, 4),
        orders: orders.filter((o) => (o.id + ' ' + o.customer).toLowerCase().includes(q)).slice(0, 4),
        customers: customers.filter((c) => (c.name + ' ' + c.email).toLowerCase().includes(q)).slice(0, 4),
      }
    : null;

  const go = (path, state) => {
    navigate(path, state ? { state } : undefined);
    setQuery('');
    setSearchOpen(false);
    setBellOpen(false);
    setProfileOpen(false);
  };

  const initials = settings.profile.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const noResults = results && !results.products.length && !results.orders.length && !results.customers.length;

  return (
    <header className="sticky top-0 z-40 bg-bg border-b border-line">
      <div className="flex items-center gap-2 md:gap-3 h-14 px-4 md:px-6">
        <button onClick={onMenu} className="lg:hidden p-2 -ml-1 text-mut hover:text-ink">
          <Icon name="menu" size={18} />
        </button>
        <div className="lg:hidden w-6 h-6 rounded bg-accent text-accent-ink flex items-center justify-center text-[11px] font-bold shrink-0">
          N
        </div>

        <div ref={searchRef} className="relative flex-1 max-w-xl">
          <Icon name="search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink pointer-events-none" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSearchOpen(true);
            }}
            onFocus={() => q && setSearchOpen(true)}
            placeholder="Search products, orders, customers..."
            className="w-full bg-panel2 border border-line hover:border-line2 rounded-md pl-9 pr-3 py-2 text-sm text-ink"
          />
          {searchOpen && results && (
            <div className="absolute left-0 right-0 mt-1 bg-panel border border-line2 rounded-md shadow-2xl max-h-96 overflow-auto py-1 z-50">
              {noResults && <div className="px-3 py-3 text-sm text-ink">No matches found.</div>}

              {results.products.length > 0 && (
                <div>
                  <div className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-wider text-ink">Products</div>
                  {results.products.map((p) => (
                    <div
                      key={p.id}
                      onMouseDown={() => go('/products', { query: p.name })}
                      className="px-3 py-1.5 text-sm text-mut hover:bg-panel2 hover:text-ink cursor-pointer flex justify-between gap-2"
                    >
                      <span className="truncate">{p.name}</span>
                      <span className="text-ink text-xs shrink-0">{p.sku}</span>
                    </div>
                  ))}
                </div>
              )}

              {results.orders.length > 0 && (
                <div>
                  <div className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-wider text-ink">Orders</div>
                  {results.orders.map((o) => (
                    <div
                      key={o.id}
                      onMouseDown={() => go('/orders', { query: o.id })}
                      className="px-3 py-1.5 text-sm text-mut hover:bg-panel2 hover:text-ink cursor-pointer flex justify-between gap-2"
                    >
                      <span className="font-mono text-xs">{o.id}</span>
                      <span className="text-ink text-xs truncate">{o.customer}</span>
                    </div>
                  ))}
                </div>
              )}

              {results.customers.length > 0 && (
                <div>
                  <div className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-wider text-ink">Customers</div>
                  {results.customers.map((c) => (
                    <div
                      key={c.id}
                      onMouseDown={() => go('/customers', { query: c.name })}
                      className="px-3 py-1.5 text-sm text-mut hover:bg-panel2 hover:text-ink cursor-pointer flex justify-between gap-2"
                    >
                      <span className="truncate">{c.name}</span>
                      <span className="text-ink text-xs truncate">{c.email}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="ml-auto flex items-center gap-1 md:gap-2">
          <button
            onClick={() => setTheme(settings.theme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-mut hover:text-ink rounded-md hover:bg-panel2"
          >
            <Icon name={settings.theme === 'light' ? 'sun' : 'moon'} size={17} />
          </button>

          <div ref={bellRef} className="relative">
            <button onClick={() => setBellOpen((o) => !o)} className="relative p-2 text-mut hover:text-ink rounded-md hover:bg-panel2">
              <Icon name="bell" size={17} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-accent" />
            </button>
            {bellOpen && (
              <div className="absolute right-0 mt-1 w-72 bg-panel border border-line2 rounded-md shadow-2xl z-50">
                <div className="px-3 py-2 border-b border-line text-[10px] font-medium text-ink uppercase tracking-wider">
                  Notifications
                </div>
                {NOTIFICATIONS.map((n, i) => (
                  <div key={i} className="px-3 py-2.5 border-b border-line cursor-pointer hover:bg-panel2">
                    <div className="text-sm text-ink">{n.t}</div>
                    <div className="text-[11px] text-ink mt-0.5">{n.d}</div>
                  </div>
                ))}
                <div
                  onMouseDown={() => {
                    setBellOpen(false);
                    notify('info', 'All notifications marked as read.');
                  }}
                  className="px-3 py-2 text-center text-xs text-ink hover:text-ink cursor-pointer"
                >
                  Mark all read
                </div>
              </div>
            )}
          </div>

          <div ref={profileRef} className="relative">
            <button onClick={() => setProfileOpen((o) => !o)} className="flex items-center gap-2 pl-1 md:pl-2 pr-1 py-1 rounded-md hover:bg-panel2">
              <span className="w-7 h-7 rounded-full bg-accent text-accent-ink text-[11px] font-semibold flex items-center justify-center">
                {initials}
              </span>
              <span className="hidden md:block text-sm text-mut">{settings.profile.name}</span>
              <Icon name="chevronDown" size={13} className="text-ink hidden md:block" />
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-panel border border-line2 rounded-md shadow-2xl py-1 z-50">
                <div onMouseDown={() => go('/settings')} className="px-3 py-2 text-sm text-mut hover:bg-panel2 hover:text-ink cursor-pointer flex items-center gap-2">
                  <Icon name="user" size={14} /> Profile
                </div>
                <div onMouseDown={() => go('/settings')} className="px-3 py-2 text-sm text-mut hover:bg-panel2 hover:text-ink cursor-pointer flex items-center gap-2">
                  <Icon name="sliders" size={14} /> Account settings
                </div>
                <div className="my-1 border-t border-line" />
                <div
                  onMouseDown={() => {
                    setProfileOpen(false);
                    notify('info', 'Signed out. Just kidding — this is a demo.');
                  }}
                  className="px-3 py-2 text-sm text-mut hover:bg-panel2 hover:text-ink cursor-pointer flex items-center gap-2"
                >
                  <Icon name="logout" size={14} /> Sign out
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}