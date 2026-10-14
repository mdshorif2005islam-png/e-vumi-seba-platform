
"use client";

import { useMemo, useState } from "react";

type Application = {
  id: string;
  customer: string;
  service: string;
  date: string;
  status: "Pending" | "Processing" | "Completed";
};

const initialApplications: Application[] = [
  {
    id: "EV-1001",
    customer: "রহিম উদ্দিন",
    service: "জমির খতিয়ান সংক্রান্ত সেবা",
    date: "১৪ অক্টোবর ২০২৬",
    status: "Pending",
  },
  {
    id: "EV-1002",
    customer: "করিম মিয়া",
    service: "নামজারি আবেদন সহায়তা",
    date: "১৩ অক্টোবর ২০২৬",
    status: "Processing",
  },
  {
    id: "EV-1003",
    customer: "সালমা বেগম",
    service: "ভূমি রেকর্ড যাচাই",
    date: "১২ অক্টোবর ২০২৬",
    status: "Completed",
  },
  {
    id: "EV-1004",
    customer: "জাহিদ হাসান",
    service: "জমির দলিল সংক্রান্ত সেবা",
    date: "১১ অক্টোবর ২০২৬",
    status: "Pending",
  },
];

const menuItems = [
  { icon: "⌂", label: "ড্যাশবোর্ড", href: "/dashboard" },
  { icon: "▤", label: "আবেদনসমূহ", href: "/dashboard/applications" },
  { icon: "♙", label: "কাস্টমার", href: "/dashboard/admin" },
  { icon: "♧", label: "এজেন্ট", href: "/dashboard/admin" },
  { icon: "৳", label: "পেমেন্ট", href: "/dashboard/admin" },
  { icon: "▣", label: "সাপোর্ট", href: "/dashboard/support" },
  { icon: "⚙", label: "সেটিংস", href: "/dashboard/profile" },
];

function statusStyle(status: Application["status"]) {
  if (status === "Completed") {
    return "bg-emerald-50 text-emerald-700";
  }
  if (status === "Processing") {
    return "bg-blue-50 text-blue-700";
  }
  return "bg-amber-50 text-amber-700";
}

export default function DashboardPage() {
  const [applications, setApplications] =
    useState<Application[]>(initialApplications);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [mobileMenu, setMobileMenu] = useState(false);

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        `${app.id} ${app.customer} ${app.service}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || app.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [applications, search, filter]);

  const completed = applications.filter(
    (app) => app.status === "Completed"
  ).length;

  const pending = applications.filter(
    (app) => app.status === "Pending"
  ).length;

  function updateStatus(id: string, status: Application["status"]) {
    setApplications((current) =>
      current.map((app) =>
        app.id === id ? { ...app, status } : app
      )
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7f6] text-slate-800">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        {mobileMenu && (
          <button
            aria-label="Close menu"
            onClick={() => setMobileMenu(false)}
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          />
        )}

        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#123b35] text-white transition-transform duration-200 lg:static lg:translate-x-0 ${
            mobileMenu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center gap-3 border-b border-white/10 px-6 py-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d8a84e] text-xl font-black text-[#123b35]">
              E
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-wide">
                EVUMI SEBA
              </h1>
              <p className="text-xs text-emerald-100/70">
                Professional Service Portal
              </p>
            </div>
          </div>

          <div className="px-4 pt-6">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-emerald-100/50">
              Main Menu
            </p>

            <nav className="space-y-1">
              {menuItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenu(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                    index === 0
                      ? "bg-[#d8a84e] font-bold text-[#123b35]"
                      : "text-emerald-50/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="w-6 text-center text-lg">
                    {item.icon}
                  </span>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-auto p-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold">Evumi Seba Support</p>
              <p className="mt-1 text-xs leading-5 text-emerald-100/70">
                আপনার সেবার প্রয়োজনে সাপোর্ট টিমের সঙ্গে যোগাযোগ করুন।
              </p>
              <a
                href="/dashboard/support"
                className="mt-3 inline-flex text-sm font-semibold text-[#e8c477] hover:underline"
              >
                সাপোর্ট দেখুন →
              </a>
            </div>
            <p className="mt-4 text-center text-xs text-emerald-100/40">
              © 2026 Evumi Seba
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1">
          {/* Topbar */}
          <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenu(true)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-lg lg:hidden"
                aria-label="Open menu"
              >
                ☰
              </button>
              <div>
                <p className="text-xs text-slate-500">
                  Home / Dashboard
                </p>
                <h2 className="mt-1 text-lg font-bold sm:text-xl">
                  অ্যাডমিন ড্যাশবোর্ড
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                aria-label="Notifications"
                className="relative rounded-xl border border-slate-200 p-2.5 hover:bg-slate-50"
              >
                ♧
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
              </button>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e2eee8] font-bold text-[#123b35]">
                  A
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-bold">Administrator</p>
                  <p className="text-xs text-slate-500">Admin Panel</p>
                </div>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
            {/* Welcome */}
            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#123b35] to-[#246456] p-6 text-white sm:p-8">
              <div className="relative z-10 max-w-2xl">
                <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-emerald-50">
                  ADMIN CONTROL CENTER
                </span>
                <h3 className="mt-4 text-2xl font-extrabold sm:text-3xl">
                  স্বাগতম, Administrator!
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-6 text-emerald-50/80 sm:text-base">
                  Evumi Seba-এর সকল আবেদন, গ্রাহক এবং সেবার
                  কার্যক্রম এক জায়গা থেকে পরিচালনা করুন।
                </p>
                <a
                  href="/dashboard/applications"
                  className="mt-5 inline-flex items-center rounded-xl bg-[#d8a84e] px-5 py-3 text-sm font-bold text-[#123b35] transition hover:bg-[#edc774]"
                >
                  আবেদন পরিচালনা করুন →
                </a>
              </div>
              <div className="pointer-events-none absolute -right-8 -top-16 h-64 w-64 rounded-full border-[35px] border-white/5" />
              <div className="pointer-events-none absolute -bottom-24 right-24 h-52 w-52 rounded-full bg-white/5" />
            </section>

            {/* Statistics */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">সার্বিক পরিসংখ্যান</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    আপনার সেবা কার্যক্রমের সংক্ষিপ্ত চিত্র
                  </p>
                </div>
                <span className="hidden rounded-lg bg-white px-3 py-2 text-xs text-slate-500 shadow-sm sm:inline-block">
                  Overview
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  {
                    title: "মোট আবেদন",
                    value: applications.length.toLocaleString("en-US"),
                    icon: "▤",
                    color: "bg-emerald-50 text-emerald-700",
                    note: "সিস্টেমে প্রদর্শিত আবেদন",
                  },
                  {
                    title: "অপেক্ষমাণ আবেদন",
                    value: pending.toLocaleString("en-US"),
                    icon: "◷",
                    color: "bg-amber-50 text-amber-700",
                    note: "পর্যালোচনা প্রয়োজন",
                  },
                  {
                    title: "সম্পন্ন আবেদন",
                    value: completed.toLocaleString("en-US"),
                    icon: "✓",
                    color: "bg-blue-50 text-blue-700",
                    note: "সম্পন্ন হিসেবে চিহ্নিত",
                  },
                  {
                    title: "মোট কাস্টমার",
                    value: "—",
                    icon: "♙",
                    color: "bg-purple-50 text-purple-700",
                    note: "ডেটাবেস সংযুক্ত হলে দেখাবে",
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-slate-500">
                          {card.title}
                        </p>
                        <p className="mt-3 text-3xl font-extrabold tracking-tight">
                          {card.value}
                        </p>
                      </div>
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold ${card.color}`}
                      >
                        {card.icon}
                      </div>
                    </div>
                    <p className="mt-4 text-xs text-slate-400">
                      {card.note}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick actions */}
            <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                {
                  title: "আবেদন যাচাই",
                  description: "নতুন আবেদন দেখুন ও স্ট্যাটাস পরিবর্তন করুন।",
                  icon: "▤",
                  href: "/dashboard/applications",
                },
                {
                  title: "কাস্টমার ম্যানেজমেন্ট",
                  description: "গ্রাহকদের তথ্য ও সেবা কার্যক্রম পরিচালনা করুন।",
                  icon: "♙",
                  href: "/dashboard/admin",
                },
                {
                  title: "সাপোর্ট সেন্টার",
                  description: "গ্রাহকের প্রশ্ন ও সমস্যার সমাধান করুন।",
                  icon: "✉",
                  href: "/dashboard/support",
                },
              ].map((action) => (
                <a
                  key={action.title}
                  href={action.href}
                  className="group flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e9f2ee] text-xl font-bold text-[#123b35] group-hover:bg-[#123b35] group-hover:text-white">
                    {action.icon}
                  </div>
                  <div>
                    <h4 className="font-bold">{action.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {action.description}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-[#246456]">
                      বিস্তারিত দেখুন →
                    </p>
                  </div>
                </a>
              ))}
            </section>

            {/* Application table */}
            <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
              <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="text-lg font-bold">সাম্প্রতিক আবেদনসমূহ</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    আবেদন খুঁজুন, স্ট্যাটাস দেখুন এবং আপডেট করুন।
                  </p>
                </div>
                <a
                  href="/dashboard/applications"
                  className="inline-flex items-center justify-center rounded-xl bg-[#123b35] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#20584c]"
                >
                  সকল আবেদন →
                </a>
              </div>

              <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2">
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="আবেদন ID, কাস্টমার বা সেবা খুঁজুন..."
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#246456] focus:ring-2 focus:ring-emerald-100"
                />

                <select
                  value={filter}
                  onChange={(event) => setFilter(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#246456]"
                  aria-label="আবেদনের স্ট্যাটাস ফিল্টার"
                >
                  <option value="All">সকল স্ট্যাটাস</option>
                  <option value="Pending">অপেক্ষমাণ</option>
                  <option value="Processing">চলমান</option>
                  <option value="Completed">সম্পন্ন</option>
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                    <tr>
                      <th className="px-6 py-4 font-semibold">আবেদন ID</th>
                      <th className="px-6 py-4 font-semibold">কাস্টমার</th>
                      <th className="px-6 py-4 font-semibold">সেবার নাম</th>
                      <th className="px-6 py-4 font-semibold">তারিখ</th>
                      <th className="px-6 py-4 font-semibold">স্ট্যাটাস</th>
                      <th className="px-6 py-4 font-semibold">আপডেট</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredApplications.map((app) => (
                      <tr
                        key={app.id}
                        className="transition hover:bg-slate-50/80"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-bold text-[#246456]">
                          {app.id}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {app.customer}
                        </td>
                        <td className="px-6 py-4">{app.service}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-slate-500">
                          {app.date}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${statusStyle(app.status)}`}
                          >
                            {app.status === "Pending"
                              ? "অপেক্ষমাণ"
                              : app.status === "Processing"
                              ? "চলমান"
                              : "সম্পন্ন"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            aria-label={`${app.id} স্ট্যাটাস আপডেট`}
                            value={app.status}
                            onChange={(event) =>
                              updateStatus(
                                app.id,
                                event.target.value as Application["status"]
                              )
                            }
                            className="rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs outline-none focus:border-[#246456]"
                          >
                            <option value="Pending">অপেক্ষমাণ</option>
                            <option value="Processing">চলমান</option>
                            <option value="Completed">সম্পন্ন</option>
                          </select>
                        </td>
                      </tr>
                    ))}

                    {filteredApplications.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-12 text-center text-slate-500"
                        >
                          কোনো আবেদন পাওয়া যায়নি।
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="border-t border-slate-100 px-6 py-4 text-xs text-slate-500">
                মোট {filteredApplications.length}টি আবেদন দেখানো হচ্ছে।
                ডেমো ডেটা — প্রকৃত ডেটাবেস এখনো সংযুক্ত নয়।
              </div>
            </section>

            {/* Footer */}
            <footer className="flex flex-col justify-between gap-2 pb-3 text-xs text-slate-400 sm:flex-row">
              <p>© 2026 Evumi Seba. All rights reserved.</p>
              <p>Professional Land Service Management Portal</p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
