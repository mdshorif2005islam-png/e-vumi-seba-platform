'use client'
import { Search, ArrowRight, ShieldCheck, FileCheck2, Map, CheckCircle2, MapPinned, LogIn, UserPlus } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

const services=[
 {icon:FileCheck2,title:'খতিয়ান / পরচা সহায়তা',desc:'জমির রেকর্ড সম্পর্কিত তথ্য ও ডকুমেন্ট সহায়তা',slug:'khatian-porcha'},
 {icon:Map,title:'নামজারি সহায়তা',desc:'আবেদন প্রস্তুতি, ডকুমেন্ট চেকলিস্ট ও অগ্রগতি সহায়তা',slug:'mutation'},
 {icon:CheckCircle2,title:'খাজনা সহায়তা',desc:'ভূমি উন্নয়ন কর সংক্রান্ত তথ্য ও পেমেন্ট সহায়তা',slug:'land-tax'},
 {icon:MapPinned,title:'মৌজা / ম্যাপ সহায়তা',desc:'মৌজা, দাগ ও ম্যাপ-সংক্রান্ত তথ্য সহায়তা',slug:'mouza-map'},
]
export default function HomeClient(){
 const [q,setQ]=useState('');
 return <>
  <header style={{position:'sticky',top:0,zIndex:50,borderBottom:'1px solid var(--border)',background:'rgba(255,255,255,.94)',backdropFilter:'blur(14px)'}}>
   <div className="container" style={{height:70,display:'flex',alignItems:'center',justifyContent:'space-between',gap:20}}>
    <Link href="/" style={{display:'flex',alignItems:'center',gap:12}}><div style={{height:42,width:42,borderRadius:12,background:'var(--brand)',color:'#fff',display:'grid',placeItems:'center'}}><MapPinned/></div><div><b style={{fontSize:18}}>E-Vumi Seba</b><div style={{fontSize:10,color:'var(--muted)'}}>Private Land Service Assistance</div></div></Link>
    <nav className="nav-hide-mobile" style={{display:'flex',gap:22,fontWeight:600}}><a href="#home">হোম</a><a href="#services">সেবা</a><Link href="/track">আবেদন ট্র্যাক</Link><Link href="/dashboard">Dashboard</Link></nav>
    <div style={{display:'flex',gap:8}}><Link href="/auth/login" className="btn btn-light"><LogIn size={16}/> লগইন</Link><Link href="/auth/register" className="btn btn-primary"><UserPlus size={16}/> রেজিস্টার</Link></div>
   </div>
  </header>
  <main id="home">
   <section className="container hero"><div><span className="badge badge-teal">বাংলাদেশের জন্য Bangla-first service platform</span><h1 className="hero-title" style={{marginTop:16}}>জমির সেবা এখন <span style={{color:'var(--brand)'}}>আরও সহজ</span></h1><p className="hero-desc">প্রয়োজনীয় তথ্য, ডকুমেন্ট ও জমি-সংক্রান্ত সেবা সহায়তা—অনুমোদিত Agent-এর মাধ্যমে একটি সংগঠিত workflow-এ।</p><div className="hero-buttons"><a href="#services" className="btn btn-primary">সেবা নিন <ArrowRight size={18}/></a><Link href="/track" className="btn btn-light">আবেদনের অবস্থা দেখুন</Link></div><p className="muted" style={{fontSize:12,marginTop:16}}>E-Vumi Seba একটি private service/assistance platform; এটি সরকারি ওয়েবসাইট নয়।</p></div><div className="card hero-graphic"><div style={{textAlign:'center',padding:20}}><ShieldCheck size={64} color="var(--brand)"/><h3>নিরাপদ ও সংগঠিত সেবা</h3><p className="muted" style={{fontSize:14,marginTop:8}}>ডকুমেন্ট, আবেদন ও status এক জায়গা থেকে পরিচালনা করুন।</p></div></div></section>
   <section className="container" style={{paddingBottom:40}}><div className="card" style={{padding:16,display:'flex',gap:12,flexWrap:'wrap'}}><input className="input" style={{flex:1,minWidth:250}} value={q} onChange={e=>setQ(e.target.value)} placeholder="আপনার প্রয়োজনীয় সেবা খুঁজুন — নামজারি, খতিয়ান, খাজনা..."/><a href={q?`/dashboard/applications/new?service=${encodeURIComponent(q)}`:'/dashboard/applications/new'} className="btn btn-primary"><Search size={17}/> সেবা খুঁজুন</a></div></section>
   <section className="container section" id="services"><p style={{color:'var(--brand)',fontWeight:700}}>জনপ্রিয় সেবা</p><h2 style={{fontSize:28,fontWeight:800,marginBottom:24}}>প্রয়োজন অনুযায়ী সেবা</h2><div className="grid-4">{services.map(s=>{const Icon=s.icon;return <div className="card service-card" key={s.slug}><div className="service-icon"><Icon/></div><h3 style={{marginTop:16}}>{s.title}</h3><p className="muted" style={{fontSize:14,marginTop:8}}>{s.desc}</p><Link href={`/dashboard/applications/new?service=${s.slug}`} style={{display:'inline-block',marginTop:16,color:'var(--brand)',fontWeight:700}}>আবেদন করুন →</Link></div>})}</div></section>
   <section className="flow-section"><div className="container"><h2 style={{textAlign:'center',fontSize:28,fontWeight:800}}>কীভাবে কাজ করে?</h2><div className="flow-grid">{['Agent-এর কাছে আবেদন','তথ্য ও ডকুমেন্ট জমা','E-Vumi Seba Processing','অগ্রগতি Tracking','সেবা/ডকুমেন্ট গ্রহণ'].map((x,i)=><div className="flow-step" key={x}><div className="flow-number">{i+1}</div><b>{x}</b></div>)}</div></div></section>
  </main>
  <footer className="footer"><div className="container"><b style={{color:'#fff',fontSize:18}}>E-Vumi Seba</b><p style={{fontSize:13,marginTop:12,maxWidth:700}}>E-Vumi Seba একটি বেসরকারি land-service assistance platform। সরকারি ফি, third-party cost এবং E-Vumi Seba service fee আলাদাভাবে প্রদর্শন করা হবে।</p></div></footer>
 </>
}
