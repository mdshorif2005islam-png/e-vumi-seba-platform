
'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Search, MapPinned, FileText, RefreshCw } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

type Application = {
  application_no: string;
  service_name: string;
  status: string;
  updated_at: string | null;
};

const statusLabels: Record<string, string> = {
  pending: 'অপেক্ষমাণ',
  submitted: 'জমা হয়েছে',
  processing: 'প্রক্রিয়াধীন',
  approved: 'অনুমোদিত',
  rejected: 'বাতিল',
  completed: 'সম্পন্ন',
  in_progress: 'কাজ চলছে',
};

export default function TrackPage() {
  const [phone, setPhone] = useState('');
  const [results, setResults] = useState<Application[]>([]);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  async function track(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const normalizedPhone = phone.trim();

    if (!/^[0-9+\-\s()]{8,20}$/.test(normalizedPhone)) {
      setError('সঠিক মোবাইল নম্বর লিখুন।');
      return;
    }

    setLoading(true);
    setError('');
    setResults([]);
    setSearched(false);

    try {
      const supabase = createClient();

      const { data, error: queryError } = await supabase.rpc(
        'track_applications_by_phone',
        { p_phone: normalizedPhone }
      );

      if (queryError) {
        console.error('Tracking error:', queryError.message);
        setError(
          'এই মুহূর্তে আবেদন খোঁজা যাচ্ছে না। পরে আবার চেষ্টা করুন।'
        );
        return;
      }

      const applications = (data ?? []) as Application[];

      setResults(applications);
      setSearched(true);
    } catch (err) {
      console.error('Tracking request failed:', err);
      setError('সার্ভারের সঙ্গে যোগাযোগ করা যাচ্ছে না। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-shell">
      <div style={{ width: 'min(700px, 100%)' }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            color: 'var(--brand, #087f5b)',
            fontWeight: 700,
            marginBottom: 16,
            textDecoration: 'none',
          }}
        >
          <MapPinned size={20} />
          E-Vumi Seba
        </Link>

        <section className="card" style={{ padding: 28 }}>
          <span className="badge badge-teal">আবেদন ট্র্যাকিং</span>

          <h1 style={{ fontSize: 28, marginTop: 12 }}>
            আবেদনের অবস্থা দেখুন
          </h1>

          <p className="muted" style={{ marginTop: 8 }}>
            আবেদন করার সময় যে মোবাইল নম্বর দিয়েছিলেন, সেটি লিখুন।
            ওই নম্বরের সঙ্গে যুক্ত আবেদনগুলোর অবস্থা দেখানো হবে।
          </p>

          <form onSubmit={track} style={{ marginTop: 24 }}>
            <div className="form-group">
              <label className="label" htmlFor="tracking-phone">
                নিবন্ধিত মোবাইল নম্বর
              </label>

              <input
                id="tracking-phone"
                className="input"
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
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? (
                <RefreshCw size={17} />
              ) : (
                <Search size={17} />
              )}
              {loading ? 'খোঁজা হচ্ছে...' : 'আবেদন খুঁজুন'}
            </button>
          </form>

          {error && (
            <p className="error" role="alert" style={{ marginTop: 16 }}>
              {error}
            </p>
          )}

          {searched && results.length === 0 && (
            <div
              className="card"
              style={{ padding: 20, marginTop: 22, textAlign: 'center' }}
            >
              <Search size={28} />
              <h3 style={{ marginTop: 10 }}>কোনো আবেদন পাওয়া যায়নি</h3>
              <p className="muted" style={{ marginTop: 6 }}>
                নম্বরটি আবেদন করার সময় দেওয়া নম্বরের সঙ্গে মিলিয়ে দেখুন।
              </p>
            </div>
          )}

          {results.length > 0 && (
            <section style={{ marginTop: 24 }}>
              <h2 style={{ fontSize: 20, marginBottom: 14 }}>
                আপনার আবেদনের তালিকা ({results.length})
              </h2>

              <div style={{ display: 'grid', gap: 14 }}>
                {results.map((app, index) => (
                  <article
                    className="card"
                    key={`${app.application_no}-${index}`}
                    style={{ padding: 20, background: '#f8fffd' }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: 12,
                        flexWrap: 'wrap',
                      }}
                    >
                      <div>
                        <p className="muted" style={{ fontSize: 12 }}>
                          আবেদন নম্বর
                        </p>
                        <h3 style={{ overflowWrap: 'anywhere' }}>
                          {app.application_no}
                        </h3>
                      </div>

                      <span className="badge badge-teal">
                        {statusLabels[app.status] ?? app.status}
                      </span>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 10,
                        marginTop: 18,
                      }}
                    >
                      <FileText size={20} />
                      <div>
                        <h4>{app.service_name}</h4>
                        <p className="muted" style={{ fontSize: 13, marginTop: 6 }}>
                          সর্বশেষ আপডেট:{' '}
                          {app.updated_at
                            ? new Date(app.updated_at).toLocaleString('bn-BD')
                            : 'তথ্য নেই'}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </section>
      </div>
    </main>
  );
}
