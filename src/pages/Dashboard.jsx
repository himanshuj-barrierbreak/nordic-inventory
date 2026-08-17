import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Icon from '../components/common/Icon';
import { weeklyRevenue } from '../data/mockData';
import { money, fmtDate, stockStatus, productImage } from '../utils/helpers';

export default function Dashboard() {
  const { products, orders, settings } = useAppContext();
  const navigate = useNavigate();

  const revenue = orders.filter((o) => o.payment === 'Paid').reduce((s, o) => s + o.total, 0);
  const pendingCount = orders.filter((o) => o.status === 'Pending').length;
  const lowOut = products.filter((p) => p.status === 'Low Stock' || p.status === 'Out of Stock').length;
  const lowStockList = products.filter((p) => p.stock > 0 && p.stock <= 10).sort((a, b) => a.stock - b.stock).slice(0, 6);
  const recent = [...orders].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 5);
  const maxWeek = Math.max(...weeklyRevenue.map((w) => w.value));
  const firstName = settings.profile.name.split(' ')[0];

  const stats = [
    { label: 'TOTAL PRODUCTS', value: products.length, icon: 'box', note: '+2 this week' },
    { label: 'TOTAL ORDERS', value: orders.length, icon: 'receipt', note: '+5 this week' },
    { label: 'PENDING ORDERS', value: pendingCount, icon: 'clock', note: 'awaiting fulfilment' },
    { label: 'TOTAL REVENUE', value: money(revenue), icon: 'dollar', note: '+8.2% vs last week' },
    { label: 'LOW / OUT OF STOCK', value: lowOut, icon: 'alert', note: `${lowOut} items need attention` },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <div className="text-[11px] tracking-[0.2em] text-ink mb-1">DASHBOARD</div>
          <h1 className="text-xl font-semibold">Welcome back, {firstName}.</h1>
          <p className="text-sm text-mut mt-1">Here's a snapshot of your store today.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => navigate('/orders')}>View all orders</Button>
          <Button onClick={() => navigate('/products', { state: { openAdd: true } })}>Add product</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
        {stats.map((s) => (
          <Card key={s.label} className="p-4">
            <div className="flex items-start justify-between">
              <div className="text-[10px] uppercase tracking-wider text-ink">{s.label}</div>
              <div className="w-7 h-7 rounded-md border border-line bg-panel2 flex items-center justify-center text-mut">
                <Icon name={s.icon} size={14} />
              </div>
            </div>
            <div className="text-2xl font-semibold mt-2">{s.value}</div>
            <div className="text-[11px] text-ink mt-1">{s.note}</div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mt-4">
        <Card className="lg:col-span-2 p-4">
          <div className="flex items-baseline justify-between">
            <h4 className="text-sm font-semibold">Revenue trend</h4>
            <span className="text-xs text-ink">Last 8 weeks</span>
          </div>
          <div className="relative mt-6">
            <div className="absolute inset-x-0 top-0 bottom-6 flex flex-col justify-between pointer-events-none">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="border-t border-line w-full" />
              ))}
            </div>
            <div className="relative h-48 flex items-end gap-2 md:gap-4">
              {weeklyRevenue.map((w, i) => (
                <div key={i} className="flex-1 h-full flex flex-col justify-end items-center group relative">
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 hidden group-hover:block bg-accent text-accent-ink text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap">
                    {money(w.value)}
                  </div>
                  <div
                    className="w-full max-w-9 rounded-t-sm bg-ink group-hover:bg-accent transition-colors"
                    style={{ height: `${(w.value / maxWeek) * 100}%` }}
                  />
                  <div className="text-[10px] text-ink mt-2 shrink-0">WK {i + 1}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <div className="px-4 py-3 border-b border-line flex items-baseline justify-between">
            <h4 className="text-sm font-semibold">Low stock</h4>
            <span className="text-xs text-ink">{lowStockList.length} items</span>
          </div>
          <div>
            {lowStockList.map((p) => (
              <div key={p.id} className="flex items-center gap-3 px-4 py-2.5 border-b border-line last:border-0">
                <img src={productImage(p.name, 40)} width="28" height="28" className="w-7 h-7 rounded border border-line shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-ink truncate">{p.name}</div>
                  <div className="text-[11px] text-ink">{p.stock} left in stock</div>
                </div>
                <Badge value={stockStatus(p.stock)} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-4">
        <div className="px-4 py-3 border-b border-line flex items-center justify-between">
          <h4 className="text-sm font-semibold">Recent orders</h4>
          <span onClick={() => navigate('/orders')} className="text-xs text-mut hover:text-ink cursor-pointer select-none">
            View all
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="border-b border-line bg-panel2">
                <th className="text-left px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink">Order</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink">Customer</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink">Date</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink">Status</th>
                <th className="text-right px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-ink">Total</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((o) => (
                <tr key={o.id} onClick={() => navigate('/orders')} className="border-b border-line last:border-0 hover:bg-panel2 cursor-pointer">
                  <td className="px-4 py-2.5 font-mono text-xs text-ink">{o.id}</td>
                  <td className="px-4 py-2.5 text-ink">{o.customer}</td>
                  <td className="px-4 py-2.5 text-mut">{fmtDate(o.date)}</td>
                  <td className="px-4 py-2.5"><Badge value={o.status} /></td>
                  <td className="px-4 py-2.5 text-right text-ink">{money(o.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}