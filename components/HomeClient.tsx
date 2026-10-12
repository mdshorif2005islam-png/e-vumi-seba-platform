'use client'
import { useState, useEffect } from 'react'
import { Search, ArrowRight, ShieldCheck, FileCheck2, LogIn, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function HomeClient() {
  const [q, setQ] = useState('')
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchServices() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('active', true)
        .order('id', { ascending: true })

      if (!error && data) {
        setServices(data)
      }
      setLoading(false)
    }
    fetchServices()
  }, [])

  const filteredServices = services.filter(s => 
    (s.name_bn && s.name_bn.toLowerCase().includes(q.toLowerCase())) ||
    (s.description && s.description.toLowerCase().includes(q.toLowerCase()))
  )

  return (
    <>
      <header style={{position:'sticky',top:0,zIndex:50,borderBottom:'1px solid var(--border)',background:'rgba(255,255,255,.94)',backdropFilter:'blur(8px)'}}>
        <div className="container" style={{height:70,display:'flex',alignItems:'center',justifyContent:'space-between',gap:20}}>
          <Link href="/" style={{display:'flex',alignItems:'center',gap:12}}>
            <div style={{height:42,width:42,borderRadius:12,background:'var(--brand)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:800}}>ভ</div>
            <div>
              <div style={{fontWeight:800,fontSize:18,lineHeight:1.1}}>E-Vumi Seba</div>
              <div style={{fontSize:11,color:'var(--muted)'}}>Private Land Service Assistance</div>
            </div>
          </Link>
          <nav className="nav-hide-mobile" style={{display:'flex',gap:22,fontWeight:600}}>
            <a href="#home">হোম</a>
            <a href="#services">সেবা</a>
            <Link href="/track">আবেদন ট্র্যাক</Link>
            <Link href="/dashboard">Dashboard</Link>
          </nav>
          <div style={{display:'flex',gap:8}}>
            <Link href="/auth/login" className="btn btn-light"><LogIn size={16}/> লগইন</Link>
            <Link href="/auth/register" className="btn btn-primary"><UserPlus size={16}/> রেজিস্টার</Link>
          </div>
        </div>
      </header>

      <main id="home">
        <section className="container hero">
          <div>
            <span className="badge badge-teal">বাংলাদেশের জন্য Bangla-first service platform</span>
            <h1 style={{fontSize:42,fontWeight:800,marginTop:16,lineHeight:1.2}}>জমির সেবা এখন <span style={{color:'var(--brand)'}}>আরও সহজ</span></h1>
            <p style={{fontSize:16,color:'var(--muted)',marginTop:12,marginBottom:24,maxWidth:520}}>
              প্রয়োজনীয় তথ্য, ডকুমেন্ট ও জমি-সংক্রান্ত সেবা সহায়তা—অনুমোদিত Agent-এর মাধ্যমে একটি সংগঠিত workflow-এ।
            </p>
            <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
              <a href="#services" className="btn btn-primary">সেবা নিন <ArrowRight size={16}/></a>
              <Link href="/track" className="btn btn-light">আবেদনের অবস্থা দেখুন</Link>
            </div>
            <p style={{fontSize:12,color:'var(--muted)',marginTop:14}}>E-Vumi Seba একটি private service/assistance platform; এটি সরকারি ওয়েবসাইট নয়।</p>
          </div>
          <div className="hero-card" style={{padding:28,borderRadius:20,background:'linear-gradient(135deg, #e6f4f1 0%, #d1ede7 100%)',border:'1px solid #b8e3db'}}>
            <ShieldCheck size={48} style={{color:'var(--brand)',marginBottom:12}} />
            <h3 style={{fontSize:20,fontWeight:700,marginBottom:8}}>নিরাপদ ও সংগঠিত সেবা</h3>
            <p style={{fontSize:14,color:'var(--muted)'}}>ডকুমেন্ট, আবেদন ও status এক জায়গা থেকে পরিচালনা করুন।</p>
          </div>
        </section>

        <section className="container" style={{paddingBottom:40}}>
          <div className="card" style={{padding:16,display:'flex',gap:12,flexWrap:'wrap',alignItems:'center'}}>
            <input 
              type="text" 
              placeholder="আপনার প্রয়োজনীয় সেবা খুঁজুন — নামজারি, খতিয়ান, খাজনা..." 
              value={q} 
              onChange={e => setQ(e.target.value)} 
              style={{flex:1,minWidth:240,padding:'12px 16px',borderRadius:10,border:'1px solid var(--border)',outline:'none'}} 
            />
            <button className="btn btn-primary"><Search size={16}/> সেবা খুঁজুন</button>
          </div>
        </section>

        <section className="container section" id="services">
          <p style={{color:'var(--brand)',fontWeight:700,fontSize:14}}>প্রয়োজন অনুযায়ী সেবা</p>
          <h2 style={{fontSize:28,fontWeight:800,marginBottom:24}}>সকল সেবাসমূহ</h2>

          {loading ? (
            <p style={{color:'var(--muted)'}}>সেবাসমূহ লোড হচ্ছে...</p>
          ) : (
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:20}}>
              {filteredServices.map((service) => (
                <div key={service.id || service.slug} className="card service-card" style={{padding:24,borderRadius:16,display:'flex',flexDirection:'column',justifyContent:'space-between',background:'#fff',border:'1px solid var(--border)'}}>
                  <div>
                    <div style={{width:44,height:44,borderRadius:12,background:'#e6f4f1',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--brand)',marginBottom:16}}>
                      <FileCheck2 size={24} />
                    </div>
                    <h3 style={{fontSize:18,fontWeight:700,marginBottom:8}}>{service.name_bn}</h3>
                    <p style={{fontSize:14,color:'var(--muted)',marginBottom:16}}>{service.description}</p>
                  </div>
                  <Link 
                    href={`/dashboard/applications/new?service=${service.slug}`} 
                    style={{fontWeight:700,color:'var(--brand)',display:'flex',alignItems:'center',gap:6,textDecoration:'none'}}
                  >
                    আবেদন করুন →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="flow-section">
          <div className="container">
            <h2 style={{textAlign:'center',fontSize:28,fontWeight:800,marginBottom:40}}>কীভাবে কাজ করে?</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))',gap:20,textAlign:'center'}}>
              <div className="step-card"><div className="step-num">1</div><p>Agent-এর কাছে আবেদন</p></div>
              <div className="step-card"><div className="step-num">2</div><p>তথ্য ও ডকুমেন্ট জমা</p></div>
              <div className="step-card"><div className="step-num">3</div><p>E-Vumi Seba Processing</p></div>
              <div className="step-card"><div className="step-num">4</div><p>অগ্রগতি Tracking</p></div>
              <div className="step-card"><div className="step-num">5</div><p>সেবা/ডকুমেন্ট গ্রহণ</p></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <b style={{color:'#fff',fontSize:18}}>E-Vumi Seba</b>
          <p style={{fontSize:13,marginTop:8}}>বাংলাদেশের সব ভূমিসেবাকে এক ছাদের নিচে আনতে সহায়ক প্ল্যাটফর্ম।</p>
        </div>
      </footer>
    </>
  )
}
