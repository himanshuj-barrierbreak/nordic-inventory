import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '../common/Icon';
import { useCart } from '../../context/CartContext';

const NAV = [
  { to: '/dashboard', label: 'Dashboard', icon: 'grid' },
  { to: '/products', label: 'Products', icon: 'box' },
  { to: '/orders', label: 'Orders', icon: 'receipt' },
  { to: '/cart', label: 'Cart', icon: 'cart' },
  { to: '/customers', label: 'Customers', icon: 'users' },
  { to: '/settings', label: 'Settings', icon: 'sliders' },
];

function SidebarContent({ onClose }) {
  const { count } = useCart();
  const [tipsOpen, setTipsOpen] = useState(true);

  return (
    <div className="flex flex-col h-full">
      <div className="h-14 flex items-center gap-2.5 px-4 border-b border-line shrink-0">
        <div className="w-7 h-7 rounded-md bg-accent text-accent-ink flex items-center justify-center font-bold text-sm">N</div>
        <div>
          <div className="text-sm font-semibold leading-none">Nordic</div>
          <div className="text-[10px] text-ink mt-0.5">Inventory &amp; Orders</div>
        </div>
        {onClose && (
          <button onClick={onClose} className="ml-auto p-1.5 text-ink hover:text-ink lg:hidden">
            <Icon name="close" size={16} />
          </button>
        )}
      </div>

      <div className="px-4 pt-4 pb-1 text-[10px] uppercase tracking-widest text-ink">Menu</div>
      <nav className="px-3 space-y-0.5">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive ? 'bg-accent text-accent-ink font-medium' : 'text-mut hover:text-ink hover:bg-panel2'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon name={item.icon} size={16} />
                {item.label}
                {item.label === 'Cart' && count > 0 && (
                  <span
                    className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-black/20 text-accent-ink' : 'bg-line2 text-ink'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto">
        <div className="mx-3 mb-2 border border-line rounded-lg bg-panel2">
          <div
            className="flex items-center justify-between px-3 py-2 cursor-pointer select-none"
            onClick={() => setTipsOpen((o) => !o)}
          >
            <span className="text-xs font-medium text-mut">Storefront tips</span>
            <Icon name="chevronDown" size={13} className={`text-ink transition-transform ${tipsOpen ? 'rotate-180' : ''}`} />
          </div>
          {tipsOpen && (
            <div className="px-3 pb-3 text-[11px] text-ink space-y-1">
              <p>Use Tab to navigate by...</p>
              <p>Esc to close menus.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Sidebar({ mobileOpen, onClose }) {
  return (
    <>
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-60 flex-col bg-panel border-r border-line z-30">
        <SidebarContent />
      </aside>

      {mobileOpen && <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-panel border-r border-line2 z-50 lg:hidden flex flex-col transition-transform ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent onClose={onClose} />
      </aside>
    </>
  );
}