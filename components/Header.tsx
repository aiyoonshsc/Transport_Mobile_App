
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg z-50">
      <div className="max-w-sm mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-['Pacifico'] text-lg font-bold">
            운송관리 ✨
          </Link>
          
          {isLoggedIn ? (
            <div className="flex items-center space-x-1">
              <Link href="/dashboard" className="p-2 hover:bg-white/20 rounded-xl transition-colors">
                <i className="ri-dashboard-line text-lg"></i>
              </Link>
              <Link href="/jiip" className="p-2 hover:bg-white/20 rounded-xl transition-colors">
                <i className="ri-building-line text-lg"></i>
              </Link>
              <Link href="/vehicles" className="p-2 hover:bg-white/20 rounded-xl transition-colors">
                <i className="ri-truck-line text-lg"></i>
              </Link>
              <Link href="/orders" className="p-2 hover:bg-white/20 rounded-xl transition-colors">
                <i className="ri-file-list-3-line text-lg"></i>
              </Link>
              <button className="p-2 hover:bg-white/20 rounded-xl transition-colors">
                <i className="ri-logout-box-line text-lg"></i>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/login" className="text-sm hover:text-blue-200">로그인</Link>
              <Link href="/register" className="bg-white/20 px-3 py-1.5 !rounded-button hover:bg-white/30 text-sm">
                가입
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
