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

          <nav className="nav-hide-mobile" style={{ display: 'flex', gap: 28, fontWeight: 600, color: '#334155', fontSize: 15 }}>
            <a href="#home" style={{ color: '#0f766e', textDecoration: 'none' }}>হোম</a>
            <a href="#services" style={{ color: '#334155', textDecoration: 'none' }}>সেবাসমূহ</a>
            <Link href="/track" style={{ color: '#334155', textDecoration: 'none' }}>আবেদন ট্র্যাক</Link>
            <Link href="/dashboard" style={{ color: '#334155', textDecoration: 'none' }}>Dashboard</Link>
          </nav>

          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/auth/login" className="btn" style={{ padding: '9px 18px', borderRadius: 10, border: '1px solid #cbd5e1', background: '#fff', color: '#334155', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
              <LogIn size={16}/> লগইন
            </Link>
            <Link href="/auth/register" className="btn" style={{ padding: '9px 18px', borderRadius: 10, background: 'linear-gradient(135deg, #0f766e 0%, #047857 100%)', color: '#fff', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 4px 12px rgba(15, 118, 110, 0.2)' }}>
              <UserPlus size={16}/> রেজিস্টার
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

          <div style={{ padding:
