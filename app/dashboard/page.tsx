
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  CheckCircle2,
  Clock3,
  FileCheck2,
  FileText,
  Headset,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Status = "Pending" | "Processing" | "Completed";

type Application = {
  id: string;
  customer: string;
  service: string;
  date: string;
  status: Status;
};

const initialApplications: Application[] = [
  {
    id: "EV-1001",
    customer: "রহিম উদ্দিন",
    service: "জমির খতিয়ান সংক্রান্ত সেবা",
    date: "১৪ অক্টোবর ২০২৬",
    status: "Pending",
  },
  {
    id: "EV-1002",
    customer: "করিম মিয়া",
    service: "নামজারি আবেদন সহায়তা",
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

const statusLabels: Record<Status, string> = {
  Pending: "অপেক্ষমাণ",
  Processing: "চলমান",
  Completed: "সম্পন্ন",
};

function statusStyle(status: Status) {
  switch (status) {
    case "Completed":
      return "bg-emerald-50 text-emerald-700 ring-emerald-600/10";
    case "Processing":
      return "bg-blue-50 text-blue-700 ring-blue-600/10";
    default:
      return "bg-amber-50 text-amber-700 ring-amber-600/10";
  }
}

export default function DashboardPage() {
  const router = useRouter();

  // একই client instance ব্যবহার করা হচ্ছে, যাতে effect বারবার না চলে।
  const supabase = useMemo(() => createClient(), []);

  const [applications, setApplications] =
    useState<Application[]>(initialApplications);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [name, setName] = useState("ব্যবহারকারী");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadUser() {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (!active) return;

        if (error || !data.user) {
          router.replace("/login");
          return;
        }

        const user = data.user;
        const fullName = user.user_metadata?.full_name;

        setName(
          typeof fullName === "string" && fullName.trim()
            ? fullName
            : "ব্যবহারকারী"
        );
        setEmail(user.email || "");
        setLoading(false);
      } catch {
        if (active) {
          setError("অ্যাকাউন্ট যাচাই করা যায়নি। আবার চেষ্টা করো।");
          setLoading(false);
        }
      }
    }

    loadUser();

    return () => {
      active = false;
    };
  }, [router, supabase]);

  const filteredApplications = useMemo(() => {
    const query = search.trim().toLowerCase();

    return applications.filter((app) => {
      const matchesSearch =
        `${app.id} ${app.customer} ${app.service}`
          .toLowerCase()
          .includes(query);

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

  const processing = applications.filter(
    (app) => app.status === "Processing"
  ).length;

  function updateStatus(id: string, status: Status) {
    setApplications((current) =>
      current.map((app) =>
        app.id === id ? { ...app, status } : app
      )
    );
  }

  async function handleLogout() {
    if (loggingOut) return;

    setLoggingOut(true);
    setError("");

    const { error } = await supabase.auth.signOut();

    if (error) {
      setError("লগআউট করা যায়নি। আবার চেষ্টা করো।");
      setLoggingOut(false);
      return;
    }

    router.replace("/login");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 h-11 w-11 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-700" />
          <p className="font-semibold text-slate-700">
            তোমার অ্যাকাউন্ট যাচাই হচ্ছে...
          </p>
        </div>
      </main>
    );
  }

  const navigation = [
    {
      label: "ড্যাশবোর্ড",
      href: "/dashboard",
      icon: LayoutDashboard,
      active: true,
    },
    {
      label: "আবেদন পরিচালনা",
      href: "/dashboard/applications",
      icon: FileCheck2,
      active: false,
    },
    {
      label: "কাস্টমার ম্যানেজমেন্ট",
      href: "/dashboard/customers",
      icon: Users,
      active: false,
    },
    {
      label: "সাপোর্ট সেন্টার",
      href: "/dashboard/support",
      icon: Headset,
      active: false,
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f7f6] text-slate-800">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          mobileMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-800 text-white shadow-lg shadow-emerald-900/15">
              <ShieldCheck size={25} />
            </div>
            <div>
              <p className="text-lg font-extrabold tracking-tight text-emerald-950">
                E-Vumi Seba
              </p>
              <p className="text-[11px] font-medium text-slate-500">
                DIGITAL LAND SERVICES
              </p>
            </div>
          </Link>

          <button
            onClick={() => setMobileMenu(false)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="মেনু বন্ধ করুন"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-4 py-6">
          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
            প্রধান মেনু
          </p>

          <nav className="space-y-1.5">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenu(false)}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                    item.active
                      ? "bg-emerald-800 text-white shadow-md shadow-emerald-900/10"
                      : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
                  }`}
                >
                  <Icon size={19} />
                  <span>{item.label}</span>
                  {item.active && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-200" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-4">
          <div className="rounded-2xl bg-emerald-950 p-4 text-white">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <Headset size={21} />
            </div>
            <p className="font-bold">সহায়তা প্রয়োজন?</p>
            <p className="mt-1 text-xs leading-5 text-emerald-100/75">
              ভূমিসেবা ব্যবহার করতে সমস্যা হলে সাপোর্ট সেন্টারে যাও।
            </p>
            <Link
              href="/dashboard/support"
              className="mt-4 flex items-center justify-between rounded-lg bg-white/10 px-3 py-2.5 text-xs font-bold hover:bg-white/20"
            >
              সাপোর্ট সেন্টার
              <ArrowRight size={15} />
            </Link>
          </div>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="mt-4 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 disabled:opacity-50"
          >
            <LogOut size={19} />
            {loggingOut ? "লগআউট হচ্ছে..." : "লগআউট করুন"}
          </button>
        </div>
      </aside>

      {/* Mobile backdrop */}
      {mobileMenu && (
        <button
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
          onClick={() => setMobileMenu(false)}
          aria-label="মেনু বন্ধ করুন"
        />
      )}

      {/* Main area */}
      <div className="min-w-0 lg:pl-72">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenu(true)}
              className="rounded-xl border border-slate-200 p-2.5 text-slate-700 lg:hidden"
              aria-label="মেনু খুলুন"
            >
              <Menu size={21} />
            </button>

            <div>
              <p className="text-sm font-bold text-slate-800">
                প্রশাসনিক ড্যাশবোর্ড
              </p>
              <p className="hidden text-xs text-slate-500 sm:block">
                E-Vumi Seba Management Portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="max-w-44 truncate text-sm font-bold text-slate-800">
                {name}
              </p>
              <p className="max-w-44 truncate text-xs text-slate-500">
                {email}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-800 ring-2 ring-white">
              {name.charAt(0)}
            </div>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="hidden items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 sm:flex"
              title="লগআউট"
            >
              <LogOut size={16} />
              লগআউট
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-[1600px] space-y-7 p-4 sm:p-6 lg:p-8">
          {error && (
            <div
              role="alert"
              className="flex items-center justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700"
            >
              {error}
              <button
                onClick={() => setError("")}
                aria-label="বার্তা বন্ধ করুন"
              >
                <X size={18} />
              </button>
            </div>
          )}

          {/* Welcome banner */}
          <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#073b2d] via-[#0b5b43] to-[#137758] p-6 text-white shadow-xl shadow-emerald-950/10 sm:p-9">
            <div className="pointer-events-none absolute -right-12 -top-24 h-72 w-72 rounded-full border-[36px] border-white/[0.06]" />
            <div className="pointer-events-none absolute -bottom-32 right-24 h-64 w-64 rounded-full bg-emerald-300/[0.08] blur-2xl" />

            <div className="relative z-10 flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/20 bg-white/[0.09] px-3 py-1.5 text-[10px] font-bold tracking-[0.15em] text-emerald-100 sm:text-xs">
                  <Activity size={14} />
                  DIGITAL LAND SERVICE
                </span>

                <h1 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                  স্বাগতম, {name}!
                </h1>

                <p className="mt-3 max-w-xl text-sm leading-7 text-emerald-50/80 sm:text-base">
                  তোমার E-Vumi Seba ড্যাশবোর্ড থেকে আবেদন, গ্রাহক ও
                  ভূমিসেবার কার্যক্রম সহজে পর্যবেক্ষণ করো।
                </p>

                <Link
                  href="/dashboard/applications"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#e8bc72] px-5 py-3.5 text-sm font-extrabold text-emerald-950 shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#f2cc8a]"
                >
                  <FileText size={18} />
                  আবেদন পরিচালনা করো
                  <ArrowRight size={17} />
                </Link>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-sm xl:min-w-64">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                  <ShieldCheck size={27} className="text-emerald-100" />
                </div>
                <div>
                  <p className="text-sm font-bold">অ্যাকাউন্ট সংযুক্ত</p>
                  <p className="mt-1 text-xs text-emerald-100/70">
                    {email || "Supabase Auth"}
                  </p>
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-200">
                    <span className="h-2 w-2 rounded-full bg-emerald-300" />
                    সেশন যাচাই সম্পন্ন
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section>
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-lg font-extrabold tracking-tight sm:text-xl">
                  সার্বিক পরিসংখ্যান
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  বর্তমান নমুনা আবেদনগুলোর সারসংক্ষেপ
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-500 ring-1 ring-slate-200">
                <Activity size={14} />
                লাইভ UI আপডেট
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
              {[
                {
                  title: "মোট আবেদন",
                  value: applications.length,
                  icon: FileText,
                  iconStyle: "bg-emerald-50 text-emerald-700",
                  accent: "bg-emerald-500",
                  note: "প্রদর্শিত নমুনা আবেদন",
                  trend: "সর্বমোট",
                },
                {
                  title: "অপেক্ষমাণ আবেদন",
                  value: pending,
                  icon: Clock3,
                  iconStyle: "bg-amber-50 text-amber-700",
                  accent: "bg-amber-500",
                  note: "পর্যালোচনা প্রয়োজন",
                  trend: "অপেক্ষায়",
                },
                {
                  title: "চলমান আবেদন",
                  value: processing,
                  icon: Activity,
                  iconStyle: "bg-blue-50 text-blue-700",
                  accent: "bg-blue-500",
                  note: "প্রক্রিয়াধীন আবেদন",
                  trend: "চলমান",
                },
                {
                  title: "সম্পন্ন আবেদন",
                  value: completed,
                  icon: CheckCircle2,
                  iconStyle: "bg-purple-50 text-purple-700",
                  accent: "bg-purple-500",
                  note: "সম্পন্ন হিসেবে চিহ্নিত",
                  trend: "সম্পন্ন",
                },
              ].map((card) => {
                const Icon = card.icon;

                return (
                  <article
                    key={card.title}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/[0.04]"
                  >
                    <div
                      className={`absolute left-0 top-0 h-1 w-full ${card.accent}`}
                    />
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-slate-500">
                          {card.title}
                        </p>
                        <p className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
                          {card.value.toLocaleString("bn-BD")}
                        </p>
                      </div>
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl transition group-hover:scale-105 ${card.iconStyle}`}
                      >
                        <Icon size={23} />
                      </div>
                    </div>
                    <div className="mt-5 flex items-center justify-between gap-2 border-t border-slate-100 pt-4">
                      <p className="text-xs text-slate-500">{card.note}</p>
                      <span className="rounded-md bg-slate-50 px-2 py-1 text-[10px] font-bold text-slate-500">
                        {card.trend}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Quick links */}
          <section>
            <div className="mb-4">
              <h2 className="text-lg font-extrabold tracking-tight sm:text-xl">
                দ্রুত কাজ
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                প্রয়োজনীয় সেবায় সরাসরি প্রবেশ করো
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                {
                  title: "আবেদন যাচাই",
                  description: "আবেদন দেখো, খোঁজো ও স্ট্যাটাস পরিবর্তন করো।",
                  href: "/dashboard/applications",
                  icon: FileCheck2,
                  style: "bg-emerald-50 text-emerald-700",
                },
                {
                  title: "কাস্টমার ম্যানেজমেন্ট",
                  description: "গ্রাহকের তথ্য ও সেবার কার্যক্রম পরিচালনা করো।",
                  href: "/dashboard/customers",
                  icon: Users,
                  style: "bg-blue-50 text-blue-700",
                },
                {
                  title: "সাপোর্ট সেন্টার",
                  description: "গ্রাহকের প্রশ্ন ও সমস্যার সহায়তা নাও।",
                  href: "/dashboard/support",
                  icon: Headset,
                  style: "bg-violet-50 text-violet-700",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
                  >
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition group-hover:bg-emerald-800 group-hover:text-white ${item.style}`}
                    >
                      <Icon size={23} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-slate-800">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {item.description}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                        বিস্তারিত দেখো
                        <ArrowRight
                          size={15}
                          className="transition group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Applications table */}
          <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">
                  সাম্প্রতিক আবেদনসমূহ
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  আবেদন খুঁজে দেখো এবং প্রয়োজনমতো স্ট্যাটাস আপডেট করো।
                </p>
              </div>

              <Link
                href="/dashboard/applications"
                className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-800 sm:self-auto"
              >
                সব আবেদন
                <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-3 border-b border-slate-100 bg-slate-50/70 p-4 sm:grid-cols-2 sm:p-5">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="আবেদন ID, কাস্টমার বা সেবা খুঁজুন..."
                  aria-label="আবেদন খুঁজুন"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                />
              </div>

              <select
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                aria-label="স্ট্যাটাস দিয়ে ফিল্টার"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
              >
                <option value="All">সকল স্ট্যাটাস</option>
                <option value="Pending">অপেক্ষমাণ</option>
                <option value="Processing">চলমান</option>
                <option value="Completed">সম্পন্ন</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[780px] text-left text-sm">
                <thead className="bg-slate-50/80 text-xs text-slate-500">
                  <tr>
                    <th className="px-5 py-4 font-bold">আবেদন ID</th>
                    <th className="px-5 py-4 font-bold">কাস্টমার</th>
                    <th className="px-5 py-4 font-bold">সেবার নাম</th>
                    <th className="px-5 py-4 font-bold">তারিখ</th>
                    <th className="px-5 py-4 font-bold">স্ট্যাটাস</th>
                    <th className="px-5 py-4 font-bold">আপডেট</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredApplications.map((app) => (
                    <tr
                      key={app.id}
                      className="transition hover:bg-emerald-50/30"
                    >
                      <td className="whitespace-nowrap px-5 py-4 font-extrabold text-emerald-800">
                        {app.id}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-800">
                        {app.customer}
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {app.service}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                        {app.date}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold ring-1 ring-inset ${statusStyle(app.status)}`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          {statusLabels[app.status]}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <select
                          aria-label={`${app.id} স্ট্যাটাস পরিবর্তন`}
                          value={app.status}
                          onChange={(event) =>
                            updateStatus(app.id, event.target.value as Status)
                          }
                          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
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
                        className="px-5 py-14 text-center"
                      >
                        <Search
                          size={30}
                          className="mx-auto mb-3 text-slate-300"
                        />
                        <p className="font-semibold text-slate-600">
                          কোনো আবেদন পাওয়া যায়নি।
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          অন্য শব্দ দিয়ে অনুসন্ধান করো অথবা ফিল্টার পরিবর্তন করো।
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-2 border-t border-slate-100 px-5 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <span>
                মোট {filteredApplications.length.toLocaleString("bn-BD")}টি
                আবেদন দেখানো হচ্ছে
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ArrowDownRight size={14} />
                নমুনা ডেটা — ডেটাবেস এখনো সংযুক্ত নয়
              </span>
            </div>
          </section>

          {/* Footer */}
          <footer className="flex flex-col gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>© ২০২৬ E-Vumi Seba · Digital Land Services</p>
            <p className="flex items-center gap-1.5">
              <ShieldCheck size={14} />
              Supabase Authentication সংযুক্ত
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}
