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

  // Menu List (Profile-er niche Approval Option jog kora hoyeche)
  const menuItems = [
    { name: "ড্যাশবোর্ড", href: "/dashboard", icon: "🏠" },
    { name: "আবেদনসমূহ", href: "/dashboard/applications", icon: "📄" },
    { name: "কাস্টমার", href: "/dashboard/customers", icon: "👤" },
    { name: "এজেন্ট", href: "/dashboard/agent", icon: "👥" },
    { name: "পেমেন্ট", href: "/dashboard/payment", icon: "৳" },
    { name: "সাপোর্ট", href: "/dashboard/support", icon: "💬" },
    { name: "প্রোফাইল", href: "/dashboard/profile", icon: "🛡️" },
    { name: "অনুমোদন অনুরোধ", href: "/dashboard/approvals", icon: "⏳" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Left Sidebar */}
      <aside className="w-64 bg-[#0A2920] text-white flex flex-col shrink-0 min-h-screen border-r border-emerald-900/40 shadow-xl">
        {/* Logo Section */}
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

        {/* Home Navigation Button */}
        <div className="p-4 pb-2">
          <Link
            href="/"
            className="group relative flex items-center justify-between px-4 py-2.5 rounded-xl bg-emerald-900/60 border border-emerald-500/30 text-emerald-100 font-medium text-sm transition-all duration-300 hover:bg-[#D9A353] hover:text-gray-900 hover:border-[#D9A353] hover:shadow-lg hover:-translate-y-0.5 active:scale-95 overflow-hidden"
          >
            <div className="flex items-center gap-3 relative z-10">
              <span className="text-base transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">
                🌐
              </span>
              <span className="font-semibold">ওয়েবসাইট হোম</span>
            </div>
            
            <div className="flex items-center gap-1.5 relative z-10">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 group-hover:bg-gray-900 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 group-hover:bg-gray-900"></span>
              </span>
              <span className="text-xs transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </div>
          </Link>
        </div>

        {/* Sidebar Menu Navigation */}
        <nav className="flex-1 p-4 pt-2 space-y-1 overflow-y-auto">
          <p className="px-3 text-[10px] font-semibold text-emerald-300/80 uppercase tracking-wider mb-2">
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

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
