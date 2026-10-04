'use client'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useState } from 'react'
import { LogIn, MapPinned } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LoginPage(){
 const router=useRouter(); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [error,setError]=useState(''); const [loading,setLoading]=useState(false)
 async function submit(e:React.FormEvent){e.preventDefault();setLoading(true);setError('');const supabase=createClient();const {error}=await supabase.auth.signInWithPassword({email,password});if(error)setError(error.message);else router.push('/dashboard');setLoading(false)}
 return <div className="auth-shell"><div className="auth-card card"><div style={{textAlign:'center',marginBottom:24}}><div style={{height:48,width:48,borderRadius:14,background:'var(--brand)',color:'#fff',display:'grid',placeItems:'center',margin:'0 auto 10px'}}><MapPinned/></div><h1>লগইন</h1><p className="muted">E-Vumi Seba account-এ প্রবেশ করুন</p></div><form onSubmit={submit}><div className="form-group"><label className="label">ইমেইল</label><input className="input" type="email" required value={email} onChange={e=>setEmail(e.target.value)}/></div><div className="form-group"><label className="label">পাসওয়ার্ড</label><input className="input" type="password" required value={password} onChange={e=>setPassword(e.target.value)}/></div>{error&&<p className="error" style={{marginBottom:14}}>{error}</p>}<button className="btn btn-primary" style={{width:'100%'}} disabled={loading}><LogIn size={17}/>{loading?'অপেক্ষা করুন...':'লগইন'}</button></form><p style={{textAlign:'center',marginTop:18,fontSize:14}}>অ্যাকাউন্ট নেই? <Link href="/auth/register" style={{color:'var(--brand)',fontWeight:700}}>রেজিস্টার করুন</Link></p><Link href="/" style={{display:'block',textAlign:'center',marginTop:10,fontSize:13,color:'var(--muted)'}}>← হোমে ফিরুন</Link></div></div>
}
