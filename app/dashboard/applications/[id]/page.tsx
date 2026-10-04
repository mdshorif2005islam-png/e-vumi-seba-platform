import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ApplicationDetailClient from './view'

export default async function ApplicationPage({params}:{params:Promise<{id:string}>}){
 const {id}=await params;const supabase=await createClient();const {data:app}=await supabase.from('applications').select('*,services(name_bn,required_documents),customer:customer_id(full_name,phone),agent:agent_id(full_name,phone)').eq('id',id).single();if(!app)notFound();const {data:history}=await supabase.from('application_status_history').select('*').eq('application_id',id).order('created_at',{ascending:true});const {data:docs}=await supabase.from('application_documents').select('*').eq('application_id',id).order('created_at',{ascending:false});const {data:{user}}=await supabase.auth.getUser();const {data:profile}=await supabase.from('profiles').select('role').eq('id',user!.id).single();return <ApplicationDetailClient app={app} history={history||[]} docs={docs||[]} role={profile?.role||'customer'}/>
}
