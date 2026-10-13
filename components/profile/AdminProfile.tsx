"use client";

import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import type { Profile, Stats } from "@/types/profile";
import { Card, ChangePassword, Field, MetaItem, ProfileHero, SaveBar, StatGrid, useProfileForm } from "./shared";
import s from "./profile.module.css";

// owner ও staff — দুজনের জন্যই এই পেজ
export default function AdminProfile({ profile, stats }: { profile: Profile; stats: Stats }) {
  const { values, set, save, saving, msg, setValues } = useProfileForm(profile);
  return (
    <>
      <ProfileHero
        profile={values}
        onAvatar={(url) => setValues((p) => ({ ...p, avatar_url: url }))}
        meta={<>
          {profile.email && <MetaItem icon={<Mail size={14} />} text={profile.email} />}
          {values.phone && <MetaItem icon={<Phone size={14} />} text={values.phone} />}
        </>}
      >
        <StatGrid items={[
          { label: "মোট ব্যবহারকারী", value: stats.users ?? 0 },
          { label: "এজেন্ট", value: stats.agents ?? 0 },
          { label: "মোট আবেদন", value: stats.applications ?? 0 },
          { label: "পেন্ডিং আবেদন", value: stats.pending ?? 0 },
        ]} />
        <Link href="/dashboard" className={s.heroLink}>ড্যাশবোর্ডে যান →</Link>
      </ProfileHero>

      <Card title="অ্যাকাউন্টের তথ্য">
        <div className={s.grid}>
          <Field label="পূর্ণ নাম" value={values.full_name} onChange={(v) => set("full_name", v)} />
          <Field label="মোবাইল নম্বর" value={values.phone} onChange={(v) => set("phone", v)} placeholder="01750364571" />
          <Field label="ইমেইল" value={profile.email} readOnly />
          <Field label="রোল" value={profile.role} readOnly />
        </div>
        <SaveBar saving={saving} msg={msg} onSave={() => save(["full_name", "phone"])} />
      </Card>
      <ChangePassword />
    </>
  );
}
