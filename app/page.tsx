"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

// ================= হিরো ব্যানারের ৩টি সুন্দর স্লাইডার ছবি =================
const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=85",
    badge: "ভূমি সেবা সহায়তা কেন্দ্র",
    caption: "ভূমি সেবা এখন আপনার দোরগোড়ায়",
    subtext: "নিবন্ধিত প্রতিনিধির মাধ্যমে ঘরে বসেই ই-নামজারি ও খাজনা পরিশোধ করুন",
  },
  {
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85",
    badge: "ডিজিটাল রেকর্ড ও মৌজা ম্যাপ",
    caption: "খতিয়ান, পর্চা ও নকশা সংগ্রহ করুন সহজেই",
    subtext: "সিএস, এসএ, আরএস ও বিএস খতিয়ান এবং মৌজা ম্যাপের দ্রুততম অনলাইন সেবা",
  },
  {
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=85",
    badge: "নিরাপদ ও স্বচ্ছ ভূমি ব্যবস্থাপনা",
    caption: "জমি রেজিস্ট্রেশন, দলিল যাচাই ও আইনি সহায়তা",
    subtext: "সারাদেশে ৬৪ জেলায় আমাদের প্রশিক্ষিত ভূমি সেবা সহায়তাকারী নেটওয়ার্ক",
  },
];

import { useState } from "react";
import Link from "next/link";

import {
  ArrowLeftRight,
  Calculator,
  CircleDollarSign,
  CreditCard,
  FileCheck2,
  FileSearch,
  FileText,
  FolderOpen,
  Gavel,
  Handshake,
  House,
  Landmark,
  Link2,
  Map,
  MapPinned,
  Menu,
  PenLine,
  Plane,
  Ruler,
  Scale,
  Search,
  SearchCheck,
  ScrollText,
  ShieldCheck,
  Sprout,
  Tag,
  TriangleAlert,
  Users,
  Waves,
  X,
  Building2,
  Construction,
  Trees,
  ClipboardCheck,
  Headphones,
  BadgeCheck,
  LockKeyhole,
  Globe2,
  BookOpen,
  MessageCircle,
  Newspaper,
  Mail,
  Phone,
  Clock3,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  CheckCircle2,
  Database,
  FileDigit,
  Banknote,
  BriefcaseBusiness,
  IdCard,
  Settings2,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type Service = {
  title: string;
  serviceFee: string;
  govtFee: string;
  slug: string;
  icon: React.ElementType;
};

type LandTool = {
  name: string;
  desc: string;
  icon: React.ElementType;
  link: string;
};

type MarketplaceItem = {
  price: string;
  size: string;
  location: string;
  type: string;
};

type BlogPost = {
  title: string;
  date: string;
  category: string;
  excerpt: string;
};

type ForumTopic = {
  title: string;
  author: string;
  time: string;
  replies: string;
};

type Guide = {
  title: string;
  steps: string[];
};

/* =========================================================
   SERVICES
========================================================= */

const services: Service[] = [
  {
    title: "নামজারি / ই-নামজারি সহায়তা",
    serviceFee: "৳২৮০",
    govtFee: "৳১১৭০",
    slug: "mutation",
    icon: ArrowLeftRight,
  },
  {
    title: "অনলাইন ভূমি উন্নয়ন কর (খাজনা)",
    serviceFee: "৳৫০",
    govtFee: "নির্ধারিত",
    slug: "tax",
    icon: CreditCard,
  },
  {
    title: "খতিয়ান / পরচা সহায়তা",
    serviceFee: "৳৮০",
    govtFee: "৳১০০",
    slug: "khatian",
    icon: FileText,
  },
  {
    title: "মৌজা ম্যাপ সংগ্রহ",
    serviceFee: "৳১০০",
    govtFee: "৳৫২০",
    slug: "mouza-map",
    icon: Map,
  },
  {
    title: "সরকারি লিজ নবায়ন",
    serviceFee: "৳২০০",
    govtFee: "নির্ধারিত",
    slug: "lease",
    icon: Landmark,
  },
  {
    title: "বন্দোবস্ত সনদ",
    serviceFee: "৳১০০",
    govtFee: "৳২০০",
    slug: "bondobosto",
    icon: ScrollText,
  },
  {
    title: "জমির শ্রেণী পরিবর্তন",
    serviceFee: "৳২০০",
    govtFee: "নির্ধারিত",
    slug: "class-change",
    icon: ArrowLeftRight,
  },
  {
    title: "অর্পিত সম্পত্তি অবমুক্তকরণ",
    serviceFee: "৳১২০",
    govtFee: "৳২০০",
    slug: "vested-property",
    icon: Building2,
  },
  {
    title: "খতিয়ান সংশোধনের আবেদন (মিস কেস)",
    serviceFee: "৳১২০",
    govtFee: "৳২০০",
    slug: "khatian-correction",
    icon: Gavel,
  },
  {
    title: "খাস জমি বরাদ্দ আবেদন",
    serviceFee: "৳৩০০",
    govtFee: "বিনামূল্যে",
    slug: "khas-land",
    icon: Sprout,
  },
  {
    title: "হুকুমদখল ও অধিগ্রহণ সনদ",
    serviceFee: "৳২০০",
    govtFee: "৳১০০",
    slug: "acquisition",
    icon: Construction,
  },
  {
    title: "দলিল যাচাই ও সার্টিফাইড কপি",
    serviceFee: "৳১০০",
    govtFee: "নির্ধারিত",
    slug: "deed-check",
    icon: SearchCheck,
  },
  {
    title: "ওয়ারিশান সনদ আবেদন",
    serviceFee: "৳১০০",
    govtFee: "বিনামূল্যে",
    slug: "succession",
    icon: Users,
  },
  {
    title: "ভূমি সীমানা নির্ধারণ ও জরিপ",
    serviceFee: "৳১৫০",
    govtFee: "নির্ধারিত",
    slug: "survey",
    icon: Ruler,
  },
  {
    title: "বাস্তুভিটা ও আশ্রয়ণ পোর্টাল",
    serviceFee: "৳৫০",
    govtFee: "বিনামূল্যে",
    slug: "housing",
    icon: House,
  },
  {
    title: "জলমহাল ও বালুমহাল ইজারা",
    serviceFee: "৳১২০",
    govtFee: "নির্ধারিত",
    slug: "waterbody",
    icon: Waves,
  },
  {
    title: "বিআরএস রেকর্ড অনলাইন",
    serviceFee: "৳৮০",
    govtFee: "৳১২০",
    slug: "brs-record",
    icon: Database,
  },
  {
    title: "চা বাগান ও বাগানবাড়ি লিজ",
    serviceFee: "৳৫০০",
    govtFee: "৳২০০",
    slug: "tea-estate",
    icon: Trees,
  },
  {
    title: "দেওয়ানি ও রাজস্ব মামলা নথি",
    serviceFee: "৳১৫০",
    govtFee: "৳২০০",
    slug: "court-copy",
    icon: Scale,
  },
  {
    title: "রেজিস্ট্রেশন ফি ক্যালকুলেটর",
    serviceFee: "ফ্রি",
    govtFee: "",
    slug: "calculator",
    icon: Calculator,
  },
  {
    title: "পাওয়ার অফ অ্যাটর্নি সেবা",
    serviceFee: "৳৫০০",
    govtFee: "নির্ধারিত",
    slug: "power-of-attorney",
    icon: PenLine,
  },
  {
    title: "বণ্টননামা দলিল সহায়তা",
    serviceFee: "৳৫০০",
    govtFee: "নির্ধারিত",
    slug: "partition",
    icon: Handshake,
  },
  {
    title: "ভূমি জরিপ আপত্তি আবেদন",
    serviceFee: "৳১৫০",
    govtFee: "৳১০০",
    slug: "survey-objection",
    icon: TriangleAlert,
  },
  {
    title: "প্রবাসী ভূমি সেবা",
    serviceFee: "৳৩০০",
    govtFee: "নির্ধারিত",
    slug: "expatriate",
    icon: Plane,
  },
  {
    title: "ই-পাসপোর্টের ভূমি যাচাই",
    serviceFee: "৳১০০",
    govtFee: "বিনামূল্যে",
    slug: "passport-verification",
    icon: IdCard,
  },
  {
    title: "আইনি পরামর্শ ও ল্যান্ড অ্যাটর্নি",
    serviceFee: "৳৩০০",
    govtFee: "",
    slug: "legal-counsel",
    icon: Gavel,
  },
];

/* =========================================================
   LAND TOOLS
========================================================= */

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
    desc: "দলিল রেজিস্ট্রেশন সরকারি ফি হিসাব",
    icon: FileText,
    link: "/services/calculator",
  },
  {
    name: "খাজনা হিসাব",
    desc: "কৃষি ও অকৃষি জমির কর নির্ধারণ",
    icon: Banknote,
    link: "/services/tax",
  },
  {
    name: "নকল ও তল্লাশ ফি",
    desc: "সার্টিফাইড কপি তোলার খরচ",
    icon: FileSearch,
    link: "/services/deed-check",
  },
  {
    name: "উত্তরাধিকার বণ্টন",
    desc: "ফারায়েজ অনুযায়ী ওয়ারিশদের অংশ",
    icon: Scale,
    link: "/services/succession",
  },
  {
    name: "হিস্যা বণ্টন",
    desc: "একাধিক মালিকের জমির অংশীদারিত্ব",
    icon: Users,
    link: "/services/partition",
  },
  {
    name: "মৌজা রেট",
    desc: "এলাকাভিত্তিক জমির সরকারি সর্বনিম্ন মূল্য",
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
    desc: "অনলাইনে জমির রেকর্ড অনুসন্ধান",
    icon: FolderOpen,
    link: "/services/khatian",
  },
];

