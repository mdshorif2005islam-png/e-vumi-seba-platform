'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, FileText, ShieldCheck, Building2, LogIn, UserPlus } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

type Application = {
  application_no: string;
  service_name: string;
  status: string;
  updated_at: string | null;
};

const statusNames: Record<string, string> = {
  pending: 'অপেক্ষমাণ',
  submitted: 'আবেদন জমা হয়েছে',
  processing: 'যাচাই চলছে',
  approved: 'অনুমোদিত',
  completed: 'সম্পন্ন',
  rejected: 'বাতিল',
};

export default function TrackPage() {
  const pathname = usePathname();
  const [phone, setPhone] = useState('');
  const [applications, setApplications] = useState<Application[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function track(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setApplications([]);
    setSearched(false);

    try {
      const supabase = createClient();

      const { data, error } = await supabase.rpc(
        'track_applications_by_phone',
        { p_phone: phone.trim() }
      );

      if (error) throw error;

      setApplications((data ?? []) as Application[]);
      setSearched(true);
    } catch (err) {
      console.error('Application tracking error:', err);
      setError('আবেদন খুঁজতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  }

  const navLinks = [
    { name: 'হোম', href: '/' },
    { name: 'সেবাসমূহ', href: '/#services' },
    { name: 'আবেদন ট্র্যাকিং', href: '/track' },
    { name: 'Dashboard', href: '/dashboard' },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 flex flex-col font-sans">
      {/* ===== Header / Navbar ===== */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-[#0A2920] flex items-center justify-center text-white shadow-md transition group-hover:scale-105">
              <Building2 size={22} />
            </div>
            <div>
              <h1 className="font-black text-xl leading-none text-[#0A2920] tracking-tight">
                E-Vumi Seba
              </h1>
              <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                Private Land Service Assistance
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-100/80 text-[#0A2920] shadow-sm'
                      : 'text-gray-600 hover:text-[#0A2920] hover:bg-gray-100/80'
                  }`}
                >
                  {link.name === 'আবেদন ট্র্যাকিং' && <Search size={14} className="inline mr-1.5 -mt-0.5" />}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Auth Action Buttons */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/auth/login"
              className="px-4 py-2 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition flex items-center gap-1.5 shadow-sm"
            >
              <LogIn size={16} />
              <span>লগইন</span>
            </Link>
            <Link
              href="/auth/register"
              className="px-4 py-2 rounded-xl bg-[#0A2920] hover:bg-[#123b35] text-white font-semibold text-sm transition flex items-center gap-1.5 shadow-md"
            >
              <UserPlus size={16} />
              <span>রেজিস্টার</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ===== Hero Section ===== */}
      <section className="bg-emerald-50/40 border-b border-emerald-100/60 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Hero Intro */}
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#0A2920] text-xs font-bold tracking-wide uppercase">
              <Search size={14} /> আবেদন ট্র্যাকিং
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A2920] leading-tight">
              আপনার আবেদনের <br />
              <span className="text-emerald-700">সর্বশেষ অবস্থা</span> জানুন
            </h1>

            <p className="text-gray-600 text-base sm:text-lg max-w-xl leading-relaxed">
              নিবন্ধিত মোবাইল নম্বর দিয়ে আপনার আবেদনের অগ্রগতি সহজেই দেখে নিতে পারেন।
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs sm:text-sm font-semibold text-emerald-800">
              <span className="bg-white px-3.5 py-2 rounded-xl border border-emerald-100 shadow-sm">✓ সহজ অনুসন্ধান</span>
              <span className="bg-white px-3.5 py-2 rounded-xl border border-emerald-100 shadow-sm">✓ স্ট্যাটাস আপডেট</span>
              <span className="bg-white px-3.5 py-2 rounded-xl border border-emerald-100 shadow-sm">✓ দ্রুত ফলাফল</span>
            </div>
          </div>

          {/* Right Hero Form Card */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xl relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <Search size={24} />
              </div>

              <h2 className="text-2xl font-bold text-gray-900">আবেদন খুঁজুন</h2>
              <p className="text-xs text-gray-500 mt-1 mb-6">
                আবেদন করার সময় ব্যবহৃত মোবাইল নম্বরটি লিখুন।
              </p>

              <form onSubmit={track} className="space-y-4">
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-gray-700 mb-2">
                    নিবন্ধিত মোবাইল নম্বর
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="01XXXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    minLength={8}
                    maxLength={20}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 bg-slate-50/50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 bg-[#0A2920] hover:bg-[#123b35] text-white rounded-xl font-bold text-sm transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  <Search size={18} />
                  <span>{loading ? 'খোঁজা হচ্ছে...' : 'আবেদন খুঁজুন'}</span>
                </button>
              </form>

              {error && (
                <div className="mt-4 p-3.5 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-medium" role="alert">
                  {error}
                </div>
              )}

              {searched && applications.length === 0 && !error && (
                <div className="mt-4 p-3.5 rounded-xl bg-amber-50 border border-amber-100 text-amber-800 text-xs leading-relaxed">
                  এই নম্বরের সঙ্গে কোনো আবেদন পাওয়া যায়নি। মোবাইল নম্বরটি যাচাই করে আবার চেষ্টা করুন।
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ===== Application Status Steps Section ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 w-full">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A2920]">আবেদনের অবস্থা</h2>
          <p className="text-gray-500 text-sm mt-1">আপনার আবেদনের বর্তমান অগ্রগতি ধাপ অনুযায়ী দেখে নিন।</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            ['01', 'আবেদন জমা', 'আপনার আবেদন সিস্টেমে জমা হয়েছে।'],
            ['02', 'যাচাই চলছে', 'আবেদনের তথ্য যাচাই করা হচ্ছে।'],
            ['03', 'অনুমোদন', 'প্রয়োজনীয় অনুমোদনের অপেক্ষায়।'],
            ['04', 'সম্পন্ন', 'আবেদনের কাজ সম্পন্ন হয়েছে।'],
          ].map(([number, title, description]) => (
            <article
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition group"
              key={number}
            >
              <span className="inline-block px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 font-black text-xs mb-3 group-hover:bg-[#0A2920] group-hover:text-white transition">
                {number}
              </span>
              <h3 className="font-bold text-gray-800 text-base mb-1.5">{title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
            </article>
          ))}
        </div>

        {/* Results Container */}
        {applications.length > 0 && (
          <div className="mt-12 bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span>আপনার আবেদনসমূহ</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs">
                {applications.length}
              </span>
            </h2>

            <div className="space-y-4">
              {applications.map((app, index) => (
                <article
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50 border border-gray-100 hover:border-emerald-200 transition"
                  key={`${app.application_no}-${index}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 text-emerald-700 flex items-center justify-center shrink-0 shadow-sm">
                      <FileText size={22} />
                    </div>
                    <div>
                      <strong className="block text-base font-bold text-gray-900">
                        {app.service_name}
                      </strong>
                      <p className="text-xs text-gray-500 font-mono mt-0.5">
                        আবেদন নম্বর: {app.application_no}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1">
                        সর্বশেষ আপডেট:{' '}
                        {app.updated_at
                          ? new Date(app.updated_at).toLocaleString('bn-BD')
                          : 'তথ্য নেই'}
                      </p>
                    </div>
                  </div>

                  <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 self-start sm:self-center">
                    {statusNames[app.status?.toLowerCase()] ?? app.status}
                  </span>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ===== Security Guarantee Section ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
        <div className="bg-emerald-50/60 rounded-3xl p-6 sm:p-8 border border-emerald-100 flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-white text-emerald-700 flex items-center justify-center shrink-0 shadow-sm border border-emerald-100">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg text-[#0A2920]">
              আপনার তথ্যের নিরাপত্তা আমাদের অগ্রাধিকার
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              আপনার আবেদন-সংক্রান্ত সকল তথ্য সুরক্ষিত রাখতে আমরা সর্বদা সচেষ্ট।
            </p>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
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
