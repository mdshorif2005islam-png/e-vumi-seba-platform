
"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;

    setMessage("");
    setIsError(false);

    const cleanName = name.trim();
    const cleanMobile = mobile.trim();
    const cleanEmail = email.trim();

    if (!cleanName || !cleanMobile || !cleanEmail) {
      setIsError(true);
      setMessage("সবগুলো তথ্য সঠিকভাবে পূরণ করুন।");
      return;
    }

    if (password.length < 8) {
      setIsError(true);
      setMessage("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (password !== confirmPassword) {
      setIsError(true);
      setMessage("দুটি পাসওয়ার্ড মিলছে না।");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            full_name: cleanName,
            mobile: cleanMobile,
          },
        },
      });

      if (error) {
        setIsError(true);

        if (error.message === "User already registered") {
          setMessage(
            "এই ইমেইল দিয়ে আগে থেকেই অ্যাকাউন্ট আছে। লগইন করুন।"
          );
        } else if (error.message === "Signups not allowed for this instance") {
          setMessage(
            "নতুন রেজিস্ট্রেশন বন্ধ আছে। Supabase-এর Auth সেটিংসে Signups চালু করুন।"
          );
        } else {
          setMessage(error.message);
        }

        return;
      }

      // Session থাকলে রেজিস্ট্রেশন সফল এবং ব্যবহারকারী লগইন অবস্থায় আছে।
      if (data.session && data.user) {
        router.replace("/");
        router.refresh();
        return;
      }

      // Session না থাকলে ইমেইল নিশ্চিতকরণ চালু থাকতে পারে।
      setIsError(false);
      setMessage(
        "অ্যাকাউন্ট তৈরি হয়েছে। লগইন করতে হলে ইমেইল নিশ্চিতকরণ সম্পন্ন করুন, অথবা Supabase-এর Confirm email সেটিংস পরীক্ষা করুন।"
      );
    } catch (error: unknown) {
      setIsError(true);
      setMessage(
        error instanceof Error
          ? error.message
          : "রেজিস্ট্রেশন করা যায়নি। আবার চেষ্টা করুন।"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-lg sm:p-8"
      >
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-800 text-2xl text-white">
            🏛
          </div>

          <h1 className="text-2xl font-bold text-green-800">
            E-Vumi Seba
          </h1>

          <p className="mt-2 text-gray-600">
            নতুন অ্যাকাউন্ট তৈরি করুন
          </p>
        </div>

        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
            পূর্ণ নাম
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="আপনার পূর্ণ নাম"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            required
          />
        </div>

        <div>
          <label htmlFor="mobile" className="mb-1 block text-sm font-medium text-gray-700">
            মোবাইল নম্বর
          </label>
          <input
            id="mobile"
            name="mobile"
            type="tel"
            placeholder="মোবাইল নম্বর"
            autoComplete="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
            ইমেইল ঠিকানা
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="ইমেইল ঠিকানা"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
            পাসওয়ার্ড
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="কমপক্ষে ৮ অক্ষর"
            autoComplete="new-password"
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-gray-700">
            পাসওয়ার্ড নিশ্চিত করুন
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="পাসওয়ার্ড আবার লিখুন"
            autoComplete="new-password"
            minLength={8}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            required
          />
        </div>

        {message && (
          <p
            role="status"
            aria-live="polite"
            className={`break-words rounded-lg p-3 text-sm ${
              isError
                ? "bg-red-50 text-red-600"
                : "bg-green-50 text-green-700"
            }`}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-green-700 p-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "রেজিস্টার করুন"}
        </button>

        <p className="text-center text-sm text-gray-600">
          আগে অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/login"
            className="font-semibold text-green-700 hover:underline"
          >
            লগইন করুন
          </Link>
        </p>

        <p className="text-center text-sm">
          <Link
            href="/"
            className="text-gray-500 hover:text-green-800"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </p>
      </form>
    </main>
  );
}
