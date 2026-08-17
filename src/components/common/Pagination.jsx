import React from 'react';

export default function Pagination({ page, pages, onPage }) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 border-t border-line text-sm select-none">
      <span
        onClick={() => page > 1 && onPage(page - 1)}
        className={`px-3 py-1.5 rounded-md border border-line text-sm ${page <= 1 ? 'text-ink cursor-default' : 'text-ink hover:bg-panel2 cursor-pointer'}`}
      >
        Prev
      </span>
      <span className="text-xs text-ink">Page {page} of {Math.max(pages, 1)}</span>
      <span
        onClick={() => page < pages && onPage(page + 1)}
        className={`px-3 py-1.5 rounded-md border border-line text-sm ${page >= pages ? 'text-ink cursor-default' : 'text-ink hover:bg-panel2 cursor-pointer'}`}
      >
        Next
      </span>
    </div>
  );
}