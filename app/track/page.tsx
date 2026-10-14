
'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { MapPinned, Search, FileText, ShieldCheck } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

type Application = {
  application_no: string;
  service_name: string;
  status: string;
  updated_at: string | null;
};

const statusNames: Record<string, string> = {
  pending: 'অপেক্ষমাণ',
  submitted: 'আবেদন জমা হয়েছে',
  processing: 'যাচাই চলছে',
  approved: 'অনুমোদিত',
  completed: 'সম্পন্ন',
  rejected: 'বাতিল',
};

export default function TrackPage() {
  const [phone, setPhone] = useState('');
  const [applications, setApplications] = useState<Application[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function track(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setApplications([]);
    setSearched(false);
    
  {
  const supabase = createClient();

  const { data, error } = await supabase.rpc(
    'track_applications_by_phone',
    { p_phone: phone.trim() }
  );

  if (error) {
    setError('আবেদন খুঁজতে সমস্যা হয়েছে।');
    console.error(error);
    return;
  }

  setApplications(data ?? []);
  setSearched(true);
} catch (err) {
  console.error(err);
  setError('সার্ভারের সঙ্গে যোগাযোগ করা যাচ্ছে না।');
} finally {
  setLoading(false);
}


    try {
      const supabase = createClient();
      const { data, error } = await supabase.rpc(
        'track_applications_by_phone',
        { p_phone: phone.trim() }
      );

      if (error) throw error;

      setApplications((data ?? []) as Application[]);
      setSearched(true);
    } catch {
      setError('আবেদন খুঁজতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="tracking-page">
      <header className="tracking-header">
        <Link href="/" className="tracking-logo">
          <MapPinned size={26} />
          <span>E-Vumi Seba<small>জমি সংক্রান্ত সেবার সহায়তা</small></span>
        </Link>

        <nav>
          <Link href="/">হোম</Link>
          <Link href="/#services">সেবাসমূহ</Link>
          <Link href="/track" className="active">আবেদন ট্র্যাকিং</Link>
          <Link href="/#contact">যোগাযোগ</Link>
        </nav>
      </header>

      <section className="tracking-hero">
        <div className="tracking-intro">
          <span className="tracking-label">
            <Search size={16} /> আবেদন ট্র্যাকিং
          </span>
          <h1>আপনার আবেদনের<br />সর্বশেষ অবস্থা জানুন</h1>
          <p>
            নিবন্ধিত মোবাইল নম্বর দিয়ে আপনার আবেদনের অগ্রগতি
            সহজেই দেখুন।
          </p>
          <div className="tracking-points">
            <span>✓ সহজ অনুসন্ধান</span>
            <span>✓ স্ট্যাটাস আপডেট</span>
            <span>✓ দ্রুত ফলাফল</span>
          </div>
        </div>

        <div className="tracking-form-card">
          <div className="tracking-icon"><Search size={30} /></div>
          <h2>আবেদন খুঁজুন</h2>
          <p>আবেদন করার সময় ব্যবহৃত মোবাইল নম্বরটি লিখুন।</p>

          <form onSubmit={track}>
            <label htmlFor="phone">নিবন্ধিত মোবাইল নম্বর</label>
            <input
              id="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="01XXXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              minLength={8}
              maxLength={20}
            />
            <button type="submit" disabled={loading}>
              <Search size={19} />
              {loading ? 'খোঁজা হচ্ছে...' : 'আবেদন খুঁজুন'}
            </button>
          </form>

          {error && <p className="tracking-error">{error}</p>}

          {searched && applications.length === 0 && (
            <p className="tracking-empty">
              এই নম্বরের সঙ্গে কোনো আবেদন পাওয়া যায়নি।
              মোবাইল নম্বরটি যাচাই করে আবার চেষ্টা করুন।
            </p>
          )}
        </div>
      </section>

      <section className="tracking-status-section">
        <h2>আবেদনের অবস্থা</h2>
        <p>আপনার আবেদনের বর্তমান অগ্রগতি এখানে দেখুন।</p>

        <div className="tracking-status-grid">
          {[
            ['01', 'আবেদন জমা', 'আপনার আবেদন সিস্টেমে জমা হয়েছে।'],
            ['02', 'যাচাই চলছে', 'আবেদনের তথ্য যাচাই করা হচ্ছে।'],
            ['03', 'অনুমোদন', 'প্রয়োজনীয় অনুমোদনের অপেক্ষায়।'],
            ['04', 'সম্পন্ন', 'আবেদনের কাজ সম্পন্ন হয়েছে।'],
          ].map(([number, title, description]) => (
            <article className="tracking-status-card" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>

        {applications.length > 0 && (
          <div className="tracking-results">
            <h2>আপনার আবেদনসমূহ ({applications.length})</h2>
            {applications.map((app, index) => (
              <article className="tracking-result-card"
                key={`${app.application_no}-${index}`}>
                <FileText size={24} />
                <div className="tracking-result-info">
                  <strong>{app.service_name}</strong>
                  <p>আবেদন নম্বর: {app.application_no}</p>
                  <p>
                    সর্বশেষ আপডেট:{' '}
                    {app.updated_at
                      ? new Date(app.updated_at).toLocaleString('bn-BD')
                      : 'তথ্য নেই'}
                  </p>
                </div>
                <span className="tracking-result-badge">
                  {statusNames[app.status] ?? app.status}
                </span>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="tracking-security">
        <ShieldCheck size={35} />
        <div>
          <h3>আপনার তথ্যের নিরাপত্তা আমাদের অগ্রাধিকার</h3>
          <p>আপনার আবেদন-সংক্রান্ত তথ্য সুরক্ষিত রাখতে আমরা সচেষ্ট।</p>
        </div>
      </section>

      <footer className="tracking-footer">
        <strong>E-Vumi Seba</strong>
        <p>জমি সংক্রান্ত সেবার সহায়তা</p>
        <small>© 2026 E-Vumi Seba. সর্বস্বত্ব সংরক্ষিত।</small>
      </footer>
    </main>
  );
}
