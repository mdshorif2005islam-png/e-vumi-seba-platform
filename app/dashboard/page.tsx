import React from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-teal-800 to-teal-900 rounded-xl p-6 text-white shadow-md">
        <h1 className="text-2xl font-bold">E-Vumi Seba Platform-e Shagotom!</h1>
        <p className="text-teal-100 mt-1">Apnar bhumi abedon ebong onanno sheba gulo ekhane khub shohojei parichalona korte paren.</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-gray-500 text-sm font-medium">Mot Abedon (Total Applications)</div>
          <div className="text-3xl font-bold text-gray-800 mt-2">০৪</div>
          <div className="text-teal-600 text-xs mt-2 flex items-center">Shorboshesh update kora hoyeche</div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-gray-500 text-sm font-medium">Pending Abedon</div>
          <div className="text-3xl font-bold text-amber-600 mt-2">০২</div>
          <div className="text-amber-600 text-xs mt-2">Prokriyadhin ache</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-gray-500 text-sm font-medium">Approved Abedon</div>
          <div className="text-3xl font-bold text-emerald-600 mt-2">০২</div>
          <div className="text-emerald-600 text-xs mt-2">Somponno hoyeche</div>
        </div>
      </div>

      {/* Quick Actions / Recent Activity Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Druto Kaj (Quick Actions)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/dashboard/applications" className="p-4 rounded-lg border border-gray-200 hover:border-teal-600 hover:bg-teal-50 transition flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800">Notun Abedon Korun</h3>
              <p className="text-sm text-gray-500">Bhumi ba namjari abedon submit korun</p>
            </div>
            <span className="text-teal-600 font-bold">&rarr;</span>
          </Link>

          <Link href="/dashboard/profile" className="p-4 rounded-lg border border-gray-200 hover:border-teal-600 hover:bg-teal-50 transition flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800">Profile Update</h3>
              <p className="text-sm text-gray-500">Apnar byokthigoto tottho poriborton korun</p>
            </div>
            <span className="text-teal-600 font-bold">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
