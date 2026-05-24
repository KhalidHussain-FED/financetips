import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { base44 } from '@/api/base44Client';

export default function BlogLayout() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    base44.auth.me().then(user => {
      if (user?.role === 'admin') setIsAdmin(true);
    }).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAdmin={isAdmin} />
      <main className="flex-1">
        <Outlet context={{ isAdmin }} />
      </main>
      <Footer isAdmin={isAdmin} />
    </div>
  );
}