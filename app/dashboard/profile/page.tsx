'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function ProfilePage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<any>({
    full_name: '',
    phone: '',
    email: '',
    role: '',
    territory: '',
    nid_number: '',
    address: '',
    district: '',
    upazila: '',
    avatar_url: '',
  });

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        let { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (data) {
          setProfile(data);
        }
      }
    } catch (error) {
      console.error('Error loading user data!', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    const updates = {
      id: user.id,
      full_name: profile.full_name,
      phone: profile.phone,
      territory: profile.territory,
      nid_number: profile.nid_number,
      address: profile.address,
      district: profile.district,
      upazila: profile.upazila,
      avatar_url: profile.avatar_url,
      updated_at: new Date().toISOString(),
    };

    let { error } = await supabase.from('profiles').upsert(updates);

    if (error) {
      alert('আপডেট করতে সমস্যা হয়েছে: ' + error.message);
    } else {
      alert('প্রোফাইল সফলভাবে আপডেট হয়েছে!');
    }
    setSaving(false);
  }

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    let { error: uploadError } = await supabase.storage
      .from('application-documents')
      .upload(filePath, file);

    if (uploadError) {
      alert('ছবি আপলোড ব্যর্থ হয়েছে!');
      return;
    }

    const { data } = supabase.storage
      .from('application-documents')
      .getPublicUrl(filePath);

    setProfile({ ...profile, avatar_url: data.publicUrl });
  }

  if (loading) return <div className="p-8 text-center text-gray-600">তথ্য লোড হচ্ছে...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* হেডার ও প্রোফাইল ব্যাকগ্রাউন্ড */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-teal-700 to-emerald-600 h-32 relative"></div>
        <div className="px-6 pb-6 pt-0 relative flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-16 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            {/* প্রোফাইল ছবি ও আপলোড বাটন */}
            <div className="relative group">
              <img
                src={profile.avatar_url || 'https://via.placeholder.com/150'}
                alt="Profile Avatar"
                className="w-28 h-28 rounded-full border-4 border-white object-cover bg-white shadow-md"
              />
              <label className="absolute bottom-0 right-0 bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-full cursor-pointer shadow transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 আপনার প্রোফাইল পেজের সম্পূর্ণ কোডটি নিচের ফাইল আকারে দেওয়া হলো। এটি কপি বা ডাউনলোড করে আপনার প্রজেক্টের **`app/profile/page.tsx`** ফাইলে সরাসরি বসিয়ে দিতে পারেন:

```tsx
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function ProfilePage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<any>({
    full_name: '',
    phone: '',
    email: '',
    role: '',
    territory: '',
    nid_number: '',
    address: '',
    district: '',
    avatar_url: '',
  });

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        let { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (data) {
          setProfile(data);
        }
      }
    } catch (error) {
      console.error('Error loading user data!', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    const updates = {
      id: user.id,
      full_name: profile.full_name,
      phone: profile.phone,
      territory: profile.territory,
      nid_number: profile.nid_number,
      address: profile.address,
      district: profile.district,
      avatar_url: profile.avatar_url,
      updated_at: new Date().toISOString(),
    };

    let { error } = await supabase.from('profiles').upsert(updates);

    if (error) {
      alert('আপডেট করতে সমস্যা হয়েছে: ' + error.message);
    } else {
      alert('প্রোফাইল সফলভাবে আপডেট হয়েছে!');
    }
    setSaving(false);
  }

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    let { error: uploadError } = await supabase.storage
      .from('application-documents')
      .upload(filePath, file);

    if (uploadError) {
      alert('ছবি আপলোড ব্যর্থ হয়েছে!');
      return;
    }

    const { data } = supabase.storage
      .from('application-documents')
      .getPublicUrl(filePath);

    setProfile({ ...profile, avatar_url: data.publicUrl });
  }

  if (loading) return <div className="p-8 text-center text-gray-600">তথ্য লোড হচ্ছে...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* হেডার ও কার্ড সেকশন */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-teal-700 to-emerald-600 h-32 relative"></div>
        <div className="px-6 pb-6 pt-0 relative flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-16 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="relative group">
              <img
                src={profile.avatar_url || '[https://via.placeholder.com/150](https://via.placeholder.com/150)'}
                alt="Profile Avatar"
                className="w-28 h-28 rounded-full border-4 border-white object-cover bg-white shadow-md"
              />
              <label className="absolute bottom-0 right-0 bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-full cursor-pointer shadow transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input type="file" onChange={handleAvatarUpload} accept="image/*" className="hidden" />
              </label>
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800">{profile.full_name || 'ইউজার নেম'}</h1>
              <p className="text-sm text-gray-500">{profile.email || 'ইমেইল তথ্য নেই'}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-800 bg-teal-100 rounded-full">
                  {profile.role || 'customer'}
                </span>
                <span className="px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full">
                  ● Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* প্রোফাইল ফর্ম */}
      <form onSubmit={updateProfile} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
        <h2 className="text-lg font-bold text-gray-800 border-b pb-3">ব্যক্তিগত ও কাজের তথ্য</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">পূর্ণ নাম</label>
            <input
              type="text"
              value={profile.full_name || ''}
              onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">মোবাইল নম্বর</label>
            <input
              type="text"
              value={profile.phone || ''}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">এলাকা / Territory</label>
            <input
              type="text"
              placeholder="যেমন: সৈয়দপুর, নীলফামারী"
              value={profile.territory || ''}
              onChange={(e) => setProfile({ ...profile, territory: e.target.value })}
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">এনআইডি (NID Number)</label>
            <input
              type="text"
              placeholder="1234567890"
              value={profile.nid_number || ''}
              onChange={(e) => setProfile({ ...profile, nid_number: e.target.value })}
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">জেলা</label>
            <input
              type="text"
              value={profile.district || ''}
              onChange={(e) => setProfile({ ...profile, district: e.target.value })}
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ঠিকানা</label>
            <input
              type="text"
              value={profile.address || ''}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-lg shadow-sm transition"
          >
            {saving ? 'সংরক্ষণ হচ্ছে...' : 'পরিবর্তন সংরক্ষণ করুন'}
          </button>
        </div>
      </form>
    </div>
  );
}