/* =========================================================
   MARKETPLACE
========================================================= */

const marketplaceItems: MarketplaceItem[] = [
  {
    price: "৳৩৫,০০,০০০",
    size: "৫.৫ শতক",
    type: "আবাসিক",
    location: "সাভার, ঢাকা",
  },
  {
    price: "৳১২,৫০,০০০",
    size: "১০ শতক",
    type: "ভিটা জমি",
    location: "সৈয়দপুর, নীলফামারী",
  },
  {
    price: "৳১৮,০০,০০০",
    size: "১২.৫ শতক",
    type: "কৃষি জমি",
    location: "সদর, রংপুর",
  },
  {
    price: "৳৪৫,০০,০০০",
    size: "৩ কাঠা",
    type: "বাণিজ্যিক",
    location: "গাজীপুর সদর, গাজীপুর",
  },
];

/* =========================================================
   BLOG
========================================================= */

const blogPosts: BlogPost[] = [
  {
    title:
      "ই-নামজারি আবেদনের সম্পূর্ণ প্রক্রিয়া: কাগজপত্র, ফি, শুনানি ও প্রতিকার",
    date: "২৫ অক্টোবর, ২০২৬",
    category: "নামজারি গাইড",
    excerpt:
      "জমি ক্রয়ের পর বা ওয়ারিশ সূত্রে মালিকানা পরিবর্তনের জন্য অনলাইনে কিভাবে নির্ভুলভাবে ই-নামজারি আবেদন করবেন...",
  },
  {
    title:
      "জমি ক্রয়-বিক্রয়ের পূর্বে খতিয়ান, দাগ ও দলিল যাচাইয়ের অপরিহার্য নিয়ম",
    date: "২০ অক্টোবর, ২০২৬",
    category: "ভূমি সচেতনতা",
    excerpt:
      "প্রতারণা এড়াতে জমি কেনার আগে সিএস, এসএ, আরএস ও বিএস খতিয়ান এবং সাব-রেজিস্ট্রি অফিসের রেকর্ড যেভাবে মিলাবেন...",
  },
  {
    title:
      "ভূমি উন্নয়ন কর (খাজনা) প্রদানের নিয়ম, ছাড়, জরিমানা ও দাখিলা ডাউনলোড",
    date: "১৫ অক্টোবর, ২০২৬",
    category: "ভূমি কর",
    excerpt:
      "এখন ঘরে বসেই মোবাইল ব্যাংকিংয়ের মাধ্যমে জমির খাজনা পরিশোধ করে তাৎক্ষণিক কিউআর কোডযুক্ত দাখিলা সংগ্রহ করুন...",
  },
];

