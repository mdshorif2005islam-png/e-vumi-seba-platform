'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import {
  Search,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  FileText,
  Layers,
  Building,
  MapPin,
  HelpCircle,
  Phone,
  MessageSquare,
  FileCheck,
  Globe,
  Receipt,
  FileSpreadsheet,
  BadgeCheck,
  Briefcase,
} from 'lucide-react';

export default function HomeClient() {
  const [searchTerm, setSearchTerm] = useState('');

  const services = [
    { id: 1, title: 'সরকারি লিজ নবায়ন', desc: 'সরকারি সম্পত্তি ও অর্পিত সম্পত্তির লিজ নবায়ন সহায়তা।', icon: <Building className="w-6 h-6 text-emerald-700" />, href: '/services/lease' },
    { id: 2, title: 'খতিয়ান / পরচা সহায়তা', desc: 'জমির রেকর্ড সম্পর্কিত খতিয়ান ও পরচার তথ্য সংগ্রহ।', icon: <FileText className="w-6 h-6 text-emerald-700" />, href: '/services/khatian' },
    { id: 3, title: 'বন্দোবস্ত সনদ', desc: 'খাস জমি বা বন্দোবস্তের সনদপত্রের সহায়তামূলক আবেদন।', icon: <Layers className="w-6 h-6 text-emerald-700" />, href: '/services/bondobosto' },
    { id: 4, title: 'জমির শ্রেণী পরিবর্তন', desc: 'কৃষি থেকে অকৃষি ও অন্যান্য শ্রেণী পরিবর্তনের সহায়তামূলক ফর্ম।', icon: <MapPin className="w-6 h-6 text-emerald-700" />, href: '/services/class-change' },
    { id: 5, title: 'নামজারি / ই-নামজারি সহায়তা', desc: 'ই-নামজারি ও মিউটেশন আবেদনের দ্রুত প্রক্রিয়া সহায়ক।', icon: <FileCheck className="w-6 h-6 text-emerald-700" />, href: '/services/mutation' },
    { id: 6, title: 'অনলাইন ভূমি উন্নয়ন কর (খাজনা)', desc: 'ভূমি উন্নয়ন কর বা খাজনা পরিশোধের অনলাইন সহায়তা।', icon: <Receipt className="w-6 h-6 text-emerald-700" />, href: '/services/tax' },
    { id: 7, title: 'মৌজা ম্যাপ সংগ্রহ', desc: 'সিএস, আরএস, এসএ ও বিআরএস মৌজা ম্যাপ আবেদন।', icon: <Globe className="w-6 h-6 text-emerald-700" />, href: '/services/mouza-map' },
    { id: 8, title: 'অর্পিত সম্পত্তি অবমুক্তকরণ', desc: 'অর্পিত সম্পত্তি ক ও খ তফসিল তালিকা ভুক্ত সেবা।', icon: <Briefcase className="w-6 h-6 text-emerald-700" />, href: '/services/vested-property' },
    { id: 9, title: 'খতিয়ান সংশোধনের আবেদন', desc: 'ভুল খতিয়ান বা রেকর্ড সংশোধনের প্রশাসনিক পরামর্শ।', icon: <BadgeCheck className="w-6 h-6 text-emerald-700" />, href: '/services/khatian-correction' },
    { id: 10, title: 'খাস জমি আবেদন', desc: 'ভূমিহীনদের জন্য সরকারি খাস জমি বরাদ্দের আবেদন।', icon: <FileSpreadsheet className="w-6 h-6 text-emerald-700" />, href: '/services/khas-land' },
    { id: 11, title: 'হুকুমদখল ও অধিগ্রহণ সনদ', desc: 'সরকারি অধিগ্রহণকৃত জমির ক্ষতিপূরণ সনদ সেবা।', icon: <Building className="w-6 h-6 text-emerald-700" />, href: '/services/acquisition' },
    { id: 12, title: 'দলিল যাচাই ও পরামর্শ', desc: 'সাব-রেজিস্ট্রি দলিলের সত্যতা ও বায়া দলিল সংগ্রহ।', icon: <FileText className="w-6 h-6 text-emerald-700" />, href: '/services/deed-check' },
    { id: 13, title: 'ওয়ারিশান সনদ আবেদন', desc: 'উত্তরাধিকারীদের জমি বণ্টনের স্থানীয় সনদপত্র সহায়তা।', icon: <Layers className="w-6 h-6 text-emerald-700" />, href: '/services/succession' },
    { id: 14, title: 'ভূমি সীমানা নির্ধারণ', desc: 'জমির মাপজোখ বা ডিমারকেশন করার আমিন সংক্রান্ত সেবা।', icon: <MapPin className="w-6 h-6 text-emerald-700" />, href: '/services/survey' },
    { id: 15, title: 'বাস্তুভিটা ও আশ্রয়ণ পোরটাল', desc: 'আশ্রয়ণ প্রকল্পের ঘর বা জমি সংক্রান্ত সুবিধা।', icon: <Building className="w-6 h-6 text-emerald-700" />, href: '/services/housing' },
    { id: 16, title: 'জলমহাল ও বালুমহাল ইজারা', desc: 'সরকারি জলাশয় ও বালুমহাল ইজারা দরপত্র সহায়তা।', icon: <Globe className="w-6 h-6 text-emerald-700" />, href: '/services/waterbody' },
    { id: 17, title: 'বিআরএস রেকর্ড অনলাইন', desc: 'সর্বশেষ বিআরএস বা ডিজিটাল রেকর্ড সংক্রান্ত সহায়তা।', icon: <FileCheck className="w-6 h-6 text-emerald-700" />, href: '/services/brs-record' },
    { id: 18, title: 'চা বাগান ও বাগানবাড়ি লিজ', desc: 'চা বাগান বা কৃষি খামারের দীর্ঘমেয়াদী লিজ প্রক্রিয়া।', icon: <Briefcase className="w-6 h-6 text-emerald-700" />, href: '/services/tea-estate' },
    { id: 19, title: 'দেওয়ানি মামলা নথি সংগ্রহ', desc: 'ভূমি সংক্রান্ত দেওয়ানি আপিল ও মামলার সার্টিফাইড কপি।', icon: <FileSpreadsheet className="w-6 h-6 text-emerald-700" />, href: '/services/court-copy' },
    { id: 20, title: 'রেজিস্ট্রেশন ফি ক্যালকুলেটর', desc: 'দলিল ও জমি হস্তান্তরের আনুমানিক সরকারী ফি নির্ধারণ।', icon: <Receipt className="w-6 h-6 text-emerald-700" />, href: '/services/calculator' },
    { id: 21, title: 'পাওয়ার অফ অ্যাটর্নি সেবা', desc: 'আমমোক্তারনামা সম্পাদন ও বাতিল সংক্রান্ত গাইড।', icon: <BadgeCheck className="w-6 h-6 text-emerald-700" />, href: '/services/power-of-attorney' },
    { id: 22, title: 'বণ্টননামা দলিল সহায়তা', desc: 'আপস-বণ্টননামা রেজিস্ট্রি সহজীকরণ সেবা।', icon: <Layers className="w-6 h-6 text-emerald-700" />, href: '/services/partition' },
    { id: 23, title: 'ভূমি জরিপ আপত্তি আবেদন', desc: 'জরিপ চলাকালীন আপত্তি জমা ও শুনানির প্রস্তুতি।', icon: <MapPin className="w-6 h-6 text-emerald-700" />, href: '/services/survey-objection' },
    { id: 24, title: 'প্রবাসী ভূমি সেবা', desc: 'প্রবাসীদের জমি দেখাশোনা ও অনলাইন সেবা ব্যবস্থাপনা।', icon: <Globe className="w-6 h-6 text-emerald-700" />, href: '/services/expatriate' },
    { id: 25, title: 'ই-পাসপোর্টের ভূমি যাচাই', desc: 'ভূমি মালিকানা প্রমাণের নথিপত্র প্রদান সহায়তা।', icon: <FileCheck className="w-6 h-6 text-emerald-700" />, href: '/services/passport-verification' },
    { id: 26, title: 'আইনি পরামর্শ ও ল্যান্ড অ্যাটর্নি', desc: 'অভিজ্ঞ ভূমি বিশেষজ্ঞদের আইনি মতামত গ্রহণ।', icon: <ShieldCheck className="w-6 h-6 text-emerald-700" />, href: '/services/legal-counsel' },
  ];

  const filteredServices = services.filter((s) =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-emerald-50/40 border-b border-emerald-100/60 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#0A2920] text-xs font-bold tracking-wide uppercase">
              ✨ বাংলাদেশের ডিজিটাল ভূমি সহায়তা প্ল্যাটফর্ম
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0A2920] leading-tight">
              জমির সেবা এখন আরও <br />
              <span className="text-emerald-700">সহজ ও দ্রুত</span>
            </h1>

            <p className="text-gray-600 text-base sm:text-lg max-w-xl leading-relaxed">
              অনুমোদিত Agent-এর সাহায্যে নামজারি, খতিয়ান, খাজনা ও অন্যান্য ভূমিসেবা আবেদনে সহায়তা নিন। আপনার আবেদন ও অগ্রগতি অনলাইনে দেখুন সহজে।
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/#services"
                className="px-6 py-3.5 rounded-xl bg-[#0A2920] hover:bg-[#123b35] text-white font-bold text-sm transition shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <span>সেবা গ্রহণ করুন</span>
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/track"
                className="px-6 py-3.5 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-bold text-sm transition shadow-sm flex items-center gap-2"
              >
                <Search size={18} className="text-emerald-700" />
                <span>আবেদনের ট্র্যাকিং</span>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-emerald-900">
              <span className="flex items-center gap-1">✓ সহজ অনুসন্ধান</span>
              <span className="flex items-center gap-1">✓ স্ট্যাটাস আপডেট</span>
              <span className="flex items-center gap-1">✓ সহজে যোগাযোগ</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xl space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <ShieldCheck size={28} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900">নিরাপদ ও স্বচ্ছ প্রক্রিয়া</h2>
                <p className="text-xs text-gray-500 mt-1">
                  আবেদন জমা দেওয়া থেকে অগ্রগতি দেখা পর্যন্ত আপনার সেবার তথ্য সুসংগঠিতভাবে দেখার সুবিধা।
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-xs text-gray-700 font-medium">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>আবেদন সংক্রান্ত তথ্য</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-gray-700 font-medium">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>আবেদনের স্ট্যাটাস দেখুন</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-gray-700 font-medium">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>প্রয়োজনীয় সহায়তা নিন</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 z-20 w-full">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-lg flex items-center gap-3">
          <Search size={22} className="text-gray-400 ml-2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="আপনার প্রয়োজনীয় সেবা খুঁজুন — খতিয়ান, নামজারি, পরচা, খাজনা, প্রবাসীদের সেবা..."
            className="w-full text-sm outline-none bg-transparent placeholder-gray-400"
          />
          <button className="px-5 py-2.5 bg-[#0A2920] text-white rounded-xl font-bold text-xs hover:bg-[#123b35] transition shrink-0">
            খুঁজুন
          </button>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">অনলাইন ভূমিসেবা ব্যবস্থা</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A2920] mt-1">সকল সেবাসমূহ</h2>
          </div>
          <span className="text-xs font-bold px-3.5 py-1.5 bg-emerald-100 text-emerald-800 rounded-full">
            মোট সেবা: {filteredServices.length} টি
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4 group-hover:scale-105 transition">
                  {service.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{service.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-6">{service.desc}</p>
              </div>

              <Link
                href={service.href}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-[#0A2920] transition"
              >
                <span>আবেদন করুন</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-emerald-50/50 border-t border-b border-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Phone size={24} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">জরুরি সহায়তায়</h4>
              <p className="text-xs text-gray-500 mt-0.5">যে কোনো সহায়তায় যোগাযোগ করুন</p>
              <p className="text-xs font-mono font-bold text-emerald-800 mt-1">+880 1700-000000</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <MessageSquare size={24} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">সাপোর্ট সেন্টার</h4>
              <p className="text-xs text-gray-500 mt-0.5">টিকিট সাবমিট করুন</p>
              <Link href="/dashboard/support" className="text-xs font-bold text-emerald-700 hover:underline mt-1 inline-block">
                সাপোর্ট টিকিটে যান →
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <HelpCircle size={24} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">সহায়তা কেন্দ্র</h4>
              <p className="text-xs text-gray-500 mt-0.5">নিয়মাবলী ও প্রশ্নোত্তর</p>
              <span className="text-xs font-bold text-emerald-700 mt-1 inline-block">২৪/৭ অনলাইন তথ্য</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-[#0A2920] text-white py-8 text-center text-xs">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <strong className="block text-sm font-bold text-emerald-300">E-Vumi Seba</strong>
          <p className="text-emerald-100/70">জমি সংক্রান্ত সেবার সহায়তা</p>
          <p className="text-emerald-100/40 pt-2">© 2026 E-Vumi Seba. সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </footer>
    </div>
  );
}
