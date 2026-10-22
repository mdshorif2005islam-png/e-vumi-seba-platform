'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Building2, LogIn, UserPlus, LogOut, LayoutDashboard } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // Check current user login status
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }

    getUser();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const navLinks = [
    { name: 'হোম', href: '/' },
    { name: 'সেবাসমূহ', href: '/#services' },
    { name: 'আবেদন ট্র্যাকিং', href: '/track' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#0A2920] flex items-center justify-center text-white shadow-md transition group-hover:scale-105">
            <Building2 size={20} />
          </div>
          <div>
            <h1 className="font-extrabold text-lg leading-none text-[#0A2920] tracking-tight">
              E-Vumi Seba
            </h1>
            <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">
              Private Land Service Assistance
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-100/80 text-[#0A2920] shadow-sm'
                    : 'text-gray-600 hover:text-[#0A2920] hover:bg-gray-100/80'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Dynamic Auth Action Buttons */}
        <div className="flex items-center gap-2.5">
          {loading ? (
            <div className="h-9 w-24 bg-gray-100 animate-pulse rounded-xl" />
          ) : user ? (
            /* Logged IN State */
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-[#0A2920] font-bold text-sm hover:bg-emerald-100 transition flex items-center gap-1.5 shadow-sm"
              >
                <LayoutDashboard size={16} />
                <span>ড্যাশবোর্ড</span>
              </Link>

              <button
                onClick={handleLogout}
                className="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 font-semibold text-sm transition flex items-center gap-1.5"
                title="লগআউট করুন"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">লগআউট</span>
              </button>
            </div>
          ) : (
            /* Logged OUT State */
            <>
              <Link
                href="/auth/login"
                className="px-4 py-2 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition flex items-center gap-1.5 shadow-sm"
              >
                <LogIn size={16} />
                <span>লগইন</span>
              </Link>
              <Link
                href="/auth/register"
                className="px-4 py-2 rounded-xl bg-[#0A2920] hover:bg-[#123b35] text-white font-semibold text-sm transition flex items-center gap-1.5 shadow-md"
              >
                <UserPlus size={16} />
                <span>রেজিস্টার</span>
              </Link>
            </>
          )}
        </div>

      </div>
    </header>
  );
}
