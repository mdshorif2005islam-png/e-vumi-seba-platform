"use client";

import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import type { Profile, Stats } from "@/types/profile";
import { Card, ChangePassword, Field, MetaItem, ProfileHero, SaveBar, StatGrid, useProfileForm } from "./shared";
import s from "./profile.module.css";

export default function CustomerProfile({ profile, stats }: { profile: Profile; stats: Stats }) {
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
          { label: "মোট আবেদন", value: stats.total ?? 0 },
          { label: "চলমান", value: stats.inProgress ?? 0 },
          { label: "সম্পন্ন", value: stats.completed ?? 0 },
        ]} />
        <Link href="/track" className={s.heroLink}>আবেদন ট্র্যাক করুন →</Link>
      </ProfileHero>

      <Card title="ব্যক্তিগত তথ্য" hint="আপনার আবেদন প্রক্রিয়ায় এই তথ্য ব্যবহার করা হবে।">
        <div className={s.grid}>
          <Field label="পূর্ণ নাম" value={values.full_name} onChange={(v) => set("full_name", v)} />
          <Field label="মোবাইল নম্বর" value={values.phone} onChange={(v) => set("phone", v)} placeholder="01712345678" />
          <Field label="এনআইডি (NID) নম্বর" value={values.nid_number} onChange={(v) => set("nid_number", v)} />
          <Field label="ইমেইল" value={profile.email} readOnly />
          <Field label="জেলা" value={values.district} onChange={(v) => set("district", v)} />
          <Field label="এলাকা / উপজেলা" value={values.territory} onChange={(v) => set("territory", v)} />
          <Field label="ঠিকানা" value={values.address} onChange={(v) => set("address", v)} full textarea />
        </div>
        <SaveBar saving={saving} msg={msg}
          onSave={() => save(["full_name", "phone", "nid_number", "district", "territory", "address"])} />
      </Card>
      <ChangePassword />
    </>
  );
}
