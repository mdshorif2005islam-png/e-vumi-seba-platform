"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "হোম", href: "/" },
    { name: "সেবাসমূহ", href: "/#services" },
    { name: "আবেদন ট্র্যাকিং", href: "/track" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left / Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-[#0A2920] flex items-center justify-center text-white text-xl shadow-md transition group-hover:scale-105">
            🏛️
          </div>
          <div>
            <h1 className="font-extrabold text-xl leading-none text-[#0A2920] tracking-tight">
              E-Vumi Seba
            </h1>
            <p className="text-[10px] text-emerald-700 font-medium mt-0.5">
              Private Land Service Assistance
            </p>
          </div>
        </Link>

        {/* Center / Navigation Links */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-emerald-100/80 text-[#0A2920] shadow-sm"
                    : "text-gray-700 hover:text-[#0A2920] hover:bg-gray-100/80"
                }`}
              >
                {link.name === "আবেদন ট্র্যাকিং" && <span className="mr-1.5">🔍</span>}
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right / Auth Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition flex items-center gap-2 shadow-sm"
          >
            <span>➔]</span> লগইন
          </Link>
          <Link
            href="/auth/register"
            className="px-5 py-2.5 rounded-xl bg-[#0A2920] hover:bg-[#123b35] text-white font-semibold text-sm transition flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <span>👤+</span> রেজিস্টার
          </Link>
        </div>

      </div>
    </header>
  );
}
