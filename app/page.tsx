"use client";

import React, { useState } from "react";
import Link from "next/link";
import UserMenu from "@/components/UserMenu";
import { Landmark, Menu, X } from "lucide-react";
import Link from "next/link";
import {
  ArrowLeftRight,
  BadgeCheck,
  Banknote,
  BarChart3,
  BookOpen,
  Building2,
  Calculator,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CircleDollarSign,
  ClipboardCheck,
  Clock3,
  FileCheck2,
  FileSearch,
  FileText,
  FolderSearch,
  Gavel,
  Globe2,
  HandCoins,
  Handshake,
  Headphones,
  Home,
  IdCard,
  Landmark,
  LayoutDashboard,
  Mail,
  Map,
  MapPinned,
  Menu,
  MessageCircle,
  Newspaper,
  Plane,
  Ruler,
  Scale,
  Search,
  SearchCheck,
  Send,
  Settings2,
  ShieldCheck,
  Sprout,
  Tag,
  Trees,
  TriangleAlert,
  UserCheck,
  Users,
  Waves,
  X,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type IconType = React.ComponentType<{
  size?: number;
  strokeWidth?: number;
  className?: string;
}>;

type Service = {
  title: string;
  serviceFee: string;
  govtFee: string;
  slug: string;
  icon: IconType;
  accent: string;
};

type LandTool = {
  name: string;
  desc: string;
  icon: IconType;
  link: string;
};

type ForumTopic = {
  title: string;
  author: string;
  time: string;
  replies: string;
};

/* =========================================================
   DATA
========================================================= */

const services: Service[] = [
  {
    title: "নামজারি / ই-নামজারি সহায়তা",
    serviceFee: "৳২৮০",
    govtFee: "৳১১৭০",
    slug: "mutation",
    icon: ArrowLeftRight,
    accent: "from-violet-500 to-purple-700",
  },
  {
    title: "অনলাইন ভূমি উন্নয়ন কর",
    serviceFee: "৳৫০",
    govtFee: "নির্ধারিত",
    slug: "tax",
    icon: CircleDollarSign,
    accent: "from-emerald-500 to-green-700",
  },
  {
    title: "খতিয়ান / পরচা সহায়তা",
    serviceFee: "৳৮০",
    govtFee: "৳১০০",
    slug: "khatian",
    icon: FileText,
    accent: "from-blue-500 to-indigo-700",
  },
  {
    title: "মৌজা ম্যাপ সংগ্রহ",
    serviceFee: "৳১০০",
    govtFee: "৳৫২০",
    slug: "mouza-map",
    icon: Map,
    accent: "from-cyan-500 to-blue-700",
  },
  {
    title: "সরকারি লিজ নবায়ন",
    serviceFee: "৳২০০",
    govtFee: "নির্ধারিত",
    slug: "lease",
    icon: Landmark,
    accent: "from-amber-500 to-orange-700",
  },
  {
    title: "বন্দোবস্ত সনদ",
    serviceFee: "৳১০০",
    govtFee: "৳২০০",
    slug: "bondobosto",
    icon: ClipboardCheck,
    accent: "from-orange-500 to-red-700",
  },
  {
    title: "জমির শ্রেণী পরিবর্তন",
    serviceFee: "৳২০০",
    govtFee: "নির্ধারিত",
    slug: "class-change",
    icon: ArrowLeftRight,
    accent: "from-indigo-500 to-blue-700",
  },
  {
    title: "অর্পিত সম্পত্তি অবমুক্তকরণ",
    serviceFee: "৳১২০",
    govtFee: "৳২০০",
    slug: "vested-property",
    icon: Building2,
    accent: "from-slate-500 to-slate-800",
  },
  {
    title: "খতিয়ান সংশোধনের আবেদন",
    serviceFee: "৳১২০",
    govtFee: "৳২০০",
    slug: "khatian-correction",
    icon: FileCheck2,
    accent: "from-rose-500 to-pink-700",
  },
  {
    title: "খাস জমি বরাদ্দ আবেদন",
    serviceFee: "৳৩০০",
    govtFee: "বিনামূল্যে",
    slug: "khas-land",
    icon: Sprout,
    accent: "from-green-500 to-emerald-700",
  },
  {
    title: "হুকুমদখল ও অধিগ্রহণ সনদ",
    serviceFee: "৳২০০",
    govtFee: "৳১০০",
    slug: "acquisition",
    icon: Building2,
    accent: "from-yellow-500 to-amber-700",
  },
  {
    title: "দলিল যাচাই ও সার্টিফাইড কপি",
    serviceFee: "৳১০০",
    govtFee: "নির্ধারিত",
    slug: "deed-check",
    icon: FileSearch,
    accent: "from-purple-500 to-fuchsia-700",
  },
  {
    title: "ওয়ারিশান সনদ আবেদন",
    serviceFee: "৳১০০",
    govtFee: "বিনামূল্যে",
    slug: "succession",
    icon: Users,
    accent: "from-pink-500 to-rose-700",
  },
  {
    title: "ভূমি সীমানা নির্ধারণ ও জরিপ",
    serviceFee: "৳১৫০",
    govtFee: "নির্ধারিত",
    slug: "survey",
    icon: Ruler,
    accent: "from-teal-500 to-cyan-700",
  },
  {
    title: "বাস্তুভিটা ও আশ্রয়ণ সেবা",
    serviceFee: "৳৫০",
    govtFee: "বিনামূল্যে",
    slug: "housing",
    icon: Home,
    accent: "from-sky-500 to-blue-700",
  },
  {
    title: "জলমহাল ও বালুমহাল ইজারা",
    serviceFee: "৳১২০",
    govtFee: "নির্ধারিত",
    slug: "waterbody",
    icon: Waves,
    accent: "from-blue-500 to-cyan-700",
  },
  {
    title: "বিআরএস রেকর্ড অনলাইন",
    serviceFee: "৳৮০",
    govtFee: "৳১২০",
    slug: "brs-record",
    icon: FolderSearch,
    accent: "from-violet-500 to-indigo-700",
  },
  {
    title: "চা বাগান ও বাগানবাড়ি লিজ",
    serviceFee: "৳৫০০",
    govtFee: "৳২০০",
    slug: "tea-estate",
    icon: Trees,
    accent: "from-green-500 to-teal-700",
  },
  {
    title: "দেওয়ানি ও রাজস্ব মামলা নথি",
    serviceFee: "৳১৫০",
    govtFee: "৳২০০",
    slug: "court-copy",
    icon: Gavel,
    accent: "from-red-500 to-rose-700",
  },
  {
    title: "রেজিস্ট্রেশন ফি ক্যালকুলেটর",
    serviceFee: "ফ্রি",
    govtFee: "",
    slug: "calculator",
    icon: Calculator,
    accent: "from-indigo-500 to-violet-700",
  },
  {
    title: "পাওয়ার অফ অ্যাটর্নি সেবা",
    serviceFee: "৳৫০০",
    govtFee: "নির্ধারিত",
    slug: "power-of-attorney",
    icon: FileCheck2,
    accent: "from-purple-500 to-indigo-700",
  },
  {
    title: "বণ্টননামা দলিল সহায়তা",
    serviceFee: "৳৫০০",
    govtFee: "নির্ধারিত",
    slug: "partition",
    icon: Handshake,
    accent: "from-orange-500 to-amber-700",
  },
  {
    title: "ভূমি জরিপ আপত্তি আবেদন",
    serviceFee: "৳১৫০",
    govtFee: "৳১০০",
    slug: "survey-objection",
    icon: TriangleAlert,
    accent: "from-amber-500 to-orange-700",
  },
  {
    title: "প্রবাসী ভূমি সেবা",
    serviceFee: "৳৩০০",
    govtFee: "নির্ধারিত",
    slug: "expatriate",
    icon: Plane,
    accent: "from-cyan-500 to-blue-700",
  },
  {
    title: "ই-পাসপোর্টের ভূমি যাচাই",
    serviceFee: "৳১০০",
    govtFee: "বিনামূল্যে",
    slug: "passport-verification",
    icon: IdCard,
    accent: "from-blue-500 to-indigo-700",
  },
  {
    title: "আইনি পরামর্শ ও ল্যান্ড অ্যাটর্নি",
    serviceFee: "৳৩০০",
    govtFee: "",
    slug: "legal-counsel",
    icon: Scale,
    accent: "from-rose-500 to-red-700",
  },
];

const landTools: LandTool[] = [
  {
    name: "একক রূপান্তর",
    desc: "শতক, কাঠা, বিঘা ও একর রূপান্তর",
    icon: Ruler,
    link: "/services/calculator",
  },
  {
    name: "প্লট ক্ষেত্রফল",
    desc: "দৈর্ঘ্য-প্রস্থ দিয়ে জমির মাপ হিসাব",
    icon: Map,
    link: "/services/calculator",
  },
  {
    name: "আনা-গণ্ডা-কড়া",
    desc: "পুরাতন খতিয়ানের অংশ হিসাব",
    icon: Calculator,
    link: "/services/calculator",
  },
  {
    name: "জমির দাম",
    desc: "শতক ও কাঠা অনুযায়ী মূল্যের হিসাব",
    icon: CircleDollarSign,
    link: "/services/calculator",
  },
  {
    name: "নিবন্ধন ব্যয়",
    desc: "দলিল রেজিস্ট্রেশনের সম্ভাব্য ব্যয় হিসাব",
    icon: FileText,
    link: "/services/calculator",
  },
  {
    name: "খাজনা হিসাব",
    desc: "কৃষি ও অকৃষি জমির কর হিসাব",
    icon: Banknote,
    link: "/services/tax",
  },
  {
    name: "নকল ও তল্লাশ ফি",
    desc: "সার্টিফাইড কপি তোলার সম্ভাব্য খরচ",
    icon: SearchCheck,
    link: "/services/deed-check",
  },
  {
    name: "উত্তরাধিকার বণ্টন",
    desc: "ওয়ারিশদের অংশ হিসাব",
    icon: Scale,
    link: "/services/succession",
  },
  {
    name: "হিস্যা বণ্টন",
    desc: "একাধিক মালিকের অংশীদারিত্ব হিসাব",
    icon: BarChart3,
    link: "/services/partition",
  },
  {
    name: "মৌজা রেট",
    desc: "এলাকাভিত্তিক মূল্য তথ্য",
    icon: Tag,
    link: "/services/calculator",
  },
  {
    name: "মৌজা ম্যাপ খুঁজুন",
    desc: "সিএস, আরএস ও বিআরএস নকশা",
    icon: MapPinned,
    link: "/services/mouza-map",
  },
  {
    name: "দাগ ও খতিয়ান সার্চ",
    desc: "জমির রেকর্ড অনুসন্ধানের সহায়তা",
    icon: FolderSearch,
    link: "/services/khatian",
  },
];

const forumTopics: ForumTopic[] = [
  {
    title: "নামজারি আবেদন কতদিনে সম্পন্ন হয়?",
    author: "রহিম আহমেদ",
    time: "১২ মিনিট আগে",
    replies: "১৮ উত্তর",
  },
  {
    title: "পুরাতন খতিয়ানে দাগ নম্বর খুঁজে পাওয়ার উপায়",
    author: "সুমাইয়া ইসলাম",
    time: "৩২ মিনিট আগে",
    replies: "১১ উত্তর",
  },
  {
    title: "ওয়ারিশদের মধ্যে জমি বণ্টনের নিয়ম কী?",
    author: "মোঃ হাসান",
    time: "১ ঘণ্টা আগে",
    replies: "২৪ উত্তর",
  },
  {
    title: "মৌজা ম্যাপ অনলাইনে কোথায় পাওয়া যায়?",
    author: "আব্দুল্লাহ",
    time: "২ ঘণ্টা আগে",
    replies: "৯ উত্তর",
  },
];

const marketplaceItems = [
  {
    title: "ধানী জমি",
    location: "গাজীপুর সদর",
    size: "১২ শতক",
    price: "৳১৮,৫০,০০০",
    icon: Sprout,
  },
  {
    title: "আবাসিক প্লট",
    location: "উত্তরা, ঢাকা",
    size: "৫ কাঠা",
    price: "৳৭৫,০০,০০০",
    icon: Home,
  },
  {
    title: "বাণিজ্যিক জমি",
    location: "টঙ্গী",
    size: "৮ শতক",
    price: "৳৪২,০০,০০০",
    icon: Building2,
  },
];

const blogPosts = [
  {
    title: "নামজারি করার সম্পূর্ণ প্রক্রিয়া",
    category: "ভূমি সেবা",
    date: "২৬ অক্টোবর ২০২৬",
    icon: FileCheck2,
  },
  {
    title: "খতিয়ান, দাগ ও মৌজা ম্যাপ কীভাবে বুঝবেন",
    category: "ভূমি শিক্ষা",
    date: "২৪ অক্টোবর ২০২৬",
    icon: BookOpen,
  },
  {
    title: "জমি কেনার আগে যে বিষয়গুলো যাচাই করবেন",
    category: "সচেতনতা",
    date: "২১ অক্টোবর ২০২৬",
    icon: ShieldCheck,
  },
];

const stats = [
  {
    value: "৮৯৮",
    label: "তালিকাভুক্ত সহায়তাকারী",
    icon: Users,
  },
  {
    value: "৬১",
    label: "জেলায় বিস্তৃত",
    icon: MapPinned,
  },
  {
    value: "৮৭",
    label: "নিবন্ধিত সহায়তাকারী",
    icon: BadgeCheck,
  },
  {
    value: "১,০৩১",
    label: "নিবন্ধিত নাগরিক",
    icon: UserCheck,
  },
  {
    value: "১২",
    label: "ডিজিটাল ভূমি টুল",
    icon: Calculator,
  },
  {
    value: "২৬",
    label: "ডিজিটাল সেবা",
    icon: LayoutDashboard,
  },
];

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-[10px] font-bold text-[#6b1d57] mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[#6b1d57]" />
          {eyebrow}
        </div>
      )}

      <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
        {title}
      </h2>

      {description && (
        <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
}

function ArrowButton() {
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-50 text-[#6b1d57] transition-all group-hover:translate-x-1 group-hover:bg-[#6b1d57] group-hover:text-white">
      →
    </span>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [openGuideIndex, setOpenGuideIndex] = useState(0);

  const divisions = [
    "ঢাকা",
    "চট্টগ্রাম",
    "রাজশাহী",
    "খুলনা",
    "বরিশাল",
    "সিলেট",
    "রংপুর",
    "ময়মনসিংহ",
  ];

  const districts = selectedDivision
    ? ["গাজীপুর", "ঢাকা", "নারায়ণগঞ্জ", "নরসিংদী", "মানিকগঞ্জ"]
    : [];

  const guides = [
    {
      title: "জমির তথ্য খুঁজে বের করুন",
      description:
        "দাগ, খতিয়ান, মৌজা এবং অন্যান্য প্রাথমিক তথ্য সংগ্রহ করে আপনার জমির রেকর্ড সম্পর্কে ধারণা নিন।",
      icon: Search,
    },
    {
      title: "প্রয়োজনীয় সেবা নির্বাচন করুন",
      description:
        "নামজারি, খতিয়ান, ম্যাপ, কর, দলিল যাচাইসহ প্রয়োজনীয় সেবাটি নির্বাচন করুন।",
      icon: LayoutDashboard,
    },
    {
      title: "তথ্য ও কাগজপত্র প্রস্তুত করুন",
      description:
        "প্রয়োজনীয় কাগজপত্র এবং তথ্য প্রস্তুত করে আবেদন প্রক্রিয়ার জন্য এগিয়ে যান।",
      icon: ClipboardCheck,
    },
    {
      title: "আবেদনের অগ্রগতি অনুসরণ করুন",
      description:
        "আপনার আবেদন বা সেবার অগ্রগতি নিয়মিত পর্যবেক্ষণ করুন এবং প্রয়োজনীয় নির্দেশনা অনুসরণ করুন।",
      icon: CheckCircle2,
    },
  ];

  return (
    <main className="min-h-screen bg-[#f8f7fa] text-slate-800">
      {/* =====================================================
          TOP BAR
      ====================================================== */}
      <div className="hidden lg:block bg-[#3e1237] text-purple-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-[11px]">
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-2">
              <Headphones size={13} />
              সহায়তা: ১৬১২৩
            </span>

            <span className="inline-flex items-center gap-2">
              <Mail size={13} />
              support@e-vumiseba.com
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span>বাংলা</span>
            <span className="opacity-40">|</span>
            <span>English</span>
          </div>
        </div>
      </div>

      {/* =====================================================
          NAVBAR
      ====================================================== */}
    

<header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
  <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
    {/* Logo */}
    <Link href="/" className="flex shrink-0 items-center gap-3">
      <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#6b1d57] to-[#3e1237] shadow-lg">
        <Landmark className="text-white" size={23} />

        <div className="absolute bottom-1 left-1/2 h-1 w-5 -translate-x-1/2 rounded-full bg-amber-300" />
      </div>

      <div>
        <div className="text-lg font-black leading-none text-[#6b1d57]">
          E-Vumi Seba
        </div>

        <div className="mt-1 text-[9px] font-medium tracking-wider text-slate-400">
          DIGITAL LAND SERVICE PLATFORM
        </div>
      </div>
    </Link>

    {/* Desktop Navigation */}
    <nav className="hidden items-center gap-1 lg:flex">
      {[
        ["হোম", "/"],
        ["সেবাসমূহ", "#services"],
        ["টুলস", "#tools"],
        ["মার্কেটপ্লেস", "#marketplace"],
        ["ফোরাম", "#forum"],
        ["গাইড", "#guide"],
      ].map(([label, href]) => (
        <Link
          key={label}
          href={href}
          className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-purple-50 hover:text-[#6b1d57]"
        >
          {label}
        </Link>
      ))}
    </nav>

    {/* Desktop User Menu */}
    <div className="hidden shrink-0 items-center sm:flex">
      <UserMenu />
    </div>

    {/* Mobile Menu Button */}
    <button
      type="button"
      onClick={() => setMobileOpen((current) => !current)}
      aria-label={mobileOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
      aria-expanded={mobileOpen}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-[#6b1d57] lg:hidden"
    >
      {mobileOpen ? <X size={21} /> : <Menu size={21} />}
    </button>
  </div>

  {/* Mobile Navigation */}
  {mobileOpen && (
    <div className="border-t border-slate-100 bg-white px-4 pb-4 lg:hidden">
      <div className="flex flex-col gap-1 pt-3">
        {[
          ["হোম", "/"],
          ["সেবাসমূহ", "#services"],
          ["টুলস", "#tools"],
          ["মার্কেটপ্লেস", "#marketplace"],
          ["ফোরাম", "#forum"],
          ["গাইড", "#guide"],
        ].map(([label, href]) => (
          <Link
            key={label}
            href={href}
            onClick={() => setMobileOpen(false)}
            className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-purple-50"
          >
            {label}
          </Link>
        ))}

        {/* Mobile User Menu */}
        <div className="mt-3 border-t border-slate-100 pt-3">
          <UserMenu />
        </div>
      </div>
    </div>
  )}
</header>

{/* তোমার আগের Hero section এখান থেকে শুরু হবে */}

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#421437]">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute -right-20 top-20 h-96 w-96 rounded-full bg-fuchsia-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-amber-300/10 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div className="relative z-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[10px] font-bold text-purple-100 backdrop-blur">
              <ShieldCheck size={14} className="text-amber-300" />
              ডিজিটাল ভূমি সেবা প্ল্যাটফর্ম
            </div>

            <h1 className="max-w-3xl text-4xl font-black leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl">
              আপনার জমি,
              <br />
              <span className="bg-gradient-to-r from-amber-200 to-yellow-400 bg-clip-text text-transparent">
                আপনার নিয়ন্ত্রণে
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-purple-100 sm:text-base">
              ভূমি সংক্রান্ত তথ্য, সেবা, আবেদন সহায়তা, হিসাব ও প্রয়োজনীয়
              রিসোর্স একটি আধুনিক ডিজিটাল প্ল্যাটফর্মে সহজভাবে ব্যবহার করুন।
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-xs font-black text-[#6b1d57] shadow-xl transition hover:-translate-y-0.5"
              >
                সেবা খুঁজুন
                <ArrowLeftRight size={16} />
              </Link>

              <Link
                href="#tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-xs font-bold text-white backdrop-blur transition hover:bg-white/15"
              >
                <Calculator size={16} />
                ভূমি টুল ব্যবহার করুন
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-5 text-[10px] text-purple-200">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-300" />
                সহজ প্রক্রিয়া
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-300" />
                তথ্যভিত্তিক সহায়তা
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-300" />
                আধুনিক ডিজাইন
              </span>
            </div>
          </div>

          <div className="relative z-10">
            <div className="relative mx-auto max-w-lg">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-purple-500/20 to-amber-300/10 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-purple-200">
                      QUICK LAND SEARCH
                    </p>
                    <h3 className="mt-1 text-lg font-black text-white">
                      জমির তথ্য খুঁজুন
                    </h3>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                    <Search size={20} className="text-amber-300" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="mb-1.5 block text-[10px] font-semibold text-purple-200">
                      বিভাগ
                    </label>

                    <select
                      value={selectedDivision}
                      onChange={(e) => {
                        setSelectedDivision(e.target.value);
                        setSelectedDistrict("");
                      }}
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-xs text-white outline-none"
                    >
                      <option value="" className="text-slate-900">
                        বিভাগ নির্বাচন করুন
                      </option>

                      {divisions.map((division) => (
                        <option
                          key={division}
                          value={division}
                          className="text-slate-900"
                        >
                          {division}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[10px] font-semibold text-purple-200">
                      জেলা
                    </label>

                    <select
                      value={selectedDistrict}
                      disabled={!selectedDivision}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-xs text-white outline-none disabled:opacity-40"
                    >
                      <option value="" className="text-slate-900">
                        জেলা নির্বাচন করুন
                      </option>

                      {districts.map((district) => (
                        <option
                          key={district}
                          value={district}
                          className="text-slate-900"
                        >
                          {district}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Link
                    href="/services/khatian"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-300 to-yellow-400 py-3.5 text-xs font-black text-[#3e1237] shadow-lg"
                  >
                    <Search size={15} />
                    অনুসন্ধান শুরু করুন
                  </Link>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2">
                  {[
                    ["২৬+", "সেবা"],
                    ["১২", "টুল"],
                    ["২৪/৭", "অ্যাক্সেস"],
                  ].map(([value, label]) => (
                    <div
                      key={label}
                      className="rounded-xl border border-white/10 bg-white/5 p-3 text-center"
                    >
                      <div className="text-sm font-black text-white">
                        {value}
                      </div>
                      <div className="mt-0.5 text-[9px] text-purple-200">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATS
      ====================================================== */}
      <section className="bg-[#3e1237] pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur transition hover:bg-white/10"
                >
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition group-hover:bg-amber-300/20">
                    <Icon
                      size={20}
                      className="text-amber-300"
                      strokeWidth={1.8}
                    />
                  </div>

                  <div className="text-xl font-black text-white">
                    {stat.value}
                  </div>

                  <div className="mt-1 text-[9px] text-purple-200">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICES
      ====================================================== */}
      <section id="services" className="scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="DIGITAL SERVICES"
            title="জনপ্রিয় ভূমি সেবাসমূহ"
            description="ভূমি সংক্রান্ত বিভিন্ন কাজের জন্য প্রয়োজনীয় সেবা ও তথ্য এক জায়গায় খুঁজে নিন।"
          />

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <Link
                  href={`/services/${service.slug}`}
                  key={service.slug}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-300 hover:shadow-[0_18px_45px_rgba(107,29,87,0.12)]"
                >
                  <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-purple-100/50 blur-2xl opacity-0 transition group-hover:opacity-100" />

                  <div className="relative mb-4 flex justify-center">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.accent} shadow-lg transition duration-300 group-hover:scale-110 group-hover:rotate-2`}
                    >
                      <Icon size={24} className="text-white" strokeWidth={1.8} />
                    </div>

                    <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500 shadow-sm" />
                  </div>

                  <h3 className="relative min-h-[42px] text-center text-xs font-bold leading-relaxed text-slate-800 transition group-hover:text-[#6b1d57] sm:text-[13px]">
                    {service.title}
                  </h3>

                  <div className="my-3 h-px bg-slate-100 transition group-hover:bg-purple-100" />

                  <div className="relative flex flex-wrap justify-center gap-1.5">
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-700">
                      <Banknote size={10} />
                      {service.serviceFee}
                    </span>

                    {service.govtFee && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-amber-100 bg-amber-50 px-2 py-1 text-[9px] font-bold text-amber-700">
                        <Landmark size={10} />
                        {service.govtFee}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-1 text-[10px] font-semibold text-slate-400 transition group-hover:text-[#6b1d57]">
                    বিস্তারিত দেখুন
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-[#6b1d57] px-5 py-3 text-xs font-bold text-[#6b1d57] transition hover:bg-[#6b1d57] hover:text-white"
            >
              সব সেবা দেখুন
              <ArrowLeftRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          TOOLS
      ====================================================== */}
      <section id="tools" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="SMART LAND TOOLS"
            title="ভূমি হিসাব ও অনুসন্ধান টুল"
            description="জমির পরিমাণ, মূল্য, নিবন্ধন ব্যয়, উত্তরাধিকার এবং রেকর্ড সংক্রান্ত হিসাব সহজে করুন।"
          />

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {landTools.map((tool) => {
              const Icon = tool.icon;

              return (
                <Link
                  key={tool.name}
                  href={tool.link}
                  className="group relative flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-lg"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-purple-100 bg-gradient-to-br from-purple-50 to-fuchsia-50 transition-all duration-300 group-hover:from-[#6b1d57] group-hover:to-[#8b3d78]">
                    <Icon
                      size={21}
                      className="text-[#6b1d57] transition-colors group-hover:text-white"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-slate-800 transition group-hover:text-[#6b1d57]">
                      {tool.name}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-[10px] leading-5 text-slate-500">
                      {tool.desc}
                    </p>
                  </div>

                  <span className="absolute right-3 top-3 opacity-0 transition group-hover:opacity-100">
                    <ArrowLeftRight size={12} className="text-[#6b1d57]" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          MARKETPLACE
      ====================================================== */}
      <section
        id="marketplace"
        className="scroll-mt-24 bg-[#f7f4f7] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeader
              eyebrow="LAND MARKETPLACE"
              title="জমি মার্কেটপ্লেস"
              description="জমি খোঁজা, তথ্য যাচাই এবং সম্ভাব্য সম্পত্তি সম্পর্কে প্রাথমিক ধারণা নেওয়ার জন্য একটি সংগঠিত তালিকা।"
            />

            <Link
              href="/marketplace"
              className="mb-8 inline-flex items-center gap-2 text-xs font-bold text-[#6b1d57]"
            >
              সব তালিকা
              <ArrowLeftRight size={15} />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {marketplaceItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  href="/marketplace"
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-40 overflow-hidden bg-gradient-to-br from-[#6b1d57] via-[#7b2d68] to-[#32102d]">
                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                    <div className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-amber-300/10 blur-2xl" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/10 backdrop-blur transition group-hover:scale-110">
                        <Icon size={36} className="text-white" strokeWidth={1.4} />
                      </div>
                    </div>

                    <span className="absolute right-4 top-4 rounded-full bg-emerald-400 px-3 py-1 text-[9px] font-black text-emerald-950">
                      ACTIVE
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-black text-slate-900">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          {item.location}
                        </p>
                      </div>

                      <ArrowButton />
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-2">
                      <div className="rounded-xl bg-slate-50 p-3">
                        <div className="text-[9px] text-slate-400">
                          জমির পরিমাণ
                        </div>
                        <div className="mt-1 text-xs font-black text-slate-800">
                          {item.size}
                        </div>
                      </div>

                      <div className="rounded-xl bg-purple-50 p-3">
                        <div className="text-[9px] text-purple-400">
                          চাহিদা মূল্য
                        </div>
                        <div className="mt-1 text-xs font-black text-[#6b1d57]">
                          {item.price}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          GUIDE
      ====================================================== */}
      <section id="guide" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="HOW IT WORKS"
            title="ভূমি সেবা নেওয়ার সহজ ধাপ"
            description="প্রয়োজনীয় তথ্য খুঁজে বের করা থেকে শুরু করে আবেদন অনুসরণ করা পর্যন্ত ধাপে ধাপে নির্দেশনা।"
          />

          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-3xl bg-gradient-to-br from-[#4b163f] to-[#6b1d57] p-6 sm:p-8 text-white">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                <Globe2 size={27} className="text-amber-300" />
              </div>

              <h3 className="text-2xl font-black">
                ডিজিটালভাবে শুরু করুন
              </h3>

              <p className="mt-3 text-sm leading-7 text-purple-100">
                সঠিক তথ্য, প্রয়োজনীয় কাগজপত্র এবং উপযুক্ত সেবা নির্বাচন করে
                আপনার ভূমি-সংক্রান্ত কাজকে আরও সংগঠিত করুন।
              </p>

              <Link
                href="/services"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-black text-[#6b1d57]"
              >
                সেবা ব্রাউজ করুন
                <ArrowLeftRight size={15} />
              </Link>
            </div>

            <div className="space-y-3">
              {guides.map((guide, index) => {
                const Icon = guide.icon;
                const isOpen = openGuideIndex === index;

                return (
                  <div
                    key={guide.title}
                    className={`overflow-hidden rounded-2xl border transition ${
                      isOpen
                        ? "border-purple-200 bg-purple-50/60"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenGuideIndex(isOpen ? -1 : index)
                      }
                      className="flex w-full items-center gap-4 p-4 text-left"
                    >
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition ${
                          isOpen
                            ? "bg-[#6b1d57] text-white"
                            : "bg-purple-50 text-[#6b1d57]"
                        }`}
                      >
                        <Icon size={20} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-black text-slate-900 sm:text-sm">
                          {index + 1}. {guide.title}
                        </div>

                        {isOpen && (
                          <p className="mt-2 text-[11px] leading-6 text-slate-500">
                            {guide.description}
                          </p>
                        )}
                      </div>

                      {isOpen ? (
                        <ChevronUp size={17} className="text-[#6b1d57]" />
                      ) : (
                        <ChevronDown size={17} className="text-slate-400" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FORUM
      ====================================================== */}
      <section id="forum" className="scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#6b1d57] to-[#8b3d78] shadow-lg shadow-purple-900/10">
                <MessageCircle
                  size={22}
                  className="text-white"
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <h2 className="text-xl font-black text-[#6b1d57] sm:text-2xl">
                  ফোরাম আলোচনা
                </h2>

                <p className="mt-1 text-[11px] text-slate-500">
                  ভূমি সংক্রান্ত প্রশ্ন ও অভিজ্ঞতা শেয়ার করুন
                </p>
              </div>
            </div>

            <Link
              href="/dashboard/support"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#6b1d57]"
            >
              ফোরামে যান
              <ArrowLeftRight size={15} />
            </Link>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            {forumTopics.map((topic, index) => (
              <div
                key={topic.title}
                className={`group flex items-center justify-between gap-4 p-4 transition hover:bg-purple-50/40 sm:px-5 ${
                  index !== forumTopics.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-purple-100 bg-purple-50 transition group-hover:bg-[#6b1d57]">
                    <MessageCircle
                      size={17}
                      className="text-[#6b1d57] transition group-hover:text-white"
                    />
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-800 sm:text-sm">
                      {topic.title}
                    </h4>

                    <p className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                      <UserCheck size={11} />
                      {topic.author}
                      <span>•</span>
                      <Clock3 size={11} />
                      {topic.time}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-full bg-[#6b1d57] px-3 py-1.5 text-[10px] font-bold text-white shadow-sm">
                  {topic.replies}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          BLOG
      ====================================================== */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <SectionHeader
              eyebrow="KNOWLEDGE CENTER"
              title="ভূমি বিষয়ক তথ্য ও গাইড"
              description="ভূমি ব্যবস্থাপনা ও সেবা সম্পর্কে সহজ ভাষায় প্রয়োজনীয় তথ্য।"
            />

            <Link
              href="/blog"
              className="mb-8 hidden items-center gap-2 text-xs font-bold text-[#6b1d57] sm:inline-flex"
            >
              সব লেখা
              <ArrowLeftRight size={15} />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {blogPosts.map((post) => {
              const Icon = post.icon;

              return (
                <Link
                  key={post.title}
                  href="/blog"
                  className="group rounded-3xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-5 flex h-40 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-slate-100">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm transition group-hover:scale-110">
                      <Icon size={30} className="text-[#6b1d57]" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[9px] font-bold text-[#6b1d57]">
                    <Newspaper size={12} />
                    {post.category}
                  </div>

                  <h3 className="mt-3 text-sm font-black leading-6 text-slate-900 transition group-hover:text-[#6b1d57]">
                    {post.title}
                  </h3>

                  <div className="mt-4 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays size={12} />
                      {post.date}
                    </span>

                    <span className="font-bold text-[#6b1d57]">
                      পড়ুন →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#421437] via-[#6b1d57] to-[#421437] p-7 shadow-2xl sm:p-10">
          <div className="flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[9px] font-bold text-purple-100">
                <Headphones size={13} />
                DIGITAL SUPPORT
              </div>

              <h2 className="text-2xl font-black text-white sm:text-3xl">
                ভূমি সংক্রান্ত সহায়তা দরকার?
              </h2>

              <p className="mt-2 max-w-xl text-xs leading-6 text-purple-100">
                প্রয়োজনীয় সেবা খুঁজে পেতে, তথ্য বুঝতে অথবা পরবর্তী ধাপ
                নির্ধারণ করতে আমাদের ডিজিটাল রিসোর্স ব্যবহার করুন।
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-black text-[#6b1d57]"
              >
                সেবা দেখুন
                <ArrowLeftRight size={15} />
              </Link>

              <Link
                href="/dashboard/support"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-xs font-bold text-white"
              >
                <MessageCircle size={15} />
                সহায়তা
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <footer className="bg-[#281020] text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                  <Landmark size={22} className="text-amber-300" />
                </div>

                <div>
                  <div className="font-black">E-Vumi Seba</div>
                  <div className="mt-1 text-[8px] tracking-widest text-purple-300">
                    DIGITAL LAND PLATFORM
                  </div>
                </div>
              </Link>

              <p className="mt-5 max-w-sm text-xs leading-7 text-purple-200">
                ভূমি সংক্রান্ত তথ্য, সেবা, টুল এবং জ্ঞানভিত্তিক রিসোর্সকে
                একটি আধুনিক ডিজিটাল অভিজ্ঞতার মধ্যে নিয়ে আসার উদ্যোগ।
              </p>

              <div className="mt-5 flex gap-2">
                {[Globe2, Mail, Headphones].map((Icon, index) => (
                  <div
                    key={index}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-purple-200"
                  >
                    <Icon size={16} />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-white">
                দ্রুত লিংক
              </h3>

              <div className="mt-5 space-y-3 text-xs text-purple-200">
                <Link href="/services" className="block hover:text-white">
                  সকল সেবা
                </Link>
                <Link href="/marketplace" className="block hover:text-white">
                  মার্কেটপ্লেস
                </Link>
                <Link href="/blog" className="block hover:text-white">
                  তথ্য ও গাইড
                </Link>
                <Link href="/dashboard/support" className="block hover:text-white">
                  সহায়তা
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-white">
                গুরুত্বপূর্ণ রিসোর্স
              </h3>

              <div className="mt-5 space-y-3 text-xs text-purple-200">
                <Link href="/services/khatian" className="block hover:text-white">
                  খতিয়ান অনুসন্ধান
                </Link>
                <Link href="/services/tax" className="block hover:text-white">
                  ভূমি উন্নয়ন কর
                </Link>
                <Link href="/services/mouza-map" className="block hover:text-white">
                  মৌজা ম্যাপ
                </Link>
                <Link href="/services/calculator" className="block hover:text-white">
                  ভূমি ক্যালকুলেটর
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-white">
                যোগাযোগ
              </h3>

              <div className="mt-5 space-y-4 text-xs text-purple-200">
                <div className="flex items-center gap-3">
                  <Headphones size={15} className="text-amber-300" />
                  <span>১৬১২৩</span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail size={15} className="text-amber-300" />
                  <span>support@e-vumiseba.com</span>
                </div>

                <div className="flex items-center gap-3">
                  <Globe2 size={15} className="text-amber-300" />
                  <span>Online Digital Support</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6">
            <div className="flex flex-col justify-between gap-3 text-[10px] text-purple-300 sm:flex-row">
              <p>
                © {new Date().getFullYear()} E-Vumi Seba. All rights reserved.
              </p>

              <div className="flex gap-5">
                <Link href="/privacy" className="hover:text-white">
                  Privacy
                </Link>
                <Link href="/terms" className="hover:text-white">
                  Terms
                </Link>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
