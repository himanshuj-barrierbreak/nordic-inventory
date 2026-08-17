import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="text-xs text-ink">© 2026 Nordic Admin Co.</span>
        <div className="flex items-center gap-4 text-xs text-ink">
          <a href="#" className="hover:text-mut">Help</a>
          <a href="#" className="hover:text-mut">Privacy</a>
          <a href="#" className="hover:text-mut">Terms</a>
        </div>
      </div>
    </footer>
  );
}