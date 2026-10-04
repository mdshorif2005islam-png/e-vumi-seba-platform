'use client'
import { createClient } from '@/lib/supabase/client'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LogoutButton(){
  const router=useRouter();
  async function logout(){const supabase=createClient();await supabase.auth.signOut();router.push('/')}
  return <button className="btn btn-light" onClick={logout}><LogOut size={16}/> লগআউট</button>
}
