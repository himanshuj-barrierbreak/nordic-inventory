import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Card from '../components/common/Card';
import SearchInput from '../components/common/SearchInput';
import Dropdown from '../components/common/Dropdown';
import EmptyState from '../components/common/EmptyState';
import CustomerTable from '../components/tables/CustomerTable';
import CustomerDialog from '../components/dialogs/CustomerDialog';

const ORDER_FILTERS = ['Any orders', 'No orders', '1+ orders', '2+ orders'];

export default function Customers() {
  const location = useLocation();
  const { customers, orders } = useAppContext();

  const [query, setQuery] = useState(location.state?.query || '');
  const [status, setStatus] = useState('All statuses');
  const [orderFilter, setOrderFilter] = useState('Any orders');
  const [viewId, setViewId] = useState(null);

  useEffect(() => {
    if (location.state?.query) {
      setQuery(location.state.query);
    }
  }, [location.state]);

  const rows = useMemo(
    () =>
      customers.map((c) => {
        const theirOrders = orders.filter((o) => o.customer === c.name);
        const spent = theirOrders.filter((o) => o.status !== 'Cancelled').reduce((s, o) => s + o.total, 0);
        return { ...c, orderCount: theirOrders.length, spent };
      }),
    [customers, orders]
  );

  const filtered = rows.filter((c) => {
    const q = query.trim().toLowerCase();
    if (q && !(c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q))) return false;
    if (!status.startsWith('All') && c.status !== status) return false;
    if (orderFilter === 'No orders' && c.orderCount !== 0) return false;
    if (orderFilter === '1+ orders' && c.orderCount < 1) return false;
    if (orderFilter === '2+ orders' && c.orderCount < 2) return false;
    return true;
  });

  const viewCustomer = rows.find((c) => c.id === viewId) || null;

  return (
    <div>
      <div className="mb-6">
        <div className="text-[11px] tracking-[0.2em] text-ink mb-1">CUSTOMERS</div>
        <h1 className="text-xl font-semibold">Customers</h1>
        <p className="text-sm text-mut mt-1">Manage customer information and order history.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <SearchInput className="flex-1" value={query} onChange={setQuery} placeholder="Search customers" />
        <Dropdown className="md:w-44" value={status} onChange={setStatus} options={['All statuses', 'Active', 'Inactive']} />
        <Dropdown className="md:w-44" value={orderFilter} onChange={setOrderFilter} options={ORDER_FILTERS} />
      </div>

      <Card>
        {filtered.length === 0 ? (
          <EmptyState icon="users" title="No customers found" subtitle="Try adjusting your search or filters." />
        ) : (
          <CustomerTable rows={filtered} onView={(c) => setViewId(c.id)} />
        )}
      </Card>

      <CustomerDialog open={!!viewCustomer} customer={viewCustomer} onClose={() => setViewId(null)} />
    </div>
  );
}