import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAppContext } from '../context/AppContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Icon from '../components/common/Icon';
import EmptyState from '../components/common/EmptyState';
import CheckoutDialog from '../components/dialogs/CheckoutDialog';
import { money, productImage } from '../utils/helpers';

export default function Cart() {
  const { items, count, totals, increment, decrement, removeItem } = useCart();
  const { notify } = useAppContext();
  const navigate = useNavigate();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <div>
      <div className="mb-6">
        <div className="text-[11px] tracking-[0.2em] text-ink mb-1">CART</div>
        <h1 className="text-xl font-semibold">Shopping cart</h1>
        <p className="text-sm text-mut mt-1">Review and manage items before checkout.</p>
      </div>

      {items.length === 0 ? (
        <Card>
          <EmptyState icon="cart" title="Your cart is empty" subtitle="Add products from the catalog to see them here.">
            <Button onClick={() => navigate('/products')}>Browse products</Button>
          </EmptyState>
        </Card>
      ) : (
        <div className="flex flex-col lg:flex-row gap-4 items-start">
          <Card className="flex-1 w-full">
            <div className="px-4 py-3 border-b border-line flex justify-between items-center">
              <h4 className="text-sm font-semibold">Cart items</h4>
              <span className="text-xs text-ink">{count} item{count === 1 ? '' : 's'}</span>
            </div>
            {items.map((i) => (
              <div key={i.productId} className="flex flex-wrap items-center gap-3 px-4 py-3 border-b border-line last:border-0">
                <img src={productImage(i.product.name, 64)} width="48" height="48" className="w-12 h-12 rounded-md border border-line shrink-0" />
                <div className="flex-1 min-w-[140px]">
                  <div className="text-sm text-ink">{i.product.name}</div>
                  <div className="text-[11px] text-ink font-mono">{i.product.sku}</div>
                </div>
                <div className="text-sm text-mut w-20">{money(i.product.price)}</div>
                <div className="flex items-center border border-line rounded-md">
                  <button onClick={() => decrement(i.productId)} className="px-2 py-1.5 text-mut hover:text-ink">
                    <Icon name="minus" size={12} />
                  </button>
                  <span className="w-8 text-center text-sm text-ink">{i.qty}</span>
                  <button onClick={() => increment(i.productId)} className="px-2 py-1.5 text-mut hover:text-ink">
                    <Icon name="plus" size={12} />
                  </button>
                </div>
                <div className="text-sm text-ink font-medium w-20 text-right">{money(i.product.price * i.qty)}</div>
                <button
                  onClick={() => {
                    removeItem(i.productId);
                    notify('info', 'Item removed from cart.');
                  }}
                  className="p-1.5 text-ink hover:text-ink"
                >
                  <Icon name="trash" size={14} />
                </button>
              </div>
            ))}
          </Card>

          <Card className="w-full lg:w-[360px] shrink-0 p-4">
            <h4 className="text-sm font-semibold mb-3">Order summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-mut"><span>Subtotal</span><span>{money(totals.subtotal)}</span></div>
              <div className="flex justify-between text-mut"><span>Discount</span><span>−{money(totals.discount)}</span></div>
              <div className="flex justify-between text-mut"><span>Shipping</span><span>{totals.shipping === 0 ? 'Free' : money(totals.shipping)}</span></div>
              <div className="flex justify-between text-mut"><span>Tax</span><span>{money(totals.tax)}</span></div>
              <div className="border-t border-line pt-2 flex justify-between text-base font-semibold text-ink">
                <span>Total</span>
                <span>{money(totals.total)}</span>
              </div>
            </div>
            <Button className="w-full mt-4" onClick={() => setCheckoutOpen(true)}>Proceed to checkout</Button>
            <Button variant="secondary" className="w-full mt-2" onClick={() => navigate('/products')}>Continue shopping</Button>
          </Card>
        </div>
      )}

      <CheckoutDialog open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </div>
  );
}