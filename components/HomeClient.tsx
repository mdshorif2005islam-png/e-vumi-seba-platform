'use client'
import { useState, useEffect } from 'react'
import { Search, ArrowRight, ShieldCheck, FileCheck2, LogIn, UserPlus, Sparkles, CheckCircle2, Phone, Mail, MapPin, Clock, ExternalLink, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

export default function HomeClient() {
  const [q, setQ] = useState('')
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchServices() {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
        
        if (!supabaseUrl || !supabaseAnonKey) {
          console.warn('Supabase credentials missing')
          setLoading(false)
          return
        }

        const supabase = createClient(supabaseUrl, supabaseAnonKey)
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
            <span style={{ padding: '6px 14px', borderRadius: 20, background: '#f1f5f9', color: '#475569', fontWeight: 700, fontSize: 13 }}>
              মোট সেবা: {filteredServices.length} টি
            </span>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
              <p style={{ fontSize: 16, fontWeight: 600 }}>ডাটাবেজ থেকে সেবাসমূহ লোড হচ্ছে...</p>
            </div>
          ) : filteredServices.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', background: '#fff', borderRadius: 20, border: '1px solid #e2e8f0' }}>
              <p style={{ fontSize: 16, color: '#64748b' }}>আপনার অনুসন্ধানের সাথে মিল রেখে কোনো সেবা পাওয়া যায়নি।</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
              {filteredServices.map((service) => (
                <div key={service.id || service.slug} style={{ padding: 24, borderRadius: 20, background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: '#f0fdf4', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#047857', marginBottom: 18 }}>
                      <FileCheck2 size={24} />
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 8, lineHeight: 1.3 }}>{service.name_bn}</h3>
                    <p style={{ fontSize: 13, color: '#64748b', marginBottom: 20, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {service.description || 'ভূমি সেবা সংক্রান্ত প্রয়োজনীয় সহায়তার জন্য আবেদন করুন।'}
                    </p>
                  </div>
                  <Link 
                    href={`/dashboard/applications/new?service=${service.slug}`} 
                    style={{ fontWeight: 700, color: '#0f766e', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none', padding: '8px 0' }}
                  >
                    আবেদন করুন <ArrowRight size={16} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Workflow Section */}
        <section style={{ background: '#fff', borderTop: '1px solid #e2e8f0', padding: '60px 20px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 800, color: '#0f172a', marginBottom: 40 }}>কীভাবে কাজ করে?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
              {[
                { num: '1', title: 'Agent-এর কাছে আবেদন', desc: 'অনুমোদিত এজেন্টের মাধ্যমে সেবার আবেদন জমা দিন' },
                { num: '2', title: 'তথ্য ও ডকুমেন্ট জমা', desc: 'প্রয়োজনীয় কাগজপত্র আপলোড ও যাচাইকরণ' },
                { num: '3', title: 'E-Vumi Seba Processing', desc: 'আমাদের টিম ফাইল প্রসেসিং সম্পন্ন করবে' },
                { num: '4', title: 'অগ্রগতি Tracking', desc: 'অনলাইনে লাইভ আপডেট দেখুন' },
                { num: '5', title: 'সেবা/ডকুমেন্ট গ্রহণ', desc: 'চূড়ান্ত নথি বা সেবা গ্রহণ করুন' }
              ].map((step, idx) => (
                <div key={idx} style={{ padding: 20, borderRadius: 16, background: '#f8fafc', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#0f766e', color: '#fff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                    {step.num}
                  </div>
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>{step.title}</h4>
                  <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.4 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Professional Dark Navy Rich Footer */}
      <footer style={{ background: '#0f172a', color: '#cbd5e1', padding: '60px 20px 20px', borderTop: '4px solid #0f766e' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 40, paddingBottom: 40, borderBottom: '1px solid #334155' }}>
          
          {/* Column 1: Info & Hotline */}
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#38bdf8', marginBottom: 16 }}>ভূমি সেবা সহায়তা কেন্দ্র</h3>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: '#94a3b8', marginBottom: 20 }}>
              বাংলাদেশের ভূমি সংক্রান্ত সকল সেবা এক প্ল্যাটফর্মে। নামজারি, ভূমি উন্নয়ন কর, পর্চা, খতিয়ান এবং আরও অনেক সেবা পান ঝামেলাহীনভাবে।
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ background: '#047857', color: '#fff', padding: '10px 18px', borderRadius: 30, display: 'inline-flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: 15, width: 'fit-content', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                <Phone size={18} /> হটলাইন: ১৬১২২
              </div>
              <div style={{ border: '1px solid #475569', color: '#e2e8f0', padding: '8px 16px', borderRadius: 30, display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 600, fontSize: 13, width: 'fit-content' }}>
                <Phone size={14} /> +৮৮ ০৯৬১২৩১৬১২২
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 700, color: '#38bdf8', marginBottom: 18 }}>দ্রুত লিংক</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              {['হোম', 'সেবা সমূহ', 'ব্লগ', 'সংবাদ', 'ইভেন্ট', 'ফোরাম', 'সহায়তাকারী খুঁজুন', 'আমাদের সম্পর্কে', 'যোগাযোগ'].map((item, idx) => (
                <li key={idx}>
                  <a href="#services" style={{ color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <ChevronRight size={14} style={{ color: '#38bdf8' }} /> {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Main Services */}
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 700, color: '#38bdf8', marginBottom: 18 }}>প্রধান সেবা সমূহ</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              {['ই-নামজারি', 'ভূমি উন্নয়ন কর', 'ভূমি রেকর্ড ও পর্চা', 'মৌজা ম্যাপ', 'দলিল সেবা', 'উত্তরাধিকার ক্যালকুলেটর', 'মৌজা রেট'].map((item, idx) => (
                <li key={idx}>
                  <a href="#services" style={{ color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <ChevronRight size={14} style={{ color: '#38bdf8' }} /> {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Govt Links */}
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 700, color: '#38bdf8', marginBottom: 18 }}>যোগাযোগ</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13, marginBottom: 24, color: '#94a3b8' }}>
              <div style={{ display: 'flex', gap: 10 }}>
                <MapPin size={18} style={{ color: '#38bdf8', flexShrink: 0 }} />
                <span>ভূমি সেবা সহায়তা কেন্দ্র, পৌরসভা এলাকা</span>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <Phone size={16} style={{ color: '#38bdf8', flexShrink: 0 }} />
                <span>০১৭৫০৩৬৪৫৭১</span>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <Clock size={16} style={{ color: '#38bdf8', flexShrink: 0 }} />
                <span>রবিবার - বৃহস্পতিবার, সকাল ৯:০০ - বিকাল ৫:০০</span>
              </div>
            </div>

            <h5 style={{ fontSize: 14, fontWeight: 700, color: '#38bdf8', marginBottom: 10 }}>গুরুত্বপূর্ণ লিংক</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
              {[
                { name: 'land.gov.bd', url: 'https://land.gov.bd' },
                { name: 'আর.এস খতিয়ান ব্যবস্থাপনা', url: '#' },
                { name: 'mutation.land.gov.bd', url: 'https://mutation.land.gov.bd' },
                { name: 'dlrms.land.gov.bd', url: 'https://dlrms.land.gov.bd' },
                { name: 'ldtax.gov.bd', url: 'https://ldtax.gov.bd' }
              ].map((link, idx) => (
                <a key={idx} href={link.url} target="_blank" rel="noreferrer" style={{ color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <ExternalLink size={13} style={{ color: '#38bdf8' }} /> {link.name}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div style={{ maxWidth: 1200, margin: '20px auto 0', textAlign: 'center', fontSize: 13, color: '#64748b' }}>
          © ২০২৬ E-Vumi Seba | সমস্ত অধিকার সংরক্ষিত।
        </div>
      </footer>
    </div>
  )
}
