"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Profile, Stats } from "@/types/profile";
import CustomerProfile from "@/components/profile/CustomerProfile";
import AgentProfile from "@/components/profile/AgentProfile";
import AdminProfile from "@/components/profile/AdminProfile";
import s from "@/components/profile/profile.module.css";

type Loaded = { profile: Profile; stats: Stats };

export default function ProfilePage() {
  const [data, setData] = useState<Loaded | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function load() {
    try {
      const supabase = createClient();
      const { data: auth } = await supabase.auth.getUser();
      const user = auth.user;
      if (!user) {
        window.location.href = "/auth/login";
        return;
      }

      const { data: row } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();

      const profile: Profile = {
        id: user.id,
        email: user.email ?? null,
        role: "customer",
        full_name: null, phone: null, avatar_url: null, address: null, district: null,
        territory: null, nid_number: null, agent_code: null, bio: null,
        ...(row ?? {}),
      };

      // টেবিল/কলামের নাম আলাদা হলে নিচের .from() ও .eq() বদলে নিন
      const count = async (q: PromiseLike<{ count: number | null }>) => (await q).count ?? 0;
      const apps = () => supabase.from("applications").select("id", { count: "exact", head: true });
      const isManager = profile.role === "owner" || profile.role === "staff";
      let stats: Stats = {};

      if (isManager) {
        const [users, agents, applications, pending] = await Promise.all([
          count(supabase.from("profiles").select("id", { count: "exact", head: true })),
          count(supabase.from("profiles").select("id", { count: "exact", head: true }).eq("role", "agent")),
          count(apps()),
          count(apps().eq("status", "pending")),
        ]);
        stats = { users, agents, applications, pending };
      } else if (profile.role === "agent") {
        const [total, pending, completed] = await Promise.all([
          count(apps().eq("agent_id", user.id)),
          count(apps().eq("agent_id", user.id).eq("status", "pending")),
          count(apps().eq("agent_id", user.id).eq("status", "completed")),
        ]);
        stats = { total, pending, completed };
      } else {
        const [total, completed] = await Promise.all([
          count(apps().eq("customer_id", user.id)),
          count(apps().eq("customer_id", user.id).eq("status", "completed")),
        ]);
        stats = { total, completed, inProgress: Math.max(total - completed, 0) };
      }

      setData({ profile, stats });
    } catch (e) {
      console.error("Profile load failed", e);
      setError("প্রোফাইল লোড করা যায়নি। পেজ রিফ্রেশ করে আবার চেষ্টা করুন।");
    }
  }

  if (error) return <main className={s.page}><p style={{ color: "#b42318" }}>{error}</p></main>;
  if (!data) return <main className={s.page}><p style={{ color: "#5b6b7f" }}>লোড হচ্ছে…</p></main>;

  const { profile, stats } = data;
  const isManager = profile.role === "owner" || profile.role === "staff";

  return (
    <main className={s.page}>
      {isManager && <AdminProfile profile={profile} stats={stats} />}
      {profile.role === "agent" && <AgentProfile profile={profile} stats={stats} />}
      {!isManager && profile.role !== "agent" && <CustomerProfile profile={profile} stats={stats} />}
    </main>
  );
}
