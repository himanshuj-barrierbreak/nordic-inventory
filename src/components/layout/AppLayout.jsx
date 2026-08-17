import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

export default function AppLayout() {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div className="min-h-screen bg-bg">
      <Sidebar mobileOpen={mobileNav} onClose={() => setMobileNav(false)} />
      <div className="lg:pl-60 flex flex-col min-h-screen">
        <Header onMenu={() => setMobileNav(true)} />
        <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-6 py-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}