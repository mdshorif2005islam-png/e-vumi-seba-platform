"use client";

import { useState, type ReactNode } from "react";
import { Camera, Check, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Profile, Role } from "@/types/profile";
import s from "./profile.module.css";

type Msg = { type: "ok" | "err"; text: string } | null;
const PHONE_RE = /^01[3-9]\d{8}$/;

export const roleMeta: Record<Role, { label: string; cls: string }> = {
  owner: { label: "মালিক", cls: s.badgeOwner },
  staff: { label: "স্টাফ", cls: s.badgeStaff },
  agent: { label: "এজেন্ট", cls: s.badgeAgent },
  customer: { label: "কাস্টমার", cls: s.badgeCustomer },
};

export function useProfileForm(profile: Profile) {
  const supabase = createClient();
  const [values, setValues] = useState<Profile>(profile);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<Msg>(null);

  const set = (key: keyof Profile, value: string) =>
    setValues((p) => ({ ...p, [key]: value }));

  async function save(fields: (keyof Profile)[]) {
    setMsg(null);
    if (!values.full_name?.trim()) return setMsg({ type: "err", text: "নাম লিখুন।" });
    if (fields.includes("phone") && values.phone && !PHONE_RE.test(values.phone)) {
      return setMsg({ type: "err", text: "সঠিক মোবাইল নম্বর দিন (যেমন 01712345678)।" });
    }
    setSaving(true);
    const payload: Record<string, unknown> = {};
    fields.forEach((f) => (payload[f] = values[f] ?? null));
    payload.updated_at = new Date().toISOString();
    const { error } = await supabase.from("profiles").update(payload).eq("id", profile.id);
    setSaving(false);
    setMsg(error
      ? { type: "err", text: "সংরক্ষণ হয়নি। কিছুক্ষণ পর আবার চেষ্টা করুন।" }
      : { type: "ok", text: "প্রোফাইল সংরক্ষিত হয়েছে।" });
  }
  return { values, set, save, saving, msg, setValues };
}

export function Card({ title, hint, children }: { title?: string; hint?: string; children: ReactNode }) {
  return (
    <section className={s.card}>
      {title && <h2 className={s.cardTitle}>{title}</h2>}
      {hint && <p className={s.cardHint}>{hint}</p>}
      {children}
    </section>
  );
}

export function Field({
  label, value, onChange, readOnly = false, type = "text", placeholder, full = false, textarea = false,
}: {
  label: string; value: string | null; onChange?: (v: string) => void; readOnly?: boolean;
  type?: string; placeholder?: string; full?: boolean; textarea?: boolean;
}) {
  return (
    <div className={full ? s.full : undefined}>
      <label className={s.label}>{label}</label>
      {textarea ? (
        <textarea className={`${s.input} ${s.textarea}`} value={value ?? ""} readOnly={readOnly}
          placeholder={placeholder} onChange={(e) => onChange?.(e.target.value)} />
      ) : (
        <input className={s.input} type={type} value={value ?? ""} readOnly={readOnly}
          placeholder={placeholder} onChange={(e) => onChange?.(e.target.value)} />
      )}
    </div>
  );
}

export function StatGrid({ items }: { items: { label: string; value: number }[] }) {
  return (
    <div className={s.stats}>
      {items.map((i) => (
        <div className={s.stat} key={i.label}>
          <p className={s.statLabel}>{i.label}</p>
          <p className={s.statValue}>{i.value.toLocaleString("bn-BD")}</p>
        </div>
      ))}
    </div>
  );
}

export function SaveBar({ onSave, saving, msg }: { onSave: () => void; saving: boolean; msg: Msg }) {
  return (
    <div className={s.actions}>
      <button type="button" className={s.btnPrimary} onClick={onSave} disabled={saving}>
        {saving ? "সংরক্ষণ হচ্ছে…" : "সংরক্ষণ করুন"}
      </button>
      {msg && (
        <span role="status" className={`${s.msg} ${msg.type === "ok" ? s.msgOk : s.msgErr}`}>
          {msg.type === "ok" && <Check size={16} />} {msg.text}
        </span>
      )}
    </div>
  );
}

