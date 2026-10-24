"use client";

import React, { useState } from "react";
import Link from "next/link";

// ২৬টি সেবার তালিকা (সরকারি ফি ও সেবা ফি সহ)
const services = [
  { title: "নামজারি / ই-নামজারি সহায়তা", serviceFee: "৳২৮০", govtFee: "৳৭০", slug: "mutation", icon: "📝" },
  { title: "অনলাইন ভূমি উন্নয়ন কর (খাজনা)", serviceFee: "৳৫০", govtFee: "নির্ধারিত", slug: "tax", icon: "💳" },
  { title: "খতিয়ান / পরচা সহায়তা", serviceFee: "৳৮০", govtFee: "৳১২০", slug: "khatian", icon: "📄" },
  { title: "মৌজা ম্যাপ সংগ্রহ", serviceFee: "৳১০০", govtFee: "৳৫২০", slug: "mouza-map", icon: "🗺️" },
  { title: "সরকারি লিজ নবায়ন", serviceFee: "৳২০০", govtFee: "নির্ধারিত", slug: "lease", icon: "🏛️" },
  { title: "বন্দোবস্ত সনদ", serviceFee: "৳১০০", govtFee: "৳২০০", slug: "bondobosto", icon: "📜" },
  { title: "জমির শ্রেণী পরিবর্তন", serviceFee: "৳২০০", govtFee: "নির্ধারিত", slug: "class-change", icon: "🔄" },
  { title: "অর্পিত সম্পত্তি অবমুক্তকরণ", serviceFee: "৳১২০", govtFee: "৳২০০", slug: "vested-property", icon: "🔓" },
  { title: "খতিয়ান সংশোধনের আবেদন (মিস কেস)", serviceFee: "৳১২০", govtFee: "৳২০০", slug: "khatian-correction", icon: "✏️" },
  { title: "খাস জমি বরাদ্দ আবেদন", serviceFee: "৳৩০০", govtFee: "বিনামূল্যে", slug: "khas-land", icon: "🌱" },
  { title: "হুকুমদখল ও অধিগ্রহণ সনদ", serviceFee: "৳২০০", govtFee: "৳১০০", slug: "acquisition", icon: "🏗️" },
  { title: "দলিল যাচাই ও সার্টিফাইড কপি", serviceFee: "৳১০০", govtFee: "নির্ধারিত", slug: "deed-check", icon: "🔍" },
  { title: "ওয়ারিশান সনদ আবেদন", serviceFee: "৳১০০", govtFee: "বিনামূল্যে", slug: "succession", icon: "👨‍👩‍👧‍👦" },
  { title: "ভূমি সীমানা নির্ধারণ ও জরিপ", serviceFee: "৳১৫০", govtFee: "নির্ধারিত", slug: "survey", icon: "📐" },
  { title: "বাস্তুভিটা ও আশ্রয়ণ পোর্টাল", serviceFee: "৳৫০", govtFee: "বিনামূল্যে", slug: "housing", icon: "🏠" },
  { title: "জলমহাল ও বালুমহাল ইজারা", serviceFee: "৳১২০", govtFee: "নির্ধারিত", slug: "waterbody", icon: "🌊" },
  { title: "বিআরএস রেকর্ড অনলাইন", serviceFee: "৳৮০", govtFee: "৳১২০", slug: "brs-record", icon: "🗂️" },
  { title: "চা বাগান ও বাগানবাড়ি লিজ", serviceFee: "৳৫০০", govtFee: "৳২০০", slug: "tea-estate", icon: "🍃" },
  { title: "দেওয়ানি ও রাজস্ব মামলা নথি", serviceFee: "৳১৫০", govtFee: "৳২০০", slug: "court-copy", icon: "⚖️" },
  { title: "রেজিস্ট্রেশন ফি ক্যালকুলেটর", serviceFee: "ফ্রি", govtFee: "ফ্রি", slug: "calculator", icon: "🧮" },
  { title: "পাওয়ার অফ অ্যাটর্নি সেবা", serviceFee: "৳৫০০", govtFee: "নির্ধারিত", slug: "power-of-attorney", icon: "✍️" },
  { title: "বণ্টননামা দলিল সহায়তা", serviceFee: "৳৫০০", govtFee: "নির্ধারিত", slug: "partition", icon: "🤝" },
  { title: "ভূমি জরিপ আপত্তি আবেদন", serviceFee: "৳১৫০", govtFee: "৳১০০", slug: "survey-objection", icon: "🙋‍♂️" },
  { title: "প্রবাসী ভূমি সেবা", serviceFee: "৳৩০০", govtFee: "নির্ধারিত", slug: "expatriate", icon: "✈️" },
  { title: "ই-পাসপোর্টের ভূমি যাচাই", serviceFee: "৳১০০", govtFee: "বিনামূল্যে", slug: "passport-verification", icon: "🛂" },
  { title: "আইনি পরামর্শ ও ল্যান্ড অ্যাটর্নি", serviceFee: "৳৩০০", govtFee: "প্রযোজ্য নয়", slug: "legal-counsel", icon: "👨‍⚖️" },
];

