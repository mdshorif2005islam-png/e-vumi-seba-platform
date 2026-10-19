
'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  Search,
  Plus,
  FileText,
  Clock3,
  CheckCircle2,
  LoaderCircle,
  ChevronRight,
  CalendarDays,
  RefreshCw,
  AlertCircle,
} from 'lucide-react'

type Application = {
  id: string
  application_no: string | null
  applicant_name: string | null
  applicant_phone: string | null
  status: string | null
  customer_total: number | null
  created_at: string
  service_name: string
}

export default function ApplicationsTable({
  applications,
  hasError,
}: {
  applications: Application[]
  hasError: boolean
}) {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()

    return applications.filter((a) => {
      const matchesSearch = [
        a.application_no,
        a.applicant_name,
        a.applicant_phone,
        a.service_name,
      ].some((value) => String(value || '').toLowerCase().includes(term))

      const s = String(a.status || '').toUpperCase()
      const matchesStatus =
        status === 'all' ||
        (status === 'pending' &&
          ['PENDING', 'DOCUMENTS_SUBMITTED', 'SUBMITTED'].includes(s)) ||
        (status === 'processing' &&
          ['PROCESSING', 'IN_PROGRESS', 'UNDER_REVIEW'].includes(s)) ||
        (status === 'completed' &&
          ['COMPLETED', 'APPROVED', 'DELIVERED'].includes(s))

      return matchesSearch && matchesStatus
    })
  }, [applications, search, status])

  const statusInfo = (value: string | null) => {
    const s = String(value || '').toUpperCase()

    if (['COMPLETED', 'APPROVED', 'DELIVERED'].includes(s)) {
      return {
        label: 'সম্পন্ন',
        className: 'ev-status ev-status--success',
      }
    }

    if (
      ['PROCESSING', 'IN_PROGRESS', 'UNDER_REVIEW'].includes(s)
    ) {
      return {
        label: 'চলমান',
        className: 'ev-status ev-status--progress',
      }
    }

    if (
      ['PENDING', 'DOCUMENTS_SUBMITTED', 'SUBMITTED'].includes(s)
    ) {
      return {
        label: s === 'PENDING' ? 'অপেক্ষমাণ' : 'জমা হয়েছে',
        className: 'ev-status ev-status--pending',
      }
    }

    return {
      label: value || 'অজানা',
      className: 'ev-status ev-status--neutral',
    }
  }

  const money = (amount: number | null) =>
    `৳${Number(amount || 0).toLocaleString('bn-BD')}`

  const date = (value: string) =>
    new Date(value).toLocaleDateString('bn-BD', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })

  const pending = applications.filter((a) =>
    ['PENDING', 'DOCUMENTS_SUBMITTED', 'SUBMITTED'].includes(
      String(a.status || '').toUpperCase()
    )
  ).length

  const processing = applications.filter((a) =>
    ['PROCESSING', 'IN_PROGRESS', 'UNDER_REVIEW'].includes(
      String(a.status || '').toUpperCase()
    )
  ).length

  const completed = applications.filter((a) =>
    ['COMPLETED', 'APPROVED', 'DELIVERED'].includes(
      String(a.status || '').toUpperCase()
    )
  ).length

  return (
    <main className="ev-applications">
      <style>{`
        .ev-applications {
          --ev-green: #123b35;
          --ev-green-light: #246456;
          --ev-gold: #d8a84e;
          color: #172b27;
          width: 100%;
          min-width: 0;
          font-family: inherit;
        }
        .ev-applications * { box-sizing: border-box; }
        .ev-applications .ev-muted { color: #73817d; }
        .ev-applications .ev-heading {
          display: flex; justify-content: space-between;
          align-items: center; gap: 16px; flex-wrap: wrap;
          margin-bottom: 24px;
        }
        .ev-applications .ev-title {
          margin: 0; font-size: clamp(23px, 3vw, 30px);
          font-weight: 800; letter-spacing: -.5px;
          color: var(--ev-green);
        }
        .ev-applications .ev-subtitle {
          margin: 7px 0 0; font-size: 13px; color: #74817d;
        }
        .ev-applications .ev-button {
          display: inline-flex; align-items: center;
          justify-content: center; gap: 8px;
          background: var(--ev-green); color: white;
          border: 0; border-radius: 10px; padding: 12px 17px;
          text-decoration: none; font-size: 13px;
          font-weight: 700; white-space: nowrap;
          transition: background .2s, transform .2s;
        }
        .ev-applications .ev-button:hover {
          background: var(--ev-green-light); transform: translateY(-1px);
        }
        .ev-applications .ev-stats {
          display: grid; grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 15px; margin-bottom: 22px;
        }
        .ev-applications .ev-stat {
          display: flex; align-items: center; gap: 13px;
          min-width: 0; padding: 18px;
          background: white; border: 1px solid #e8eeeb;
          border-radius: 14px; box-shadow: 0 3px 12px #173b3510;
        }
        .ev-applications .ev-stat-icon {
          width: 43px; height: 43px; flex-shrink: 0;
          display: grid; place-items: center; border-radius: 12px;
        }
        .ev-applications .ev-stat-label {
          font-size: 12px; color: #77847f; margin-bottom: 5px;
        }
        .ev-applications .ev-stat-number {
          font-size: 25px; line-height: 1.15; font-weight: 800;
          color: var(--ev-green);
        }
        .ev-applications .ev-panel {
          background: white; border: 1px solid #e7eeea;
          border-radius: 15px; overflow: hidden;
          box-shadow: 0 4px 18px #173b3509;
        }
        .ev-applications .ev-panel-head {
          padding: 20px 22px; display: flex;
          justify-content: space-between; align-items: center;
          gap: 12px; flex-wrap: wrap; border-bottom: 1px solid #edf1ef;
        }
        .ev-applications .ev-panel-title {
          font-size: 16px; font-weight: 800; margin: 0;
          color: var(--ev-green);
        }
        .ev-applications .ev-tools {
          padding: 16px 22px; display: flex;
          align-items: center; gap: 12px; flex-wrap: wrap;
          border-bottom: 1px solid #edf1ef;
        }
        .ev-applications .ev-search {
          display: flex; align-items: center; gap: 9px;
          padding: 0 12px; min-width: 220px; flex: 1;
          border: 1px solid #dfe7e3; border-radius: 9px;
          background: #fbfcfb; color: #84918c;
        }
        .ev-applications .ev-search input {
          width: 100%; min-width: 0; height: 42px;
          border: 0; outline: 0; background: transparent;
          font: inherit; font-size: 13px; color: #243a34;
        }
        .ev-applications .ev-select {
          height: 44px; padding: 0 12px; min-width: 155px;
          border: 1px solid #dfe7e3; border-radius: 9px;
          background: white; color: #43544e; font: inherit;
          font-size: 13px; outline-color: var(--ev-green-light);
        }
        .ev-applications .ev-table-wrap { width: 100%; overflow-x: auto; }
        .ev-applications table {
          width: 100%; border-collapse: collapse;
          text-align: left; white-space: nowrap;
        }
        .ev-applications th {
          background: #f7f9f8; padding: 14px 18px;
          color: #718079; font-size: 11px; font-weight: 800;
          letter-spacing: .35px; border-bottom: 1px solid #e9efec;
        }
        .ev-applications td {
          padding: 16px 18px; border-bottom: 1px solid #eff3f1;
          color: #3c4b46; font-size: 12px; vertical-align: middle;
        }
        .ev-applications tbody tr:last-child td { border-bottom: 0; }
        .ev-applications tbody tr:hover { background: #fafcfb; }
        .ev-applications .ev-id {
          color: var(--ev-green); font-weight: 800;
          text-decoration: none; font-size: 12px;
        }
        .ev-applications .ev-id:hover { text-decoration: underline; }
        .ev-applications .ev-person {
          display: flex; align-items: center; gap: 10px;
        }
        .ev-applications .ev-avatar {
          width: 34px; height: 34px; flex-shrink: 0;
          display: grid; place-items: center; border-radius: 10px;
          color: var(--ev-green); background: #e9f2ed;
          font-weight: 800; font-size: 14px;
        }
        .ev-applications .ev-person-name {
          color: #243a34; font-weight: 700; font-size: 12px;
        }
        .ev-applications .ev-phone {
          margin-top: 4px; font-size: 11px; color: #87938e;
        }
        .ev-applications .ev-service {
          display: flex; align-items: center; gap: 8px;
          max-width: 260px; white-space: normal; line-height: 1.6;
        }
        .ev-applications .ev-status {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 10px; border-radius: 30px;
          font-size: 11px; font-weight: 800;
        }
        .ev-applications .ev-status--success { color: #167447; background: #e5f6ec; }
        .ev-applications .ev-status--progress { color: #245cb5; background: #eaf1ff; }
        .ev-applications .ev-status--pending { color: #9a6508; background: #fff4d8; }
        .ev-applications .ev-status--neutral { color: #56645e; background: #edf1ef; }
        .ev-applications .ev-amount { font-weight: 800; color: var(--ev-green); }
        .ev-applications .ev-empty {
          text-align: center; padding: 48px 18px; color: #7a8882;
        }
        .ev-applications .ev-empty-icon {
          width: 52px; height: 52px; border-radius: 15px;
          display: grid; place-items: center; margin: 0 auto 12px;
          background: #eef4f0; color: var(--ev-green);
        }
        .ev-applications .ev-foot {
          padding: 14px 22px; border-top: 1px solid #edf1ef;
          display: flex; justify-content: space-between;
          align-items: center; gap: 10px; flex-wrap: wrap;
          color: #77847e; font-size: 12px;
        }
        .ev-applications .ev-error {
          display: flex; gap: 10px; align-items: center;
          margin-bottom: 16px; padding: 14px;
          border-radius: 10px; color: #a12c25;
          background: #fff0ef; font-size: 13px;
        }
        @media (max-width: 900px) {
          .ev-applications .ev-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 520px) {
          .ev-applications .ev-stats { gap: 9px; }
          .ev-applications .ev-stat { padding: 12px; gap: 9px; }
          .ev-applications .ev-stat-icon { width: 35px; height: 35px; }
          .ev-applications .ev-stat-number { font-size: 21px; }
          .ev-applications .ev-stat-label { font-size: 11px; }
          .ev-applications .ev-tools, .ev-applications .ev-panel-head { padding: 14px; }
          .ev-applications .ev-search { min-width: 100%; }
          .ev-applications .ev-select { width: 100%; }
          .ev-applications .ev-foot { padding: 13px 14px; }
        }
      `}</style>

      <header className="ev-heading">
        <div>
          <h1 className="ev-title">আবেদন ব্যবস্থাপনা</h1>
          <p className="ev-subtitle">
            <Link href="/dashboard" style={{ color: '#73817d', textDecoration: 'none' }}>
              ড্যাশবোর্ড
            </Link>
            {' / '}আবেদনসমূহ
          </p>
        </div>

        <Link
          href="/dashboard/applications/new"
          className="ev-button"
        >
          <Plus size={17} />
          নতুন আবেদন
          <ChevronRight size={15} />
        </Link>
      </header>

      {hasError && (
        <div className="ev-error">
          <AlertCircle size={19} />
          আবেদন লোড করতে সমস্যা হয়েছে। ডেটাবেসের সংযোগ ও অনুমতি যাচাই করুন।
        </div>
      )}

      <section className="ev-stats">
        <div className="ev-stat">
          <div className="ev-stat-icon" style={{ background: '#e9f2ed', color: '#246456' }}>
            <FileText size={21} />
          </div>
          <div>
            <div className="ev-stat-label">মোট আবেদন</div>
            <div className="ev-stat-number">{applications.length.toLocaleString('bn-BD')}</div>
          </div>
        </div>

        <div className="ev-stat">
          <div className="ev-stat-icon" style={{ background: '#fff3d9', color: '#b47a13' }}>
            <Clock3 size={21} />
          </div>
          <div>
            <div className="ev-stat-label">অপেক্ষমাণ</div>
            <div className="ev-stat-number">{pending.toLocaleString('bn-BD')}</div>
          </div>
        </div>

        <div className="ev-stat">
          <div className="ev-stat-icon" style={{ background: '#eaf1ff', color: '#3565b9' }}>
            <LoaderCircle size={21} />
          </div>
          <div>
            <div className="ev-stat-label">চলমান</div>
            <div className="ev-stat-number">{processing.toLocaleString('bn-BD')}</div>
          </div>
        </div>

        <div className="ev-stat">
          <div className="ev-stat-icon" style={{ background: '#e5f6ec', color: '#16804b' }}>
            <CheckCircle2 size={21} />
          </div>
          <div>
            <div className="ev-stat-label">সম্পন্ন</div>
            <div className="ev-stat-number">{completed.toLocaleString('bn-BD')}</div>
          </div>
        </div>
      </section>

      <section className="ev-panel">
        <div className="ev-panel-head">
          <div>
            <h2 className="ev-panel-title">সকল আবেদন</h2>
            <p className="ev-subtitle">
              আবেদন দেখুন, খুঁজুন এবং বর্তমান অবস্থা যাচাই করুন
            </p>
          </div>
          <span className="ev-status ev-status--neutral">
            {filtered.length.toLocaleString('bn-BD')} টি আবেদন
          </span>
        </div>

        <div className="ev-tools">
          <label className="ev-search">
            <Search size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="আবেদন ID, নাম, মোবাইল বা সেবা খুঁজুন..."
              aria-label="আবেদন খুঁজুন"
            />
          </label>

          <select
            className="ev-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            aria-label="স্ট্যাটাস অনুযায়ী ফিল্টার"
          >
            <option value="all">সকল স্ট্যাটাস</option>
            <option value="pending">অপেক্ষমাণ</option>
            <option value="processing">চলমান</option>
            <option value="completed">সম্পন্ন</option>
          </select>

          <button
            type="button"
            className="ev-button"
            onClick={() => {
              setSearch('')
              setStatus('all')
            }}
            style={{ padding: '11px 13px' }}
            title="ফিল্টার রিসেট করুন"
          >
            <RefreshCw size={15} />
            রিসেট
          </button>
        </div>

        <div className="ev-table-wrap">
          <table>
            <thead>
              <tr>
                <th>আবেদন আইডি</th>
                <th>আবেদনকারী</th>
                <th>সেবার বিবরণ</th>
                <th>আবেদনের তারিখ</th>
                <th>স্ট্যাটাস</th>
                <th>ফি</th>
                <th>বিস্তারিত</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => {
                const info = statusInfo(a.status)

                return (
                  <tr key={a.id}>
                    <td>
                      <Link
                        href={`/dashboard/applications/${a.id}`}
                        className="ev-id"
                      >
                        {a.application_no || a.id.slice(0, 8)}
                      </Link>
                    </td>
                    <td>
                      <div className="ev-person">
                        <div className="ev-avatar">
                          {(a.applicant_name || 'আ').charAt(0)}
                        </div>
                        <div>
                          <div className="ev-person-name">
                            {a.applicant_name || 'নাম দেওয়া হয়নি'}
                          </div>
                          <div className="ev-phone">
                            {a.applicant_phone || 'মোবাইল দেওয়া হয়নি'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="ev-service">
                        <FileText size={16} color="#779087" />
                        {a.service_name}
                      </div>
                    </td>
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                        <CalendarDays size={14} color="#84938c" />
                        {date(a.created_at)}
                      </span>
                    </td>
                    <td>
                      <span className={info.className}>
                        {info.label}
                      </span>
                    </td>
                    <td>
                      <span className="ev-amount">
                        {money(a.customer_total)}
                      </span>
                    </td>
                    <td>
                      <Link
                        href={`/dashboard/applications/${a.id}`}
                        aria-label={`আবেদন ${a.application_no || a.id} দেখুন`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 32,
                          height: 32,
                          borderRadius: 9,
                          background: '#edf4f0',
                          color: '#246456',
                          textDecoration: 'none',
                        }}
                      >
                        <ChevronRight size={18} />
                      </Link>
                    </td>
                  </tr>
                )
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7}>
                    <div className="ev-empty">
                      <div className="ev-empty-icon">
                        <FileText size={25} />
                      </div>
                      <div style={{ color: '#29463c', fontWeight: 800, marginBottom: 6 }}>
                        কোনো আবেদন পাওয়া যায়নি
                      </div>
                      <div style={{ fontSize: 12 }}>
                        {search || status !== 'all'
                          ? 'সার্চের শব্দ বা স্ট্যাটাস পরিবর্তন করে দেখুন।'
                          : 'নতুন আবেদন তৈরি হলে এখানে দেখা যাবে।'}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <footer className="ev-foot">
          <span>
            মোট {applications.length.toLocaleString('bn-BD')} টি আবেদন থেকে{' '}
            {filtered.length.toLocaleString('bn-BD')} টি দেখানো হচ্ছে
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <CheckCircle2 size={14} color="#278052" />
            E-Vumi Seba Service Portal
          </span>
        </footer>
      </section>
    </main>
  )
}
