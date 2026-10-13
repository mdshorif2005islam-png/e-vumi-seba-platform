"use client";

import Link from "next/link";
import { MapPin, Phone, ShieldCheck } from "lucide-react";
import type { Profile, Stats } from "@/types/profile";
import { Card, ChangePassword, Field, MetaItem, ProfileHero, SaveBar, StatGrid, useProfileForm } from "./shared";
import s from "./profile.module.css";

export default function AgentProfile({ profile, stats }: { profile: Profile; stats: Stats }) {
  const { values, set, save, saving, msg, setValues } = useProfileForm(profile);
  return (
    <>
      <ProfileHero
        profile={values}
        onAvatar={(url) => setValues((p) => ({ ...p, avatar_url: url }))}
        meta={<>
          <MetaItem icon={<ShieldCheck size={14} />} text={profile.agent_code ? `এজেন্ট কোড: ${profile.agent_code}` : "এজেন্ট কোড এখনও দেওয়া হয়নি"} />
          {values.territory && <MetaItem icon={<MapPin size={14} />} text={values.territory} />}
          {values.phone && <MetaItem icon={<Phone size={14} />} text={values.phone} />}
        </>}
      >
        <StatGrid items={[
          { label: "মোট ফাইল", value: stats.total ?? 0 },
          { label: "পেন্ডিং", value: stats.pending ?? 0 },
          { label: "সম্পন্ন", value: stats.completed ?? 0 },
        ]} />
        <Link href="/dashboard" className={s.heroLink}>আমার ফাইলগুলো দেখুন →</Link>
      </ProfileHero>

      <Card title="এজেন্টের তথ্য" hint="কাস্টমাররা এই তথ্য দেখে আপনার সঙ্গে যোগাযোগ করবে।">
        <div className={s.grid}>
          <Field label="পূর্ণ নাম" value={values.full_name} onChange={(v) => set("full_name", v)} />
          <Field label="মোবাইল নম্বর" value={values.phone} onChange={(v) => set("phone", v)} placeholder="01812345678" />
          <Field label="কর্ম এলাকা / Territory" value={values.territory} onChange={(v) => set("territory", v)} placeholder="যেমন: সৈয়দপুর, নীলফামারী" />
          <Field label="জেলা" value={values.district} onChange={(v) => set("district", v)} />
          <Field label="এনআইডি (NID) নম্বর" value={values.nid_number} onChange={(v) => set("nid_number", v)} />
          <Field label="এজেন্ট কোড (মালিক নির্ধারণ করেন)" value={values.agent_code} readOnly />
          <Field label="পরিচিতি" value={values.bio} onChange={(v) => set("bio", v)} full textarea
            placeholder="আপনার অভিজ্ঞতা ও বিশেষত্ব সংক্ষেপে লিখুন" />
        </div>
        <SaveBar saving={saving} msg={msg}
          onSave={() => save(["full_name", "phone", "territory", "district", "nid_number", "bio"])} />
      </Card>
      <ChangePassword />
    </>
  );
}