// ১২টি ভূমি টুলস ও ক্যালকুলেটর
const landTools = [
  { name: "একক রূপান্তর", desc: "শতক, কাঠা, বিঘা ও একর রূপান্তর", icon: "📏", link: "/services/calculator" },
  { name: "প্লট ক্ষেত্রফল", desc: "দৈর্ঘ্য-প্রস্থ দিয়ে জমির মাপ হিসাব", icon: "📐", link: "/services/calculator" },
  { name: "আনা-গণ্ডা-কড়া", desc: "পুরাতন খতিয়ানের অংশ হিসাব", icon: "🔢", link: "/services/calculator" },
  { name: "জমির দাম", desc: "শতক ও কাঠা অনুযায়ী মূল্যের হিসাব", icon: "💰", link: "/services/calculator" },
  { name: "নিবন্ধন ব্যয়", desc: "দলিল রেজিস্ট্রেশন সরকারি ফি হিসাব", icon: "📑", link: "/services/calculator" },
  { name: "খাজনা হিসাব", desc: "কৃষি ও অকৃষি জমির কর নির্ধারণ", icon: "🧾", link: "/services/tax" },
  { name: "নকল ও তল্লাশ ফি", desc: "সার্টিফাইড কপি তোলার খরচ", icon: "🔎", link: "/services/deed-check" },
  { name: "উত্তরাধিকার বণ্টন", desc: "ফারায়েজ অনুযায়ী ওয়ারিশদের অংশ", icon: "⚖️", link: "/services/succession" },
  { name: "হিস্যা বণ্টন", desc: "একাধিক মালিকের জমির অংশীদারিত্ব", icon: "📊", link: "/services/partition" },
  { name: "মৌজা রেট", desc: "এলাকাভিত্তিক জমির সরকারি সর্বনিম্ন মূল্য", icon: "📍", link: "/services/calculator" },
  { name: "মৌজা ম্যাপ খুঁজুন", desc: "সিএস, আরএস ও বিআরএস নকশা", icon: "🗺️", link: "/services/mouza-map" },
  { name: "দাগ ও খতিয়ান সার্চ", desc: "অনলাইনে জমির রেকর্ড অনুসন্ধান", icon: "📂", link: "/services/khatian" },
];

