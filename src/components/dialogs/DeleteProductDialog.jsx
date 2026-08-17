import React from 'react';
import Dialog from './Dialog';
import Button from '../common/Button';

export default function DeleteProductDialog({ open, onClose, product, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose} width="max-w-sm">
      <div className="p-5">
        <h5 className="text-base font-semibold text-ink">Delete product?</h5>
        <p className="text-sm text-mut mt-2">Are you sure you want to delete this product?</p>
        <p className="text-xs text-ink mt-1">This action cannot be undone.</p>
        <div className="flex justify-end gap-2 mt-5">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </Dialog>
  );
}