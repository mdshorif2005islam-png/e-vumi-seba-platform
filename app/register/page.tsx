
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    if (password.length < 8) {
      setMessage("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("দুটি পাসওয়ার্ড মিলছে না।");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: name.trim(),
            mobile: mobile.trim(),
          },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) throw error;

      if (data.session) {
        router.replace("/dashboard");
      } else {
        setMessage(
          "অ্যাকাউন্ট তৈরির অনুরোধ সফল! ইমেইলে verification link পাঠানো হয়ে থাকলে সেটি খুলে অ্যাকাউন্ট নিশ্চিত করো।"
        );
      }
    } catch (error: unknown) {
      setMessage(
        error instanceof Error
          ? error.message
          : "রেজিস্ট্রেশন করা যায়নি। আবার চেষ্টা করো।"
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
          <p className="mt-2 text-gray-600">নতুন অ্যাকাউন্ট তৈরি করুন</p>
        </div>

        <input
          className="w-full rounded-lg border p-3"
          placeholder="আপনার পূর্ণ নাম"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="w-full rounded-lg border p-3"
          placeholder="মোবাইল নম্বর"
          type="tel"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />

        <input
          className="w-full rounded-lg border p-3"
          placeholder="ইমেইল ঠিকানা"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full rounded-lg border p-3"
          placeholder="পাসওয়ার্ড (কমপক্ষে ৮ অক্ষর)"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          required
        />

        <input
          className="w-full rounded-lg border p-3"
          placeholder="পাসওয়ার্ড আবার লিখুন"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {message && (
          <p role="status" className="break-words text-sm text-blue-700">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-green-700 p-3 font-semibold text-white hover:bg-green-800 disabled:opacity-60"
        >
          {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "রেজিস্টার করুন"}
        </button>

        <p className="text-center text-sm text-gray-600">
          আগে অ্যাকাউন্ট আছে?{" "}
          <Link className="font-semibold text-green-700" href="/login">
            লগইন করুন
          </Link>
        </p>
      </form>
    </main>
  );
}
