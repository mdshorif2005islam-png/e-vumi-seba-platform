"use client";
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

import React, { useState } from "react";
import Link from "next/link";

// ২৬টি সেবার তালিকা (সরকারি ফি ও সেবা ফি সহ - ছবির মতো ব্যাজ স্টাইলে)
const services = [
  { title: "নামজারি / ই-নামজারি সহায়তা", serviceFee: "৳২৮০", govtFee: "৳১১৭০", slug: "mutation", icon: "⇄" },
  { title: "অনলাইন ভূমি উন্নয়ন কর (খাজনা)", serviceFee: "৳৫০", govtFee: "নির্ধারিত", slug: "tax", icon: "💳" },
  { title: "খতিয়ান / পরচা সহায়তা", serviceFee: "৳৮০", govtFee: "৳১০০", slug: "khatian", icon: "📄" },
  { title: "মৌজা ম্যাপ সংগ্রহ", serviceFee: "৳১০০", govtFee: "৳৫২০", slug: "mouza-map", icon: "🗺️" },
  { title: "সরকারি লিজ নবায়ন", serviceFee: "৳২০০", govtFee: "নির্ধারিত", slug: "lease", icon: "🏛️" },
  { title: "বন্দোবস্ত সনদ", serviceFee: "৳১০০", govtFee: "৳২০০", slug: "bondobosto", icon: "📜" },
  { title: "জমির শ্রেণী পরিবর্তন", serviceFee: "৳২০০", govtFee: "নির্ধারিত", slug: "class-change", icon: "🔀" },
  { title: "অর্পিত সম্পত্তি অবমুক্তকরণ", serviceFee: "৳১২০", govtFee: "৳২০০", slug: "vested-property", icon: "🏢" },
  { title: "খতিয়ান সংশোধনের আবেদন (মিস কেস)", serviceFee: "৳১২০", govtFee: "৳২০০", slug: "khatian-correction", icon: "🔨" },
  { title: "খাস জমি বরাদ্দ আবেদন", serviceFee: "৳৩০০", govtFee: "বিনামূল্যে", slug: "khas-land", icon: "🌱" },
  { title: "হুকুমদখল ও অধিগ্রহণ সনদ", serviceFee: "৳২০০", govtFee: "৳১০০", slug: "acquisition", icon: "🏗️" },
  { title: "দলিল যাচাই ও সার্টিফাইড কপি", serviceFee: "৳১০০", govtFee: "নির্ধারিত", slug: "deed-check", icon: "🔍" },
  { title: "ওয়ারিশান সনদ আবেদন", serviceFee: "৳১০০", govtFee: "বিনামূল্যে", slug: "succession", icon: "👨‍👩‍👧‍👦" },
  { title: "ভূমি সীমানা নির্ধারণ ও জরিপ", serviceFee: "৳১৫০", govtFee: "নির্ধারিত", slug: "survey", icon: "📐" },
  { title: "বাস্তুভিটা ও আশ্রয়ণ পোর্টাল", serviceFee: "৳৫০", govtFee: "বিনামূল্যে", slug: "housing", icon: "🏠" },
  { title: "জলমহাল ও বালুমহাল ইজারা", serviceFee: "৳১২০", govtFee: "নির্ধারিত", slug: "waterbody", icon: "🌊" },
  { title: "বিআরএস রেকর্ড অনলাইন", serviceFee: "৳৮০", govtFee: "৳১২০", slug: "brs-record", icon: "🗂️" },
  { title: "চা বাগান ও বাগানবাড়ি লিজ", serviceFee: "৳৫০০", govtFee: "৳২০০", slug: "tea-estate", icon: "🌲" },
  { title: "দেওয়ানি ও রাজস্ব মামলা নথি", serviceFee: "৳১৫০", govtFee: "৳২০০", slug: "court-copy", icon: "⚖️" },
  { title: "রেজিস্ট্রেশন ফি ক্যালকুলেটর", serviceFee: "ফ্রি", govtFee: "", slug: "calculator", icon: "🧮" },
  { title: "পাওয়ার অফ অ্যাটর্নি সেবা", serviceFee: "৳৫০০", govtFee: "নির্ধারিত", slug: "power-of-attorney", icon: "✍️" },
  { title: "বণ্টননামা দলিল সহায়তা", serviceFee: "৳৫০০", govtFee: "নির্ধারিত", slug: "partition", icon: "🤝" },
  { title: "ভূমি জরিপ আপত্তি আবেদন", serviceFee: "৳১৫০", govtFee: "৳১০০", slug: "survey-objection", icon: "⚠️" },
  { title: "প্রবাসী ভূমি সেবা", serviceFee: "৳৩০০", govtFee: "নির্ধারিত", slug: "expatriate", icon: "✈️" },
  { title: "ই-পাসপোর্টের ভূমি যাচাই", serviceFee: "৳১০০", govtFee: "বিনামূল্যে", slug: "passport-verification", icon: "🛂" },
  { title: "আইনি পরামর্শ ও ল্যান্ড অ্যাটর্নি", serviceFee: "৳৩০০", govtFee: "", slug: "legal-counsel", icon: "👨‍⚖️" },
];

