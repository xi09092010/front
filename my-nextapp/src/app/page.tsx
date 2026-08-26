// src/app/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      // 1. ສົ່ງ Request ໄປຫາ API Backend NestJS
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // ກວດເບິ່ງ Response Header ປ້ອງກັນ HTML Error
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('ບໍ່ສາມາດເຊື່ອມຕໍ່ Server ໄດ້ (Response ບໍ່ແມ່ນ JSON)');
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'ອີເມວ ຫຼື ລະຫັດຜ່ານ ບໍ່ຖືກຕ້ອງ!');
      }

      // 2. ຖ້າ Login ສຳເລັດ (ເກັບ Token ເຂົ້າ LocalStorage / Cookie)
      if (data.accessToken) {
        localStorage.setItem('token', data.accessToken);
      }

      console.log('Login success:', data);

      // 3. Redirect ໄປຫາໜ້າ /home ທັນທີ
      router.push('/home');

    } catch (err: any) {
      console.error('Login error:', err);
      setErrorMessage(err.message || 'ເກີດຂໍ້ຜິດພາດ ໃນການເຂົ້າສູ່ລະບົບ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            ກະລຸນາໃສ່ ອີເມວ ແລະ ລະຫັດຜ່ານ ເພື່ອເຂົ້າສູ່ລະບົບ
          </p>
        </div>

        {/* Display Error Message */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Gmail / Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-medium text-white transition duration-200 shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'ກຳລັງກວດສອບ...' : 'ເຂົ້າສູ່ລະບົບ (Login)'}
          </button>
        </form>

        {/* Link ໄປໜ້າ Register */}
        <div className="mt-6 text-center border-t border-slate-700/50 pt-4">
          <p className="text-xs text-slate-500 mb-2">ຍັງບໍ່ທັນມີບັນຊີຜູ້ໃຊ້ບໍ?</p>
          <button
            type="button"
            onClick={() => router.push('/register')}
            className="text-sm text-indigo-400 hover:underline"
          >
            ລົງທະບຽນເຂົ້າໃຊ້ງານ (Register) ➔
          </button>
        </div>

      </div>
    </div>
  );
}