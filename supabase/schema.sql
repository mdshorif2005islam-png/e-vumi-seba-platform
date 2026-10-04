-- E-Vumi Seba database schema
-- Run this entire file in Supabase SQL Editor.

create extension if not exists pgcrypto;

create type public.user_role as enum ('owner','staff','agent','customer');
create type public.application_status as enum (
  'NEW','DOCUMENTS_REQUIRED','DOCUMENTS_SUBMITTED','UNDER_REVIEW','PROCESSING',
  'WAITING_FOR_OFFICIAL_PROCESS','ADDITIONAL_INFORMATION_REQUIRED','READY_FOR_DELIVERY',
  'DELIVERED','COMPLETED','REJECTED','CANCELLED','REFUND_PENDING','REFUNDED'
);
create type public.document_status as enum ('MISSING','UPLOADED','VERIFIED','REJECTED');
create type public.payment_status as enum ('PENDING','PAID','PARTIAL','REFUNDED');
create type public.commission_status as enum ('PENDING','APPROVED','PAYABLE','PAID','REVERSED');
create type public.ticket_status as enum ('OPEN','IN_PROGRESS','RESOLVED','CLOSED');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  email text not null default '',
  phone text,
  role public.user_role not null default 'customer',
  territory text,
  avatar_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  name_bn text not null,
  name_en text,
  slug text unique not null,
  description text,
  required_documents text[] not null default '{}',
  processing_time text,
  official_fee numeric(12,2) not null default 0,
  service_fee numeric(12,2) not null default 0,
  agent_commission numeric(12,2) not null default 0,
  other_cost numeric(12,2) not null default 0,
  active boolean not null default true,
  instructions text,
  disclaimer text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  application_no text unique not null default ('EVS-' || extract(year from now())::int || '-' || lpad((floor(random()*999999)+1)::int::text, 6, '0')),
  customer_id uuid not null references public.profiles(id),
  agent_id uuid references public.profiles(id),
  service_id uuid not null references public.services(id),
  applicant_name text not null,
  applicant_phone text not null,
  district text,
  upazila text,
  mouza text,
  jl_no text,
  khatian_no text,
  dag_no text,
  land_area text,
  ownership_note text,
  status public.application_status not null default 'NEW',
  assigned_staff_id uuid references public.profiles(id),
  official_fee numeric(12,2) not null default 0,
  other_cost numeric(12,2) not null default 0,
  service_fee numeric(12,2) not null default 0,
  agent_commission numeric(12,2) not null default 0,
  customer_total numeric(12,2) generated always as (official_fee + other_cost + service_fee + agent_commission) stored,
  payment_status public.payment_status not null default 'PENDING',
  delivery_method text,
  delivery_note text,
  internal_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.application_documents (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  uploaded_by uuid references public.profiles(id),
  document_type text not null,
  file_name text not null,
  storage_path text not null,
  mime_type text,
  file_size bigint,
  status public.document_status not null default 'UPLOADED',
  rejection_reason text,
  version integer not null default 1,
  created_at timestamptz not null default now()
);

create table public.application_status_history (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  old_status public.application_status,
  new_status public.application_status not null,
  changed_by uuid references public.profiles(id),
  note text,
  created_at timestamptz not null default now()
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  amount numeric(12,2) not null check (amount >= 0),
  method text,
  reference text,
  status public.payment_status not null default 'PENDING',
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.commission_ledger (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  agent_id uuid not null references public.profiles(id),
  amount numeric(12,2) not null default 0,
  status public.commission_status not null default 'PENDING',
  paid_at timestamptz,
  note text,
  created_at timestamptz not null default now()
);

create table public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  created_by uuid not null references public.profiles(id),
  application_id uuid references public.applications(id),
  subject text not null,
  message text not null,
  status public.ticket_status not null default 'OPEN',
  assigned_to uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  body text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index applications_customer_idx on public.applications(customer_id);
create index applications_agent_idx on public.applications(agent_id);
create index applications_status_idx on public.applications(status);
create index applications_appno_idx on public.applications(application_no);
create index documents_application_idx on public.application_documents(application_id);
create index history_application_idx on public.application_status_history(application_id);

-- Profile creation trigger.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name',''),
    coalesce(new.email,''),
    new.raw_user_meta_data->>'phone'
  )
  on conflict (id) do update set email = excluded.email;
  if coalesce(new.raw_user_meta_data->>'role','customer') = 'agent' then
    update public.profiles set role='agent' where id=new.id and role='customer';
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Updated-at helper.
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at before update on public.profiles for each row execute procedure public.set_updated_at();
drop trigger if exists services_updated_at on public.services;
create trigger services_updated_at before update on public.services for each row execute procedure public.set_updated_at();
drop trigger if exists applications_updated_at on public.applications;
create trigger applications_updated_at before update on public.applications for each row execute procedure public.set_updated_at();
drop trigger if exists tickets_updated_at on public.support_tickets;
create trigger tickets_updated_at before update on public.support_tickets for each row execute procedure public.set_updated_at();

