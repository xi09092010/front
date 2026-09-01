'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'ເກີດຂໍ້ຜິດພາດໃນການລົງທະບຽນ');
      }

      alert('ລົງທະບຽນສຳເລັດ!');
      router.push('/login');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700 relative">
        
        {/* 🚀 ປຸ່ມຍ້ອນກັບໄປໜ້າ Login */}
        <button
          type="button"
          onClick={() => router.push('/login')}
          className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white mb-6 transition group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>ກັບໄປໜ້າ Login</span>
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            ລົງທະບຽນເຂົ້າໃຊ້ງານ
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            ກະລຸນາປ້ອນຂໍ້ມູນດ້ານລຸ່ມເພື່ອສ້າງບັນຊີໃໝ່
          </p>
        </div>

        {/* Display Error Message */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              ຊື່ ແລະ ນາມສະກຸນ
            </label>
            <input
              type="text"
              name="name"
              placeholder="ປ້ອນຊື່ຂອງທ່ານ..."
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              ອີເມວ (Email)
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@mail.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              ລະຫັດຜ່ານ (Password)
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-medium text-white transition duration-200 shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'ກຳລັງບັນທຶກ...' : 'ລົງທະບຽນ'}
          </button>
        </form>

        {/* Link Footer */}
        <div className="mt-6 text-center border-t border-slate-700/50 pt-4">
          <p className="text-xs text-slate-400 mb-2">ມີບັນຊີຜູ້ໃຊ້ຢູ່ແລ້ວບໍ?</p>
          <button
            type="button"
            onClick={() => router.push('/login')}
            className="text-sm text-indigo-400 hover:underline"
          >
            ເຂົ້າສູ່ລະບົບ (Login) 
          </button>
        </div>

      </div>
    </div>
  );
}