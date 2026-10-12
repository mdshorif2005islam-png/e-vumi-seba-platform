'use client'
import { useState, useEffect } from 'react'
import { Search, ArrowRight, ShieldCheck, FileCheck2, LogIn, UserPlus, Sparkles, CheckCircle2, Phone, MapPin, Clock, ExternalLink, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function HomeClient() {
  const [q, setQ] = useState('')
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchServices() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('active', true)
          .order('id', { ascending: true })

        if (!error && data) {
          setServices(data)
        }
      } catch (err) {
        console.error('Error fetching services:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  const filteredServices = services.filter(s => 
    (s.name_bn && s.name_bn.toLowerCase().includes(q.toLowerCase())) ||
    (s.description && s.description.toLowerCase().includes(q.toLowerCase())) ||
    (s.slug && s.slug.toLowerCase().includes(q.toLowerCase()))
  )

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid #e2e8f0', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)' }}>
        <div style={{ height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <div style={{ height: 44, width: 44, borderRadius: 12, background: 'linear-gradient(135deg, #0f766e 0%, #047857 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 22 }}>ভ</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 19, color: '#0f172a', lineHeight: 1.1 }}>E-Vumi Seba</div>
              <div style={{ fontSize: 11, color: '#64748b' }}>Private Land Service Assistance</div>
            </div>
          </Link>

          <nav style={{ display: 'flex', gap: 24, fontWeight: 600, color: '#334155', fontSize: 15, alignItems: 'center' }}>
            <a href="#home" style={{ color: '#0f766e', textDecoration: 'none' }}>হোম</a>
            <a href="#services" style={{ color: '#334155', textDecoration: 'none' }}>সেবাসমূহ</a>
            <Link href="/track" style={{ color: '#334155', textDecoration: 'none' }}>আবেদন ট্র্যাক</Link>
            <Link href="/dashboard" style={{ color: '#334155', textDecoration: 'none' }}>Dashboard</Link>
          </nav>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Link href="/auth/login" style={{ padding: '8px 16px', borderRadius: 10, border: '1px solid #cbd5e1', background: '#fff', color: '#334155', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14 }}>
              <LogIn size={15}/> লগইন
            </Link>
            <Link href="/auth/register" style={{ padding: '8px 16px', borderRadius: 10, background: '#0f766e', color: '#fff', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14 }}>
              <UserPlus size={15}/> রেজিস্টার
            </Link>
          </div>
        </div>
      </header>

      <main id="home">
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 20px 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40, alignItems: 'center' }}>
          <div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 30, background: '#ccfbf1', color: '#0f766e', fontWeight: 700, fontSize: 13, marginBottom: 16 }}>
              <Sparkles size={14} /> বাংলাদেশের ডিজিটাল ভূমি সহায়তা প্ল্যাটফর্ম
            </span>
            <h1 style={{ fontSize: 44, fontWeight: 800, color: '#0f172a', lineHeight: 1.25 }}>
              জমির সেবা এখন <span style={{ color: '#0f766e' }}>আরও সহজ ও দ্রুত</span>
            </h1>
            <p style={{ fontSize: 16, color: '#475569', marginTop: 16, marginBottom: 28, maxWidth: 540 }}>
              অনুমোদিত Agent-এর সাহায্যে নামজারি, খতিয়ান, খাজনা সহ সকল প্রকার ভূমি সেবা আবেদন করুন।
            </p>
            <div style={{ display: 'flex', gap: 14 }}>
              <a href="#services" style={{ padding: '12px 24px', borderRadius: 12, background: '#0f766e', color: '#fff', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                সেবা গ্রহণ করুন <ArrowRight size={18}/>
              </a>
              <Link href="/track" style={{ padding: '12px 24px', borderRadius: 12, background: '#fff', border: '1px solid #cbd5e1', color: '#334155', fontWeight: 700, textDecoration: 'none' }}>
                আবেদনের ট্র্যাকিং
              </Link>
            </div>
          </div>
          <div style={{ padding: 32, borderRadius: 24, background: '#f0fdf4', border: '1px solid #99f6e4' }}>
            <ShieldCheck size={32} style={{ color: '#0f766e', marginBottom: 12 }} />
            <h3 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>নিরাপদ ও স্বচ্ছ প্রক্রিয়া</h3>
            <p style={{ fontSize: 14, color: '#475569' }}>রিয়েল-টাইম আপডেট ও দ্রুত ফাইল প্রসেসিং।</p>
          </div>
        </section>

        <section style={{ maxWidth: 1200, margin: '0 auto 40px', padding: '0 20px' }}>
          <div style={{ padding: 12, borderRadius: 18, background: '#fff', border: '1px solid #e2e8f0', display: 'flex', gap: 12, alignItems: 'center' }}>
            <Search size={20} style={{ color: '#94a3b8', marginLeft: 10 }} />
            <input 
              type="text" 
              placeholder="আপনার প্রয়োজনীয় সেবা খুঁজুন..." 
              value={q} 
              onChange={e => setQ(e.target.value)} 
              style={{ width: '100%', padding: '10px 0', border: 'none', outline: 'none', fontSize: 15 }} 
            />
          </div>
        </section>

        <section id="services" style={{ maxWidth: 1200, margin: '0 auto 60px', padding: '0 20px' }}>
          <h2 style={{ fontSize: 30, fontWeight: 800, color: '#0f172a', marginBottom: 24 }}>সকল সেবাসমূহ ({filteredServices.length})</h2>
          {loading ? (
            <p style={{ color: '#64748b' }}>লোড হচ্ছে...</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
              {filteredServices.map((s) => (
                <div key={s.id || s.slug} style={{ padding: 24, borderRadius: 20, background: '#fff', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <FileCheck2 size={24} style={{ color: '#047857', marginBottom: 12 }} />
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{s.name_bn}</h3>
                    <p style={{ fontSize: 13, color: '#64748b', marginBottom: 16 }}>{s.description || 'ভূমি সেবা সংক্রান্ত সহায়তা।'}</p>
                  </div>
                  <Link href={`/dashboard/applications/new?service=${s.slug}`} style={{ fontWeight: 700, color: '#0f766e', fontSize: 14, textDecoration: 'none' }}>
                    আবেদন করুন →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer style={{ background: '#0f172a', color: '#cbd5e1', padding: '40px 20px', borderTop: '4px solid #0f766e' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <b style={{ color: '#fff', fontSize: 18 }}>E-Vumi Seba</b>
            <p style={{ fontSize: 13, marginTop: 4 }}>বাংলাদেশের সব ভূমিসেবাকে এক ছাদের নিচে আনতে সহায়ক প্ল্যাটফর্ম।</p>
          </div>
          <div style={{ background: '#047857', color: '#fff', padding: '8px 16px', borderRadius: 20, fontWeight: 700 }}>
            হটলাইন: ১৬১২২
          </div>
        </div>
      </footer>
    </div>
  )
}