// ভূমি সেবা গাইড
const guides = [
  {
    title: "কিভাবে অনলাইনে ই-নামজারি আবেদন করবেন?",
    steps: [
      "আমাদের প্ল্যাটফর্ম থেকে 'ই-নামজারি সহায়তা' নির্বাচন করুন অথবা mutation.land.gov.bd তে যান",
      "প্রয়োজনীয় তথ্য পূরণ করুন (দাগ নং, খতিয়ান নং, মৌজা ও জমির পরিমাণ)",
      "ক্রয়সূত্রে বা ওয়ারিশসূত্রে প্রাপ্য দলিল ও কাগজপত্রের স্ক্যান কপি আপলোড করুন",
      "সরকারি কোর্ট ফি ও নোটিশ ফি মোবাইল ব্যাংকিং দিয়ে পরিশোধ করুন",
      "আবেদন সাবমিট করুন এবং ট্র্যাকিং নম্বর দিয়ে আমাদের সাইটে অগ্রগতি দেখুন",
    ],
  },
  {
    title: "অনলাইনে ভূমি উন্নয়ন কর (খাজনা) কিভাবে দিবেন?",
    steps: [
      "'অনলাইন ভূমি উন্নয়ন কর' সেবায় ক্লিক করুন বা land.gov.bd পোর্টালে যান",
      "আপনার বিভাগ, জেলা, উপজেলা, মৌজা ও হোল্ডিং নম্বর প্রদান করুন",
      "এজেন্টের মাধ্যমে খতিয়ান যুক্ত করে বকেয়া ও হাল সনের কর যাচাই করুন",
      "বিকাশ/নগদ/উপায় এর মাধ্যমে অনলাইনে খাজনা পরিশোধ করুন",
      "তাৎক্ষণিক কিউআর কোড সম্বলিত ডিজিটাল দাখিলা ডাউনলোড করে নিন",
    ],
  },
  {
    title: "কিভাবে অনলাইনে পর্চা/খতিয়ান সংগ্রহ করবেন?",
    steps: [
      "বিভাগ, জেলা, উপজেলা ও মৌজা নির্বাচন করুন",
      "সার্ভে টাইপ (CS, SA, RS, BRS/BS) সিলেক্ট করুন",
      "খতিয়ান নম্বর অথবা দাগ নম্বর দিয়ে আপনার রেকর্ড খুঁজুন",
      "অনলাইন কপি বা সার্টিফাইড কপির জন্য আবেদন সম্পন্ন করুন",
      "নির্ধারিত সময়ের মধ্যে খতিয়ানের কপি ডাউনলোড বা ডেলিভারি নিন",
    ],
  },
  {
    title: "জমি কেনার আগে যা যা অবশ্যই যাচাই করবেন",
    steps: [
      "বিক্রেতার নামে সর্বশেষ খতিয়ান (BS/RS/SA) ও নামজারি সঠিক আছে কিনা যাচাই করুন",
      "দাগ নম্বর ও মৌজা ম্যাপের সাথে বাস্তবে জমির অবস্থান ও দখল মিলিয়ে দেখুন",
      "হাল সন পর্যন্ত ভূমি উন্নয়ন কর (খাজনা) পরিশোধের দাখিলা চেক করুন",
      "জমিটি অর্পিত, খাস বা অধিগ্রহণকৃত কিনা এবং কোনো দেওয়ানি মামলা আছে কিনা জেনে নিন",
      "সাব-রেজিস্ট্রি অফিসে বায়া দলিল ও মূল দলিলের সত্যতা যাচাই করুন",
    ],
  },
];

// গুরুত্বপূর্ণ সরকারি লিংক
const govtLinks = [
  { title: "ভূমি মন্ত্রণালয় পোর্টাল", url: "https://land.gov.bd", domain: "land.gov.bd" },
  { title: "ই-নামজারি সিস্টেম", url: "https://mutation.land.gov.bd", domain: "mutation.land.gov.bd" },
  { title: "ই-পর্চা ও খতিয়ান", url: "https://eporcha.gov.bd", domain: "eporcha.gov.bd" },
  { title: "ভূমি উন্নয়ন কর পোর্টাল", url: "https://portal.ldtax.gov.bd", domain: "portal.ldtax.gov.bd" },
  { title: "ভূমি রেকর্ড ও ম্যাপ", url: "https://dlrms.land.gov.bd", domain: "dlrms.land.gov.bd" },
  { title: "আর.এস খতিয়ান ব্যবস্থাপনা", url: "http://settlement.gov.bd", domain: "settlement.gov.bd" },
];

