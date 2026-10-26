```tsx
"use client";

import { FormEvent, useState } from "react";
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

    setMessage("");
    setIsError(false);

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
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: name.trim(),
            mobile: mobile.trim(),
          },
        },
      });

      if (error) {
        setIsError(true);
        setMessage(error.message);
        return;
      }

      if (data.session) {
        router.replace("/dashboard");
        router.refresh();
        return;
      }

      setMessage(
        "অ্যাকাউন্ট তৈরি হয়েছে, কিন্তু লগইন session পাওয়া যায়নি। Supabase-এর Confirm email সেটিংস পরীক্ষা করুন।"
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
          <h1 className="text-2xl font-bold text-green-800">
            E-Vumi Seba
          </h1>
          <p className="mt-2 text-gray-600">
            নতুন অ্যাকাউন্ট তৈরি করুন
          </p>
        </div>

        <input
          type="text"
          placeholder="আপনার পূর্ণ নাম"
          autoComplete="name"
          className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-green-600"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="tel"
          placeholder="মোবাইল নম্বর"
          autoComplete="tel"
          className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-green-600"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="ইমেইল ঠিকানা"
          autoComplete="email"
          className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-green-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="পাসওয়ার্ড (কমপক্ষে ৮ অক্ষর)"
          autoComplete="new-password"
          minLength={8}
          className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-green-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="পাসওয়ার্ড আবার লিখুন"
          autoComplete="new-password"
          className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-green-600"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {message && (
          <p
            role="status"
            aria-live="polite"
            className={`break-words text-sm ${
              isError ? "text-red-600" : "text-blue-700"
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
      </form>
    </main>
  );
}
```
