'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Search, ShieldCheck, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 flex flex-col font-sans">
      {/* 1. Dynamic Navbar Component */}
      <Navbar />

      {/* 2. Hero Section */}
      <section className="bg-emerald-50/40 border-b border-emerald-100/60 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Hero Content */}
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
                href="/auth/register"
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

            <div className="flex flex-wrap items-center gap-4 pt-4 text-xs font-semibold text-emerald-900">
              <span className="flex items-center gap-1">✓ সহজ অনুসন্ধান</span>
              <span className="flex items-center gap-1">✓ স্ট্যাটাস আপডেট</span>
              <span className="flex items-center gap-1">✓ সহজে যোগাযোগ</span>
            </div>
          </div>

          {/* Right Hero Info Card */}
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

      {/* 3. Footer */}
      <footer className="mt-auto bg-[#0A2920] text-white py-8 border-t border-emerald-900/50 text-center text-xs">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <strong className="block text-sm font-bold text-emerald-300">E-Vumi Seba</strong>
          <p className="text-emerald-100/70">জমি সংক্রান্ত সেবার সহায়তা</p>
          <p className="text-emerald-100/40 pt-2">© 2026 E-Vumi Seba. সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </footer>
    </div>
  );
}
