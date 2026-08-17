import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Card from '../components/common/Card';
import SearchInput from '../components/common/SearchInput';
import Dropdown from '../components/common/Dropdown';
import Pagination from '../components/common/Pagination';
import EmptyState from '../components/common/EmptyState';
import Icon from '../components/common/Icon';
import OrderTable from '../components/tables/OrderTable';
import OrderDialog from '../components/dialogs/OrderDialog';
import { ORDER_STATUSES } from '../data/mockData';

const PER_PAGE = 8;

export default function Orders() {
  const location = useLocation();
  const { orders } = useAppContext();

  const [query, setQuery] = useState(location.state?.query || '');
  const [status, setStatus] = useState('All statuses');
  const [date, setDate] = useState('');
  const [page, setPage] = useState(1);
  const [viewId, setViewId] = useState(null);

  useEffect(() => setPage(1), [query, status, date]);

  const filtered = useMemo(
    () =>
      orders.filter((o) => {
        const q = query.trim().toLowerCase();
        if (q && !(o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q))) return false;
        if (!status.startsWith('All') && o.status !== status) return false;
        if (date && o.date !== date) return false;
        return true;
      }),
    [orders, query, status, date]
  );

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, pages);
  const paged = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);
  const viewOrder = orders.find((o) => o.id === viewId) || null;

  return (
    <div>
      <div className="mb-6">
        <div className="text-[11px] tracking-[0.2em] text-ink mb-1">ORDERS</div>
        <h1 className="text-xl font-semibold">All orders</h1>
        <p className="text-sm text-mut mt-1">Search, filter, and manage customer orders.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-2 mb-4 md:items-end">
        <SearchInput className="flex-1" value={query} onChange={setQuery} placeholder="Search by order ID or customer" />
        <Dropdown className="md:w-44" value={status} onChange={setStatus} options={['All statuses', ...ORDER_STATUSES]} />
        <div className="md:w-48">
          <div className="text-[10px] uppercase tracking-wider text-ink mb-1">mm/dd/yyyy</div>
          <div className="flex gap-1">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="flex-1 bg-panel2 border border-line hover:border-line2 rounded-md px-2.5 py-2 text-sm text-ink min-w-0"
            />
            {date && (
              <button onClick={() => setDate('')} className="px-2 border border-line rounded-md text-ink hover:text-ink">
                <Icon name="close" size={13} />
              </button>
            )}
          </div>
        </div>
      </div>

      <Card>
        {filtered.length === 0 ? (
          <EmptyState icon="receipt" title="No orders found" subtitle="Try adjusting your search or filters." />
        ) : (
          <>
            <OrderTable orders={paged} onView={(o) => setViewId(o.id)} />
            <Pagination page={safePage} pages={pages} onPage={setPage} />
          </>
        )}
      </Card>

      <OrderDialog open={!!viewOrder} order={viewOrder} onClose={() => setViewId(null)} />
    </div>
  );
}