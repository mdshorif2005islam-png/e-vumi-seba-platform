"use client";

import React, { useState, type FormEvent } from "react";
import { MessageSquare, PhoneCall, Mail, Clock, CheckCircle2, AlertCircle, PlusCircle, Send } from "lucide-react";

type Ticket = {
  id: string;
  subject: string;
  category: string;
  priority: "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Resolved";
  date: string;
};

const initialTickets: Ticket[] = [
  { id: "TKT-1001", subject: "খতিয়ান আবেদনের ভুল সংশোধন", category: "খতিয়ান সেবা", priority: "High", status: "In Progress", date: "২০ অক্টোবর ২০২৬" },
  { id: "TKT-1002", subject: "পেমেন্ট কনফার্মেশন প্রবলেম", category: "পেমেন্ট", priority: "Medium", status: "Open", date: "২১ অক্টোবর ২০২৬" },
  { id: "TKT-1003", subject: "এজেন্ট কমিশন উইথড্র সংক্রান্ত", category: "এজেন্ট সাপোর্ট", priority: "Low", status: "Resolved", date: "১৮ অক্টোবর ২০২৬" },
];

export default function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("খতিয়ান সেবা");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;

    const newTicket: Ticket = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      subject,
      category,
      priority,
      status: "Open",
      date: new Date().toLocaleDateString("bn-BD"),
    };

    setTickets([newTicket, ...tickets]);
    setSubject("");
    setMessage("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen space-y-8 font-sans">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <MessageSquare className="text-emerald-700" size={28} />
          <span>সহায়তা কেন্দ্র (Support Center)</span>
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          আপনার ভূমি সেবা সংক্রান্ত যেকোনো সমস্যা বা জিজ্ঞাসায় আমাদের টিম দ্রুত সহায়তা করবে।
        </p>
      </div>

      {/* Quick Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <PhoneCall size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase">জরুরি হেল্পলাইন</p>
            <p className="text-lg font-bold text-gray-900 mt-0.5">+880 1700-000000</p>
            <p className="text-[11px] text-emerald-600 font-medium">সকাল ৯টা - রাত ৮টা (প্রতিদিন)</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <Mail size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase">ইমেইল সাপোর্ট</p>
            <p className="text-base font-bold text-gray-900 mt-0.5">support@evumiseba.com</p>
            <p className="text-[11px] text-blue-600 font-medium">২৪ ঘণ্টার মধ্যে উত্তর প্রদান</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase">গড় সমাধানের সময়</p>
            <p className="text-lg font-bold text-gray-900 mt-0.5">২-৪ ঘণ্টা</p>
            <p className="text-[11px] text-amber-600 font-medium">টিকিট ট্র্যাকিং সুবিধাসহ</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Form + Tickets Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Create Ticket Form */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <PlusCircle size={20} className="text-emerald-700" />
              <span>নতুন সাপোর্ট টিকিট খুলুন</span>
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">আপনার সমস্যাটি বিস্তারিত লিখে জমা দিন</p>
          </div>

          {submitted && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 size={18} />
              <span>আপনার সাপোর্ট টিকিটটি সফলভাবে জমা হয়েছে!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                বিষয় (Subject) *
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="সংক্ষেপে সমস্যার বিষয়টি লিখুন"
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-600 focus:bg-white transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  ক্যাটাগরি
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-emerald-600 focus:bg-white transition"
                >
                  <option value="খতিয়ান সেবা">খতিয়ান সেবা</option>
                  <option value="নামজারি">নামজারি</option>
                  <option value="পেমেন্ট">পেমেন্ট সমস্যা</option>
                  <option value="এজেন্ট সাপোর্ট">এজেন্ট সাপোর্ট</option>
                  <option value="অন্যান্য">অন্যান্য</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  জরুরি মাত্রা (Priority)
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-emerald-600 focus:bg-white transition"
                >
                  <option value="Low">সাধারণ (Low)</option>
                  <option value="Medium">মাঝারি (Medium)</option>
                  <option value="High">জরুরি (High)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                বিস্তারিত বিবরণ (Details) *
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="আপনার সমস্যার কথা বিস্তারিত এখানে লিখুন..."
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-600 focus:bg-white transition resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#0A2920] hover:bg-[#123b35] text-white rounded-xl font-bold text-sm transition shadow-md flex items-center justify-center gap-2"
            >
              <Send size={16} />
              <span>টিকিট পাঠান</span>
            </button>
          </form>
        </div>

        {/* Right: Existing Tickets List */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-gray-800 text-base">আমার সাপোর্ট টিকিটসমূহ</h2>
              <p className="text-xs text-gray-500 mt-0.5">আপনার পাঠানো আগের সাপোর্ট টিকিটের অবস্থা</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              মোট: {tickets.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="py-3 px-4">টিকিট ID</th>
                  <th className="py-3 px-4">বিষয় ও ক্যাটাগরি</th>
                  <th className="py-3 px-4">প্রাইওরিটি</th>
                  <th className="py-3 px-4">তারিখ</th>
                  <th className="py-3 px-4">স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {tickets.map((tkt) => (
                  <tr key={tkt.id} className="hover:bg-gray-50/50 transition">
                    <td className="py-3.5 px-4 font-mono font-semibold text-gray-900">{tkt.id}</td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-gray-800">{tkt.subject}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{tkt.category}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          tkt.priority === "High"
                            ? "bg-red-100 text-red-700"
                            : tkt.priority === "Medium"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {tkt.priority}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-500">{tkt.date}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          tkt.status === "Resolved"
                            ? "bg-emerald-100 text-emerald-800"
                            : tkt.status === "In Progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {tkt.status === "Resolved"
                          ? "সমাধানকৃত"
                          : tkt.status === "In Progress"
                          ? "চলমান"
                          : "অপেক্ষমাণ"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
