
import { createClient } from '@/lib/supabase/server'
import ApplicationsTable from './ApplicationsTable'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function ApplicationsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  let query = supabase
    .from('applications')
    .select(
      'id, application_no, applicant_name, applicant_phone, status, customer_total, created_at, services(name_bn)'
    )
    .order('created_at', { ascending: false })

  if (profile?.role === 'agent') {
    query = query.eq('agent_id', user.id)
  }

  if (profile?.role === 'customer') {
    query = query.eq('customer_id', user.id)
  }

  const { data, error } = await query

  const applications = (data || []).map((item: any) => ({
    id: item.id,
    application_no: item.application_no,
    applicant_name: item.applicant_name,
    applicant_phone: item.applicant_phone,
    status: item.status,
    customer_total: item.customer_total,
    created_at: item.created_at,
    service_name: Array.isArray(item.services)
      ? item.services.map((s: any) => s.name_bn).filter(Boolean).join(', ')
      : item.services?.name_bn || 'সেবা উল্লেখ নেই',
  }))

  return (
    <ApplicationsTable
      applications={applications}
      hasError={!!error}
    />
  )
}