create or replace function public.current_role()
returns public.user_role
language sql stable security definer set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

-- Audit every application status change.
create or replace function public.audit_application_status()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if (tg_op = 'INSERT') then
    insert into public.application_status_history(application_id,new_status,changed_by,note)
    values (new.id,new.status,auth.uid(),'Application created');
  elsif old.status is distinct from new.status then
    insert into public.application_status_history(application_id,old_status,new_status,changed_by)
    values (new.id,old.status,new.status,auth.uid());
  end if;
  return new;
end;
$$;

drop trigger if exists applications_status_audit on public.applications;
create trigger applications_status_audit
after insert or update of status on public.applications
for each row execute procedure public.audit_application_status();

-- RLS.
alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.applications enable row level security;
alter table public.application_documents enable row level security;
alter table public.application_status_history enable row level security;
alter table public.payments enable row level security;
alter table public.commission_ledger enable row level security;
alter table public.support_tickets enable row level security;
alter table public.notifications enable row level security;

-- Profiles: users can see/edit themselves; staff/owner can see profiles.
create policy "profiles_self_select" on public.profiles for select to authenticated using (id = auth.uid() or public.current_role() in ('owner','staff'));
create policy "profiles_self_update" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
create policy "owner_staff_profile_update" on public.profiles for update to authenticated using (public.current_role() = 'owner');

-- Services are public-readable when active; owner/staff manage.
create policy "services_public_read" on public.services for select to anon, authenticated using (active = true or public.current_role() in ('owner','staff'));
create policy "services_owner_insert" on public.services for insert to authenticated with check (public.current_role() = 'owner');
create policy "services_owner_update" on public.services for update to authenticated using (public.current_role() = 'owner') with check (public.current_role() = 'owner');

-- Applications: customers see own; agents see theirs; staff/owner see all.
create policy "applications_select" on public.applications for select to authenticated
using (customer_id = auth.uid() or agent_id = auth.uid() or public.current_role() in ('owner','staff'));
create policy "applications_customer_insert" on public.applications for insert to authenticated
with check (customer_id = auth.uid() or public.current_role() in ('owner','staff','agent'));
create policy "applications_update" on public.applications for update to authenticated
using (customer_id = auth.uid() or agent_id = auth.uid() or public.current_role() in ('owner','staff'))
with check (customer_id = auth.uid() or agent_id = auth.uid() or public.current_role() in ('owner','staff'));

create policy "documents_select" on public.application_documents for select to authenticated
using (exists(select 1 from public.applications a where a.id=application_id and (a.customer_id=auth.uid() or a.agent_id=auth.uid() or public.current_role() in ('owner','staff'))));
create policy "documents_insert" on public.application_documents for insert to authenticated
with check (uploaded_by = auth.uid() and exists(select 1 from public.applications a where a.id=application_id and (a.customer_id=auth.uid() or a.agent_id=auth.uid() or public.current_role() in ('owner','staff'))));
create policy "documents_update" on public.application_documents for update to authenticated
using (public.current_role() in ('owner','staff') or uploaded_by = auth.uid());

create policy "history_select" on public.application_status_history for select to authenticated
using (exists(select 1 from public.applications a where a.id=application_id and (a.customer_id=auth.uid() or a.agent_id=auth.uid() or public.current_role() in ('owner','staff'))));

create policy "payments_select" on public.payments for select to authenticated
using (exists(select 1 from public.applications a where a.id=application_id and (a.customer_id=auth.uid() or a.agent_id=auth.uid() or public.current_role() in ('owner','staff'))));
create policy "payments_staff_insert" on public.payments for insert to authenticated with check (public.current_role() in ('owner','staff'));
create policy "payments_staff_update" on public.payments for update to authenticated using (public.current_role() in ('owner','staff'));

