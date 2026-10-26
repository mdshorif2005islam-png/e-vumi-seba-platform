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

// ২৬টি সেবার তালিকা
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

  // অটো-স্লাইড স্টেট
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-800 font-sans">
      {/* ================= ১. TOP NAVBAR ================= */}
      <header className="sticky top-0 z-50 bg-[#52154e] text-white shadow-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex justify-between items-center">
          <Link href="/" className="flex items-center shrink-0 group" aria-label="ভূমি সেবা সহায়তা কেন্দ্র">
            <div className="flex flex-col items-center justify-center">
              <svg className="w-10 h-10 text-white" viewBox="0 0 64 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 26L32 6L56 26" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 25L32 12L48 25" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="15" y="25" width="34" height="24" rx="2" fill="white" />
                <text x="32" y="35" textAnchor="middle" fill="#52154e" fontSize="6.5" fontWeight="bold">ভূমি সেবা</text>
                <text x="32" y="43" textAnchor="middle" fill="#52154e" fontSize="5.2" fontWeight="bold">সহায়তা কেন্দ্র</text>
              </svg>
            </div>
          </Link>

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

          <div className="flex items-center">
            <Link href="/track" style={{ backgroundColor: "#ffffff", color: "#52154e" }} className="hover:opacity-95 font-bold text-xs px-5 py-2 rounded-full shadow flex items-center justify-center gap-1.5 transition">
              <span className="w-4 h-4 rounded-full bg-[#52154e] text-white flex items-center justify-center text-[9px]">👤</span>
              <span style={{ color: "#52154e", fontWeight: 700 }}>লগইন</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ================= ২. HERO SECTION WITH 3-PICTURE AUTO SLIDER ================= */}
      <section className="bg-gradient-to-br from-[#691b60] via-[#581650] to-[#42103c] text-white py-12 lg:py-16 border-b border-purple-900">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-block bg-[#6b344c]/70 border border-amber-400/50 text-amber-300 text-xs font-medium px-4 py-1.5 rounded-full shadow-sm">
              সোমবার, ২৬ অক্টোবর ২০২৬
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold leading-snug tracking-tight">
              বাংলাদেশের ভূমি সেবা প্ল্যাটফর্ম
            </h1>

            <p className="text-purple-100 text-xs sm:text-sm leading-relaxed">
              সারাদেশে আমাদের ভূমি সেবা সহায়তাকারী দল আপনার জমি সংক্রান্ত সকল কাজে সহায়তার জন্য প্রস্তুত{" "}
              <button type="button" style={{ backgroundColor: "#ffffff", color: "#1d4ed8" }} className="inline-flex items-center gap-1 font-bold text-[11px] px-3 py-0.5 rounded-full ml-1.5 shadow-sm align-middle">
                <span>📰</span> বৃত্তান্ত জানুন
              </button>
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link href="#services" style={{ backgroundColor: "#fbbf24", color: "#1e1b4b" }} className="hover:bg-amber-400 font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-md flex items-center gap-2 transition">
                <span>👉</span> সেবা নিন
              </Link>
              <Link href="#find-agent" className="bg-white/10 hover:bg-white/20 border border-white/35 text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-full flex items-center gap-2 transition">
                <span>🔍</span> সহায়তাকারী খুঁজুন
              </Link>
            </div>

            <div className="flex flex-wrap gap-2.5 pt-1 text-[11px] text-purple-100">
              <span className="bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full flex items-center gap-1.5"><span className="text-emerald-400">🛡️</span> নিরাপদ সেবা</span>
              <span className="bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full flex items-center gap-1.5"><span className="text-amber-400">⚡</span> দ্রুত প্রক্রিয়া</span>
              <span className="bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full flex items-center gap-1.5"><span className="text-rose-400">📍</span> সারাদেশে কার্যক্রম</span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border-[3px] border-white shadow-2xl aspect-[16/10] bg-slate-900 group">
              {heroSlides.map((slide, index) => (
                <div key={index} className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}>
                  <img src={slide.image} alt={slide.badge} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/25" />
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#0f6848]/95 border-2 border-white/90 text-white font-extrabold text-xs sm:text-base px-5 py-1.5 rounded-md shadow-lg whitespace-nowrap">
                    {slide.badge}
                  </div>
                  <div className="absolute bottom-8 left-0 right-0 px-6 text-center">
                    <h3 className="text-white font-extrabold text-lg sm:text-2xl drop-shadow-md">{slide.caption}</h3>
                    <p className="text-emerald-100 text-[11px] sm:text-xs mt-1 drop-shadow">{slide.subtext}</p>
                  </div>
                </div>
              ))}

              <button type="button" onClick={prevSlide} aria-label="Previous slide" className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center text-sm transition">❮</button>
              <button type="button" onClick={nextSlide} aria-label="Next slide" className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center text-sm transition">❯</button>

              <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-2">
                {heroSlides.map((_, idx) => (
                  <button key={idx} type="button" onClick={() => setCurrentSlide(idx)} aria-label={`Slide ${idx + 1}`} className={`h-2 rounded-full transition-all ${idx === currentSlide ? "w-6 bg-amber-400" : "w-2 bg-white/60 hover:bg-white"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ৩. ভূমি সংক্রান্ত সেবা সমূহ ================= */}
      <section id="services" className="py-12 max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#6b1d57] inline-block border-b-2 border-[#6b1d57] pb-1">ভূমি সংক্রান্ত সেবা সমূহ</h2>
          <p className="text-xs text-slate-500 mt-2">আপনার প্রয়োজনীয় ভূমি সেবা নির্বাচন করুন — সুনির্দিষ্ট ফি, স্বচ্ছ প্রক্রিয়া <span className="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded text-[10px] border border-blue-200">🔊 শুনুন নতুন</span></p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
          {services.map((service, idx) => (
            <Link href={`/services/${service.slug}`} key={idx} className="bg-white rounded-lg border border-slate-200 p-4 text-center hover:shadow-md hover:border-[#6b1d57] transition flex flex-col items-center justify-between group">
              <div className="text-2xl text-[#6b1d57] mb-2 group-hover:scale-110 transition">{service.icon}</div>
              <h3 className="font-bold text-slate-800 text-xs sm:text-[13px] leading-snug mb-3">{service.title}</h3>
              <div className="flex flex-wrap items-center justify-center gap-1 mt-auto">
                <span className="bg-[#15803d] text-white text-[10px] font-semibold px-2 py-0.5 rounded">সেবা ফি {service.serviceFee}</span>
                {service.govtFee && <span className="bg-[#eab308] text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded">সরকারি {service.govtFee}</span>}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= ৪. কেন ভূমি সেবা সহায়তাকারী? ================= */}
      <section className="py-12 bg-[#f3eff5] border-y border-purple-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#6b1d57]">কেন ভূমি সেবা সহায়তাকারী?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-5 text-center border border-slate-200/80 shadow-sm"><div className="text-3xl text-[#6b1d57] mb-2">🏛️</div><h3 className="font-bold text-slate-800 text-xs sm:text-sm mb-1.5">সরকারি প্রকল্পের অংশ</h3></div>
            <div className="bg-white rounded-xl p-5 text-center border border-slate-200/80 shadow-sm"><div className="text-3xl text-emerald-600 mb-2">🛡️</div><h3 className="font-bold text-slate-800 text-xs sm:text-sm mb-1.5">এসক্রো পেমেন্ট সুরক্ষা</h3></div>
            <div className="bg-white rounded-xl p-5 text-center border border-slate-200/80 shadow-sm"><div className="text-3xl text-blue-600 mb-2">🗺️</div><h3 className="font-bold text-slate-800 text-xs sm:text-sm mb-1.5">সারাদেশে সেবা নেটওয়ার্ক</h3></div>
            <div className="bg-white rounded-xl p-5 text-center border border-slate-200/80 shadow-sm"><div className="text-3xl text-amber-500 mb-2">🎧</div><h3 className="font-bold text-slate-800 text-xs sm:text-sm mb-1.5">অভিযোগ ও জবাবদিহিতা</h3></div>
          </div>
        </div>
      </section>

      {/* ================= ৫. এক নজরে (Stats Banner) ================= */}
      <section className="py-10 bg-[#6b1d57] text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h3 className="text-base sm:text-lg font-bold mb-1">এক নজরে E-Vumi Seba Zone</h3>
          <div className="w-12 h-0.5 bg-amber-400 mx-auto mb-8"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            <div><p className="text-2xl sm:text-3xl font-extrabold">৮৯৮</p><p className="text-[11px] text-purple-200">তালিকাভুক্ত সহায়তাকারী</p></div>
            <div><p className="text-2xl sm:text-3xl font-extrabold">৬১</p><p className="text-[11px] text-purple-200">জেলায় বিস্তৃত</p></div>
            <div><p className="text-2xl sm:text-3xl font-extrabold">৮৭</p><p className="text-[11px] text-purple-200">নিবন্ধিত সহায়তাকারী</p></div>
            <div><p className="text-2xl sm:text-3xl font-extrabold">১,০৩১</p><p className="text-[11px] text-purple-200">নিবন্ধিত নাগরিক</p></div>
            <div><p className="text-2xl sm:text-3xl font-extrabold">১২</p><p className="text-[11px] text-purple-200">বিনামূল্যে ভূমি টুল</p></div>
            <div><p className="text-2xl sm:text-3xl font-extrabold">২৬</p><p className="text-[11px] text-purple-200">সক্রিয় ডিজিটাল সেবা</p></div>
          </div>
        </div>
      </section>

      {/* ================= ৬. ভূমি সংক্রান্ত টুল ও ক্যালকুলেটর ================= */}
      <section id="tools" className="py-12 max-w-5xl mx-auto px-4">
        <div className="text-center mb-8"><h2 className="text-xl sm:text-2xl font-bold text-[#6b1d57]">🧮 ভূমি সংক্রান্ত টুল ও ক্যালকুলেটর</h2></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {landTools.map((tool, index) => (
            <Link href={tool.link} key={index} className="bg-white p-3.5 rounded-lg border border-slate-200 hover:border-[#6b1d57] hover:shadow-sm transition flex items-center gap-3 group">
              <span className="text-xl bg-purple-50 text-[#6b1d57] p-2 rounded-md">{tool.icon}</span>
              <div className="text-left"><h3 className="font-bold text-slate-800 text-xs group-hover:text-[#6b1d57]">{tool.name}</h3><p className="text-[10px] text-slate-500 line-clamp-1">{tool.desc}</p></div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= ৭. ফুটার ================= */}
      <footer className="bg-[#591647] text-purple-100 pt-10 pb-6 border-t border-purple-800">
        <div className="max-w-6xl mx-auto px-4 pt-4 flex flex-col sm:flex-row justify-between items-center text-[11px] text-purple-300 gap-2">
          <p>© ২০২৬ সর্বস্বত্ব সংরক্ষিত • E-Vumi Seba — নাগরিকের ডিজিটাল ভূমি সেবা সহায়তা প্ল্যাটফর্ম।</p>
          <div className="flex gap-3">
            <Link href="/privacy" className="hover:underline">গোপনীয়তা নীতিমালা</Link>
            <Link href="/terms" className="hover:underline">শর্তাবলী</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
