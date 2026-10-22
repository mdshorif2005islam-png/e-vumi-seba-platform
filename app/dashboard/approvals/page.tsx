"use client";

import React, { useState } from "react";

type RequestUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "Customer" | "Agent";
  date: string;
  status: "Pending" | "Approved" | "Rejected";
};

const initialRequests: RequestUser[] = [
  { id: "REQ-001", name: "আব্দুল হাদি", email: "hadi@gmail.com", phone: "01711122233", role: "Agent", date: "২১ অক্টোবর ২০২৬", status: "Pending" },
  { id: "REQ-002", name: "সামিয়া আক্তার", email: "samia@gmail.com", phone: "01822233344", role: "Customer", date: "২২ অক্টোবর ২০২৬", status: "Pending" },
  { id: "REQ-003", name: "জাহিদুল ইসলাম", email: "jahid@gmail.com", phone: "01933344455", role: "Agent", date: "২২ অক্টোবর ২০২৬", status: "Pending" },
];

export default function ApprovalsPage() {
  const [requests, setRequests] = useState<RequestUser[]>(initialRequests);

  const handleAction = (id: string, newStatus: "Approved" | "Rejected") => {
    setRequests((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">অনুমোদন অনুরোধসমূহ</h1>
          <p className="text-sm text-gray-600">
            নতুন এজেন্ট এবং কাস্টমারদের রেজিস্ট্রেশন যাচাই করে অনুমোদন (Approve) বা বাতিল (Reject) করুন।
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-600 uppercase">
                <th className="py-3 px-4">আইডি</th>
                <th className="py-3 px-4">আবেদনকারীর নাম ও ইমেইল</th>
                <th className="py-3 px-4">মোবাইল নম্বর</th>
                <th className="py-3 px-4">টাইপ (Role)</th>
                <th className="py-3 px-4">তারিখ</th>
                <th className="py-3 px-4">স্ট্যাটাস</th>
                <th className="py-3 px-4 text-center">অ্যাকশন (Action)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50/50 transition">
                  <td className="py-3 px-4 font-mono text-xs font-medium text-gray-900">{req.id}</td>
                  <td className="py-3 px-4">
                    <p className="font-medium text-gray-800">{req.name}</p>
                    <p className="text-xs text-gray-500">{req.email}</p>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{req.phone}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        req.role === "Agent"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {req.role === "Agent" ? "এজেন্ট" : "কাস্টমার"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-gray-500">{req.date}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        req.status === "Approved"
                          ? "bg-emerald-100 text-emerald-800"
                          : req.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {req.status === "Approved"
                        ? "অনুমোদিত"
                        : req.status === "Rejected"
                        ? "বাতিলকৃত"
                        : "অপেক্ষমাণ"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center space-x-2">
                    {req.status === "Pending" ? (
                      <>
                        <button
                          onClick={() => handleAction(req.id, "Approved")}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg text-xs font-medium transition"
                        >
                          অনুমোদন দিন
                        </button>
                        <button
                          onClick={() => handleAction(req.id, "Rejected")}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-medium transition"
                        >
                          বাতিল
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-gray-400 font-medium">সম্পন্ন হয়েছে</span>
                    )}
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
