
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;

      router.replace("/dashboard");
      router.refresh();
    } catch (error: unknown) {
      setMessage(
        error instanceof Error
          ? error.message
          : "লগইন করা যায়নি। আবার চেষ্টা করো।"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-lg sm:p-8"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-green-800">
            E-Vumi Seba
          </h1>
          <p className="mt-2 text-gray-600">আপনার অ্যাকাউন্টে লগইন করুন</p>
        </div>

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
          placeholder="পাসওয়ার্ড"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {message && (
          <p role="alert" className="break-words text-sm text-red-600">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-green-700 p-3 font-semibold text-white hover:bg-green-800 disabled:opacity-60"
        >
          {loading ? "লগইন হচ্ছে..." : "লগইন করুন"}
        </button>

        <p className="text-center text-sm text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link className="font-semibold text-green-700" href="/register">
            নতুন অ্যাকাউন্ট খুলুন
          </Link>
        </p>
      </form>
    </main>
  );
}
