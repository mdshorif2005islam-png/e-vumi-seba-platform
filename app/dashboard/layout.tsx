import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // সাইডবার মেনু আইটেমসমূহের লিস্ট
  const menuItems = [
    { name: "ড্যাশবোর্ড", href: "/dashboard", icon: "🏠" },
    { name: "আবেদনসমূহ", href: "/dashboard/applications", icon: "📄" },
    { name: "কাস্টমার", href: "/dashboard/customers", icon: "👤" },
    { name: "এজেন্ট", href: "/dashboard/agent", icon: "👥" },
    { name: "পেমেন্ট", href: "/dashboard/payment", icon: "৳" },
    { name: "সাপোর্ট", href: "/dashboard/support", icon: "💬" },
    { name: "সেটিংস", href: "/dashboard/settings", icon: "⚙️" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* বাম পাশের সাইডবার (Sidebar) */}
      <aside className="w-64 bg-[#0A2920] text-white flex flex-col shrink-0">
        {/* ব্র্যান্ডিং / লোগো সেকশন */}
        <div className="p-5 border-b border-emerald-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xl shadow-inner">
              E
            </div>
            <div>
              <h2 className="font-bold text-lg leading-none tracking-wide text-white">EVUMI SEBA</h2>
              <p className="text-[10px] text-emerald-300 font-light mt-1">Professional Service Portal</p>
            </div>
          </div>
        </div>

        {/* নেভিগেশন মেনু */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="px-3 text-[10px] font-semibold text-emerald-300 uppercase tracking-wider mb-2">
            MAIN MENU
          </p>
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-emerald-100 hover:bg-emerald-800/60 hover:text-white transition duration-150"
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* ডানপাশের মূল কনটেন্ট (Main Content) */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
