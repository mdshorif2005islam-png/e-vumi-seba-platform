"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // মেনু তালিকা (সেটিংস পরিবর্তন করে প্রোফাইল করা হয়েছে)
  const menuItems = [
    { name: "ড্যাশবোর্ড", href: "/dashboard", icon: "🏠" },
    { name: "আবেদনসমূহ", href: "/dashboard/applications", icon: "📄" },
    { name: "কাস্টমার", href: "/dashboard/customers", icon: "👤" },
    { name: "এজেন্ট", href: "/dashboard/agent", icon: "👥" },
    { name: "পেমেন্ট", href: "/dashboard/payment", icon: "৳" },
    { name: "সাপোর্ট", href: "/dashboard/support", icon: "💬" },
    { name: "প্রোফাইল", href: "/dashboard/profile", icon: "🛡️" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* বাম পাশের সাইডবার */}
      <aside className="w-64 bg-[#0A2920] text-white flex flex-col shrink-0 min-h-screen">
        {/* লোগো ও হেডার */}
        <div className="p-5 border-b border-emerald-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#D9A353] text-gray-900 font-black flex items-center justify-center text-xl shadow-sm">
              E
            </div>
            <div>
              <h2 className="font-bold text-lg leading-none tracking-wide text-white">
                EVUMI SEBA
              </h2>
              <p className="text-[10px] text-emerald-300 font-light mt-1">
                Professional Service Portal
              </p>
            </div>
          </div>
        </div>

        {/* সাইডবার মেনু */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="px-3 text-[10px] font-semibold text-emerald-300 uppercase tracking-wider mb-2">
            MAIN MENU
          </p>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition duration-150 ${
                  isActive
                    ? "bg-[#D9A353] text-gray-900 font-semibold shadow-sm"
                    : "text-emerald-100 hover:bg-emerald-800/60 hover:text-white"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* ডানপাশের মূল ড্যাশবোর্ড কনটেন্ট */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
