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
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header Navigation */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid #e2e8f0', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)' }}>
        <div className="container" style={{ height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <div style={{ height: 44, width: 44, borderRadius: 12, background: 'linear-gradient(135deg, #0f766e 0%, #047857 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 22, boxShadow: '0 4px 12px rgba(15, 118, 110, 0.25)' }}>
              ভ
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 19, color: '#0f172a', lineHeight: 1.1 }}>E-Vumi Seba</div>
              <div style={{ fontSize: 11, color: '#64748b', fontWeight: 500 }}>Private Land Service Assistance</div>
            </div>
          </Link>

          <nav className="nav-hide-mobile" style={{ display: 'flex', gap: 24, fontWeight: 600, color: '#334155', fontSize: 15, alignItems: 'center' }}>
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
        {/* Hero Section */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 20px 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40, alignItems: 'center' }}>
          <div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 30, background: '#ccfbf1', color: '#0f766e', fontWeight: 700, fontSize: 13, marginBottom: 16 }}>
              <Sparkles size={14} /> বাংলাদেশের ডিজিটাল ভূমি সহায়তা প্ল্যাটফর্ম
            </span>
            <h1 style={{ fontSize: 44, fontWeight: 800, color: '#0f172a', lineHeight: 1.25, letterSpacing: '-0.5px' }}>
              জমির সেবা এখন <span style={{ background: 'linear-gradient(135deg, #0f766e 0%, #047857 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>আরও সহজ ও দ্রুত</span>
            </h1>
            <p style={{ fontSize: 16, color: '#475569', marginTop: 16, marginBottom: 28, lineHeight: 1.6, maxWidth: 540 }}>
              অনুমোদিত Agent-এর সাহায্যে নামজারি, খতিয়ান, খাজনা সহ সকল প্রকার ভূমি সেবা আবেদন অত্যন্ত সুশৃঙ্খল ও নিরাপদ উপায়ে সমাধান করুন।
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a href="#services" style={{ padding: '12px 24px', borderRadius: 12, background: 'linear-gradient(135deg, #0f766e 0%, #047857 100%)', color: '#fff', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 6px 16px rgba(15, 118, 110, 0.25)' }}>
                সেবা গ্রহণ করুন <ArrowRight size={18}/>
              </a>
              <Link href="/track" style={{ padding: '12px 24px', borderRadius: 12, background: '#fff', border: '1px solid #cbd5e1', color: '#334155', fontWeight: 700, textDecoration: 'none' }}>
                আবেদনের ট্র্যাকিং
              </Link>
            </div>
            <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 16 }}>* E-Vumi Seba একটি স্বাধীন সেবা প্রদানকারী প্ল্যাটফর্ম; এটি সরাসরি কোনো সরকারি সংস্থা নয়।</p>
          </div>

          <div style={{ padding: 32, borderRadius: 24, background: 'linear-gradient(135deg, #f0fdf4 0%, #e6f4f1 100%)', border: '1px solid #99f6e4', boxShadow: '0 10px 30px rgba(15, 118, 110, 0.08)' }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: '#0f766e', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, boxShadow: '0 4px 12px rgba(15, 118, 110, 0.3)' }}>
              <ShieldCheck size={32} />
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>নিরাপদ ও স্বচ্ছ প্রক্রিয়া</h3>
            <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6, marginBottom: 20 }}>
              আপনার জমির সকল প্রয়োজনীয় কাগজপত্র আপলোড থেকে শুরু করে ট্র্যাকিং পর্যন্ত প্রতিটি ধাপে পাচ্ছেন রিয়েল-টাইম আপডেট।
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#0f766e', fontWeight: 600 }}>
                <CheckCircle2 size={16} /> দ্রুত ফাইল প্রসেসিং
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#0f766e', fontWeight: 600 }}>
                <CheckCircle2 size={16} /> অনুমোদিত অভিজ্ঞ এজেন্ট নেটওয়ার্ক
              </div>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section style={{ maxWidth: 1200, margin: '0 auto 40px', padding: '0 20px' }}>
          <div style={{ padding: 12, borderRadius: 18, background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.04)', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', minWidth: 260 }}>
              <Search size={20} style={{ color: '#94a3b8' }} />
              <input 
                type="text" 
                placeholder="আপনার প্রয়োজনীয় সেবা খুঁজুন — খতিয়ান, নামজারি, নকশা, খাজনা..." 
                value={q} 
                onChange={e => setQ(e.target.value)} 
                style={{ width: '100%', padding: '12px 0', border: 'none', outline: 'none', fontSize: 15, color: '#1e293b' }} 
              />
            </div>
            <button style={{ padding: '12px 28px', borderRadius: 12, background: '#0f766e', color: '#fff', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
              খুঁজুন
            </button>
          </div>
        </section>

        {/* Services Grid */}
        <section id="services" style={{ maxWidth: 1200, margin: '0 auto 60px', padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
            <div>
              <p style={{ color: '#0f766e', fontWeight: 800, fontSize: 13, letterSpacing: '1px' }}>অনলাইন ভূমিসেবা ব্যবস্থা</p>
              <h2 style={{ fontSize: 30, fontWeight: 800, color: '#0f172a', marginTop: 4 }}>সকল সেবাসমূহ</h2>
            </div>
            <span style={{ padding: '6px 14px', borderRadius: 20, background: '#f1f5f9', color: '#475569', fontWeight: 700
