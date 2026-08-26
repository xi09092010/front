'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
      router.push('/login'); // 🚀 Redirect ໄປໜ້າ Home ເມື່ອລົງທະບຽນສຳເລັດ
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          📝 ລົງທະບຽນເຂົ້າໃຊ້ງານ
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ຊື່ ແລະ ນາມສະກຸນ
            </label>
            <input
              type="text"
              name="name"
              placeholder="ປ້ອນຊື່ຂອງທ່ານ..."
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ອີເມວ (Email)
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@mail.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ລະຫັດຜ່ານ (Password)
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {loading ? 'ກຳລັງບັນທຶກ...' : 'ລົງທະບຽນ'}
          </button>
        </form>

        {/* ລິ້ນຍ້ອນກັບໄປໜ້າ Login ຖ້າມີບັນຊີຢູ່ແລ້ວ */}
        <div className="mt-6 text-center border-t border-slate-700/50 pt-4">
          <p className="text-xs text-slate-400 mb-2">ມີບັນຊີຜູ້ໃຊ້ຢູ່ແລ້ວບໍ?</p>
          <button
            type="button"
            onClick={() => router.push('/login')}
            className="text-sm text-indigo-400 hover:underline"
          >
            ← ກັບໄປໜ້າ Login
          </button>
        </div>
        
      </div>
    </div>
  );
}