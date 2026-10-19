import React from 'react';

// কাস্টমার ডাটা লিস্ট
const customersData = [
  { id: 'CUST-001', name: 'রহিম উদ্দিন', phone: '01712345678', email: 'rahim@example.com', status: 'Active', totalOrders: 5 },
  { id: 'CUST-002', name: 'করিম মিয়া', phone: '01887654321', email: 'karim@example.com', status: 'Active', totalOrders: 3 },
  { id: 'CUST-003', name: 'আব্দুল হাদি', phone: '01911223344', email: 'hadi@example.com', status: 'Inactive', totalOrders: 1 },
];

export default function CustomersPage() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* হেডার সেকশন */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">কাস্টমার ম্যানেজমেন্ট</h1>
          <p className="text-sm text-gray-600">সকল নিবন্ধিত গ্রাহক এবং তাদের তথ্য পরিচালনা করুন।</p>
        </div>
        <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
          + নতুন কাস্টমার যোগ করুন
        </button>
      </div>

      {/* কাস্টমার টেবিল */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-600 uppercase">
                <th className="py-3 px-4">কাস্টমার ID</th>
                <th className="py-3 px-4">নাম</th>
                <th className="py-3 px-4">ফোন নম্বর</th>
                <th className="py-3 px-4">ইমেইল</th>
                <th className="py-3 px-4">মোট সেবা/আবেদন</th>
                <th className="py-3 px-4">স্ট্যাটাস</th>
                <th className="py-3 px-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {customersData.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50/50 transition">
                  <td className="py-3 px-4 font-medium text-gray-900">{customer.id}</td>
                  <td className="py-3 px-4 font-medium text-gray-800">{customer.name}</td>
                  <td className="py-3 px-4 text-gray-600">{customer.phone}</td>
                  <td className="py-3 px-4 text-gray-600">{customer.email}</td>
                  <td className="py-3 px-4 text-gray-600">{customer.totalOrders} টি</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        customer.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {customer.status === 'Active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-emerald-700 hover:text-emerald-900 font-medium text-xs mr-3">
                      বিস্তারিত
                    </button>
                    <button className="text-red-600 hover:text-red-800 font-medium text-xs">
                      এডিট
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
