'use client';

import React, { useState } from 'react';

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: 'Shorif Ahamed',
    phone: '01332052506',
    email: 'mdshorif2005islam@gmail.com',
    role: 'owner'
  });'use client';

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
    <div style={{ padding: '24px', fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', maxWidth: '800px', margin: '0 auto' }}>
      {/* Profile Card Header */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        marginBottom: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <div style={{ height: '96px', backgroundColor: '#0f766e' }}></div>
        <div style={{ padding: '0 24px 24px 24px', position: 'relative' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#115e59',
            color: '#ffffff',
            fontSize: '28px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '4px solid #ffffff',
            marginTop: '-40px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            SA
          </div>
          <div style={{ marginTop: '12px' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 4px 0', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {formData.name}
              <span style={{ fontSize: '12px', backgroundColor: '#ccfbf1', color: '#0f766e', padding: '2px 8px', borderRadius: '12px', fontWeight: 'normal' }}>
                Malik
              </span>
            </h1>
            <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>{formData.email}</p>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#334155', marginBottom: '6px' }}>Purna Nam</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#334155', marginBottom: '6px' }}>Mobile Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#334155', marginBottom: '6px' }}>Email</label>
              <input
                type="email"
                value={formData.email}
                disabled
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#f1f5f9', color: '#64748b', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#334155', marginBottom: '6px' }}>Role</label>
              <input
                type="text"
                value={formData.role}
                disabled
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#f1f5f9', color: '#64748b', boxSizing: 'border-box' }}
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
                padding: '10px 20px',
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profile update kora hoyeche!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header Banner */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-teal-800 to-teal-900"></div>
        <div className="px-6 pb-6 relative flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-12">
          <div className="flex items-end space-x-4">
            <div className="w-24 h-24 rounded-full bg-teal-700 text-white text-3xl font-bold flex items-center justify-center border-4 border-white shadow-md">
              SA
            </div>
            <div className="text-center sm:text-left mb-2 sm:mb-0">
              <h1 className="text-xl font-bold text-gray-800 flex items-center justify-center sm:justify-start gap-2">
                {formData.name}
                <span className="text-xs bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-medium">Malik</span>
              </h1>
              <p className="text-sm text-gray-500">{formData.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Info Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Akaunter Tottho</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Purna Nam</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <input
                type="text"
                value={formData.role}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                disabled
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="bg-teal-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-teal-800 transition shadow-sm"
            >
              Songrokkhon Korun
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
