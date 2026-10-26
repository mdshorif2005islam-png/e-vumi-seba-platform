```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  UserRound,
  LayoutDashboard,
  FilePlus2,
  ClipboardList,
  CreditCard,
  FolderOpen,
  Map,
  Store,
  Megaphone,
  House,
  Bookmark,
  Bell,
  LogOut,
  ChevronDown,
  HandCoins,
  UserCog,
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
  { label: "প্রোফাইল", href: "/dashboard/profile", icon: UserCog },
];

export default function UserMenu() {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  const [userName, setUserName] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    let mounted = true;

    async function loadUser() {
      const { data } = await supabase.auth.getUser();

      if (!mounted) return;

      if (data.user) {
        setUserName(
          data.user.user_metadata?.full_name ||
          data.user.email?.split("@")[0] ||
          "আমার অ্যাকাউন্ট"
        );
      } else {
        setUserName("");
      }

      setLoading(false);
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;

      setUserName(
        session?.user?.user_metadata?.full_name ||
        session?.user?.email?.split("@")[0] ||
        ""
      );
      setLoading(false);
    });

    function handleOutsideClick(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      mounted = false;
      subscription.unsubscribe();
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  async function handleLogout() {
    setLoggingOut(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();

      if (error) {
        alert(error.message);
        return;
      }

      setOpen(false);
      router.replace("/");
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  }

  if (loading) {
    return (
      <div className="h-10 w-24 animate-pulse rounded-full bg-gray-100" />
    );
  }

  if (!userName) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          className="rounded-xl border border-purple-200 px-4 py-2 text-sm font-semibold text-purple-900 hover:bg-purple-50"
        >
          লগইন
        </Link>

        <Link
          href="/register"
          className="rounded-xl bg-purple-900 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-purple-800"
        >
          অ্যাকাউন্ট খুলুন
        </Link>
      </div>
    );
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
        className="flex max-w-52 items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-3 py-2 text-sm font-semibold text-purple-950 transition hover:bg-purple-100"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink-600 text-white">
          <UserRound size={17} />
        </span>

        <span className="max-w-28 truncate">{userName}</span>

        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-3 max-h-[75vh] w-72 overflow-y-auto rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl"
        >
          <div className="border-b border-gray-100 px-3 py-3">
            <p className="text-xs text-gray-500">নাগরিক প্যানেল</p>
            <p className="mt-1 truncate font-bold text-purple-950">
              {userName}
            </p>
          </div>

          <nav className="py-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition hover:bg-purple-50 hover:text-purple-900"
                >
                  <Icon size={18} className="shrink-0 text-purple-700" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-gray-100 pt-2">
            <button
              type="button"
              role="menuitem"
              disabled={loggingOut}
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
            >
              <LogOut size={18} />
              {loggingOut ? "লগআউট হচ্ছে..." : "লগআউট"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
```