create policy "commission_agent_select" on public.commission_ledger for select to authenticated using (agent_id=auth.uid() or public.current_role() in ('owner','staff'));
create policy "commission_staff_manage" on public.commission_ledger for all to authenticated using (public.current_role() in ('owner','staff')) with check (public.current_role() in ('owner','staff'));

create policy "tickets_select" on public.support_tickets for select to authenticated using (created_by=auth.uid() or assigned_to=auth.uid() or public.current_role() in ('owner','staff'));
create policy "tickets_insert" on public.support_tickets for insert to authenticated with check (created_by=auth.uid());
create policy "tickets_staff_update" on public.support_tickets for update to authenticated using (public.current_role() in ('owner','staff'));

create policy "notifications_self" on public.notifications for select to authenticated using (user_id=auth.uid());
create policy "notifications_self_update" on public.notifications for update to authenticated using (user_id=auth.uid());

-- Private storage bucket for application documents.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('application-documents','application-documents',false,10485760,array['application/pdf','image/jpeg','image/png'])
on conflict (id) do nothing;

create policy "document_storage_select" on storage.objects for select to authenticated
using (
  bucket_id='application-documents' and
  exists (
    select 1 from public.application_documents d
    join public.applications a on a.id=d.application_id
    where d.storage_path=name and (a.customer_id=auth.uid() or a.agent_id=auth.uid() or public.current_role() in ('owner','staff'))
  )
);

create policy "document_storage_insert" on storage.objects for insert to authenticated
with check (
  bucket_id='application-documents' and
  exists (
    select 1 from public.application_documents d
    join public.applications a on a.id=d.application_id
    where d.storage_path=name and (a.customer_id=auth.uid() or a.agent_id=auth.uid() or public.current_role() in ('owner','staff'))
  )
);

-- Seed services.
insert into public.services (name_bn,name_en,slug,description,required_documents,processing_time,official_fee,service_fee,agent_commission,other_cost)
values
('খতিয়ান / পরচা সহায়তা','Khatian / Porcha Assistance','khatian-porcha','জমির রেকর্ড সম্পর্কিত তথ্য ও ডকুমেন্ট সহায়তা',array['NID','পূর্বের দলিল','খতিয়ান/পরচা তথ্য'],'৩–৭ কর্মদিবস',0,450,100,0),
('নামজারি সহায়তা','Mutation Assistance','mutation','আবেদন প্রস্তুতি, ডকুমেন্ট চেকলিস্ট ও অগ্রগতি সহায়তা',array['NID','দলিল','খতিয়ান/পরচা','খাজনা রসিদ'],'৭–৩০ কর্মদিবস',0,700,150,0),
('খাজনা সহায়তা','Land Tax Assistance','land-tax','ভূমি উন্নয়ন কর সংক্রান্ত তথ্য ও পেমেন্ট সহায়তা',array['খতিয়ান/হোল্ডিং তথ্য','NID'],'১–৩ কর্মদিবস',0,300,75,0),
('মৌজা / ম্যাপ সহায়তা','Mouza / Map Assistance','mouza-map','মৌজা, দাগ ও ম্যাপ-সংক্রান্ত তথ্য সহায়তা',array['মৌজা তথ্য','খতিয়ান','দাগ নম্বর'],'৩–১০ কর্মদিবস',0,600,120,0)
on conflict (slug) do nothing;

-- Public tracking function: returns only limited status fields after matching application number + phone.
create or replace function public.track_application(p_application_no text, p_phone text)
returns table(application_no text, service_name text, status public.application_status, updated_at timestamptz)
language sql stable security definer set search_path = public
as $$
  select a.application_no, s.name_bn, a.status, a.updated_at
  from public.applications a
  join public.services s on s.id=a.service_id
  where upper(a.application_no)=upper(p_application_no)
    and regexp_replace(a.applicant_phone,'[^0-9]','','g') = regexp_replace(p_phone,'[^0-9]','','g')
  limit 1;
$$;
revoke all on function public.track_application(text,text) from public;
grant execute on function public.track_application(text,text) to anon, authenticated;