export default function HomePage() {
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = services.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* ১. Top Announcement & Date Bar */}
      <div className="bg-emerald-900 text-emerald-50 text-xs sm:text-sm py-2 px-4 border-b border-emerald-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="bg-emerald-700 px-2.5 py-0.5 rounded text-white font-medium">
              বাংলাদেশের ডিজিটাল ভূমি সেবা প্ল্যাটফর্ম
            </span>
            <span className="hidden md:inline text-emerald-200">
              সারাদেশে অনুমোদিত এজেন্টের মাধ্যমে দ্রুত ও স্বচ্ছ ভূমিসেবা সহায়তা
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>📞 হেল্পলাইন: +880 1700-000000</span>
            <Link href="/track" className="underline hover:text-white font-medium">
              আবেদন ট্র্যাকিং করুন →
            </Link>
          </div>
        </div>
      </div>

      {/* ২. Main Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow">
              ভূ
            </div>
            <div>
              <h1 className="text-xl font-bold text-emerald-800 leading-tight">
                E-Vumi Seba
              </h1>
              <p className="text-xs text-slate-500">ভূমি সেবা সহায়তা কেন্দ্র</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700">
            <Link href="/" className="text-emerald-700 font-semibold">হোম</Link>
            <Link href="#services" className="hover:text-emerald-600 transition">সেবাসমূহ</Link>
            <Link href="#tools" className="hover:text-emerald-600 transition">টুলস ও ক্যালকুলেটর</Link>
            <Link href="#find-agent" className="hover:text-emerald-600 transition">সহায়তাকারী খুঁজুন</Link>
            <Link href="#guides" className="hover:text-emerald-600 transition">ভূমি সেবা গাইড</Link>
            <Link href="/track" className="hover:text-emerald-600 transition">আবেদন ট্র্যাকিং</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/track"
              className="hidden sm:inline-block px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition"
            >
              স্ট্যাটাস দেখুন
            </Link>
            <Link
              href="#services"
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 shadow-sm transition"
            >
              সেবা নিন
            </Link>
          </div>
        </div>
      </header>

      {/* ৩. Hero Section (LSFC Style) */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 text-white py-14 lg:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-emerald-700/60 border border-emerald-500/40 px-3.5 py-1.5 rounded-full text-xs sm:text-sm text-emerald-100">
              <span>✨ বাংলাদেশের বিশ্বস্ত ডিজিটাল ভূমি সহায়তা প্ল্যাটফর্ম</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight">
              জমির সেবা এখন আরও <br />
              <span className="text-emerald-400">সহজ, স্বচ্ছ ও দ্রুত</span>
            </h2>

            <p className="text-emerald-100 text-base sm:text-lg max-w-2xl leading-relaxed">
              সারাদেশে আমাদের প্রশিক্ষিত ভূমি সেবা সহায়তাকারী দল আপনার নামজারি, খতিয়ান, খাজনা, দলিল ও মৌজা ম্যাপসহ জমি সংক্রান্ত সকল কাজে সহায়তার জন্য প্রস্তুত।
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="#services"
                className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg transition"
              >
                সেবা গ্রহণ করুন →
              </Link>
              <Link
                href="#find-agent"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold rounded-xl transition"
              >
                সহায়তাকারী খুঁজুন
              </Link>
              <Link
                href="/track"
                className="px-6 py-3.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-600 text-emerald-300 font-semibold rounded-xl transition"
              >
                আবেদনের ট্র্যাকিং
              </Link>
            </div>

            <div className="pt-4 flex flex-wrap gap-6 text-sm text-emerald-200 font-medium">
              <span className="flex items-center gap-1.5">✅ সুনির্দিষ্ট সেবা ফি</span>
              <span className="flex items-center gap-1.5">✅ দ্রুত অনলাইন প্রক্রিয়া</span>
              <span className="flex items-center gap-1.5">✅ ৬৪ জেলায় কার্যক্রম</span>
            </div>
          </div>

          {/* Right Card: Quick Tracking + Process Overview */}
          <div className="lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">নিরাপদ ও স্বচ্ছ প্রক্রিয়া</h3>
                  <p className="text-xs text-emerald-200 mt-1">
                    আবেদন জমা থেকে চূড়ান্ত ডেলিভারি পর্যন্ত সম্পূর্ণ অনলাইন ট্র্যাকিং
                  </p>
                </div>
                <span className="text-3xl">🛡️</span>
              </div>

              <div className="space-y-3.5 text-sm">
                <div className="flex items-center gap-3.5 bg-white/10 p-3.5 rounded-xl">
                  <span className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center shrink-0">
                    ১
                  </span>
                  <div>
                    <p className="font-semibold text-white">সেবা নির্বাচন ও আবেদন জমা</p>
                    <p className="text-xs text-emerald-200">প্রয়োজনীয় কাগজপত্রসহ অনলাইনে ফর্ম পূরণ করুন</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 bg-white/10 p-3.5 rounded-xl">
                  <span className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center shrink-0">
                    ২
                  </span>
                  <div>
                    <p className="font-semibold text-white">অনুমোদিত এজেন্ট ভেরিফিকেশন</p>
                    <p className="text-xs text-emerald-200">দক্ষ সহায়তাকারী আপনার আবেদন যাচাই ও প্রসেস করবেন</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 bg-white/10 p-3.5 rounded-xl">
                  <span className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center shrink-0">
                    ৩
                  </span>
                  <div>
                    <p className="font-semibold text-white">স্ট্যাটাস ট্র্যাকিং ও সেবা প্রাপ্তি</p>
                    <p className="text-xs text-emerald-200">ট্র্যাকিং আইডি দিয়ে ঘরে বসেই অগ্রগতি দেখুন ও কপি নিন</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/track"
                  className="block w-full text-center py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition"
                >
                  আপনার আবেদনের স্ট্যাটাস দেখুন →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ৪. ভূমি সংক্রান্ত সেবা সমূহ (Services with Fee Badges like LSFC) */}
      <section id="services" className="py-16 max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-emerald-700 font-semibold text-sm uppercase tracking-wider">
              অনলাইন ভূমিসেবা ব্যবস্থা
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              ভূমি সংক্রান্ত সেবা সমূহ
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              আপনার প্রয়োজনীয় ভূমি সেবা নির্বাচন করুন — সুনির্দিষ্ট ফি, স্বচ্ছ প্রক্রিয়া (মোট সেবা: ২৬ টি)
            </p>
          </div>

          {/* Live Search Bar */}
          <div className="w-full md:w-80">
            <input
              type="text"
              placeholder="🔍 সেবা খুঁজুন (যেমন: নামজারি, খতিয়ান)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredServices.map((service, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg hover:border-emerald-500 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="text-2xl bg-emerald-50 w-11 h-11 rounded-lg flex items-center justify-center border border-emerald-100">
                    {service.icon}
                  </span>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                      সেবা ফি: {service.serviceFee}
                    </span>
                    <span className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                      সরকারি: {service.govtFee}
                    </span>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition">
                  {service.title}
                </h3>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/services/${service.slug}`}
                  className="w-full text-center py-2 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition"
                >
                  আবেদন করুন →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ৫. কেন আমাদের ভূমি সেবা নিবেন? (Why Choose Us - LSFC Style) */}
      <section className="py-16 bg-emerald-950 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold">কেন E-Vumi Seba বেছে নিবেন?</h2>
            <p className="text-emerald-200 text-sm mt-2">
              নিরাপদ, স্বচ্ছ ও দায়বদ্ধ ডিজিটাল ভূমিসেবা সহায়তার নিশ্চয়তা
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-3">
              <div className="text-3xl">🏷️</div>
              <h3 className="text-lg font-bold text-emerald-400">সুনির্দিষ্ট ও স্বচ্ছ ফি</h3>
              <p className="text-sm text-emerald-100 leading-relaxed">
                প্রতিটি সেবার জন্য নির্ধারিত সার্ভিস চার্জ ও সরকারি ফি আগে থেকেই উল্লেখ থাকে। কোনো গোপন বা অতিরিক্ত চার্জ নেই।
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-3">
              <div className="text-3xl">🔒</div>
              <h3 className="text-lg font-bold text-emerald-400">নিরাপদ পেমেন্ট সুরক্ষা</h3>
              <p className="text-sm text-emerald-100 leading-relaxed">
                আপনার পেমেন্ট সেবা সম্পন্ন না হওয়া পর্যন্ত প্ল্যাটফর্মে সুরক্ষিত থাকে। সেবায় অসন্তুষ্ট হলে অভিযোগ ও রিফান্ডের সুযোগ।
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-3">
              <div className="text-3xl">🌍</div>
              <h3 className="text-lg font-bold text-emerald-400">সারাদেশে সেবা নেটওয়ার্ক</h3>
              <p className="text-sm text-emerald-100 leading-relaxed">
                ৬৪ জেলায় আমাদের প্রশিক্ষিত ভূমি সেবা সহায়তাকারী দল প্রস্তুত। ঘরে বসেই আপনার উপজেলার সহায়তা নিন।
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-3">
              <div className="text-3xl">📊</div>
              <h3 className="text-lg font-bold text-emerald-400">ট্র্যাকিং ও জবাবদিহিতা</h3>
              <p className="text-sm text-emerald-100 leading-relaxed">
                প্রতিটি আবেদনের একটি স্বতন্ত্র ট্র্যাকিং নম্বর থাকে। যেকোনো সময় অনলাইনে আবেদনের বর্তমান অবস্থা দেখুন।
              </p>
            </div>
          </div>

          {/* এক নজরে পরিসংখ্যান (Stats Bar) */}
          <div className="mt-12 bg-emerald-900/60 border border-emerald-700/50 rounded-2xl p-8">
            <h3 className="text-center text-sm font-semibold uppercase tracking-wider text-emerald-300 mb-6">
              এক নজরে E-Vumi Seba
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
              <div>
                <p className="text-3xl font-extrabold text-white">২৬+</p>
                <p className="text-xs text-emerald-200 mt-1">অনলাইন ভূমিসেবা</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-white">৬৪</p>
                <p className="text-xs text-emerald-200 mt-1">জেলায় বিস্তৃত</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-white">১২০+</p>
                <p className="text-xs text-emerald-200 mt-1">তালিকাভুক্ত সহায়তাকারী</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-white">১,৫০০+</p>
                <p className="text-xs text-emerald-200 mt-1">সফল আবেদন সম্পন্ন</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-white">১২ টি</p>
                <p className="text-xs text-emerald-200 mt-1">বিনামূল্যে ভূমি টুল</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-white">২৪/৭</p>
                <p className="text-xs text-emerald-200 mt-1">অনলাইন সাপোর্ট</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ৬. ভূমি সংক্রান্ত টুল ও ক্যালকুলেটর (12 Land Tools Section) */}
      <section id="tools" className="py-16 max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-emerald-700 font-semibold text-sm">স্মার্ট ক্যালকুলেটর</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            ভূমি সংক্রান্ত টুল ও ক্যালকুলেটর
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            জমির হিসাব, নিবন্ধন খরচ ও উত্তরাধিকার বণ্টন — ১২ টি টুল, সম্পূর্ণ বিনামূল্যে
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {landTools.map((tool, index) => (
            <Link
              href={tool.link}
              key={index}
              className="bg-white p-5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition flex items-start gap-3.5 group"
            >
              <span className="text-2xl bg-slate-100 group-hover:bg-emerald-50 p-2.5 rounded-lg transition">
                {tool.icon}
              </span>
              <div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700">
                  {tool.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">{tool.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ৭. নিকটস্থ ভূমি সেবা সহায়তাকারী খুঁজুন (Agent Finder Section) */}
      <section id="find-agent" className="py-14 bg-emerald-50 border-y border-emerald-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            ভূমি সেবা সহায়তাকারী খুঁজুন
          </h2>
          <p className="text-slate-600 text-sm mt-1 mb-8">
            আপনার বিভাগ ও জেলা নির্বাচন করে নিকটস্থ ভূমি সেবা সহায়তা প্রতিনিধি খুঁজে বের করুন
          </p>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="">-- বিভাগ নির্বাচন করুন --</option>
              <option value="dhaka">ঢাকা</option>
              <option value="chattogram">চট্টগ্রাম</option>
              <option value="rajshahi">রাজশাহী</option>
              <option value="khulna">খুলনা</option>
              <option value="barishal">বরিশাল</option>
              <option value="sylhet">সিলেট</option>
              <option value="rangpur">রংপুর</option>
              <option value="mymensingh">ময়মনসিংহ</option>
            </select>

            <input
              type="text"
              placeholder="আপনার জেলা বা উপজেলার নাম লিখুন..."
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />

            <Link
              href="/#services"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl text-sm flex items-center justify-center transition"
            >
              🔍 সহায়তাকারী খুঁজুন
            </Link>
          </div>
        </div>
      </section>

      {/* ৮. ভূমি সেবা গাইড (Step-by-Step Guides like LSFC) */}
      <section id="guides" className="py-16 max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-emerald-700 font-semibold text-sm">নাগরিক তথ্য কণিকা</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            ভূমি সেবা গাইড ও নিয়মাবলী
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            জনপ্রিয় ভূমি সেবাগুলোর আবেদনের নিয়ম ও প্রয়োজনীয় কাগজপত্র সম্পর্কে জানুন
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides.map((guide, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold text-emerald-800 mb-4 flex items-center gap-2">
                <span>📌</span> {guide.title}
              </h3>
              <ol className="space-y-2.5 text-sm text-slate-700">
                {guide.steps.map((step, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {sIdx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* ৯. গুরুত্বপূর্ণ সরকারি লিংক সমূহ */}
      <section className="py-12 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">
            গুরুত্বপূর্ণ সরকারি ভূমি পোর্টাল লিংক সমূহ
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {govtLinks.map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-500 text-center transition group"
              >
                <p className="font-semibold text-slate-800 text-xs sm:text-sm group-hover:text-emerald-700">
                  {item.title}
                </p>
                <p className="text-[11px] text-emerald-600 mt-1 font-mono">
                  {item.domain} ↗
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ১০. জরুরি সাপোর্ট ও সহায়তা কেন্দ্র */}
      <section className="py-12 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4">
            <div className="text-3xl bg-emerald-50 p-3.5 rounded-xl">📞</div>
            <div>
              <h4 className="font-bold text-slate-900">জরুরি সহায়তায়</h4>
              <p className="text-xs text-slate-500">যে কোনো সহায়তায় সরাসরি কথা বলুন</p>
              <p className="text-emerald-700 font-bold mt-1">+880 1700-000000</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4">
            <div className="text-3xl bg-emerald-50 p-3.5 rounded-xl">🎫</div>
            <div>
              <h4 className="font-bold text-slate-900">সাপোর্ট সেন্টার</h4>
              <p className="text-xs text-slate-500">আপনার সমস্যার কথা জানিয়ে টিকিট দিন</p>
              <Link
                href="/dashboard/support"
                className="text-emerald-700 font-bold text-sm mt-1 inline-block hover:underline"
              >
                সাপোর্ট টিকিটে যান →
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4">
            <div className="text-3xl bg-emerald-50 p-3.5 rounded-xl">💬</div>
            <div>
              <h4 className="font-bold text-slate-900">সহায়তা কেন্দ্র</h4>
              <p className="text-xs text-slate-500">নিয়মাবলী ও প্রশ্নোত্তর জানুন</p>
              <span className="text-emerald-700 font-bold text-sm mt-1 inline-block">
                ২৪/৭ অনলাইন তথ্য সেবা
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ১১. সমৃদ্ধ ফুটার (4-Column Footer like LSFC) */}
      <footer className="bg-slate-900 text-slate-300 pt-14 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white">E-Vumi Seba</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              বাংলাদেশের ভূমি সংক্রান্ত সকল অনলাইন সেবা সহায়তার নির্ভরযোগ্য প্ল্যাটফর্ম। নামজারি, ভূমি উন্নয়ন কর, পর্চা, খতিয়ান এবং মৌজা ম্যাপ সেবা পান ঝামেলাহীনভাবে।
            </p>
            <p className="text-xs text-emerald-400 font-medium pt-1">
              হেল্পলাইন: +880 1700-000000
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              দ্রুত লিংক
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="hover:text-emerald-400">হোম</Link></li>
              <li><Link href="#services" className="hover:text-emerald-400">সকল সেবাসমূহ</Link></li>
              <li><Link href="/track" className="hover:text-emerald-400">আবেদন ট্র্যাকিং</Link></li>
              <li><Link href="#tools" className="hover:text-emerald-400">ভূমি ক্যালকুলেটর ও টুলস</Link></li>
              <li><Link href="/dashboard/support" className="hover:text-emerald-400">সাপোর্ট টিকিট</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              প্রধান সেবা সমূহ
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/services/mutation" className="hover:text-emerald-400">ই-নামজারি সহায়তা</Link></li>
              <li><Link href="/services/tax" className="hover:text-emerald-400">ভূমি উন্নয়ন কর (খাজনা)</Link></li>
              <li><Link href="/services/khatian" className="hover:text-emerald-400">খতিয়ান ও পর্চা সংগ্রহ</Link></li>
              <li><Link href="/services/mouza-map" className="hover:text-emerald-400">মৌজা ম্যাপ আবেদন</Link></li>
              <li><Link href="/services/calculator" className="hover:text-emerald-400">রেজিস্ট্রেশন ফি ক্যালকুলেটর</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              যোগাযোগ ও সময়সূচী
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>📍 বাংলাদেশ ডিজিটাল ভূমি সেবা সহায়তা কেন্দ্র</li>
              <li>📞 +880 1700-000000</li>
              <li>✉️ support@evumiseba.com</li>
              <li>🕘 রবিবার - বৃহস্পতিবার (সকাল ৯:০০ - বিকাল ৫:০০)</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© ২০২৬ E-Vumi Seba. সর্বস্বত্ব সংরক্ষিত।</p>
          <p>
            ডিসক্লেইমার: এটি একটি বেসরকারি ভূমি সেবা সহায়তা (Private Land Service Assistance) প্ল্যাটফর্ম।
          </p>
        </div>
      </footer>
    </div>
  );
}
