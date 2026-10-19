import React from 'react';

const paymentsData = [
  { id: 'TRX-88401', user: 'রহিম উদ্দিন', service: 'জমির খতিয়ান সংক্রান্ত সেবা', amount: '৳৮৫০', method: 'bKash', status: 'Completed', date: '১৪ অক্টোবর ২০২৬' },
  { id: 'TRX-88402', user: 'করিম মিয়া', service: 'নামজারি আবেদন সহায়তা', amount: '৳১,২০০', method: 'Nagad', status: 'Pending', date: '১৫ অক্টোবর ২০২৬' },
  { id: 'TRX-88403', user: 'বীথি (Agent)', service: 'এজেন্ট কমিশন উইথড্র', amount: '৳৩,৫০০', method: 'Bank Transfer', status: 'Completed', date: '১৬ অক্টোবর ২০২৬' },
];

export default function PaymentPage() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">পেমেন্ট ও লেনদেন</h1>
          <p className="text-sm text-gray-600">সকল সার্ভিস ফি, এজেন্ট কমিশন ও পেমেন্ট হিস্ট্রি দেখুন।</p>
        </div>
      </div>

      {/* পেমেন্ট সামারি কার্ড */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-500 font-medium">মোট আয় (Total Income)</p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">৳৪৫,৬০০</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-500 font-medium">অপেক্ষমাণ পেমেন্ট</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">৳১,২০০</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-500 font-medium">এজেন্ট কমিশন প্রদান</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">৳১২,৪০০</p>
        </div>
      </div>

      {/* লেনদেন টেবিল */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-800 text-sm">সাম্প্রতিক লেনদেনসমূহ</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-600 uppercase">
                <th className="py-3 px-4">ট্রানজেকশন ID</th>
                <th className="py-3 px-4">গ্রাহক / এজেন্ট</th>
                <th className="py-3 px-4">সেবা / বিবরণ</th>
                <th className="py-3 px-4">পরিমাণ</th>
                <th className="py-3 px-4">মেথড</th>
                <th className="py-3 px-4">তারিখ</th>
                <th className="py-3 px-4">স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {paymentsData.map((trx) => (
                <tr key={trx.id} className="hover:bg-gray-50/50 transition">
                  <td className="py-3 px-4 font-mono text-xs font-medium text-gray-900">{trx.id}</td>
                  <td className="py-3 px-4 font-medium text-gray-800">{trx.user}</td>
                  <td className="py-3 px-4 text-gray-600">{trx.service}</td>
                  <td className="py-3 px-4 font-bold text-gray-900">{trx.amount}</td>
                  <td className="py-3 px-4 text-gray-600">{trx.method}</td>
                  <td className="py-3 px-4 text-xs text-gray-500">{trx.date}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        trx.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {trx.status === 'Completed' ? 'সম্পন্ন' : 'অপেক্ষমাণ'}
                    </span>
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
