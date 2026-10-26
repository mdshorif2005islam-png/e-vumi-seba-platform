"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f8f5f8] via-white to-purple-50">
      <div className="mx-auto grid min-h-screen max-w-6xl lg:grid-cols-2">
        {/* LEFT */}
        <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-[#421437] via-[#6b1d57] to-[#32102d] p-12 text-white">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-purple-400/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-amber-300/10 blur-3xl" />

          <div className="relative z-10 flex flex-col justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                <ShieldCheck size={25} className="text-amber-300" />
              </div>

              <div>
                <div className="text-xl font-black">E-Vumi Seba</div>
                <div className="text-[9px] tracking-widest text-purple-200">
                  DIGITAL LAND SERVICE PLATFORM
                </div>
              </div>
            </Link>

            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-amber-300">
                Join E-Vumi Seba
              </p>

              <h1 className="max-w-md text-5xl font-black leading-tight">
                আপনার ডিজিটাল
                <br />
                ভূমি সেবা অ্যাকাউন্ট
              </h1>

              <div className="mt-7 space-y-4">
                {[
                  "সেবা ও আবেদনের তথ্য এক জায়গায়",
                  "ডিজিটাল ভূমি টুল ব্যবহার",
                  "সেবা সম্পর্কিত তথ্য ও রিসোর্স",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-purple-100"
                  >
                    <CheckCircle2
                      size={17}
                      className="shrink-0 text-emerald-300"
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[10px] text-purple-300">
              © {new Date().getFullYear()} E-Vumi Seba
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <Link
                href="/"
                className="text-xl font-black text-[#6b1d57]"
              >
                E-Vumi Seba
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-purple-900/5 sm:p-8">
              <div className="mb-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
                  <User size={23} className="text-[#6b1d57]" />
                </div>

                <h2 className="text-2xl font-black text-slate-900">
                  অ্যাকাউন্ট খুলুন
                </h2>

                <p className="mt-2 text-xs leading-6 text-slate-500">
                  E-Vumi Seba ব্যবহার করতে আপনার অ্যাকাউন্ট তৈরি করুন।
                </p>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-700">
                    পূর্ণ নাম
                  </label>

                  <div className="relative">
                    <User
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      placeholder="আপনার পূর্ণ নাম"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#6b1d57] focus:bg-white focus:ring-4 focus:ring-purple-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-700">
                    মোবাইল নম্বর
                  </label>

                  <div className="relative">
                    <Phone
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#6b1d57] focus:bg-white focus:ring-4 focus:ring-purple-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-700">
                    ইমেইল
                  </label>

                  <div className="relative">
                    <Mail
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="email"
                      placeholder="example@email.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#6b1d57] focus:bg-white focus:ring-4 focus:ring-purple-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-700">
                    পাসওয়ার্ড
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="কমপক্ষে ৮ অক্ষর"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 text-sm outline-none transition focus:border-[#6b1d57] focus:bg-white focus:ring-4 focus:ring-purple-100"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#6b1d57]"
                    >
                      {showPassword ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-700">
                    পাসওয়ার্ড নিশ্চিত করুন
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type={showConfirm ? "text" : "password"}
                      placeholder="পাসওয়ার্ড আবার লিখুন"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 text-sm outline-none transition focus:border-[#6b1d57] focus:bg-white focus:ring-4 focus:ring-purple-100"
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#6b1d57]"
                    >
                      {showConfirm ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}
                    </button>
                  </div>
                </div>

                <label className="flex items-start gap-2 pt-1 text-[10px] leading-5 text-slate-500">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-slate-300 accent-[#6b1d57]"
                  />

                  <span>
                    আমি{" "}
                    <Link
                      href="/terms"
                      className="font-bold text-[#6b1d57]"
                    >
                      Terms & Conditions
                    </Link>{" "}
                    এবং{" "}
                    <Link
                      href="/privacy"
                      className="font-bold text-[#6b1d57]"
                    >
                      Privacy Policy
                    </Link>{" "}
                    মেনে নিচ্ছি।
                  </span>
                </label>

                <button
                  type="submit"
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#6b1d57] py-3.5 text-xs font-black text-white shadow-lg shadow-purple-900/15 transition hover:-translate-y-0.5 hover:bg-[#551645]"
                >
                  অ্যাকাউন্ট তৈরি করুন
                  <ArrowRight size={16} />
                </button>
              </form>

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-100" />
                <span className="text-[10px] text-slate-400">
                  ইতোমধ্যে অ্যাকাউন্ট আছে?
                </span>
                <div className="h-px flex-1 bg-slate-100" />
              </div>

              <Link
                href="/login"
                className="flex w-full items-center justify-center rounded-xl border border-[#6b1d57] py-3 text-xs font-black text-[#6b1d57] transition hover:bg-purple-50"
              >
                লগইন করুন
              </Link>
            </div>

            <Link
              href="/"
              className="mt-5 block text-center text-[11px] font-semibold text-slate-400 hover:text-[#6b1d57]"
            >
              ← হোম পেজে ফিরে যান
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
