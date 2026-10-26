"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Home,
  LayoutDashboard,
  FilePlus2,
  ClipboardList,
  CreditCard,
  FolderOpen,
  Map,
  Megaphone,
  Search,
  Coins,
  Bookmark,
  House,
  Bell,
  UserRound,
  LogOut,
  Menu,
  X,
  CheckCircle2,
  FileText,
  Wallet,
  ArrowUpRight,
  Clock3,
  Settings,
  LifeBuoy,
  Globe,
  ChevronRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const navigation = [
  { label: "ড্যাশবোর্ড", href: "/dashboard", icon: LayoutDashboard },
  { label: "সেবা নিন", href: "/dashboard/applications/new", icon: FilePlus2 },
  { label: "আমার আবেদন", href: "/dashboard/applications", icon: ClipboardList },
  { label: "পেমেন্ট", href: "/dashboard/payments", icon: CreditCard },
  { label: "ডকুমেন্ট", href: "/dashboard/documents", icon: FolderOpen },
  { label: "মৌজা ম্যাপ", href: "/dashboard/maps", icon: Map },
  { label: "আমার বিজ্ঞাপন", href: "/dashboard/advertisements", icon: Megaphone },
  { label: "জমি বিক্রি করুন", href: "/dashboard/land-sale", icon: Search },
  { label: "আমার অফার", href: "/dashboard/offers", icon: Coins },
  { label: "সংরক্ষিত জমি", href: "/dashboard/saved-land", icon: Bookmark },
  { label: "আমার সম্পত্তি", href: "/dashboard/properties", icon: House },
  { label: "বিজ্ঞপ্তি", href: "/dashboard/notifications", icon: Bell },
  { label: "প্রোফাইল", href: "/dashboard/profile", icon: UserRound },
];

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<{
    name: string;
    email: string;
  } | null>(null);

  const [checking, setChecking] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const supabase = createClient();
    let active = true;

    async function checkSession() {
      const { data, error } = await supabase.auth.getUser();

      if (!active) return;

      if (error || !data.user) {
        router.replace("/login");
        router.refresh();
        return;
      }

      setUser({
        name:
          data.user.user_metadata?.full_name ||
          data.user.email?.split("@")[0] ||
          "ব্যবহারকারী",
        email: data.user.email || "",
      });

      setChecking(false);
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        router.replace("/login");
        router.refresh();
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [router]);

  async function handleLogout() {
    setLoggingOut(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();

      if (error) {
        setNotice(error.message);
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      setNotice("লগআউট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setLoggingOut(false);
    }
  }

  if (checking || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-purple-200 border-t-purple-800" />
          <p className="mt-4 text-sm text-gray-600">
            ড্যাশবোর্ড লোড হচ্ছে...
          </p>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-gray-800">
      {/* Top navigation */}
      <header className="sticky top-0 z-30 border-b border-purple-950/20 bg-purple-950 text-white shadow-md">
        <div className="flex h-[68px] items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="মেনু খুলুন"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-2 hover:bg-white/10 lg:hidden"
            >
              {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <Link href="/dashboard" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-purple-900">
                <House size={23} />
              </span>
              <span>
                <span className="block text-lg font-bold">E-Vumi Seba</span>
                <span className="hidden text-[10px] tracking-wider text-purple-200 sm:block">
                  DIGITAL LAND SERVICE PLATFORM
                </span>
              </span>
            </Link>
          </div>

          <nav className="hidden items-center gap-5 text-sm lg:flex">
            <Link href="/" className="hover:text-amber-300">
              হোম
            </Link>
            <Link href="/#services" className="hover:text-amber-300">
              সেবাসমূহ
            </Link>
            <Link href="/#tools" className="hover:text-amber-300">
              টুলস
            </Link>
            <Link href="/#contact" className="hover:text-amber-300">
              যোগাযোগ
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/notifications"
              aria-label="বিজ্ঞপ্তি"
              className="rounded-full p-2 hover:bg-white/10"
            >
              <Bell size={20} />
            </Link>
            <div className="hidden max-w-44 items-center gap-2 rounded-full bg-white/10 px-3 py-2 sm:flex">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-500 text-xs font-bold">
                {user.name.charAt(0).toUpperCase()}
              </span>
              <span className="truncate text-sm">{user.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-68px)]">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <button
            type="button"
            aria-label="সাইডবার বন্ধ করুন"
            className="fixed inset-0 z-20 bg-black/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed bottom-0 left-0 top-[68px] z-30 w-64 overflow-y-auto border-r border-gray-200 bg-white transition-transform duration-200 lg:sticky lg:top-[68px] lg:z-10 lg:block lg:h-[calc(100vh-68px)] lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="border-b border-gray-100 px-5 py-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              নাগরিক প্যানেল
            </p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-800">
                <UserRound size={22} />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{user.name}</p>
                <p className="truncate text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>

          <nav className="space-y-1 p-3">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = item.href === "/dashboard";

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
                    active
                      ? "bg-purple-900 font-semibold text-white shadow-sm"
                      : "text-gray-700 hover:bg-purple-50 hover:text-purple-900"
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                  {active && <ChevronRight className="ml-auto" size={16} />}
                </Link>
              );
            })}

            <Link
              href="/dashboard/support"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-900"
            >
              <LifeBuoy size={18} />
              <span>সহায়তা কেন্দ্র</span>
            </Link>

            <Link
              href="/dashboard/settings"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-900"
            >
              <Settings size={18} />
              <span>সেটিংস</span>
            </Link>
          </nav>

          <div className="border-t border-gray-100 p-3">
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-60"
            >
              <LogOut size={18} />
              {loggingOut ? "লগআউট হচ্ছে..." : "লগআউট"}
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="flex flex-wrap items-center gap-2 text-2xl font-bold text-purple-900 sm:text-3xl">
                  <Home size={27} />
                  স্বাগতম, {user.name}!
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                  আপনার E-Vumi Seba নাগরিক ড্যাশবোর্ড
                </p>
              </div>

              <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
                <CheckCircle2 className="mr-1 inline" size={14} />
                লগইন সফল
              </span>
            </div>

            {notice && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                {notice}
              </div>
            )}

            {/* Profile completion */}
            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-purple-100 p-3 text-purple-800">
                    <UserRound size={23} />
                  </div>
                  <div>
                    <h2 className="font-semibold">আপনার প্রোফাইল</h2>
                    <p className="text-sm text-gray-500">
                      আপনার ব্যক্তিগত তথ্য ও যোগাযোগের তথ্য
                    </p>
                  </div>
                </div>
                <Link
                  href="/dashboard/profile"
                  className="rounded-lg border border-purple-200 px-4 py-2 text-sm font-medium text-purple-800 hover:bg-purple-50"
                >
                  প্রোফাইল দেখুন
                </Link>
              </div>
            </section>

            {/* Summary cards */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  title: "চলমান আবেদন",
                  value: "০",
                  icon: FileText,
                  color: "blue",
                  note: "প্রক্রিয়াধীন আবেদন",
                },
                {
                  title: "সম্পন্ন সেবা",
                  value: "০",
                  icon: CheckCircle2,
                  color: "green",
                  note: "সম্পন্ন কাজ",
                },
                {
                  title: "মোট পেমেন্ট",
                  value: "৳ ০",
                  icon: Coins,
                  color: "orange",
                  note: "পেমেন্টের সারাংশ",
                },
                {
                  title: "সংরক্ষিত জমি",
                  value: "০",
                  icon: Bookmark,
                  color: "purple",
                  note: "আপনার সংরক্ষিত তালিকা",
                },
              ].map((card) => {
                const Icon = card.icon;
                const colors: Record<string, string> = {
                  blue: "bg-blue-50 text-blue-600",
                  green: "bg-green-50 text-green-600",
                  orange: "bg-orange-50 text-orange-600",
                  purple: "bg-purple-50 text-purple-700",
                };

                return (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm text-gray-500">{card.title}</p>
                        <p className="mt-3 text-3xl font-bold text-gray-900">
                          {card.value}
                        </p>
                      </div>
                      <div className={`rounded-xl p-3 ${colors[card.color]}`}>
                        <Icon size={23} />
                      </div>
                    </div>
                    <p className="mt-4 text-xs text-gray-400">{card.note}</p>
                  </div>
                );
              })}
            </section>

            {/* Quick actions */}
            <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Link
                href="/dashboard/applications/new"
                className="group rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white transition group-hover:bg-blue-700">
                  <FilePlus2 size={27} />
                </div>
                <h2 className="mt-4 font-bold text-gray-900">নতুন সেবা নিন</h2>
                <p className="mt-2 text-sm text-gray-500">
                  পছন্দের ভূমি সেবার জন্য আবেদন করুন
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-700">
                  আবেদন শুরু করুন <ArrowUpRight size={16} />
                </span>
              </Link>

              <Link
                href="/dashboard/applications"
                className="group rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                  <ClipboardList size={27} />
                </div>
                <h2 className="mt-4 font-bold text-gray-900">আমার আবেদন</h2>
                <p className="mt-2 text-sm text-gray-500">
                  আপনার আবেদন ও অগ্রগতি দেখুন
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700">
                  আবেদন দেখুন <ArrowUpRight size={16} />
                </span>
              </Link>

              <Link
                href="/dashboard/support"
                className="group rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-800 text-white">
                  <Search size={27} />
                </div>
                <h2 className="mt-4 font-bold text-gray-900">
                  সহায়তা খুঁজুন
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  প্রয়োজনীয় সহায়তা ও নির্দেশনা পান
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-purple-800">
                  সহায়তা নিন <ArrowUpRight size={16} />
                </span>
              </Link>
            </section>

            {/* Recent applications and notifications */}
            <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
              <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm xl:col-span-2">
                <div className="flex items-center justify-between border-b border-gray-100 p-5">
                  <h2 className="flex items-center gap-2 font-bold text-purple-900">
                    <Clock3 size={19} />
                    সাম্প্রতিক আবেদন
                  </h2>
                  <Link
                    href="/dashboard/applications"
                    className="text-sm font-medium text-blue-700 hover:underline"
                  >
                    সব দেখুন →
                  </Link>
                </div>
                <div className="flex min-h-52 flex-col items-center justify-center p-8 text-center">
                  <div className="rounded-2xl bg-gray-100 p-4 text-gray-400">
                    <FolderOpen size={34} />
                  </div>
                  <h3 className="mt-4 font-semibold text-gray-700">
                    এখনো কোনো আবেদন নেই
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-gray-500">
                    নতুন ভূমি সেবা নিতে আবেদন শুরু করুন। আপনার আবেদনের তথ্য
                    এখানে দেখা যাবে।
                  </p>
                  <Link
                    href="/dashboard/applications/new"
                    className="mt-5 rounded-lg bg-purple-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-purple-800"
                  >
                    + নতুন আবেদন
                  </Link>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-100 p-5">
                  <h2 className="flex items-center gap-2 font-bold text-purple-900">
                    <Bell size={19} />
                    বিজ্ঞপ্তি
                  </h2>
                  <Link
                    href="/dashboard/notifications"
                    className="text-sm text-blue-700 hover:underline"
                  >
                    সব →
                  </Link>
                </div>
                <div className="flex min-h-52 flex-col items-center justify-center p-6 text-center">
                  <div className="rounded-full bg-purple-50 p-4 text-purple-700">
                    <Bell size={27} />
                  </div>
                  <p className="mt-4 font-medium text-gray-700">
                    কোনো নতুন বিজ্ঞপ্তি নেই
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    নতুন আপডেট থাকলে এখানে দেখা যাবে।
                  </p>
                </div>
              </div>
            </section>

            {/* Account information */}
            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-purple-50 p-3 text-purple-800">
                  <Globe size={22} />
                </div>
                <div className="min-w-0">
                  <h2 className="font-bold">অ্যাকাউন্টের তথ্য</h2>
                  <p className="mt-1 break-all text-sm text-gray-500">
                    {user.email}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-xs leading-5 text-gray-400">
                আবেদন, পেমেন্ট ও জমির তথ্যের প্রকৃত হিসাব দেখাতে সংশ্লিষ্ট
                ডাটাবেস টেবিল এবং নিরাপদ অ্যাক্সেস নীতি যুক্ত করতে হবে।
              </p>
            </section>

            <footer className="py-4 text-center text-xs text-gray-400">
              © {new Date().getFullYear()} E-Vumi Seba — Digital Land Service
              Platform
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
