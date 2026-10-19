import React from 'react';

const agentsData = [
  { id: 'AGT-101', name: 'বীথি', email: 'annikabithi@gmail.com', phone: '01700000000', region: 'ঢাকা', status: 'Active', totalEarned: '৳১৫,৫০০' },
  { id: 'AGT-102', name: 'শরীফ আহমেদ', email: 'mdshorif2005islam@gmail.com', phone: '01800000000', region: 'রংপুর', status: 'Active', totalEarned: '৳২৮,০০০' },
];

export default function AgentPage() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">এজেন্ট ম্যানেজমেন্ট</h1>
          <p className="text-sm text-gray-600">সকল নিবন্ধিত এজেন্ট এবং তাদের কমিশন পরিচালনা করুন।</p>
        </div>
        <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
          + নতুন এজেন্ট যোগ করুন
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-600 uppercase">
                <th className="py-3 px-4">এজেন্ট ID</th>
                <th className="py-3 px-4">নাম ও ইমেইল</th>
                <th className="py-3 px-4">ফোন নম্বর</th>
                <th className="py-3 px-4">অঞ্চল/এলাকা</th>
                <th className="py-3 px-4">মোট কমিশন</th>
                <th className="py-3 px-4">স্ট্যাটাস</th>
                <th className="py-3 px-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {agentsData.map((agent) => (
                <tr key={agent.id} className="hover:bg-gray-50/50 transition">
                  <td className="py-3 px-4 font-medium text-gray-900">{agent.id}</td>
                  <td className="py-3 px-4">
                    <p className="font-medium text-gray-800">{agent.name}</p>
                    <p className="text-xs text-gray-500">{agent.email}</p>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{agent.phone}</td>
                  <td className="py-3 px-4 text-gray-600">{agent.region}</td>
                  <td className="py-3 px-4 font-semibold text-emerald-700">{agent.totalEarned}</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      সক্রিয়
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
