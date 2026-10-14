import React from 'react';

export default function DashboardPage() {
  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* Banner */}
      <div style={{
        backgroundColor: '#0f766e',
        color: '#ffffff',
        padding: '24px',
        borderRadius: '12px',
        marginBottom: '24px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 8px 0' }}>E-Vumi Seba Platform-e Shagotom!</h1>
        <p style={{ margin: 0, opacity: 0.9 }}>Apnar bhumi abedon ebong onanno sheba gulo ekhane khub shohojei parichalona korte paren.</p>
      </div>

      {/* Stats Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '24px'
      }}>
        {/* Card 1 */}
        <div style={{
          backgroundColor: '#ffffff',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <div style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>Mot Abedon (Total Applications)</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b', margin: '12px 0 4px 0' }}>০৪</div>
          <div style={{ color: '#0d9488', fontSize: '12px' }}>Shorboshesh update kora hoyeche</div>
        </div>

        {/* Card 2 */}
        <div style={{
          backgroundColor: '#ffffff',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <div style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>Pending Abedon</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#d97706', margin: '12px 0 4px 0' }}>০২</div>
          <div style={{ color: '#d97706', fontSize: '12px' }}>Prokriyadhin ache</div>
        </div>

        {/* Card 3 */}
        <div style={{
          backgroundColor: '#ffffff',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <div style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>Approved Abedon</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#16a34a', margin: '12px 0 4px 0' }}>০২</div>
          <div style={{ color: '#16a34a', fontSize: '12px' }}>Somponno hoyeche</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        backgroundColor: '#ffffff',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginTop: 0, marginBottom: '16px' }}>Druto Kaj (Quick Actions)</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px'
        }}>
          <a href="/dashboard/applications" style={{
            textDecoration: 'none',
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            backgroundColor: '#f8fafc',
            display: 'block'
          }}>
            <div style={{ fontWeight: '600', color: '#0f766e', marginBottom: '4px' }}>Notun Abedon Korun &rarr;</div>
            <div style={{ fontSize: '13px', color: '#64748b' }}>Bhumi ba namjari abedon submit korun</div>
          </a>

          <a href="/dashboard/profile" style={{
            textDecoration: 'none',
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            backgroundColor: '#f8fafc',
            display: 'block'
          }}>
            <div style={{ fontWeight: '600', color: '#0f766e', marginBottom: '4px' }}>Profile Update &rarr;</div>
            <div style={{ fontSize: '13px', color: '#64748b' }}>Apnar byokthigoto tottho poriborton korun</div>
          </a>
        </div>
      </div>
    </div>
  );
}