/* =========================================================
   FORUM
========================================================= */

const forumTopics: ForumTopic[] = [
  {
    title: "নামজারি খতিয়ানে নামের বানান ভুল হলে করণীয় কী?",
    author: "মোঃ রাশেদুল ইসলাম",
    time: "২ ঘন্টা আগে",
    replies: "৫ উত্তর",
  },
  {
    title: "অনলাইনে মৌজা ম্যাপ অর্ডার করার কত দিন পর ডেলিভারি পাওয়া যায়?",
    author: "আব্দুল করিম",
    time: "৫ ঘন্টা আগে",
    replies: "৩ উত্তর",
  },
  {
    title: "হোল্ডিং নম্বর অনুমোদন হতে কত সময় লাগে?",
    author: "সাদিয়া আফরিন",
    time: "১ দিন আগে",
    replies: "৭ উত্তর",
  },
  {
    title: "ই-নামজারি ও ভূমি উন্নয়ন কর সংক্রান্ত জরুরি প্রশ্ন",
    author: "ভূমি সেবা সহায়তা ডেস্ক",
    time: "২ দিন আগে",
    replies: "১২ উত্তর",
  },
  {
    title: "ওয়ারিশ সনদ দিয়ে কি সরাসরি যৌথ নামজারি করা যাবে?",
    author: "মাহমুদুল হাসান",
    time: "৩ দিন আগে",
    replies: "৪ উত্তর",
  },
];

/* =========================================================
   GUIDES
========================================================= */

const guides: Guide[] = [
  {
    title: "কিভাবে অনলাইনে ই-নামজারি আবেদন করবেন?",
    steps: [
      "১. আমাদের প্ল্যাটফর্ম থেকে 'ই-নামজারি সহায়তা' নির্বাচন করুন অথবা mutation.land.gov.bd ওয়েবসাইটে যান।",
      "২. 'নতুন আবেদন' অপশনে ক্লিক করুন এবং মোবাইল নম্বর দিয়ে নিবন্ধন সম্পন্ন করুন।",
      "৩. প্রয়োজনীয় তথ্য পূরণ করুন — বিভাগ, জেলা, উপজেলা, মৌজা, খতিয়ান নং ও দাগ নং।",
      "৪. আবেদনকারীর ছবি, এনআইডি ও দলিলের স্ক্যান কপি আপলোড করুন।",
      "৫. প্রযোজ্য সরকারি ফি অনলাইনে পরিশোধ করুন।",
      "৬. আবেদন সাবমিট করুন এবং ট্র্যাকিং নম্বর সংরক্ষণ করুন।",
    ],
  },
  {
    title: "অনলাইনে ভূমি উন্নয়ন কর (খাজনা) কিভাবে দিবেন?",
    steps: [
      "১. 'অনলাইন ভূমি উন্নয়ন কর' সেবায় ক্লিক করুন বা ldtax.gov.bd পোর্টালে যান।",
      "২. এনআইডি ও মোবাইল নম্বর দিয়ে নাগরিক নিবন্ধন করুন।",
      "৩. খতিয়ান ও হোল্ডিং তথ্য যুক্ত করে বকেয়া ও হাল সনের কর যাচাই করুন।",
      "৪. অনুমোদিত পেমেন্ট মাধ্যমের মাধ্যমে কর পরিশোধ করে ডিজিটাল দাখিলা ডাউনলোড করুন।",
    ],
  },
  {
    title: "কিভাবে অনলাইনে পর্চা/খতিয়ান সংগ্রহ করবেন?",
    steps: [
      "১. বিভাগ, জেলা, উপজেলা ও মৌজা নির্বাচন করুন।",
      "২. সার্ভে টাইপ — CS, SA, RS, BRS/BS — নির্বাচন করে খতিয়ান বা দাগ নম্বর দিয়ে খুঁজুন।",
      "৩. নির্ধারিত সরকারি ফি ও প্রযোজ্য সেবা ফি পরিশোধ করে অনলাইন বা সার্টিফাইড কপির আবেদন করুন।",
    ],
  },
  {
    title: "জমি কেনার আগে যা যা অবশ্যই যাচাই করবেন",
    steps: [
      "১. বিক্রেতার নামে সর্বশেষ খতিয়ান ও নামজারি সঠিক আছে কিনা যাচাই করুন।",
      "২. দাগ নম্বর ও মৌজা ম্যাপের সাথে বাস্তবে জমির অবস্থান ও দখল মিলিয়ে দেখুন।",
      "৩. হাল সন পর্যন্ত খাজনা পরিশোধের দাখিলা এবং বায়া দলিল যাচাই করুন।",
    ],
  },
];

/* =========================================================
   GOVERNMENT LINKS
========================================================= */

const govtLinks = [
  {
    title: "ভূমি মন্ত্রণালয়",
    url: "https://minland.gov.bd",
    domain: "minland.gov.bd",
    icon: Landmark,
  },
  {
    title: "আর.এস খতিয়ান ব্যবস্থাপনা",
    url: "http://settlement.gov.bd",
    domain: "settlement.gov.bd",
    icon: FileText,
  },
  {
    title: "ই-নামজারি সিস্টেম",
    url: "https://mutation.land.gov.bd",
    domain: "mutation.land.gov.bd",
    icon: FileCheck2,
  },
  {
    title: "ভূমি রেকর্ড ও ম্যাপ",
    url: "https://dlrms.land.gov.bd",
    domain: "dlrms.land.gov.bd",
    icon: Map,
  },
  {
    title: "জাতীয় ভূমি পোর্টাল",
    url: "https://land.gov.bd",
    domain: "land.gov.bd",
    icon: Globe2,
  },
  {
    title: "ভূমি উন্নয়ন কর পোর্টাল",
    url: "https://portal.ldtax.gov.bd",
    domain: "portal.ldtax.gov.bd",
    icon: CreditCard,
  },
];

/* =========================================================
   SMALL REUSABLE COMPONENTS
========================================================= */

