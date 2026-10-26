"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  router.replace("/dashboard");
router.refresh();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const supabase = createClient();

      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (error) {
        setMessage(error.message);
        return;
      }

      if (!data.session) {
        setMessage("লগইন session পাওয়া যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      router.replace("/dashboard");
      router.refresh();
    } catch {
      setMessage("লগইন করা যায়নি। ইন্টারনেট ও Supabase সেটিংস পরীক্ষা করুন।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md space-y-5 rounded-2xl bg-white p-6 shadow-xl sm:p-8"
      >
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-900 text-2xl text-white">
            🏛
          </div>
          <h1 className="text-2xl font-bold text-purple-900">
            E-Vumi Seba
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            আপনার অ্যাকাউন্টে লগইন করুন
          </p>
        </div>

        {searchParams.get("registered") === "1" && (
          <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
            রেজিস্ট্রেশন সম্পন্ন হয়েছে। এখন লগইন করুন।
          </p>
        )}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            ইমেইল ঠিকানা
          </label>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="আপনার ইমেইল লিখুন"
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-purple-700 focus:ring-2 focus:ring-purple-100"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            পাসওয়ার্ড
          </label>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="আপনার পাসওয়ার্ড লিখুন"
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-purple-700 focus:ring-2 focus:ring-purple-100"
            required
          />
        </div>

        {message && (
          <p role="alert" className="break-words text-sm text-red-600">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-purple-900 p-3 font-semibold text-white transition hover:bg-purple-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "লগইন হচ্ছে..." : "লগইন করুন"}
        </button>

        <p className="text-center text-sm text-gray-600">
          নতুন ব্যবহারকারী?{" "}
          <Link
            href="/register"
            className="font-semibold text-purple-800 hover:underline"
          >
            অ্যাকাউন্ট তৈরি করুন
          </Link>
        </p>

        <p className="text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-purple-800"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </p>
      </form>
    </main>
  );
}