export function ProfileHero({
  profile, onAvatar, meta, children,
}: {
  profile: Profile; onAvatar: (url: string) => void; meta?: ReactNode; children?: ReactNode;
}) {
  const supabase = createClient();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const role = roleMeta[profile.role] ?? roleMeta.customer;
  const initials = (profile.full_name || profile.email || "U").trim().slice(0, 2).toUpperCase();

  async function upload(file: File) {
    setErr("");
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) return setErr("শুধু JPG, PNG বা WEBP ছবি দিন।");
    if (file.size > 2 * 1024 * 1024) return setErr("ছবি ২ এমবির কম হতে হবে।");
    setBusy(true);
    const path = `${profile.id}/avatar-${Date.now()}.${file.type.split("/")[1]}`;
    const { error } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
    if (error) { setBusy(false); return setErr("ছবি আপলোড হয়নি।"); }
    const { data } = supabase.storage.from("avatars").getPublicUrl(path);
    await supabase.from("profiles").update({ avatar_url: data.publicUrl }).eq("id", profile.id);
    onAvatar(data.publicUrl);
    setBusy(false);
  }

  return (
    <div className={s.hero}>
      <div className={s.banner} />
      <div className={s.heroBody}>
        <div className={s.heroTop}>
          <label className={s.avatarWrap} title="ছবি পরিবর্তন করুন">
            {profile.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.avatar_url} alt="প্রোফাইল ছবি" className={s.avatar} />
            ) : (
              <div className={s.avatar}>{initials}</div>
            )}
            <span className={s.camBtn}>{busy ? "…" : <Camera size={14} />}</span>
            <input className={s.hiddenInput} type="file" accept="image/jpeg,image/png,image/webp"
              onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
          </label>
          <div className={s.identity}>
            <h1 className={s.name}>
              {profile.full_name || "নাম দেওয়া হয়নি"}
              <span className={`${s.badge} ${role.cls}`}>{role.label}</span>
            </h1>
            <div className={s.meta}>{meta}</div>
            {err && <p className={s.avatarErr}>{err}</p>}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export function MetaItem({ icon, text }: { icon: ReactNode; text: string }) {
  return <span className={s.metaItem}>{icon}{text}</span>;
}

export function ChangePassword() {
  const supabase = createClient();
  const [open, setOpen] = useState(false);
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState<Msg>(null);

  async function change() {
    if (pw.length < 8) return setMsg({ type: "err", text: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।" });
    const { error } = await supabase.auth.updateUser({ password: pw });
    if (error) return setMsg({ type: "err", text: "পাসওয়ার্ড পরিবর্তন হয়নি। আবার লগইন করে চেষ্টা করুন।" });
    setPw(""); setOpen(false); setMsg({ type: "ok", text: "পাসওয়ার্ড পরিবর্তন হয়েছে।" });
  }

  return (
    <Card title="নিরাপত্তা">
      {!open ? (
        <div className={s.row}>
          <span className={s.rowText}><Lock size={16} /> পাসওয়ার্ড পরিবর্তন করুন</span>
          <button type="button" className={s.btnGhost} onClick={() => setOpen(true)}>পরিবর্তন করুন</button>
        </div>
      ) : (
        <div className={s.grid}>
          <Field label="নতুন পাসওয়ার্ড" type="password" value={pw} onChange={setPw} placeholder="কমপক্ষে ৮ অক্ষর" />
          <div className={s.actions} style={{ marginTop: 0, alignSelf: "end" }}>
            <button type="button" className={s.btnPrimary} onClick={change}>নিশ্চিত করুন</button>
            <button type="button" className={s.btnGhost} onClick={() => setOpen(false)}>বাতিল</button>
          </div>
        </div>
      )}
      {msg && (
        <p className={`${s.msg} ${msg.type === "ok" ? s.msgOk : s.msgErr}`} style={{ marginTop: 12 }}>{msg.text}</p>
      )}
    </Card>
  );
}