// ১২টি ভূমি টুলস ও ক্যালকুলেটর
const landTools = [
  { name: "একক রূপান্তর", desc: "শতক, কাঠা, বিঘা ও একর রূপান্তর", icon: "📏", link: "/services/calculator" },
  { name: "প্লট ক্ষেত্রফল", desc: "দৈর্ঘ্য-প্রস্থ দিয়ে জমির মাপ হিসাব", icon: "📐", link: "/services/calculator" },
  { name: "আনা-গণ্ডা-কড়া", desc: "পুরাতন খতিয়ানের অংশ হিসাব", icon: "🔢", link: "/services/calculator" },
  { name: "জমির দাম", desc: "শতক ও কাঠা অনুযায়ী মূল্যের হিসাব", icon: "💰", link: "/services/calculator" },
  { name: "নিবন্ধন ব্যয়", desc: "দলিল রেজিস্ট্রেশন সরকারি ফি হিসাব", icon: "📑", link: "/services/calculator" },
  { name: "খাজনা হিসাব", desc: "কৃষি ও অকৃষি জমির কর নির্ধারণ", icon: "🧾", link: "/services/tax" },
  { name: "নকল ও তল্লাশ ফি", desc: "সার্টিফাইড কপি তোলার খরচ", icon: "🔎", link: "/services/deed-check" },
  { name: "উত্তরাধিকার বণ্টন", desc: "ফারায়েজ অনুযায়ী ওয়ারিশদের অংশ", icon: "⚖️", link: "/services/succession" },
  { name: "হিস্যা বণ্টন", desc: "একাধিক মালিকের জমির অংশীদারিত্ব", icon: "📊", link: "/services/partition" },
  { name: "মৌজা রেট", desc: "এলাকাভিত্তিক জমির সরকারি সর্বনিম্ন মূল্য", icon: "📍", link: "/services/calculator" },
  { name: "মৌজা ম্যাপ খুঁজুন", desc: "সিএস, আরএস ও বিআরএস নকশা", icon: "🗺️", link: "/services/mouza-map" },
  { name: "দাগ ও খতিয়ান সার্চ", desc: "অনলাইনে জমির রেকর্ড অনুসন্ধান", icon: "📂", link: "/services/khatian" },
];

// জমি মার্কেটপ্লেস ডেমো ডাটা
const marketplaceItems = [
  { price: "৳৩৫,০০,০০০", size: "৫.৫ শতক | আবাসিক", location: "সাভার, ঢাকা" },
  { price: "৳১২,৫০,০০০", size: "১০ শতক | ভিটা জমি", location: "সৈয়দপুর, নীলফামারী" },
  { price: "৳১৮,০০,০০০", size: "১২.৫ শতক | কৃষি জমি", location: "সদর, রংপুর" },
  { price: "৳৪৫,০০,০০০", size: "৩ কাঠা | বাণিজ্যিক", location: "গাজীপুর সদর, গাজীপুর" },
];

// সাম্প্রতিক ব্লগ পোস্ট
const blogPosts = [
  {
    title: "ই-নামজারি আবেদনের সম্পূর্ণ প্রক্রিয়া: কাগজপত্র, ফি, শুনানি ও প্রতিকার",
    date: "২৫ অক্টোবর, ২০২৬",
    category: "নামজারি গাইড",
    excerpt: "জমি ক্রয়ের পর বা ওয়ারিশ সূত্রে মালিকানা পরিবর্তনের জন্য অনলাইনে কিভাবে নির্ভুলভাবে ই-নামজারি আবেদন করবেন...",
  },
  {
    title: "জমি ক্রয়-বিক্রয়ের পূর্বে খতিয়ান, দাগ ও দলিল যাচাইয়ের অপরিহার্য নিয়ম",
    date: "২০ অক্টোবর, ২০২৬",
    category: "ভূমি সচেতনতা",
    excerpt: "প্রতারণা এড়াতে জমি কেনার আগে সিএস, এসএ, আরএস ও বিএস খতিয়ান এবং সাব-রেজিস্ট্রি অফিসের রেকর্ড যেভাবে মিলাবেন...",
  },
  {
    title: "ভূমি উন্নয়ন কর (খাজনা) প্রদানের নিয়ম, ছাড়, জরিমানা ও দাখিলা ডাউনলোড",
    date: "১৫ অক্টোবর, ২০২৬",
    category: "ভূমি কর",
    excerpt: "এখন ঘরে বসেই মোবাইল ব্যাংকিংয়ের মাধ্যমে জমির খাজনা পরিশোধ করে তাৎক্ষণিক কিউআর কোডযুক্ত দাখিলা সংগ্রহ করুন...",
  },
];

