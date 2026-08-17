import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useCart } from '../context/CartContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import SearchInput from '../components/common/SearchInput';
import Dropdown from '../components/common/Dropdown';
import Pagination from '../components/common/Pagination';
import EmptyState from '../components/common/EmptyState';
import ProductTable from '../components/tables/ProductTable';
import ProductDialog from '../components/dialogs/ProductDialog';
import DeleteProductDialog from '../components/dialogs/DeleteProductDialog';
import ViewProductDialog from '../components/dialogs/ViewProductDialog';
import { CATEGORIES } from '../data/mockData';
import { stockStatus } from '../utils/helpers';

const PER_PAGE = 8;

export default function Products() {
  const location = useLocation();
  const { products, deleteProduct, notify } = useAppContext();
  const { addToCart } = useCart();

  const [query, setQuery] = useState(location.state?.query || '');
  const [category, setCategory] = useState('All categories');
  const [stockFilter, setStockFilter] = useState('All statuses');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null); // { type: 'form' | 'view' | 'delete', product }

  useEffect(() => {
    if (location.state?.openAdd) setModal({ type: 'form', product: null });
  }, [location.state]);

  useEffect(() => setPage(1), [query, category, stockFilter]);

  const filtered = useMemo(
    () =>
      products.filter((p) => {
        const q = query.trim().toLowerCase();
        if (q && !(p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q))) return false;
        if (!category.startsWith('All') && p.category !== category) return false;
        if (!stockFilter.startsWith('All') && stockStatus(p.stock) !== stockFilter) return false;
        return true;
      }),
    [products, query, category, stockFilter]
  );

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, pages);
  const paged = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <div className="text-[11px] tracking-[0.2em] text-ink mb-1">PRODUCTS</div>
          <h1 className="text-xl font-semibold">Inventory</h1>
          <p className="text-sm text-mut mt-1">Manage products, categories, and stock levels.</p>
        </div>
        <Button onClick={() => setModal({ type: 'form', product: null })}>
          + Add product
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <SearchInput className="flex-1" value={query} onChange={setQuery} placeholder="Search by name or SKU" />
        <Dropdown className="md:w-48" value={category} onChange={setCategory} options={['All categories', ...CATEGORIES]} />
        <Dropdown className="md:w-48" value={stockFilter} onChange={setStockFilter} options={['All statuses', 'In Stock', 'Low Stock', 'Out of Stock']} />
      </div>

      <Card>
        {filtered.length === 0 ? (
          <EmptyState icon="search" title="No products found" subtitle="Try adjusting your search or filters." />
        ) : (
          <>
            <ProductTable
              products={paged}
              onView={(p) => setModal({ type: 'view', product: p })}
              onEdit={(p) => setModal({ type: 'form', product: p })}
              onDelete={(p) => setModal({ type: 'delete', product: p })}
              onAddToCart={(p) => {
                addToCart(p.id);
                notify('success', 'Added to cart.');
              }}
            />
            <Pagination page={safePage} pages={pages} onPage={setPage} />
          </>
        )}
      </Card>

      <div className="text-[11px] text-ink mt-3">{filtered.length} products</div>

      <ProductDialog open={modal?.type === 'form'} product={modal?.product || null} onClose={() => setModal(null)} />
      <ViewProductDialog open={modal?.type === 'view'} product={modal?.product || null} onClose={() => setModal(null)} />
      <DeleteProductDialog
        open={modal?.type === 'delete'}
        product={modal?.product || null}
        onClose={() => setModal(null)}
        onConfirm={() => {
          deleteProduct(modal.product.id);
          notify('info', 'Product deleted.');
        }}
      />
    </div>
  );
}