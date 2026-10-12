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
      <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid rgba(255,255,255,0.1)', background: '#7b1fa2', backdropFilter: 'blur(12px)' }}>
        <div className="container" style={{ height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: '#fff' }}>
            <div style={{ height: 44, width: 44, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 22 }}>
              🏠
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 18, lineHeight: 1.1 }}>ভূমি সেবা সহায়তা কেন্দ্র</div>
            </div>
          </Link>

          <nav className="nav-hide-mobile" style={{ display: 'flex', gap: 22, fontWeight: 600, color: '#fff', fontSize: 14, alignItems: 'center' }}>
            <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>হোম</Link>
            <Link href="#services" style={{ color: '#fff', textDecoration: 'none' }}>সেবা সমূহ</Link>
            <Link href="/tools" style={{ color: '#fff', textDecoration: 'none' }}>টুলস</Link>
            <Link href="/agents" style={{ color: '#fff', textDecoration: 'none' }}>সহায়তাকারী খুঁজুন</Link>
            <Link href="/buy-land" style={{ color: '#fff', textDecoration: 'none' }}>জমি কিনুন</Link>
            <Link href="/community" style={{ color: '#fff', textDecoration: 'none' }}>কমিউনিটি</Link>
            <Link href="/contact" style={{ color: '#fff', textDecoration: 'none' }}>যোগাযোগ</Link>
            <Link href="/about" style={{ color: '#fff', textDecoration: 'none' }}>সম্পর্কে</Link>
          </nav>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Link href="/dashboard" style={{ padding: '8px 18px', borderRadius: 25, background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', color: '#1e293b', fontWeight: 700, fontSize: 14, textDecoration: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
              Shorif Ahamed
            </Link>
          </div>
        </div>
      </header>

      <main id="home">
        {/* Purple Hero Section */}
        <section style={{ background: '#7b1fa2', color: '#fff', padding: '50px 20px 70px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.3)', fontSize: 13, marginBottom: 20, color: '#f3e8ff' }}>
                সোমাবার, ১২ অক্টোবর ২০২৬
              </div>
              <h1 style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.25, marginBottom: 16 }}>
                বাংলাদেশের ভূমি সেবা প্ল্যাটফর্ম
              </h1>
              <p style={{ fontSize: 15, color: '#f3e8ff', marginBottom: 28, lineHeight: 1.6, maxWidth: 500 }}>
                সারা দেশে আমাদের ভূমি সেবা সহায়তাকারী দল আপনার জমি সংক্রান্ত সকল কাজে সহায়তার জন্য প্রস্তুত।
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <a href="#services" style={{ padding: '12px 28px', borderRadius: 30, background: '#fbbf24', color: '#1e293b', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 14px rgba(0,0,0,0.2)' }}>
                  সেবা নিন <ArrowRight size={16}/>
                </a>
                <Link href="/agents" style={{ padding: '12px 24px', borderRadius: 30, background: 'transparent', border: '1px solid rgba(255,255,255,0.4)', color: '#fff', fontWeight: 700, textDecoration: 'none' }}>
                  সহায়তাকারী খুঁজুন
                </Link>
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 30, flexWrap: 'wrap' }}>
                <span style={{ padding: '6px 14px', borderRadius: 20, background: 'rgba(255,255,255,0.15)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>🛡️ নিরাপদ সেবা</span>
                <span style={{ padding: '6px 14px', borderRadius: 20, background: 'rgba(255,255,255,0.15)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>⚡ দ্রুত প্রক্রিয়া</span>
                <span style={{ padding: '6px 14px', borderRadius: 20, background: 'rgba(255,255,255,0.15)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>🌍 সারা দেশে কার্যক্রম</span>
              </div>
            </div>

            <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 12px 30px rgba(0,0,0,0.25)', padding: 12 }}>
              <div style={{ background: '#e2e8f0', height: 260, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: 15, fontWeight: 600, backgroundImage: 'linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%)' }}>
                [ভূমি সেবা সহায়তা কেন্দ্র অফিসিয়াল ব্যানার]
              </div>
              <div style={{ padding: '12px 8px 4px', textAlign: 'center', color: '#1e293b', fontWeight: 700, fontSize: 16 }}>
                নামজারি ও ভূমি রেকর্ড এখন সহজে
              </div>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section style={{ maxWidth: 1100, margin: '-30px auto 40px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
          <div style={{ padding: 12, borderRadius: 20, background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <button style={{ border: 'none', background: 'transparent', color: '#ef4444', fontWeight: 700, fontSize: 18, padding: '0 10px', cursor: 'pointer' }}>×</button>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12, padding: '0 10px', minWidth: 260 }}>
              <Search size={20} style={{ color: '#7b1fa2' }} />
              <input 
                type="text" 
                placeholder="আপনার প্রয়োজনীয় ভূমি সেবা নির্বাচন করুন — সুনির্দিষ্ট ফি, স্বচ্ছ প্রক্রিয়া..." 
                value={q} 
                onChange={e => setQ(e.target.value)} 
                style={{ width: '100%', padding: '12px 0', border: 'none', outline: 'none', fontSize: 15, color: '#1e293b' }} 
              />
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section id="services" style={{ maxWidth: 1200, margin: '0 auto 60px', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: 35 }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: '#7b1fa2', marginBottom: 6 }}>ভূমি সংক্রান্ত সেবা সমূহ</h2>
            <div style={{ width: 60, height: 3, background: '#7b1fa2', margin: '0 auto 12px', borderRadius: 2 }}></div>
            <span style={{ fontSize: 14, color: '#64748b', fontWeight: 600 }}>মোট উপলব্ধ সেবা: {filteredServices.length} টি</span>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
              <p style={{ fontSize: 16, fontWeight: 600 }}>সেবাসমূহ লোড হচ্ছে...</p>
            </div>
          ) : filteredServices.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', background: '#fff', borderRadius: 20, border: '1px solid #e2e8f0' }}>
              <p style={{ fontSize: 16, color: '#64748b' }}>কোনো সেবা পাওয়া যায়নি।</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
              {filteredServices.map((service) => (
                <div key={service.id || service.slug} style={{ padding: 24, borderRadius: 20, background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: '#f3e8ff', border: '1px solid #e9d5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7b1fa2', marginBottom: 18 }}>
                      <FileCheck2 size={24} />
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 8, lineHeight: 1.3 }}>{service.name_bn}</h3>
                    <p style={{ fontSize: 13, color: '#64748b', marginBottom: 20, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {service.description || 'ভূমি সেবা সংক্রান্ত প্রয়োজনীয় সহায়তার জন্য আবেদন করুন।'}
                    </p>
                  </div>
                  <Link 
                    href={`/dashboard/applications/new?service=${service.slug}`} 
                    style={{ fontWeight: 700, color: '#7b1fa2', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none', padding: '8px 0' }}
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
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#7b1fa2', color: '#fff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
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

      {/* Rich Purple Footer */}
      <footer style={{ background: '#7b1fa2', color: '#f3e8ff', padding: '60px 20px 20px', borderTop: '4px solid #a855f7' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 40, paddingBottom: 40, borderBottom: '1px solid rgba(255, 255, 255, 0.15)' }}>
          
          {/* Column 1 */}
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fbbf24', marginBottom: 16 }}>ভূমি সেবা সহায়তা কেন্দ্র</h3>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: '#f3e8ff', marginBottom: 20 }}>
              বাংলাদেশের ভূমি সংক্রান্ত সকল সেবা এক প্ল্যাটফর্মে। নামজারি, ভূমি উন্নয়ন কর, পর্চা, খতিয়ান এবং আরও অনেক সেবা পান ঝামেলাহীনভাবে।
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ background: '#059669', color: '#fff', padding: '10px 18px', borderRadius: 30, display: 'inline-flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: 15, width: 'fit-content', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                <Phone size={18} /> হটলাইন: ১৬১২২
              </div>
              <div style={{ border: '1px solid rgba(255, 255, 255, 0.4)', color: '#fff', padding: '8px 16px', borderRadius: 30, display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 600, fontSize: 13, width: 'fit-content' }}>
                <Phone size={14} /> +৮৮ ০৯৬১২৩১৬১২২
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 700, color: '#fbbf24', marginBottom: 18 }}>দ্রুত লিংক</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              {['হোম', 'সেবা সমূহ', 'ব্লগ', 'সংবাদ', 'ইভেন্ট', 'ফোরাম', 'সহায়তাকারী খুঁজুন', 'আমাদের সম্পর্কে', 'যোগাযোগ'].map((item, idx) => (
                <li key={idx}>
                  <a href="#services" style={{ color: '#f3e8ff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <ChevronRight size={14} style={{ color: '#fbbf24' }} /> {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 700, color: '#fbbf24', marginBottom: 18 }}>প্রধান সেবা সমূহ</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              {['ই-নামজারি', 'ভূমি উন্নয়ন কর', 'ভূমি রেকর্ড ও পর্চা', 'মৌজা ম্যাপ', 'দলিল সেবা', 'উত্তরাধিকার ক্যালকুলেটর', 'মৌজা রেট'].map((item, idx) => (
                <li key={idx}>
                  <a href="#services" style={{ color: '#f3e8ff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <ChevronRight size={14} style={{ color: '#fbbf24' }} /> {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 700, color: '#fbbf24', marginBottom: 18 }}>যোগাযোগ</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13, marginBottom: 24, color: '#f3e8ff' }}>
              <div style={{ display: 'flex', gap: 10 }}>
                <MapPin size={18} style={{ color: '#fbbf24', flexShrink: 0 }} />
                <span>ভূমি সেবা সহায়তা কেন্দ্র, পৌরসভা এলাকা</span>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <Phone size={16} style={{ color: '#fbbf24', flexShrink: 0 }} />
                <span>০১৭৫০৩৬৪৫৭১</span>
              </div>
              <div style={{ color: '#f3e8ff' }}>
                <span>রবিবার - বৃহস্পতিবার, সকাল ৯:০০ - বিকাল ৫:০০</span>
              </div>
            </div>

            <h5 style={{ fontSize: 14, fontWeight: 700, color: '#fbbf24', marginBottom: 10 }}>গুরুত্বপূর্ণ লিংক</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
              {[
                { name: 'land.gov.bd', url: 'https://land.gov.bd' },
                { name: 'আর.এস খতিয়ান ব্যবস্থাপনা', url: '#' },
                { name: 'mutation.land.gov.bd', url: 'https://mutation.land.gov.bd' },
                { name: 'dlrms.land.gov.bd', url: 'https://dlrms.land.gov.bd' },
                { name: 'ldtax.gov.bd', url: 'https://ldtax.gov.bd' }
              ].map((link, idx) => (
                <a key={idx} href={link.url} target="_blank" rel="noreferrer" style={{ color: '#f3e8ff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <ExternalLink size={13} style={{ color: '#c084fc' }} /> {link.name}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div style={{ maxWidth: 1200, margin: '20px auto 0', textAlign: 'center', fontSize: 13, color: '#d8b4fe' }}>
          © ২০২৬ E-Vumi Seba | সমস্ত অধিকার সংরক্ষিত।
        </div>
      </footer>
    </div>
  )
}
