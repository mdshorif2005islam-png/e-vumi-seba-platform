
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import {
  ChevronDown,
  LayoutDashboard,
  FilePlus2,
  ClipboardList,
  CreditCard,
  FolderOpen,
  Map,
  Store,
  Megaphone,
  House,
  HandCoins,
  Bookmark,
  Bell,
  UserRound,
  LogOut,
  LoaderCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const menuItems = [
  { label: "ড্যাশবোর্ড", href: "/dashboard", icon: LayoutDashboard },
  { label: "সেবা নিন", href: "/dashboard/applications/new", icon: FilePlus2 },
  { label: "আমার অর্ডার", href: "/dashboard/applications", icon: ClipboardList },
  { label: "পেমেন্ট", href: "/dashboard/payment", icon: CreditCard },
  { label: "ডকুমেন্ট", href: "/dashboard/documents", icon: FolderOpen },
  { label: "মৌজা ম্যাপ", href: "/dashboard/maps", icon: Map },
  { label: "জমি মার্কেটপ্লেস", href: "/#marketplace", icon: Store },
  { label: "আমার বিজ্ঞাপন", href: "/dashboard/advertisements", icon: Megaphone },
  { label: "জমি বিক্রি করুন", href: "/dashboard/land-sale", icon: House },
  { label: "আমার অফার", href: "/dashboard/offers", icon: HandCoins },
  { label: "সংরক্ষিত জমি", href: "/dashboard/saved-land", icon: Bookmark },
  { label: "আমার সম্পত্তি", href: "/dashboard/properties", icon: House },
  { label: "বিজ্ঞপ্তি", href: "/dashboard/notifications", icon: Bell },
  { label: "প্রোফাইল", href: "/dashboard/profile", icon: UserRound },
];

export default function UserMenu() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    let mounted = true;

    async function loadUser() {
      const { data, error } = await supabase.auth.getUser();

      if (!mounted) return;

      setUser(error ? null : data.user);
      setLoading(false);
    }

    void loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;

      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  async function handleLogout() {
    if (loggingOut) return;

    setLoggingOut(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    setLoggingOut(false);

    if (error) {
      window.alert("লগআউট করা যায়নি। আবার চেষ্টা করুন।");
      return;
    }

    setUser(null);
    setOpen(false);
    router.replace("/");
    router.refresh();
  }

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "আমার অ্যাকাউন্ট";

  if (loading) {
    return (
      <div className="flex h-10 items-center justify-center px-3">
        <LoaderCircle className="h-5 w-5 animate-spin text-purple-800" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href="/login"
          className="rounded-xl border border-purple-800 px-4 py-2.5 text-xs font-bold text-purple-900 transition hover:bg-purple-50"
        >
          লগইন
        </Link>

        <Link
          href="/register"
          className="rounded-xl bg-[#6b1d57] px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-purple-900/15 transition hover:bg-[#551645]"
        >
          অ্যাকাউন্ট খুলুন
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex max-w-[230px] items-center gap-2 rounded-xl border border-purple-100 bg-white px-3 py-2 text-sm font-bold text-purple-950 shadow-sm transition hover:bg-purple-50"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-900">
          <UserRound size={18} />
        </span>

        <span className="max-w-[130px] truncate">{displayName}</span>

        <ChevronDown
          size={17}
          className={`shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="মেনু বন্ধ করুন"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />

          <div
            role="menu"
            className="absolute right-0 top-full z-50 mt-3 max-h-[75vh] w-72 max-w-[calc(100vw-2rem)] overflow-y-auto rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl"
          >
            <div className="border-b border-gray-100 px-3 py-3">
              <p className="truncate text-sm font-bold text-gray-900">
                {displayName}
              </p>

              <p className="mt-1 truncate text-xs text-gray-500">
                {user.email}
              </p>
            </div>

            <div className="py-2">
              {menuItems.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition hover:bg-purple-50 hover:text-purple-900"
                >
                  <Icon size={18} className="shrink-0" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-2">
              <button
                type="button"
                disabled={loggingOut}
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
              >
                {loggingOut ? (
                  <LoaderCircle size={18} className="animate-spin" />
                ) : (
                  <LogOut size={18} />
                )}

                {loggingOut ? "লগআউট হচ্ছে..." : "লগআউট"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