// ফোরাম আলোচনা
const forumTopics = [
  { title: "নামজারি খতিয়ানে নামের বানান ভুল হলে করণীয় কী?", author: "মোঃ রাশেদুল ইসলাম", time: "২ ঘন্টা আগে", replies: "৫ উত্তর" },
  { title: "অনলাইনে মৌজা ম্যাপ অর্ডার করার কত দিন পর ডেলিভারি পাওয়া যায়?", author: "আব্দুল করিম", time: "৫ ঘন্টা আগে", replies: "৩ উত্তর" },
  { title: "হোল্ডিং নম্বর অনুমোদন হতে কত সময় লাগে?", author: "সাদিয়া আফরিন", time: "১ দিন আগে", replies: "৭ উত্তর" },
  { title: "ই-নামজারি ও ভূমি উন্নয়ন কর সংক্রান্ত জরুরি প্রশ্ন", author: "ভূমি সেবা সহায়তা ডেস্ক", time: "২ দিন আগে", replies: "১২ উত্তর" },
  { title: "ওয়ারিশ সনদ দিয়ে কি সরাসরি যৌথ নামজারি করা যাবে?", author: "মাহমুদুল হাসান", time: "৩ দিন আগে", replies: "৪ উত্তর" },
];

// ভূমি সেবা গাইড
const guides = [
  {
    title: "কিভাবে অনলাইনে ই-নামজারি আবেদন করবেন?",
    steps: [
      "১. আমাদের প্ল্যাটফর্ম থেকে 'ই-নামজারি সহায়তা' নির্বাচন করুন অথবা mutation.land.gov.bd ওয়েবসাইটে যান",
      "২. 'নতুন আবেদন' অপশনে ক্লিক করুন এবং মোবাইল নম্বর দিয়ে নিবন্ধন সম্পন্ন করুন",
      "৩. প্রয়োজনীয় তথ্য পূরণ করুন (বিভাগ, জেলা, উপজেলা, মৌজা, খতিয়ান নং ও দাগ নং)",
      "৪. আবেদনকারীর ছবি, এনআইডি ও দলিলের স্ক্যান কপি আপলোড করুন",
      "৫. কোর্ট ফি ২০ টাকা ও নোটিশ জারি ফি ৫০ টাকা (মোট ৭০ টাকা) অনলাইনে পরিশোধ করুন",
      "৬. আবেদন সাবমিট করুন এবং ট্র্যাকিং নম্বর সংরক্ষণ করুন",
    ],
  },
  {
    title: "অনলাইনে ভূমি উন্নয়ন কর (খাজনা) কিভাবে দিবেন?",
    steps: [
      "১. 'অনলাইন ভূমি উন্নয়ন কর' সেবায় ক্লিক করুন বা ldtax.gov.bd পোর্টালে যান",
      "২. এনআইডি ও মোবাইল নম্বর দিয়ে নাগরিক নিবন্ধন করুন",
      "৩. খতিয়ান ও হোল্ডিং তথ্য যুক্ত করে বকেয়া ও হাল সনের কর যাচাই করুন",
      "৪. বিকাশ/নগদ/রকেটের মাধ্যমে কর পরিশোধ করে তাৎক্ষণিক ডিজিটাল দাখিলা ডাউনলোড করুন",
    ],
  },
  {
    title: "কিভাবে অনলাইনে পর্চা/খতিয়ান সংগ্রহ করবেন?",
    steps: [
      "১. বিভাগ, জেলা, উপজেলা ও মৌজা নির্বাচন করুন",
      "২. সার্ভে টাইপ (CS, SA, RS, BRS/BS) সিলেক্ট করে খতিয়ান বা দাগ নম্বর দিয়ে খুঁজুন",
      "৩. নির্ধারিত সরকারি ফি ও সেবা ফি পরিশোধ করে অনলাইন বা সার্টিফাইড কপির আবেদন করুন",
    ],
  },
  {
    title: "জমি কেনার আগে যা যা অবশ্যই যাচাই করবেন",
    steps: [
      "১. বিক্রেতার নামে সর্বশেষ খতিয়ান (BS/RS/SA) ও নামজারি সঠিক আছে কিনা যাচাই করুন",
      "২. দাগ নম্বর ও মৌজা ম্যাপের সাথে বাস্তবে জমির অবস্থান ও দখল মিলিয়ে দেখুন",
      "৩. হাল সন পর্যন্ত খাজনা পরিশোধের দাখিলা এবং বায়া দলিল যাচাই করুন",
    ],
  },
];

// গুরুত্বপূর্ণ সরকারি লিংক
const govtLinks = [
  { title: "ভূমি মন্ত্রণালয়", url: "https://minland.gov.bd", domain: "minland.gov.bd", icon: "🏛️" },
  { title: "আর.এস খতিয়ান ব্যবস্থাপনা", url: "http://settlement.gov.bd", domain: "settlement.gov.bd", icon: "📄" },
  { title: "ই-নামজারি সিস্টেম", url: "https://mutation.land.gov.bd", domain: "mutation.land.gov.bd", icon: "📝" },
  { title: "ভূমি রেকর্ড ও ম্যাপ", url: "https://dlrms.land.gov.bd", domain: "dlrms.land.gov.bd", icon: "🗺️" },
  { title: "জাতীয় ভূমি পোর্টাল", url: "https://land.gov.bd", domain: "land.gov.bd", icon: "🌐" },
  { title: "ভূমি উন্নয়ন কর পোর্টাল", url: "https://portal.ldtax.gov.bd", domain: "portal.ldtax.gov.bd", icon: "💳" },
];

