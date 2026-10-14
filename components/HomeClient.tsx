
'use client'

import { useState, useEffect } from 'react'
import {
  Search,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  LogIn,
  UserPlus,
  Sparkles,
  CheckCircle2,
  Phone,
  MapPin,
  Clock,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Landmark,
  ClipboardCheck,
} from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function HomeClient() {
  const [q, setQ] = useState('')
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [mobileMenu, setMobileMenu] = useState(false)

  useEffect(() => {
    async function fetchServices() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('active', true)
          .order('id', { ascending: true })

        if (error) throw error
        if (data) setServices(data)
      } catch (err) {
        console.error('Error fetching services:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  const filteredServices = services.filter((s) => {
    const query = q.trim().toLowerCase()
    if (!query) return true

    return (
      (s.name_bn && s.name_bn.toLowerCase().includes(query)) ||
      (s.description && s.description.toLowerCase().includes(query)) ||
      (s.slug && s.slug.toLowerCase().includes(query)) ||
      (s.name_en && s.name_en.toLowerCase().includes(query))
    )
  })

  const governmentLinks = [
    { name: 'ভূমি মন্ত্রণালয়', url: 'https://land.gov.bd' },
    { name: 'ই-নামজারি', url: 'https://mutation.land.gov.bd' },
    { name: 'ভূমি উন্নয়ন কর', url: 'https://ldtax.gov.bd' },
    { name: 'ভূমি রেকর্ড ও ম্যাপ', url: 'https://dlrms.land.gov.bd' },
  ]

  return (
    <div className="evumi-home">
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
          scroll-padding-top: 90px;
        }

        .evumi-home {
          --green: #087f5b;
          --green-dark: #065f46;
          --green-light: #d1fae5;
          --ink: #102a24;
          --muted: #60756f;
          --line: #dcebe5;
          background: #f5faf7;
          color: var(--ink);
          min-height: 100vh;
          font-family: system-ui, -apple-system, BlinkMacSystemFont,
            "Segoe UI", sans-serif;
          overflow-x: clip;
        }

        .evumi-container {
          width: min(1440px, calc(100% - 64px));
          margin-inline: auto;
        }

        .evumi-header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--line);
        }

        .evumi-header-inner {
          min-height: 78px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .evumi-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: var(--ink);
          flex-shrink: 0;
        }

        .evumi-logo-icon {
          width: 48px;
          height: 48px;
          border-radius: 15px;
          background: linear-gradient(135deg, #0f766e, #047857);
          color: white;
          display: grid;
          place-items: center;
          box-shadow: 0 7px 18px #087f5b25;
        }

        .evumi-logo-name {
          font-size: 21px;
          line-height: 1.2;
          font-weight: 850;
          letter-spacing: -0.5px;
        }

        .evumi-logo-sub {
          margin-top: 4px;
          font-size: 11px;
          color: #71847e;
        }

        .evumi-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 26px;
        }

        .evumi-nav a {
          color: #344d45;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          transition: color 0.2s;
        }

        .evumi-nav a:hover {
          color: var(--green);
        }

        .evumi-nav .tracking-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          border-radius: 12px;
          color: #06734f;
          background: #dcfce7;
          border: 1px solid #a7f3d0;
        }

        .evumi-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .evumi-btn {
          min-height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 17px;
          border-radius: 11px;
          font-size: 14px;
          font-weight: 750;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .evumi-btn:hover {
          transform: translateY(-2px);
        }

        .evumi-btn-primary {
          color: white;
          background: linear-gradient(135deg, #0f766e, #047857);
          box-shadow: 0 6px 15px #087f5b25;
        }

        .evumi-btn-outline {
          color: #23483d;
          background: white;
          border: 1px solid #ccded5;
        }

        .evumi-mobile-toggle {
          display: none;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border: 1px solid var(--line);
          border-radius: 12px;
          background: white;
          color: var(--green);
          cursor: pointer;
        }

        .evumi-mobile-nav {
          display: none;
        }

        .evumi-hero {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(ellipse at 90% 10%, #b8f2d7 0, transparent 34%),
            linear-gradient(135deg, #ecfbf3 0%, #f7fcf9 60%, #e5f7ee 100%);
          border-bottom: 1px solid #e0f0e7;
        }

        .evumi-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(340px, 0.9fr);
          gap: 64px;
          align-items: center;
          padding-block: 76px 78px;
        }

        .evumi-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 15px;
          border-radius: 99px;
          background: #d0fae8;
          border: 1px solid #b1efd5;
          color: #087653;
          font-size: 13px;
          font-weight: 800;
          margin-bottom: 22px;
        }

        .evumi-hero h1 {
          max-width: 740px;
          margin: 0;
          font-size: clamp(36px, 4vw, 60px);
          line-height: 1.22;
          letter-spacing: -1.4px;
          font-weight: 900;
          color: #102b24;
        }

        .evumi-highlight {
          color: #07815c;
        }

        .evumi-hero-description {
          max-width: 650px;
          margin: 22px 0 28px;
          color: #536b62;
          font-size: 17px;
          line-height: 1.9;
        }

        .evumi-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 13px;
        }

        .evumi-trust-points {
          display: flex;
          flex-wrap: wrap;
          gap: 16px 24px;
          margin-top: 27px;
          color: #26785c;
          font-size: 13px;
          font-weight: 750;
        }

        .evumi-trust-points span {
          display: inline-flex;
          align-items: center;
          gap: 7px;
        }

        .evumi-hero-card {
          position: relative;
          padding: 36px;
          border-radius: 26px;
          border: 1px solid #b8ead5;
          background: rgba(255, 255, 255, 0.88);
          box-shadow: 0 22px 65px #135c3e12;
        }

        .evumi-hero-card-icon {
          width: 62px;
          height: 62px;
          display: grid;
          place-items: center;
          border-radius: 19px;
          color: white;
          background: linear-gradient(135deg, #0f766e, #047857);
          box-shadow: 0 8px 18px #087f5b2e;
          margin-bottom: 23px;
        }

        .evumi-hero-card h2 {
          margin: 0 0 12px;
          font-size: 25px;
          line-height: 1.4;
          font-weight: 850;
        }

        .evumi-hero-card > p {
          margin: 0;
          color: #63766e;
          font-size: 15px;
          line-height: 1.9;
        }

        .evumi-card-features {
          display: grid;
          gap: 14px;
          margin-top: 25px;
          padding-top: 22px;
          border-top: 1px solid #e0eee7;
        }

        .evumi-card-features div {
          display: flex;
          gap: 10px;
          align-items: center;
          color: #087653;
          font-size: 14px;
          font-weight: 750;
        }

        .evumi-search-section {
          position: relative;
          z-index: 2;
          margin-top: -28px;
        }

        .evumi-search-box {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 13px 14px 13px 22px;
          border: 1px solid #dcebe4;
          border-radius: 18px;
          background: white;
          box-shadow: 0 14px 38px #174b3510;
        }

        .evumi-search-box > svg {
          color: #719187;
          flex-shrink: 0;
        }

        .evumi-search-box input {
          flex: 1;
          width: 100%;
          min-width: 0;
          padding: 12px 0;
          border: none;
          outline: none;
          background: transparent;
          color: #193c30;
          font: inherit;
          font-size: 15px;
        }

        .evumi-search-box input::placeholder {
          color: #96a9a1;
        }

        .evumi-search-box button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          flex-shrink: 0;
          min-height: 46px;
          padding: 12px 24px;
          border: 0;
          border-radius: 12px;
          background: #087f5b;
          color: white;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
        }

        .evumi-section {
          padding-block: 76px;
        }

        .evumi-section-heading {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 20px;
          margin-bottom: 32px;
        }

        .evumi-kicker {
          margin: 0 0 9px;
          color: #07815c;
          font-size: 13px;
          font-weight: 850;
          letter-spacing: 0.7px;
        }

        .evumi-section-heading h2 {
          margin: 0;
          color: #132f26;
          font-size: clamp(28px, 3vw, 38px);
          line-height: 1.35;
          font-weight: 900;
        }

        .evumi-count {
          flex-shrink: 0;
          padding: 9px 15px;
          border-radius: 99px;
          background: #e5f5ec;
          color: #087653;
          font-size: 13px;
          font-weight: 800;
        }

        .evumi-service-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 22px;
        }

        .evumi-service-card {
          min-width: 0;
          min-height: 255px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          padding: 27px;
          border: 1px solid #e0ece5;
          border-radius: 21px;
          background: white;
          box-shadow: 0 5px 18px #173d2a05;
          transition: transform 0.22s, box-shadow 0.22s, border-color 0.22s;
        }

        .evumi-service-card:hover {
          transform: translateY(-5px);
          border-color: #a7e6c8;
          box-shadow: 0 18px 34px #174b3510;
        }

        .evumi-service-icon {
          display: grid;
          place-items: center;
          width: 53px;
          height: 53px;
          border: 1px solid #b8efd0;
          border-radius: 16px;
          background: #eafbf1;
          color: #07815c;
          margin-bottom: 20px;
        }

        .evumi-service-card h3 {
          margin: 0 0 10px;
          color: #16392d;
          font-size: 19px;
          line-height: 1.5;
          font-weight: 850;
          overflow-wrap: anywhere;
        }

        .evumi-service-card p {
          margin: 0 0 22px;
          color: #71837b;
          font-size: 14px;
          line-height: 1.8;
        }

        .evumi-service-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #087f5b;
          font-size: 14px;
          font-weight: 850;
          text-decoration: none;
        }

        .evumi-service-link:hover {
          color: #064e3b;
          gap: 12px;
        }

        .evumi-empty {
          padding: 55px 24px;
          text-align: center;
          border: 1px solid var(--line);
          border-radius: 20px;
          background: white;
          color: #667a70;
        }

        .evumi-workflow {
          padding-block: 75px;
          background: white;
          border-top: 1px solid #e2eee7;
          border-bottom: 1px solid #e2eee7;
        }

        .evumi-center-heading {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 42px;
        }

        .evumi-center-heading h2 {
          margin: 0 0 12px;
          font-size: clamp(28px, 3vw, 37px);
          font-weight: 900;
          color: #16392d;
        }

        .evumi-center-heading p {
          margin: 0;
          color: #71837b;
          font-size: 15px;
          line-height: 1.8;
        }

        .evumi-steps {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 18px;
        }

        .evumi-step {
          padding: 25px 18px;
          text-align: center;
          border: 1px solid #e0ece5;
          border-radius: 19px;
          background: #f8fcf9;
        }

        .evumi-step-number {
          display: grid;
          place-items: center;
          width: 44px;
          height: 44px;
          margin: 0 auto 17px;
          border-radius: 14px;
          color: white;
          background: #087f5b;
          font-size: 16px;
          font-weight: 900;
          box-shadow: 0 5px 12px #087f5b22;
        }

        .evumi-step h3 {
          margin: 0 0 9px;
          color: #23483a;
          font-size: 16px;
          line-height: 1.6;
          font-weight: 850;
        }

        .evumi-step p {
          margin: 0;
          color: #71837b;
          font-size: 13px;
          line-height: 1.8;
        }

        .evumi-safety {
          padding-block: 42px;
        }

        .evumi-safety-box {
          display: flex;
          align-items: center;
          gap: 22px;
          padding: 27px 30px;
          border: 1px solid #b8ead5;
          border-radius: 21px;
          background: linear-gradient(110deg, #e0f8eb, #f2fcf6);
        }

        .evumi-safety-icon {
          display: grid;
          place-items: center;
          flex-shrink: 0;
          width: 56px;
          height: 56px;
          border-radius: 17px;
          background: white;
          color: #07815c;
        }

        .evumi-safety-box h3 {
          margin: 0 0 7px;
          color: #176047;
          font-size: 17px;
          font-weight: 850;
        }

        .evumi-safety-box p {
          margin: 0;
          color: #5c7d6c;
          font-size: 14px;
          line-height: 1.8;
        }

        .evumi-footer {
          padding: 65px 0 22px;
          color: #d3e2dc;
          background: #102a24;
          border-top: 5px solid #087f5b;
        }

        .evumi-footer-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.8fr 1fr 1fr;
          gap: 44px;
          padding-bottom: 42px;
          border-bottom: 1px solid #ffffff20;
        }

        .evumi-footer h3,
        .evumi-footer h4,
        .evumi-footer h5 {
          margin: 0 0 18px;
          color: #8be0b7;
          font-weight: 850;
          line-height: 1.5;
        }

        .evumi-footer h3 {
          font-size: 20px;
        }

        .evumi-footer h4 {
          font-size: 16px;
        }

        .evumi-footer h5 {
          margin-top: 24px;
          font-size: 14px;
        }

        .evumi-footer p {
          margin: 0 0 20px;
          color: #a6bbb1;
          font-size: 14px;
          line-height: 1.9;
        }

        .evumi-footer-links {
          display: grid;
          gap: 13px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .evumi-footer-links a,
        .evumi-footer-external a {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          color: #c6d9d0;
          font-size: 14px;
          line-height: 1.7;
          text-decoration: none;
          overflow-wrap: anywhere;
          transition: color 0.2s;
        }

        .evumi-footer-links a:hover,
        .evumi-footer-external a:hover {
          color: #8be0b7;
        }

        .evumi-footer-links svg,
        .evumi-footer-external svg {
          flex-shrink: 0;
          margin-top: 3px;
          color: #64d5a2;
        }

        .evumi-contact-list {
          display: grid;
          gap: 15px;
          margin-bottom: 20px;
        }

        .evumi-contact-list div {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: #b6cbc1;
          font-size: 13px;
          line-height: 1.8;
        }

        .evumi-contact-list svg {
          flex-shrink: 0;
          margin-top: 3px;
          color: #70ddb0;
        }

        .evumi-hotline {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 11px 15px;
          border-radius: 12px;
          background: #087f5b;
          color: white;
          font-size: 14px;
          font-weight: 800;
          text-decoration: none;
        }

        .evumi-footer-external {
          display: grid;
          gap: 9px;
        }

        .evumi-copyright {
          padding-top: 22px;
          text-align: center;
          color: #90a89c;
          font-size: 13px;
          line-height: 1.8;
        }

        @media (max-width: 1150px) {
          .evumi-container {
            width: calc(100% - 44px);
          }

          .evumi-nav {
            gap: 15px;
          }

          .evumi-nav a {
            font-size: 13px;
          }

          .evumi-actions .evumi-btn {
            padding-inline: 12px;
          }

          .evumi-hero-grid {
            gap: 36px;
          }

          .evumi-service-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .evumi-footer-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 38px;
          }
        }

        @media (max-width: 800px) {
          .evumi-container {
            width: calc(100% - 36px);
          }

          .evumi-header-inner {
            min-height: 70px;
          }

          .evumi-nav {
            display: none;
          }

          .evumi-actions {
            display: none;
          }

          .evumi-mobile-toggle {
            display: inline-flex;
          }

          .evumi-mobile-nav {
            display: grid;
            gap: 5px;
            padding: 10px 0 18px;
          }

          .evumi-mobile-nav a {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 13px 15px;
            border-radius: 11px;
            color: #23483a;
            font-size: 14px;
            font-weight: 750;
            text-decoration: none;
          }

          .evumi-mobile-nav a:hover {
            background: #eaf8ef;
          }

          .evumi-hero-grid {
            grid-template-columns: 1fr;
            gap: 35px;
            padding-block: 52px 60px;
          }

          .evumi-hero h1 {
            max-width: 700px;
            font-size: clamp(34px, 7vw, 49px);
          }

          .evumi-hero-description {
            font-size: 16px;
          }

          .evumi-hero-card {
            padding: 28px;
          }

          .evumi-search-section {
            margin-top: -20px;
          }

          .evumi-section {
            padding-block: 58px;
          }

          .evumi-service-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 16px;
          }

          .evumi-service-card {
            min-height: 245px;
            padding: 21px;
          }

          .evumi-steps {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .evumi-step:last-child {
            grid-column: 1 / -1;
          }

          .evumi-workflow {
            padding-block: 58px;
          }

          .evumi-safety {
            padding-block: 30px;
          }

          .evumi-footer {
            padding-top: 48px;
          }
        }

        @media (max-width: 520px) {
          .evumi-container {
            width: calc(100% - 28px);
          }

          .evumi-logo {
            gap: 9px;
          }

          .evumi-logo-icon {
            width: 42px;
            height: 42px;
            border-radius: 13px;
          }

          .evumi-logo-name {
            font-size: 18px;
          }

          .evumi-logo-sub {
            font-size: 10px;
          }

          .evumi-hero-grid {
            padding-block: 38px 46px;
          }

          .evumi-eyebrow {
            font-size: 11px;
            padding: 8px 11px;
          }

          .evumi-hero h1 {
            font-size: 35px;
            letter-spacing: -0.8px;
          }

          .evumi-hero-description {
            font-size: 15px;
            line-height: 1.85;
            margin-block: 17px 23px;
          }

          .evumi-hero-actions {
            display: grid;
            grid-template-columns: 1fr;
          }

          .evumi-btn {
            width: 100%;
          }

          .evumi-trust-points {
            gap: 12px;
            font-size: 12px;
          }

          .evumi-hero-card {
            padding: 23px;
            border-radius: 20px;
          }

          .evumi-hero-card h2 {
            font-size: 22px;
          }

          .evumi-search-box {
            padding: 10px 12px;
            gap: 9px;
            flex-wrap: wrap;
          }

          .evumi-search-box input {
            font-size: 13px;
          }

          .evumi-search-box button {
            width: 100%;
          }

          .evumi-section {
            padding-block: 45px;
          }

          .evumi-section-heading {
            align-items: flex-start;
            flex-direction: column;
            gap: 13px;
            margin-bottom: 22px;
          }

          .evumi-section-heading h2 {
            font-size: 29px;
          }

          .evumi-service-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .evumi-service-card {
            min-height: 0;
            padding: 23px;
          }

          .evumi-service-card p {
            margin-bottom: 18px;
          }

          .evumi-steps {
            grid-template-columns: 1fr;
            gap: 13px;
          }

          .evumi-step:last-child {
            grid-column: auto;
          }

          .evumi-step {
            padding: 23px;
          }

          .evumi-safety-box {
            align-items: flex-start;
            gap: 14px;
            padding: 20px;
          }

          .evumi-safety-icon {
            width: 44px;
            height: 44px;
            border-radius: 13px;
          }

          .evumi-footer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .evumi-footer {
            padding-top: 42px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .evumi-home *,
          .evumi-home *::before,
          .evumi-home *::after {
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Header */}
      <header className="evumi-header">
        <div className="evumi-container evumi-header-inner">
          <Link href="/" className="evumi-logo">
            <div className="evumi-logo-icon">
              <Landmark size={25} />
            </div>
            <div>
              <div className="evumi-logo-name">E-Vumi Seba</div>
              <div className="evumi-logo-sub">
                Private Land Service Assistance
              </div>
            </div>
          </Link>

          <nav className="evumi-nav" aria-label="প্রধান মেনু">
            <a href="#home">হোম</a>
            <a href="#services">সেবাসমূহ</a>
            <Link href="/track" className="tracking-link">
              <Search size={17} />
              আবেদন ট্র্যাকিং
            </Link>
            <Link href="/dashboard">Dashboard</Link>
          </nav>

          <div className="evumi-actions">
            <Link href="/auth/login" className="evumi-btn evumi-btn-outline">
              <LogIn size={16} />
              লগইন
            </Link>
            <Link href="/auth/register" className="evumi-btn evumi-btn-primary">
              <UserPlus size={16} />
              রেজিস্টার
            </Link>
          </div>

          <button
            type="button"
            className="evumi-mobile-toggle"
            aria-label={mobileMenu ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'}
            aria-expanded={mobileMenu}
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>

        {mobileMenu && (
          <nav className="evumi-container evumi-mobile-nav" aria-label="মোবাইল মেনু">
            <a href="#home" onClick={() => setMobileMenu(false)}>হোম</a>
            <a href="#services" onClick={() => setMobileMenu(false)}>সেবাসমূহ</a>
            <Link href="/track" onClick={() => setMobileMenu(false)}>
              <Search size={17} /> আবেদন ট্র্যাকিং
            </Link>
            <Link href="/dashboard" onClick={() => setMobileMenu(false)}>
              Dashboard
            </Link>
            <Link href="/auth/login" onClick={() => setMobileMenu(false)}>
              <LogIn size={17} /> লগইন
            </Link>
            <Link href="/auth/register" onClick={() => setMobileMenu(false)}>
              <UserPlus size={17} /> রেজিস্টার
            </Link>
          </nav>
        )}
      </header>

      <main id="home">
        {/* Hero */}
        <section className="evumi-hero">
          <div className="evumi-container evumi-hero-grid">
            <div>
              <div className="evumi-eyebrow">
                <Sparkles size={15} />
                বাংলাদেশের ডিজিটাল ভূমি সহায়তা প্ল্যাটফর্ম
              </div>

              <h1>
                জমির সেবা এখন{' '}
                <span className="evumi-highlight">আরও সহজ ও দ্রুত</span>
              </h1>

              <p className="evumi-hero-description">
                অনুমোদিত Agent-এর সাহায্যে নামজারি, খতিয়ান, খাজনা ও অন্যান্য
                ভূমিসেবা আবেদনে সহায়তা নিন। আপনার আবেদন ও অগ্রগতি অনলাইনে
                দেখুন সহজে।
              </p>

              <div className="evumi-hero-actions">
                <a href="#services" className="evumi-btn evumi-btn-primary">
                  সেবা গ্রহণ করুন <ArrowRight size={18} />
                </a>
                <Link href="/track" className="evumi-btn evumi-btn-outline">
                  <Search size={17} /> আবেদনের ট্র্যাকিং
                </Link>
              </div>

              <div className="evumi-trust-points">
                <span><CheckCircle2 size={16} /> সহজ অনুসন্ধান</span>
                <span><CheckCircle2 size={16} /> স্ট্যাটাস আপডেট</span>
                <span><CheckCircle2 size={16} /> সহজ যোগাযোগ</span>
              </div>
            </div>

            <div className="evumi-hero-card">
              <div className="evumi-hero-card-icon">
                <ShieldCheck size={34} />
              </div>
              <h2>নিরাপদ ও স্বচ্ছ প্রক্রিয়া</h2>
              <p>
                আবেদন জমা দেওয়া থেকে অগ্রগতি দেখা পর্যন্ত আপনার সেবার
                তথ্য সুসংগঠিতভাবে দেখার সুবিধা।
              </p>
              <div className="evumi-card-features">
                <div><CheckCircle2 size={18} /> আবেদন সংক্রান্ত তথ্য</div>
                <div><CheckCircle2 size={18} /> আবেদনের স্ট্যাটাস দেখুন</div>
                <div><CheckCircle2 size={18} /> প্রয়োজনীয় সহায়তা নিন</div>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginTop: 26,
                padding: 15,
                borderRadius: 14,
                background: '#e9f8ef',
                color: '#176047',
                fontSize: 13,
                fontWeight: 750,
                lineHeight: 1.7,
              }}>
                <ClipboardCheck size={24} />
                আপনার আবেদন খুঁজতে নিবন্ধিত মোবাইল নম্বর ব্যবহার করুন।
              </div>
            </div>
          </div>
        </section>

        {/* Service search */}
        <section className="evumi-container evumi-search-section">
          <form
            className="evumi-search-box"
            onSubmit={(e) => {
              e.preventDefault()
              document.getElementById('services')?.scrollIntoView({
                behavior: 'smooth',
              })
            }}
          >
            <Search size={21} />
            <input
              type="search"
              aria-label="সেবা খুঁজুন"
              placeholder="আপনার প্রয়োজনীয় সেবা খুঁজুন — খতিয়ান, নামজারি, নকশা, খাজনা..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <button type="submit">
              <Search size={17} /> খুঁজুন
            </button>
          </form>
        </section>

        {/* Services */}
        <section id="services" className="evumi-container evumi-section">
          <div className="evumi-section-heading">
            <div>
              <p className="evumi-kicker">অনলাইন ভূমিসেবা ব্যবস্থা</p>
              <h2>সকল সেবাসমূহ</h2>
            </div>
            <span className="evumi-count">
              মোট সেবা: {filteredServices.length} টি
            </span>
          </div>

          {loading ? (
            <div className="evumi-empty">
              <p>ডাটাবেজ থেকে সেবাসমূহ লোড হচ্ছে...</p>
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="evumi-empty">
              <Search size={32} style={{ marginBottom: 12, color: '#087f5b' }} />
              <p>
                {q.trim()
                  ? 'আপনার অনুসন্ধানের সাথে মিল রেখে কোনো সেবা পাওয়া যায়নি।'
                  : 'এখন কোনো সক্রিয় সেবা পাওয়া যায়নি। পরে আবার চেষ্টা করুন।'}
              </p>
            </div>
          ) : (
            <div className="evumi-service-grid">
              {filteredServices.map((service) => (
                <article
                  className="evumi-service-card"
                  key={service.id || service.slug}
                >
                  <div>
                    <div className="evumi-service-icon">
                      <FileCheck2 size={26} />
                    </div>
                    <h3>{service.name_bn || service.name_en || 'ভূমি সেবা'}</h3>
                    <p>
                      {service.description ||
                        'ভূমি সেবা সংক্রান্ত প্রয়োজনীয় সহায়তার জন্য আবেদন করুন।'}
                    </p>
                  </div>
                  <Link
                    href={`/dashboard/applications/new?service=${encodeURIComponent(service.slug || '')}`}
                    className="evumi-service-link"
                  >
                    আবেদন করুন <ArrowRight size={17} />
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Workflow */}
        <section className="evumi-workflow">
          <div className="evumi-container">
            <div className="evumi-center-heading">
              <h2>কীভাবে কাজ করে?</h2>
              <p>
                সহজ কয়েকটি ধাপে আপনার প্রয়োজনীয় ভূমিসেবার আবেদন ও
                অগ্রগতি সম্পর্কে জানুন।
              </p>
            </div>

            <div className="evumi-steps">
              {[
                {
                  num: '01',
                  title: 'সেবা নির্বাচন',
                  desc: 'আপনার প্রয়োজন অনুযায়ী সেবা বেছে নিন।',
                },
                {
                  num: '02',
                  title: 'আবেদন জমা',
                  desc: 'প্রয়োজনীয় তথ্য ও কাগজপত্র জমা দিন।',
                },
                {
                  num: '03',
                  title: 'তথ্য যাচাই',
                  desc: 'আবেদনের তথ্য যাচাই ও প্রক্রিয়াকরণ হবে।',
                },
                {
                  num: '04',
                  title: 'অগ্রগতি দেখুন',
                  desc: 'ট্র্যাকিং পেজে আবেদনের বর্তমান অবস্থা দেখুন।',
                },
                {
                  num: '05',
                  title: 'সেবা গ্রহণ',
                  desc: 'প্রক্রিয়া সম্পন্ন হলে প্রয়োজনীয় সহায়তা নিন।',
                },
              ].map((step) => (
                <article className="evumi-step" key={step.num}>
                  <div className="evumi-step-number">{step.num}</div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Safety note */}
        <section className="evumi-container evumi-safety">
          <div className="evumi-safety-box">
            <div className="evumi-safety-icon">
              <ShieldCheck size={29} />
            </div>
            <div>
              <h3>আপনার তথ্যের নিরাপত্তা আমাদের অগ্রাধিকার</h3>
              <p>
                আবেদন করার সময় সঠিক তথ্য দিন। সংবেদনশীল নথি ও ব্যক্তিগত
                তথ্য শুধু অনুমোদিত এবং প্রয়োজনীয় প্রক্রিয়ায় ব্যবহার করুন।
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="evumi-footer">
        <div className="evumi-container">
          <div className="evumi-footer-grid">
            <div>
              <h3>E-Vumi Seba</h3>
              <p>
                বাংলাদেশের ভূমি সংক্রান্ত সেবায় সহায়তার একটি স্বাধীন
                প্ল্যাটফর্ম। নামজারি, ভূমি উন্নয়ন কর, পর্চা, খতিয়ান ও
                অন্যান্য সেবার আবেদনে সহায়তা নিন।
              </p>
              <a className="evumi-hotline" href="tel:01332052506">
                <Phone size={17} /> হটলাইন: 01332052506
              </a>
            </div>

            <div>
              <h4>দ্রুত লিংক</h4>
              <ul className="evumi-footer-links">
                <li><a href="#home"><ChevronRight size={15} /> হোম</a></li>
                <li><a href="#services"><ChevronRight size={15} /> সেবাসমূহ</a></li>
                <li>
                  <Link href="/track"><ChevronRight size={15} /> আবেদন ট্র্যাকিং</Link>
                </li>
                <li>
                  <Link href="/auth/login"><ChevronRight size={15} /> লগইন</Link>
                </li>
                <li>
                  <Link href="/auth/register"><ChevronRight size={15} /> রেজিস্টার</Link>
                </li>
                <li>
                  <Link href="/dashboard"><ChevronRight size={15} /> Dashboard</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4>প্রধান সেবা</h4>
              <ul className="evumi-footer-links">
                {[
                  'ই-নামজারি',
                  'ভূমি উন্নয়ন কর',
                  'ভূমি রেকর্ড ও পর্চা',
                  'মৌজা ম্যাপ',
                  'দলিল সংক্রান্ত সহায়তা',
                  'নামজারি সহায়তা',
                ].map((item) => (
                  <li key={item}>
                    <a href="#services">
                      <ChevronRight size={15} /> {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4>যোগাযোগ</h4>
              <div className="evumi-contact-list">
                <div><MapPin size={17} /> <span>ভূমি সেবা সহায়তা কেন্দ্র</span></div>
                <div><Phone size={17} /> <span>01332052506</span></div>
                <div>
                  <Clock size={17} />
                  <span>রবিবার–বৃহস্পতিবার, সকাল ৯টা–বিকাল ৫টা</span>
                </div>
              </div>

              <h5>সরকারি ভূমিসেবা লিংক</h5>
              <div className="evumi-footer-external">
                {governmentLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={14} /> {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="evumi-copyright">
            © ২০২৬ E-Vumi Seba. সর্বস্বত্ব সংরক্ষিত।
            <br />
            E-Vumi Seba একটি স্বাধীন সহায়তা প্ল্যাটফর্ম; এটি কোনো সরকারি
            সংস্থা নয়।
          </div>
        </div>
      </footer>
    </div>
  )
}
