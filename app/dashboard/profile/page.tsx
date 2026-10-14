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