export default function HomePage() {
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [openGuideIndex, setOpenGuideIndex] = useState<number>(0);

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-800 font-sans">
      {/* ================= ১. TOP NAVBAR (হুবহু ছবি ১ এর মতো ফিক্সড) ================= */}
      <header className="sticky top-0 z-50 bg-[#52154e] text-white shadow-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex justify-between items-center">
          {/* FIX 1: ঘর আইকন সহ SVG লোগো (কোনো বাহ্যিক ইমেজ ফাইল লাগবে না) */}
          <Link href="/" className="flex items-center shrink-0 group" aria-label="ভূমি সেবা সহায়তা কেন্দ্র">
            <div className="flex flex-col items-center justify-center">
              <svg
                className="w-10 h-10 text-white"
                viewBox="0 0 64 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* ঘরের চাল */}
                <path
                  d="M8 26L32 6L56 26"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 25L32 12L48 25"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* ঘরের বডি */}
                <rect x="15" y="25" width="34" height="24" rx="2" fill="white" />
                <text
                  x="32"
                  y="35"
                  textAnchor="middle"
                  fill="#52154e"
                  fontSize="6.5"
                  fontWeight="bold"
                >
                  ভূমি সেবা
                </text>
                <text
                  x="32"
                  y="43"
                  textAnchor="middle"
                  fill="#52154e"
                  fontSize="5.2"
                  fontWeight="bold"
                >
                  সহায়তা কেন্দ্র
                </text>
              </svg>
            </div>
          </Link>

          {/* Menu Items (হুবহু ছবি ১ অনুযায়ী) */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-purple-100">
            <Link href="/" className="text-amber-400 font-bold">হোম</Link>
            <Link href="#services" className="hover:text-amber-300 transition">সেবা সমূহ ▾</Link>
            <Link href="#tools" className="hover:text-amber-300 transition">টুলস ▾</Link>
            <Link href="#find-agent" className="hover:text-amber-300 transition">সহায়তাকারী খুঁজুন</Link>
            <Link href="#marketplace" className="hover:text-amber-300 transition">জমি কিনুন</Link>
            <Link href="#forum" className="hover:text-amber-300 transition">কমিউনিটি ▾</Link>
            <Link href="/track" className="hover:text-amber-300 transition">যোগাযোগ</Link>
            <Link href="/dashboard/support" className="hover:text-amber-300 transition">সম্পর্কে</Link>
          </nav>

          {/* FIX 2: White Pill Login Button (লেখা ও আইকন স্পষ্টভাবে দেখা যাবে) */}
          <div className="flex items-center">
            <Link
              href="/track"
              style={{ backgroundColor: "#ffffff", color: "#52154e" }}
              className="hover:opacity-95 font-bold text-xs px-5 py-2 rounded-full shadow flex items-center justify-center gap-1.5 transition"
            >
              <span className="w-4 h-4 rounded-full bg-[#52154e] text-white flex items-center justify-center text-[9px]">
                👤
              </span>
              <span style={{ color: "#52154e", fontWeight: 700 }}>লগইন</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ================= ২. HERO SECTION (হুবহু ছবি ১ এর মতো ফিক্সড) ================= */}
      <section className="bg-gradient-to-br from-[#691b60] via-[#581650] to-[#42103c] text-white py-12 lg:py-16 border-b border-purple-900">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-5">
            {/* FIX 3: তারিখের ব্যাজ হুবহু ছবি ১ এর মতো */}
            <div className="inline-block bg-[#6b344c]/70 border border-amber-400/50 text-amber-300 text-xs font-medium px-4 py-1.5 rounded-full shadow-sm">
              সোমবার, ২৬ অক্টোবর ২০২৬
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold leading-snug tracking-tight">
              বাংলাদেশের ভূমি সেবা প্ল্যাটফর্ম
            </h1>

            {/* FIX 4: প্যারাগ্রাফ ও সাদা পিল বাটন "বৃত্তান্ত জানুন" */}
            <p className="text-purple-100 text-xs sm:text-sm leading-relaxed">
              সারাদেশে আমাদের ভূমি সেবা সহায়তাকারী দল আপনার জমি সংক্রান্ত সকল কাজে সহায়তার জন্য প্রস্তুত{" "}
              <button
                type="button"
                style={{ backgroundColor: "#ffffff", color: "#1d4ed8" }}
                className="inline-flex items-center gap-1 font-bold text-[11px] px-3 py-0.5 rounded-full ml-1.5 shadow-sm align-middle"
              >
                <span>📰</span> বৃত্তান্ত জানুন
              </button>
            </p>

            {/* FIX 5: প্রধান ২টি বাটন ও নিচের ৩টি পিল ব্যাজ হুবহু ছবি ১ এর মতো */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="#services"
                style={{ backgroundColor: "#fbbf24", color: "#1e1b4b" }}
                className="hover:bg-amber-400 font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-md flex items-center gap-2 transition"
              >
                <span>👉</span> সেবা নিন
              </Link>
              <Link
                href="#find-agent"
                className="bg-white/10 hover:bg-white/20 border border-white/35 text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-full flex items-center gap-2 transition"
              >
                <span>🔍</span> সহায়তাকারী খুঁজুন
              </Link>
            </div>

            {/* 3 Small Feature Pills */}
            <div className="flex flex-wrap gap-2.5 pt-1 text-[11px] text-purple-100">
              <span className="bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
                <span className="text-emerald-400">🛡️</span> নিরাপদ সেবা
              </span>
              <span className="bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
                <span className="text-amber-400">⚡</span> দ্রুত প্রক্রিয়া
              </span>
              <span className="bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
                <span className="text-rose-400">📍</span> সারাদেশে কার্যক্রম
              </span>
            </div>
          </div>

          {/* FIX 6: Right Column Banner Card (ছবি না থাকলেও কখনো ভাঙবে না, আর ছবি দিলে ছবির ওপরে টেক্সট ও স্লাইডার বাটন দেখাবে) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border-[3px] border-white shadow-2xl bg-gradient-to-b from-sky-200 via-emerald-100 to-emerald-800 aspect-[16/10] flex flex-col justify-between">
              {/* যদি আপনি public/hero-banner.png ফাইল রাখেন তবে সেটি অটোমেটিক দেখাবে, না থাকলেও নিচের গ্রাফিক কার্ডটি হুবহু ছবির মতো দেখাবে */}
              <img
                src="/hero-banner.png"
                alt="ভূমি সেবা সহায়তা কেন্দ্র"
                className="absolute inset-0 w-full h-full object-cover z-10"
                onError={(e) => {
                  // যদি ফোল্ডারে ছবি না থাকে, তবে ভাঙা আইকন লুকিয়ে ফেলবে
                  e.currentTarget.style.display = "none";
                }}
              />

              {/* Fallback Visual Illustration (যখন ফোল্ডারে hero-banner.png থাকবে না তখন এটি দেখাবে) */}
              <div className="relative z-0 flex-1 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-sky-300/80 via-emerald-200/70 to-emerald-900/90">
                <div className="bg-emerald-800 text-white font-extrabold text-sm sm:text-lg px-5 py-1.5 rounded shadow-md border-2 border-white/80 mb-2">
                  ভূমি সেবা সহায়তা কেন্দ্র
                </div>
                <div className="bg-white/95 rounded-lg p-4 shadow-lg border border-slate-300 w-4/5 max-w-sm flex items-center justify-around text-3xl">
                  <span>🌳</span>
                  <span>🏢</span>
                  <span>👨‍🌾</span>
                  <span>👩‍💼</span>
                  <span>🌳</span>
                </div>
              </div>

              {/* বাম ও ডান পাশের স্লাইডার অ্যারো (ছবি ১ অনুযায়ী) */}
              <button
                type="button"
                aria-label="Previous slide"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/25 hover:bg-black/40 text-white flex items-center justify-center text-sm"
              >
                ❮
              </button>
              <button
                type="button"
                aria-label="Next slide"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/25 hover:bg-black/40 text-white flex items-center justify-center text-sm"
              >
                ❯
              </button>

              {/* নিচের ডার্ক ওভারলে টেক্সট ও ডট ইন্ডিকেটর */}
              <div className="relative z-20 bg-gradient-to-t from-black/85 via-black/50 to-transparent pt-8 pb-3 px-4 text-center">
                <p className="text-white font-extrabold text-base sm:text-xl drop-shadow">
                  ভূমি সেবা এখন আপনার দোরগোড়ায়
                </p>
                <div className="flex justify-center gap-1.5 mt-1.5">
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                  <span className="w-2 h-2 rounded-full bg-white/50"></span>
                  <span className="w-2 h-2 rounded-full bg-white/50"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ৩. ভূমি সংক্রান্ত সেবা সমূহ (২৬টি কার্ড) ================= */}
      <section id="services" className="py-12 max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#6b1d57] inline-block border-b-2 border-[#6b1d57] pb-1">
            ভূমি সংক্রান্ত সেবা সমূহ
          </h2>
          <p className="text-xs text-slate-500 mt-2">
            আপনার প্রয়োজনীয় ভূমি সেবা নির্বাচন করুন — সুনির্দিষ্ট ফি, স্বচ্ছ প্রক্রিয়া{" "}
            <span className="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded text-[10px] border border-blue-200">
              🔊 শুনুন নতুন
            </span>
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
          {services.map((service, idx) => (
            <Link
              href={`/services/${service.slug}`}
              key={idx}
              className="bg-white rounded-lg border border-slate-200 p-4 text-center hover:shadow-md hover:border-[#6b1d57] transition flex flex-col items-center justify-between group"
            >
              <div className="text-2xl text-[#6b1d57] mb-2 group-hover:scale-110 transition">
                {service.icon}
              </div>
              <h3 className="font-bold text-slate-800 text-xs sm:text-[13px] leading-snug mb-3">
                {service.title}
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-1 mt-auto">
                <span className="bg-[#15803d] text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                  সেবা ফি {service.serviceFee}
                </span>
                {service.govtFee && (
                  <span className="bg-[#eab308] text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded">
                    সরকারি {service.govtFee}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center items-center gap-3 mt-8">
          <Link
            href="#guides"
            className="border border-[#6b1d57] text-[#6b1d57] hover:bg-purple-50 text-xs font-bold px-5 py-2 rounded-full transition"
          >
            সেবার দরপত্র বিস্তারিত →
          </Link>
          <Link
            href="/track"
            className="bg-[#6b1d57] hover:bg-[#521542] text-white text-xs font-bold px-5 py-2 rounded-full shadow transition"
          >
            একটি সেবা নিন 🛒
          </Link>
        </div>
      </section>

      {/* ================= ৪. কেন ভূমি সেবা সহায়তাকারী? ================= */}
      <section className="py-12 bg-[#f3eff5] border-y border-purple-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#6b1d57]">
              কেন ভূমি সেবা সহায়তাকারী?
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              সরকারি কাঠামোর আওতায় পরিচালিত — নিরাপদ, স্বচ্ছ ও সময়ের সাশ্রয়ী
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-5 text-center border border-slate-200/80 shadow-sm">
              <div className="text-3xl text-[#6b1d57] mb-2">🏛️</div>
              <h3 className="font-bold text-slate-800 text-xs sm:text-sm mb-1.5">
                সরকারি প্রকল্পের অংশ
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                ভূমি মন্ত্রণালয়ের নির্ধারিত নীতিমালা অনুযায়ী পরিচালিত সেবা সহায়তা। প্রতিটি সেবার ফি পূর্বনির্ধারিত।
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 text-center border border-slate-200/80 shadow-sm">
              <div className="text-3xl text-emerald-600 mb-2">🛡️</div>
              <h3 className="font-bold text-slate-800 text-xs sm:text-sm mb-1.5">
                এসক্রো পেমেন্ট সুরক্ষা
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                আপনার প্রদত্ত সেবা ফি কাজ শেষ না হওয়া পর্যন্ত আমাদের সিস্টেমে সুরক্ষিত থাকে। কাজ শেষে এজেন্ট পেমেন্ট পান।
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 text-center border border-slate-200/80 shadow-sm">
              <div className="text-3xl text-blue-600 mb-2">🗺️</div>
              <h3 className="font-bold text-slate-800 text-xs sm:text-sm mb-1.5">
                সারাদেশে সেবা নেটওয়ার্ক
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                ৬৪ জেলার প্রতিটি উপজেলায় আমাদের তালিকাভুক্ত ও প্রশিক্ষিত ভূমি সেবা সহায়তাকারী প্রতিনিধি রয়েছেন।
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 text-center border border-slate-200/80 shadow-sm">
              <div className="text-3xl text-amber-500 mb-2">🎧</div>
              <h3 className="font-bold text-slate-800 text-xs sm:text-sm mb-1.5">
                অভিযোগ ও জবাবদিহিতা
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                যেকোনো আবেদনের রিয়েল-টাইম ট্র্যাকিং এবং সরাসরি সাপোর্ট টিকিটের মাধ্যমে দ্রুত সমাধানের নিশ্চয়তা।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ৫. এক নজরে (Stats Banner) ================= */}
      <section className="py-10 bg-[#6b1d57] text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h3 className="text-base sm:text-lg font-bold mb-1">
            এক নজরে E-Vumi Seba Zone
          </h3>
          <div className="w-12 h-0.5 bg-amber-400 mx-auto mb-8"></div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            <div>
              <div className="text-xl mb-1 opacity-80">🏢</div>
              <p className="text-2xl sm:text-3xl font-extrabold">৮৯৮</p>
              <p className="text-[11px] text-purple-200 mt-0.5">তালিকাভুক্ত সহায়তাকারী</p>
            </div>
            <div>
              <div className="text-xl mb-1 opacity-80">🗺️</div>
              <p className="text-2xl sm:text-3xl font-extrabold">৬১</p>
              <p className="text-[11px] text-purple-200 mt-0.5">জেলায় বিস্তৃত</p>
            </div>
            <div>
              <div className="text-xl mb-1 opacity-80">✅</div>
              <p className="text-2xl sm:text-3xl font-extrabold">৮৭</p>
              <p className="text-[11px] text-purple-200 mt-0.5">নিবন্ধিত সহায়তাকারী</p>
            </div>
            <div>
              <div className="text-xl mb-1 opacity-80">👥</div>
              <p className="text-2xl sm:text-3xl font-extrabold">১,০৩১</p>
              <p className="text-[11px] text-purple-200 mt-0.5">নিবন্ধিত নাগরিক</p>
            </div>
            <div>
              <div className="text-xl mb-1 opacity-80">🧮</div>
              <p className="text-2xl sm:text-3xl font-extrabold">১২</p>
              <p className="text-[11px] text-purple-200 mt-0.5">বিনামূল্যে ভূমি টুল</p>
            </div>
            <div>
              <div className="text-xl mb-1 opacity-80">🌱</div>
              <p className="text-2xl sm:text-3xl font-extrabold">২৬</p>
              <p className="text-[11px] text-purple-200 mt-0.5">সক্রিয় ডিজিটাল সেবা</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ৬. ভূমি সংক্রান্ত টুল ও ক্যালকুলেটর ================= */}
      <section id="tools" className="py-12 max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#6b1d57]">
            🧮 ভূমি সংক্রান্ত টুল ও ক্যালকুলেটর
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            জমির হিসাব, কর ও উত্তরাধিকার বণ্টন — ১২ টি টুল, সম্পূর্ণ বিনামূল্যে
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {landTools.map((tool, index) => (
            <Link
              href={tool.link}
              key={index}
              className="bg-white p-3.5 rounded-lg border border-slate-200 hover:border-[#6b1d57] hover:shadow-sm transition flex items-center gap-3 group"
            >
              <span className="text-xl bg-purple-50 text-[#6b1d57] p-2 rounded-md">
                {tool.icon}
              </span>
              <div className="text-left">
                <h3 className="font-bold text-slate-800 text-xs group-hover:text-[#6b1d57]">
                  {tool.name}
                </h3>
                <p className="text-[10px] text-slate-500 line-clamp-1">{tool.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= ৭. ভূমি সেবা সহায়তাকারী খুঁজুন ================= */}
      <section id="find-agent" className="py-10 bg-white border-y border-slate-200">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-[#6b1d57]">
            🔍 ভূমি সেবা সহায়তাকারী খুঁজুন
          </h2>
          <p className="text-xs text-slate-500 mt-1 mb-6">
            আপনার এলাকার ভূমি সেবা সহায়তা কেন্দ্র খুঁজে বের করুন
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:border-[#6b1d57]"
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
              className="px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:border-[#6b1d57]"
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
              className="bg-[#6b1d57] hover:bg-[#521542] text-white font-bold py-2.5 px-5 rounded-lg text-xs flex items-center justify-center gap-1.5 transition"
            >
              🔍 খুঁজুন
            </Link>
          </div>
        </div>
      </section>

      {/* ================= ৮. জমি মার্কেটপ্লেস ================= */}
      <section id="marketplace" className="py-10 max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div className="border-l-4 border-[#6b1d57] pl-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#6b1d57]">
              🏘️ জমি মার্কেটপ্লেস
            </h2>
            <p className="text-[11px] text-slate-500">যাচাইকৃত ও নিষ্কণ্টক জমি ক্রয়-বিক্রয়</p>
          </div>
          <Link
            href="#services"
            className="border border-[#6b1d57] text-[#6b1d57] hover:bg-purple-50 text-xs font-semibold px-3.5 py-1.5 rounded-full"
          >
            সব জমি দেখুন →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {marketplaceItems.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="h-28 bg-slate-200 relative flex items-center justify-center text-slate-400 text-2xl">
                <span className="absolute top-2 left-2 bg-slate-800 text-white text-[9px] px-2 py-0.5 rounded">
                  বিক্রয়ের জন্য
                </span>
                🖼️
              </div>
              <div className="p-3.5">
                <p className="font-extrabold text-emerald-700 text-sm">{item.price}</p>
                <p className="text-[11px] text-slate-600 font-medium mt-0.5">{item.size}</p>
                <p className="text-[10px] text-slate-400 mt-1">📍 {item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= ৯. সাম্প্রতিক ব্লগ পোস্ট ও ফোরাম আলোচনা ================= */}
      <section className="py-8 max-w-5xl mx-auto px-4 space-y-12">
        <div>
          <div className="border-l-4 border-[#6b1d57] pl-3 mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-[#6b1d57]">
              📰 সাম্প্রতিক ব্লগ পোস্ট
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {blogPosts.map((post, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
                <div>
                  <div className="h-36 bg-gradient-to-br from-emerald-700 via-lime-600 to-amber-500 flex items-center justify-center text-5xl">
                    🌾👨‍🌾
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-1.5">
                      <span>📅 {post.date}</span>
                      <span>•</span>
                      <span className="text-[#6b1d57] font-semibold">{post.category}</span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-xs sm:text-sm leading-snug mb-2">
                      {post.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <Link href="#guides" className="text-[11px] font-bold text-[#6b1d57] hover:underline">
                    বিস্তারিত পড়ুন →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div id="forum">
          <div className="border-l-4 border-[#6b1d57] pl-3 mb-5">
            <h2 className="text-lg sm:text-xl font-bold text-[#6b1d57]">
              💬 ফোরাম আলোচনা
            </h2>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 shadow-sm">
            {forumTopics.map((topic, idx) => (
              <div key={idx} className="p-3.5 sm:px-5 flex items-center justify-between gap-4 hover:bg-slate-50 transition">
                <div>
                  <h4 className="font-bold text-slate-800 text-xs sm:text-sm">{topic.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    👤 {topic.author} &nbsp;|&nbsp; 🕒 {topic.time}
                  </p>
                </div>
                <span className="bg-[#6b1d57] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0">
                  {topic.replies}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ১০. ভূমি সেবা গাইড ================= */}
      <section id="guides" className="py-12 max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#6b1d57]">
            📖 ভূমি সেবা গাইড
          </h2>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-200 shadow-sm overflow-hidden">
          {guides.map((guide, i) => {
            const isOpen = openGuideIndex === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpenGuideIndex(isOpen ? -1 : i)}
                  className={`w-full text-left px-5 py-3.5 flex justify-between items-center text-xs sm:text-sm font-bold transition ${
                    isOpen ? "bg-purple-50/70 text-[#6b1d57]" : "text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  <span>{guide.title}</span>
                  <span className="text-slate-400 text-xs">{isOpen ? "▲" : "▼"}</span>
                </button>
                {isOpen && (
                  <div className="px-6 py-4 bg-white text-xs text-slate-700 space-y-2">
                    {guide.steps.map((step, sIdx) => (
                      <p key={sIdx} className="leading-relaxed">
                        {step}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      
      {/* ================= ১৩. ৪-কলামের ডার্ক পার্পল ফুটার (হুবহু ছবি ৩ অনুযায়ী) ================= */}
      <footer className="bg-[#591647] text-purple-100 pt-12 pb-6 border-t border-purple-800">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1 */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-amber-400">
              ভূমি সেবা সহায়তা কেন্দ্র
            </h3>
            <p className="text-[11px] text-purple-200 leading-relaxed">
              বাংলাদেশের ভূমি সংক্রান্ত সকল সেবা এক প্ল্যাটফর্মে। নামজারি, ভূমি উন্নয়ন কর, পর্চা, খতিয়ান এবং মৌজা ম্যাপের সেবা পান ঝামেলাহীনভাবে।
            </p>
            <div className="pt-1 space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-[#15803d] text-white text-xs font-bold px-3.5 py-1.5 rounded-full">
                📞 হটলাইন: 01332052506
              </div>
              <div className="block">
                <span className="inline-block border border-white/40 text-white text-[11px] px-3 py-1 rounded">
                  📞 +880 01332052506
                </span>
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-sm font-bold text-amber-400 mb-3">দ্রুত লিংক</h4>
            <ul className="space-y-1.5 text-xs text-purple-200">
              <li>› <Link href="/" className="hover:text-white">হোম</Link></li>
              <li>› <Link href="#services" className="hover:text-white">সেবা সমূহ</Link></li>
              <li>› <Link href="#tools" className="hover:text-white">ভূমি ক্যালকুলেটর</Link></li>
              <li>› <Link href="#forum" className="hover:text-white">ফোরাম</Link></li>
              <li>› <Link href="/track" className="hover:text-white">আবেদন ট্র্যাকিং</Link></li>
              <li>› <Link href="#find-agent" className="hover:text-white">সহায়তাকারী খুঁজুন</Link></li>
              <li>› <Link href="/dashboard/support" className="hover:text-white">সাপোর্ট সেন্টার</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-sm font-bold text-amber-400 mb-3">প্রধান সেবা সমূহ</h4>
            <ul className="space-y-1.5 text-xs text-purple-200">
              <li>› <Link href="/services/mutation" className="hover:text-white">ই-নামজারি</Link></li>
              <li>› <Link href="/services/tax" className="hover:text-white">ভূমি উন্নয়ন কর</Link></li>
              <li>› <Link href="/services/khatian" className="hover:text-white">ভূমি রেকর্ড ও পর্চা</Link></li>
              <li>› <Link href="/services/mouza-map" className="hover:text-white">মৌজা ম্যাপ</Link></li>
              <li>› <Link href="/services/khatian-correction" className="hover:text-white">মিস কেস আবেদন</Link></li>
              <li>› <Link href="/services/calculator" className="hover:text-white">উত্তরাধিকার ক্যালকুলেটর</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="text-sm font-bold text-amber-400 mb-3">যোগাযোগ</h4>
            <ul className="space-y-2 text-[11px] text-purple-200">
              <li>📍 ভূমি সেবা সহায়তা কেন্দ্র, বাংলাদেশ</li>
              <li>📞 +880 1700-000000</li>
              <li>✉️ support@evumiseba.com</li>
              <li>🕘 রবিবার - বৃহস্পতিবার, সকাল ৯:০০ - বিকাল ৫:০০</li>
            </ul>

            <h5 className="text-xs font-bold text-amber-400 mt-4 mb-2">সরকারি লিংক</h5>
            <ul className="space-y-1 text-[11px] text-purple-200">
              <li>↗ <a href="https://land.gov.bd" target="_blank" rel="noreferrer" className="hover:underline">land.gov.bd</a></li>
              <li>↗ <a href="https://mutation.land.gov.bd" target="_blank" rel="noreferrer" className="hover:underline">mutation.land.gov.bd</a></li>
              <li>↗ <a href="https://dlrms.land.gov.bd" target="_blank" rel="noreferrer" className="hover:underline">dlrms.land.gov.bd</a></li>
              <li>↗ <a href="https://ldtax.gov.bd" target="_blank" rel="noreferrer" className="hover:underline">ldtax.gov.bd</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="max-w-6xl mx-auto px-4 pt-4 border-t border-white/15 flex flex-col sm:flex-row justify-between items-center text-[11px] text-purple-300 gap-2">
          <p>© ২০২৬ সর্বস্বত্ব সংরক্ষিত • E-Vumi Seba — নাগরিকের ডিজিটাল ভূমি সেবা সহায়তা প্ল্যাটফর্ম।</p>
          <div className="flex gap-3">
            <Link href="/privacy" className="hover:underline">গোপনীয়তা নীতিমালা</Link>
            <Link href="/terms" className="hover:underline">শর্তাবলী</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
