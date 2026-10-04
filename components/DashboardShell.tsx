'use client'
import Link from 'next/link'
import { LayoutDashboard, FilePlus2, Files, LifeBuoy, UserCircle, LogOut, MapPinned } from 'lucide-react'
import LogoutButton from './LogoutButton'

export default function DashboardShell({children,name,role}:{children:React.ReactNode,name:string,role:string}){
 return <div className="dashboard-shell"><div className="topbar"><Link href="/" style={{display:'flex',alignItems:'center',gap:9,fontWeight:800}}><MapPinned color="var(--brand)"/> E-Vumi Seba</Link><div style={{display:'flex',alignItems:'center',gap:10}}><span className="muted" style={{fontSize:13}}>{name} · {role}</span><LogoutButton/></div></div><div className="dashboard-layout"><aside className="sidebar"><Link href="/dashboard"><LayoutDashboard size={17}/> Dashboard</Link><Link href="/dashboard/applications/new"><FilePlus2 size={17}/> নতুন আবেদন</Link><Link href="/dashboard/applications"><Files size={17}/> আবেদনসমূহ</Link><Link href="/dashboard/support"><LifeBuoy size={17}/> Support</Link><Link href="/dashboard/admin"><UserCircle size={17}/> Admin</Link><Link href="/dashboard/profile"><UserCircle size={17}/> Profile</Link></aside><main className="dash-main">{children}</main></div></div>
}
