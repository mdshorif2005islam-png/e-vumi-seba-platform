import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function ApplicationsPage(){
 const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();const {data:profile}=await supabase.from('profiles').select('role').eq('id',user!.id).single();
 let q=supabase.from('applications').select('id,application_no,applicant_name,applicant_phone,status,customer_total,created_at,services(name_bn)').order('created_at',{ascending:false});if(profile?.role==='agent')q=q.eq('agent_id',user!.id);if(profile?.role==='customer')q=q.eq('customer_id',user!.id);const {data}=await q;
 return <><div className="page-head"><div><h1 style={{fontSize:28}}>আবেদনসমূহ</h1><p className="muted">আপনার অনুমোদিত application list</p></div><Link href="/dashboard/applications/new" className="btn btn-primary">+ নতুন আবেদন</Link></div><div className="card" style={{padding:20}}><div className="table-wrap"><table><thead><tr><th>ID</th><th>আবেদনকারী</th><th>মোবাইল</th><th>সেবা</th><th>Status</th><th>Amount</th></tr></thead><tbody>{(data||[]).map((a:any)=><tr key={a.id}><td><Link href={`/dashboard/applications/${a.id}`} style={{color:'var(--brand)',fontWeight:700}}>{a.application_no}</Link></td><td>{a.applicant_name}</td><td>{a.applicant_phone}</td><td>{a.services?.name_bn}</td><td><span className="badge badge-teal">{a.status}</span></td><td>৳{Number(a.customer_total||0).toLocaleString('bn-BD')}</td></tr>)}{!data?.length&&<tr><td colSpan={6} className="muted">কোনো আবেদন পাওয়া যায়নি।</td></tr>}</tbody></table></div></div></>
}
