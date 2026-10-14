'use client';

import React, { useState } from 'react';

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: 'Shorif Ahamed',
    phone: '01332052506',
    email: 'mdshorif2005islam@gmail.com',
    role: 'owner'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profile update kora hoyeche!');
  };

  return (
    <div style={{ width: '100%', fontFamily: 'sans-serif', boxSizing: 'border-box' }}>
      {/* Profile Card Header */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        marginBottom: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <div style={{ height: '100px', backgroundColor: '#0f766e' }}></div>
        <div style={{ padding: '0 24px 20px 24px', position: 'relative' }}>
          {/* Avatar and Name Flex Container */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', marginTop: '-35px', flexWrap: 'wrap' }}>
            <div style={{
              width: '75px',
              height: '75px',
              borderRadius: '50%',
              backgroundColor: '#115e59',
              color: '#ffffff',
              fontSize: '24px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '4px solid #ffffff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              flexShrink: 0
            }}>
              SA
            </div>
            <div style={{ marginBottom: '4px' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 4px 0', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                {formData.name}
                <span style={{ fontSize: '11px', backgroundColor: '#ccfbf1', color: '#0f766e', padding: '2px 8px', borderRadius: '12px', fontWeight: '600' }}>
                  Malik
                </span>
              </h1>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>{formData.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div style={{
        backgroundColor: '#ffffff',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a', marginTop: 0, marginBottom: '20px' }}>Akaunter Tottho</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Purna Nam</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box', outline: 'none', fontSize: '14px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Mobile Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box', outline: 'none', fontSize: '14px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Email</label>
              <input
                type="email"
                value={formData.email}
                disabled
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#f1f5f9', color: '#64748b', boxSizing: 'border-box', fontSize: '14px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Role</label>
              <input
                type="text"
                value={formData.role}
                disabled
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#f1f5f9', color: '#64748b', boxSizing: 'border-box', fontSize: '14px' }}
              />
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <button
              type="submit"
              style={{
                backgroundColor: '#0f766e',
                color: '#ffffff',
                border: 'none',
                padding: '10px 24px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Songrokkhon Korun
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