function SectionHeading({
  icon: Icon,
  title,
  description,
}: {
  icon?: React.ElementType;
  title: string;
  description?: string;
}) {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-2 text-[#6b1d57]">
        {Icon && (
          <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center">
            <Icon size={18} strokeWidth={1.8} />
          </div>
        )}

        <h2 className="text-xl sm:text-2xl font-extrabold">
          {title}
        </h2>
      </div>

      <div className="w-12 h-1 bg-gradient-to-r from-[#6b1d57] to-amber-400 rounded-full mx-auto mt-3" />

      {description && (
        <p className="text-xs text-slate-500 mt-3 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

/* =========================================================
   HOME PAGE
========================================================= */

export default function HomePage() {
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [openGuideIndex, setOpenGuideIndex] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#f8f9fa] text-slate-800 font-sans">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="sticky top-0 z-50 bg-[#4a154b]/95 backdrop-blur-xl text-white shadow-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 shrink-0"
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center overflow-hidden">
                <img
                  src="/logo-mark.png"
                  alt="E-Vumi Seba"
                  className="w-8 h-8 object-contain"
                />
              </div>

              <div className="hidden sm:block">
                <p className="font-extrabold text-sm leading-none">
                  E-Vumi Seba
                </p>
                <p className="text-[9px] text-purple-200 mt-1">
                  ডিজিটাল ভূমি সেবা
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-purple-100">
              <Link
                href="/"
                className="text-amber-400"
              >
                হোম
              </Link>

              <Link
                href="#services"
                className="hover:text-amber-300 transition"
              >
                সেবা সমূহ
              </Link>

              <Link
                href="#tools"
                className="hover:text-amber-300 transition"
              >
                টুলস
              </Link>

              <Link
                href="#find-agent"
                className="hover:text-amber-300 transition"
              >
                সহায়তাকারী খুঁজুন
              </Link>

              <Link
                href="#marketplace"
                className="hover:text-amber-300 transition"
              >
                জমি কিনুন
              </Link>

              <Link
                href="#forum"
                className="hover:text-amber-300 transition"
              >
                কমিউনিটি
              </Link>

              <Link
                href="/track"
                className="hover:text-amber-300 transition"
              >
                ট্র্যাকিং
              </Link>

              <Link
                href="/dashboard/support"
                className="hover:text-amber-300 transition"
              >
                সাপোর্ট
              </Link>
            </nav>

            {/* Right */}
            <div className="flex items-center gap-2">

              <Link
                href="/track"
                className="hidden sm:flex bg-white text-[#6b1d57] hover:bg-purple-50 font-bold text-xs px-5 py-2.5 rounded-full shadow-sm items-center gap-2 transition"
              >
                <Users size={14} />
                লগইন
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center"
                aria-label="Menu"
              >
                {mobileMenuOpen ? (
                  <X size={19} />
                ) : (
                  <Menu size={19} />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <nav className="lg:hidden pt-4 pb-2 border-t border-white/10 mt-3 space-y-1">
              {[
                ["হোম", "/"],
                ["সেবা সমূহ", "#services"],
                ["টুলস", "#tools"],
                ["সহায়তাকারী খুঁজুন", "#find-agent"],
                ["জমি কিনুন", "#marketplace"],
                ["কমিউনিটি", "#forum"],
                ["ট্র্যাকিং", "/track"],
                ["সাপোর্ট", "/dashboard/support"],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg hover:bg-white/10 text-sm"
                >
                  {label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#6b1d57] via-[#591849] to-[#32102c] text-white">

        {/* Decorative shapes */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-purple-400/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20 grid lg:grid-cols-12 gap-10 items-center">

          {/* Left */}
          <div className="lg:col-span-6">

            <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-300/30 text-amber-300 text-[11px] font-bold px-3.5 py-1.5 rounded-full mb-5">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              ২৬ অক্টোবর ২০২৬ • ডিজিটাল ভূমি সেবা
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
              বাংলাদেশের
              <span className="block text-amber-300">
                ভূমি সেবা প্ল্যাটফর্ম
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-purple-100 text-sm leading-7">
              নামজারি, ভূমি উন্নয়ন কর, খতিয়ান, পর্চা, মৌজা ম্যাপ,
              জমির হিসাব এবং ভূমি সংক্রান্ত বিভিন্ন সেবা—
              সবকিছু এক প্ল্যাটফর্মে সহজ ও স্বচ্ছভাবে।
            </p>

            <div className="flex flex-wrap gap-3 mt-7">

              <Link
                href="#services"
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm px-6 py-3 rounded-full shadow-xl shadow-black/10 flex items-center gap-2 transition hover:-translate-y-0.5"
              >
                <ArrowLeftRight size={16} />
                সেবা নিন
              </Link>

              <Link
                href="#find-agent"
                className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm px-6 py-3 rounded-full flex items-center gap-2 transition"
              >
                <Search size={16} />
                সহায়তাকারী খুঁজুন
              </Link>

            </div>

            <div className="flex flex-wrap gap-2.5 mt-7">

              {[
                [ShieldCheck, "নিরাপদ সেবা"],
                [BadgeCheck, "নিবন্ধিত কেন্দ্র"],
                [Headphones, "সাপোর্ট সুবিধা"],
              ].map(([Icon, label]) => {
                const I = Icon as React.ElementType;

                return (
                  <div
                    key={String(label)}
                    className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-full text-[11px] text-purple-100"
                  >
                    <I size={13} className="text-emerald-300" />
                    {label}
                  </div>
                );
              })}

            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-6">

            <div className="relative rounded-3xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-sm p-2 shadow-2xl">

              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

              <img
                src="/hero-banner.png"
                alt="ভূমি সেবা সহায়তা কেন্দ্র"
                className="relative block w-full h-auto rounded-2xl object-cover"
              />

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section
        id="services"
        className="py-16 max-w-7xl mx-auto px-4 sm:px-6"
      >

        <SectionHeading
          icon={BriefcaseBusiness}
          title="ভূমি সংক্রান্ত সেবা সমূহ"
          description="আপনার প্রয়োজনীয় ভূমি সেবা নির্বাচন করুন — সুনির্দিষ্ট ফি ও স্বচ্ছ প্রক্রিয়ায়।"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">

          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                href={`/services/${service.slug}`}
                key={service.slug}
                className="
                  group relative overflow-hidden
                  bg-white rounded-2xl
                  border border-slate-200
                  p-4
                  text-center
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-[#6b1d57]/30
                  hover:shadow-[0_15px_35px_rgba(107,29,87,0.10)]
                "
              >

                {/* Glow */}
                <div className="
                  absolute -top-10 -right-10
                  w-24 h-24
                  rounded-full
                  bg-purple-100/50
                  blur-2xl
                  group-hover:bg-amber-100/60
                  transition
                />

                {/* Icon */}
                <div className="
                  relative mx-auto mb-3
                  w-12 h-12
                  rounded-xl
                  bg-gradient-to-br from-purple-50 to-amber-50
                  border border-purple-100
                  flex items-center justify-center
                  text-[#6b1d57]
                  shadow-sm
                  group-hover:scale-110
                  group-hover:shadow-md
                  transition-all duration-300
                ">
                  <Icon size={22} strokeWidth={1.8} />
                </div>

                <h3 className="
                  relative
                  font-bold text-slate-800
                  text-xs sm:text-[13px]
                  leading-5
                  min-h-[40px]
                  flex items-center justify-center
                  mb-3
                  group-hover:text-[#6b1d57]
                  transition
                ">
                  {service.title}
                </h3>

                <div className="relative flex flex-wrap justify-center gap-1.5">

                  <span className="
                    bg-emerald-50
                    text-emerald-700
                    border border-emerald-100
                    text-[9px]
                    font-bold
                    px-2 py-1
                    rounded-md
                  ">
                    সেবা {service.serviceFee}
                  </span>

                  {service.govtFee && (
                    <span className="
                      bg-amber-50
                      text-amber-700
                      border border-amber-100
                      text-[9px]
                      font-bold
                      px-2 py-1
                      rounded-md
                    ">
                      সরকারি {service.govtFee}
                    </span>
                  )}

                </div>
              </Link>
            );
          })}

        </div>

        <div className="flex justify-center gap-3 mt-10 flex-wrap">

          <Link
            href="#guides"
            className="border border-[#6b1d57] text-[#6b1d57] hover:bg-purple-50 text-xs font-bold px-6 py-2.5 rounded-full transition"
          >
            সেবার বিস্তারিত →
          </Link>

          <Link
            href="/track"
            className="bg-[#6b1d57] hover:bg-[#521542] text-white text-xs font-bold px-6 py-2.5 rounded-full shadow transition"
          >
            একটি সেবা নিন
          </Link>

        </div>
      </section>

      {/* =====================================================
          WHY US
      ===================================================== */}

      <section className="py-16 bg-[#f3eff5] border-y border-purple-100">

        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <SectionHeading
            icon={ShieldCheck}
            title="কেন ভূমি সেবা সহায়তাকারী?"
            description="নিরাপদ, স্বচ্ছ ও সময় সাশ্রয়ী ভূমি সেবা সহায়তা।"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {[
              {
                icon: Landmark,
                title: "সরকারি কাঠামোর সাথে সামঞ্জস্যপূর্ণ",
                text: "ভূমি সেবার প্রচলিত নিয়ম ও প্রক্রিয়া অনুসরণ করে সহায়তা প্রদান।",
              },
              {
                icon: LockKeyhole,
                title: "নিরাপদ লেনদেন",
                text: "সেবা গ্রহণের প্রতিটি ধাপে স্বচ্ছতা ও নিরাপত্তাকে অগ্রাধিকার।",
              },
              {
                icon: MapPinned,
                title: "সারাদেশে সেবা নেটওয়ার্ক",
                text: "বিভিন্ন জেলা ও এলাকায় ভূমি সেবা সহায়তার সুযোগ।",
              },
              {
                icon: Headphones,
                title: "অভিযোগ ও সাপোর্ট",
                text: "আবেদনের অগ্রগতি ও সমস্যার জন্য সরাসরি সাপোর্ট ব্যবস্থা।",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="
                    bg-white rounded-2xl
                    p-6 text-center
                    border border-slate-200
                    shadow-sm
                    hover:-translate-y-1
                    hover:shadow-xl
                    transition-all duration-300
                  "
                >

                  <div className="
                    mx-auto w-14 h-14
                    rounded-2xl
                    bg-gradient-to-br from-purple-50 to-amber-50
                    text-[#6b1d57]
                    border border-purple-100
                    flex items-center justify-center
                    mb-4
                  ">
                    <Icon size={25} strokeWidth={1.7} />
                  </div>

                  <h3 className="font-bold text-sm mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-6">
                    {item.text}
                  </p>

                </div>
              );
            })}

          </div>

          <div className="text-center mt-8">

            <Link
              href="#find-agent"
              className="inline-flex items-center gap-2 bg-[#6b1d57] hover:bg-[#521542] text-white text-xs font-bold px-6 py-3 rounded-full shadow-lg transition"
            >
              <Settings2 size={15} />
              আমরা কীভাবে কাজ করি?
            </Link>

          </div>
        </div>
      </section>

      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#6b1d57] text-white py-14">

        <div className="absolute inset-0 bg-gradient-to-r from-[#6b1d57] via-[#591849] to-[#3d1035]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">

          <div className="text-center mb-10">

            <h3 className="text-xl font-extrabold">
              এক নজরে E-Vumi Seba
            </h3>

            <div className="w-12 h-1 bg-amber-400 rounded-full mx-auto mt-3" />

          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">

            {[
              [Users, "৮৯৮", "তালিকাভুক্ত সহায়তাকারী"],
              [MapPinned, "৬১", "জেলায় বিস্তৃত"],
              [BadgeCheck, "৮৭", "নিবন্ধিত সহায়তাকারী"],
              [Users, "১,০৩১", "নিবন্ধিত নাগরিক"],
              [Calculator, "১২", "বিনামূল্যে ভূমি টুল"],
              [FileCheck2, "২৬", "সক্রিয় ডিজিটাল সেবা"],
            ].map(([Icon, number, label]) => {
              const I = Icon as React.ElementType;

              return (
                <div
                  key={String(label)}
                  className="text-center group"
                >
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center mb-3 group-hover:bg-white/15 transition">
                    <I size={21} />
                  </div>

                  <p className="text-3xl font-black">
                    {number}
                  </p>

                  <p className="text-[10px] sm:text-xs text-purple-200 mt-1">
                    {label}
                  </p>
                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* =====================================================
          TOOLS
      ===================================================== */}

      <section
        id="tools"
        className="py-16 max-w-7xl mx-auto px-4 sm:px-6"
      >

        <SectionHeading
          icon={Calculator}
          title="ভূমি সংক্রান্ত টুল ও ক্যালকুলেটর"
          description="জমির হিসাব, কর, মূল্য ও উত্তরাধিকার বণ্টন — দরকারি ১২টি টুল।"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">

          {landTools.map((tool) => {
            const Icon = tool.icon;

            return (
              <Link
                href={tool.link}
                key={tool.name}
                className="
                  group
                  bg-white
                  rounded-2xl
                  border border-slate-200
                  p-4
                  flex items-center gap-3
                  hover:-translate-y-1
                  hover:border-[#6b1d57]/30
                  hover:shadow-lg
                  transition-all duration-300
                "
              >

                <div className="
                  shrink-0
                  w-11 h-11
                  rounded-xl
                  bg-purple-50
                  border border-purple-100
                  text-[#6b1d57]
                  flex items-center justify-center
                  group-hover:bg-[#6b1d57]
                  group-hover:text-white
                  transition
                ">
                  <Icon size={20} strokeWidth={1.8} />
                </div>

                <div className="min-w-0">
                  <h3 className="font-bold text-xs text-slate-800 group-hover:text-[#6b1d57]">
                    {tool.name}
                  </h3>

                  <p className="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-4">
                    {tool.desc}
                  </p>
                </div>

              </Link>
            );
          })}

        </div>

        <div className="text-center mt-8">

          <Link
            href="/services/calculator"
            className="inline-flex items-center gap-2 bg-[#6b1d57] hover:bg-[#521542] text-white text-xs font-bold px-6 py-3 rounded-full shadow transition"
          >
            <Calculator size={15} />
            সকল টুল বিস্তারিত দেখুন
          </Link>

        </div>
      </section>

      {/* =====================================================
          FIND AGENT
      ===================================================== */}

      <section
        id="find-agent"
        className="py-16 bg-white border-y border-slate-200"
      >

        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          <SectionHeading
            icon={Search}
            title="ভূমি সেবা সহায়তাকারী খুঁজুন"
            description="আপনার এলাকার ভূমি সেবা সহায়তা কেন্দ্র খুঁজে বের করুন।"
          />

          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-sm">

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

              <select
                value={selectedDivision}
                onChange={(e) => setSelectedDivision(e.target.value)}
                className="
                  px-4 py-3
                  rounded-xl
                  border border-slate-300
                  text-xs
                  bg-white
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-100
                  focus:border-[#6b1d57]
                "
              >
                <option value="">-- বিভাগ নির্বাচন --</option>
                <option value="dhaka">ঢাকা</option>
                <option value="chattogram">চট্টগ্রাম</option>
                <option value="rajshahi">রাজশাহী</option>
                <option value="khulna">খুলনা</option>
                <option value="barishal">বরিশাল</option>
                <option value="sylhet">সিলেট</option>
                <option value="rangpur">রংপুর</option>
                <option value="mymensingh">ময়মনসিংহ</option>
              </select>

              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="
                  px-4 py-3
                  rounded-xl
                  border border-slate-300
                  text-xs
                  bg-white
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-100
                  focus:border-[#6b1d57]
                "
              >
                <option value="">-- জেলা নির্বাচন --</option>
                <option value="dhaka">ঢাকা</option>
                <option value="gazipur">গাজীপুর</option>
                <option value="nilphamari">নীলফামারী</option>
                <option value="rangpur">রংপুর</option>
                <option value="chattogram">চট্টগ্রাম</option>
              </select>

              <Link
                href="#services"
                className="
                  bg-[#6b1d57]
                  hover:bg-[#521542]
                  text-white
                  font-bold
                  py-3 px-5
                  rounded-xl
                  text-xs
                  flex items-center
                  justify-center gap-2
                  transition
                "
              >
                <Search size={15} />
                খুঁজুন
              </Link>

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MARKETPLACE
      ===================================================== */}

      <section
        id="marketplace"
        className="py-16 max-w-7xl mx-auto px-4 sm:px-6"
      >

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">

          <div>
            <div className="flex items-center gap-2 text-[#6b1d57]">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center">
                <House size={20} />
              </div>

              <h2 className="text-xl font-extrabold">
                জমি মার্কেটপ্লেস
              </h2>
            </div>

            <p className="text-xs text-slate-500 mt-2">
              জমি ক্রয়-বিক্রয়ের তথ্য দেখুন
            </p>
          </div>

          <Link
            href="#services"
            className="self-start sm:self-auto border border-[#6b1d57] text-[#6b1d57] hover:bg-purple-50 text-xs font-bold px-4 py-2 rounded-full"
          >
            সব জমি দেখুন →
          </Link>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {marketplaceItems.map((item) => (
            <div
              key={item.location}
              className="
                bg-white
                rounded-2xl
                border border-slate-200
                overflow-hidden
                shadow-sm
                hover:-translate-y-1
                hover:shadow-xl
                transition-all duration-300
              "
            >

              <div className="h-36 bg-gradient-to-br from-slate-100 via-purple-50 to-amber-50 relative flex items-center justify-center">

                <MapPinned
                  size={42}
                  strokeWidth={1.4}
                  className="text-[#6b1d57]/40"
                />

                <span className="
                  absolute top-3 left-3
                  bg-[#6b1d57]
                  text-white
                  text-[9px]
                  font-bold
                  px-2.5 py-1
                  rounded-full
                ">
                  বিক্রয়ের জন্য
                </span>

              </div>

              <div className="p-4">

                <p className="font-black text-emerald-700 text-base">
                  {item.price}
                </p>

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[11px] font-bold text-slate-700">
                    {item.size}
                  </span>

                  <span className="text-[9px] bg-purple-50 text-[#6b1d57] px-2 py-1 rounded-full">
                    {item.type}
                  </span>
                </div>

                <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
                  <MapPinned size={12} />
                  {item.location}
                </p>

              </div>
            </div>
          ))}

        </div>
      </section>

      {/* =====================================================
          BLOG
      ===================================================== */}

      <section className="py-16 bg-[#f8f9fa]">

        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <SectionHeading
            icon={Newspaper}
            title="সাম্প্রতিক ব্লগ পোস্ট"
            description="ভূমি সংক্রান্ত গুরুত্বপূর্ণ তথ্য, গাইড ও সচেতনতা বিষয়ক লেখা।"
          />

          <div className="grid md:grid-cols-3 gap-6">

            {blogPosts.map((post, index) => (
              <article
                key={post.title}
                className="
                  bg-white
                  rounded-2xl
                  border border-slate-200
                  overflow-hidden
                  shadow-sm
                  hover:-translate-y-1
                  hover:shadow-xl
                  transition-all duration-300
                "
              >

                <div className="h-40 bg-gradient-to-br from-[#6b1d57] via-purple-600 to-amber-400 relative flex items-center justify-center">

                  <div className="w-16 h-16 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-white">
                    {index === 0 ? (
                      <FileCheck2 size={30} />
                    ) : index === 1 ? (
                      <SearchCheck size={30} />
                    ) : (
                      <CreditCard size={30} />
                    )}
                  </div>

                </div>

                <div className="p-5">

                  <div className="flex items-center gap-2 text-[9px] text-slate-400 mb-3">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="text-[#6b1d57] font-bold">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-sm leading-6 mb-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-6">
                    {post.excerpt}
                  </p>

                  <Link
                    href="#guides"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#6b1d57] mt-4 hover:gap-2 transition-all"
                  >
                    বিস্তারিত পড়ুন
                    <ExternalLink size={12} />
                  </Link>

                </div>
              </article>
            ))}

          </div>
        </div>
      </section>

      {/* =====================================================
          FORUM
      ===================================================== */}

      <section
        id="forum"
        className="py-16 max-w-5xl mx-auto px-4 sm:px-6"
      >

        <SectionHeading
          icon={MessageCircle}
          title="ফোরাম আলোচনা"
          description="ভূমি সংক্রান্ত প্রশ্ন করুন, অভিজ্ঞতা শেয়ার করুন এবং উত্তর পান।"
        />

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">

          {forumTopics.map((topic) => (
            <div
              key={topic.title}
              className="
                p-4 sm:p-5
                flex items-center justify-between gap-4
                border-b last:border-b-0 border-slate-100
                hover:bg-slate-50
                transition
              "
            >

              <div className="min-w-0">

                <h4 className="font-bold text-xs sm:text-sm text-slate-800">
                  {topic.title}
                </h4>

                <p className="text-[10px] text-slate-400 mt-1.5 flex flex-wrap gap-2">
                  <span>👤 {topic.author}</span>
                  <span>•</span>
                  <span>{topic.time}</span>
                </p>

              </div>

              <span className="
                shrink-0
                bg-purple-50
                text-[#6b1d57]
                border border-purple-100
                text-[9px]
                font-bold
                px-2.5 py-1.5
                rounded-full
              ">
                {topic.replies}
              </span>

            </div>
          ))}

        </div>

        <div className="text-center mt-6">

          <Link
            href="/dashboard/support"
            className="inline-flex items-center gap-2 border border-[#6b1d57] text-[#6b1d57] hover:bg-purple-50 text-xs font-bold px-6 py-2.5 rounded-full transition"
          >
            <MessageCircle size={14} />
            ফোরামে যান
          </Link>

        </div>

      </section>

      {/* =====================================================
          GUIDES
      ===================================================== */}

      <section
        id="guides"
        className="py-16 bg-[#f3eff5] border-y border-purple-100"
      >

        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          <SectionHeading
            icon={BookOpen}
            title="ভূমি সেবা গাইড"
            description="প্রচলিত ভূমি সেবা সম্পর্কে ধাপে ধাপে জানুন।"
          />

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">

            {guides.map((guide, index) => {

              const isOpen = openGuideIndex === index;

              return (
                <div
                  key={guide.title}
                  className="border-b last:border-b-0 border-slate-200"
                >

                  <button
                    type="button"
                    onClick={() =>
                      setOpenGuideIndex(isOpen ? -1 : index)
                    }
                    className={`
                      w-full
                      text-left
                      px-5 py-4
                      flex items-center justify-between gap-4
                      text-xs sm:text-sm
                      font-bold
                      transition
                      ${
                        isOpen
                          ? "bg-purple-50 text-[#6b1d57]"
                          : "text-slate-800 hover:bg-slate-50"
                      }
                    `}
                  >

                    <span>{guide.title}</span>

                    <span className="shrink-0">
                      {isOpen ? (
                        <ChevronUp size={17} />
                      ) : (
                        <ChevronDown size={17} />
                      )}
                    </span>

                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-7 py-5 bg-white">

                      <div className="space-y-3">

                        {guide.steps.map((step) => (
                          <div
                            key={step}
                            className="flex gap-3 text-xs text-slate-600 leading-6"
                          >

                            <CheckCircle2
                              size={16}
                              className="shrink-0 text-emerald-600 mt-1"
                            />

                            <p>{step}</p>

                          </div>
                        ))}

                      </div>
                    </div>
                  )}

                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* =====================================================
          GOVERNMENT LINKS
      ===================================================== */}

      <section className="py-16 bg-slate-100/70">

        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <SectionHeading
            icon={Link2}
            title="গুরুত্বপূর্ণ লিংক সমূহ"
            description="সরকারি ও ভূমি সংক্রান্ত গুরুত্বপূর্ণ অনলাইন পোর্টাল।"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {govtLinks.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.url}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group
                    bg-white
                    p-4
                    rounded-2xl
                    border border-slate-200
                    flex items-center gap-4
                    hover:-translate-y-1
                    hover:border-[#6b1d57]/30
                    hover:shadow-lg
                    transition-all duration-300
                  "
                >

                  <div className="
                    w-11 h-11
                    shrink-0
                    rounded-xl
                    bg-purple-50
                    border border-purple-100
                    text-[#6b1d57]
                    flex items-center justify-center
                    group-hover:bg-[#6b1d57]
                    group-hover:text-white
                    transition
                  ">
                    <Icon size={20} />
                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="font-bold text-xs text-slate-800 group-hover:text-[#6b1d57]">
                      {item.title}
                    </p>

                    <p className="text-[10px] text-slate-400 font-mono mt-1 truncate">
                      {item.domain}
                    </p>

                  </div>

                  <ExternalLink
                    size={14}
                    className="text-slate-300 group-hover:text-[#6b1d57]"
                  />

                </a>
              );
            })}

          </div>
        </div>
      </section>

      {/* =====================================================
          NEWSLETTER
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#6b1d57] text-white py-14">

        <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-xl mx-auto px-4 text-center">

          <div className="w-14 h-14 mx-auto rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center mb-4">
            <Mail size={24} />
          </div>

          <h3 className="text-xl font-extrabold">
            নিউজলেটার সাবস্ক্রাইব করুন
          </h3>

          <p className="text-xs text-purple-200 mt-2 mb-6 leading-6">
            ভূমি সংক্রান্ত সর্বশেষ তথ্য ও আপডেট পেতে আমাদের নিউজলেটারে
            সাবস্ক্রাইব করুন।
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="
              flex
              items-center
              bg-white/10
              border border-white/20
              rounded-full
              p-1
              max-w-md
              mx-auto
              backdrop-blur
            "
          >

            <input
              type="email"
              placeholder="আপনার ইমেইল দিন..."
              className="
                flex-1
                min-w-0
                bg-transparent
                px-4 py-2.5
                text-xs
                text-white
                placeholder-purple-200
                focus:outline-none
              "
            />

            <button
              type="submit"
              className="
                shrink-0
                bg-amber-400
                hover:bg-amber-300
                text-slate-950
                font-bold
                text-xs
                px-5 py-2.5
                rounded-full
                transition
              "
            >
              সাবস্ক্রাইব
            </button>

          </form>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="bg-[#3d1035] text-purple-100 pt-14 pb-6">

        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

            {/* About */}
            <div>

              <div className="flex items-center gap-3 mb-4">

                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                  <img
                    src="/logo-mark.png"
                    alt=""
                    className="w-7 h-7 object-contain"
                  />
                </div>

                <div>
                  <h3 className="font-extrabold text-sm text-white">
                    ভূমি সেবা সহায়তা কেন্দ্র
                  </h3>

                  <p className="text-[9px] text-purple-300 mt-0.5">
                    E-Vumi Seba
                  </p>
                </div>

              </div>

              <p className="text-[11px] text-purple-200 leading-6">
                বাংলাদেশের ভূমি সংক্রান্ত বিভিন্ন সেবা, তথ্য,
                হিসাব ও সহায়তা এক প্ল্যাটফর্মে।
              </p>

              <div className="mt-4 inline-flex items-center gap-2 bg-emerald-600 text-white text-[10px] font-bold px-3 py-2 rounded-full">
                <Phone size={12} />
                হটলাইন: 01332052506
              </div>

            </div>

            {/* Quick Links */}
            <div>

              <h4 className="text-sm font-bold text-amber-400 mb-4">
                দ্রুত লিংক
              </h4>

              <ul className="space-y-2.5 text-xs text-purple-200">

                {[
                  ["হোম", "/"],
                  ["সেবা সমূহ", "#services"],
                  ["ভূমি ক্যালকুলেটর", "#tools"],
                  ["ফোরাম", "#forum"],
                  ["আবেদন ট্র্যাকিং", "/track"],
                  ["সহায়তাকারী খুঁজুন", "#find-agent"],
                  ["সাপোর্ট সেন্টার", "/dashboard/support"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="hover:text-white transition"
                    >
                      › {label}
                    </Link>
                  </li>
                ))}

              </ul>
            </div>

            {/* Services */}
            <div>

              <h4 className="text-sm font-bold text-amber-400 mb-4">
                প্রধান সেবা
              </h4>

              <ul className="space-y-2.5 text-xs text-purple-200">

                {[
                  ["ই-নামজারি", "/services/mutation"],
                  ["ভূমি উন্নয়ন কর", "/services/tax"],
                  ["ভূমি রেকর্ড ও পর্চা", "/services/khatian"],
                  ["মৌজা ম্যাপ", "/services/mouza-map"],
                  ["মিস কেস আবেদন", "/services/khatian-correction"],
                  ["উত্তরাধিকার ক্যালকুলেটর", "/services/calculator"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="hover:text-white transition"
                    >
                      › {label}
                    </Link>
                  </li>
                ))}

              </ul>
            </div>

            {/* Contact */}
            <div>

              <h4 className="text-sm font-bold text-amber-400 mb-4">
                যোগাযোগ
              </h4>

              <ul className="space-y-3 text-[11px] text-purple-200">

                <li className="flex gap-2">
                  <MapPinned size={14} className="shrink-0" />
                  <span>
                    ভূমি সেবা সহায়তা কেন্দ্র, বাংলাদেশ
                  </span>
                </li>

                <li className="flex gap-2">
                  <Phone size={14} className="shrink-0" />
                  <span>+880 1700-000000</span>
                </li>

                <li className="flex gap-2">
                  <Mail size={14} className="shrink-0" />
                  <span>support@evumiseba.com</span>
                </li>

                <li className="flex gap-2">
                  <Clock3 size={14} className="shrink-0" />
                  <span>
                    রবিবার - বৃহস্পতিবার
                    <br />
                    সকাল ৯:০০ - বিকাল ৫:০০
                  </span>
                </li>

              </ul>

            </div>

          </div>

          {/* Bottom */}
          <div className="
            pt-5
            border-t border-white/10
            flex flex-col sm:flex-row
            justify-between
            items-center
            gap-3
            text-[10px]
            text-purple-300
          ">

            <p className="text-center sm:text-left">
              © ২০২৬ সর্বস্বত্ব সংরক্ষিত • E-Vumi Seba
            </p>

            <div className="flex items-center gap-4">

              <Link
                href="/privacy"
                className="hover:text-white transition"
              >
                গোপনীয়তা নীতিমালা
              </Link>

              <Link
                href="/terms"
                className="hover:text-white transition"
              >
                শর্তাবলী
              </Link>

            </div>

          </div>

        </div>
      </footer>

    </main>
  );
}
