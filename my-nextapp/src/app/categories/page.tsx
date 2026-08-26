'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Category {
  id: number;
  name: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const router = useRouter();

  // 1. ດຶງຂໍ້ມູນ Categories ພ້ອມ Auto Redirect
  const loadCategories = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`);
      const data = await res.json();
      setCategories(data);
      setLoading(false);

      // 🚀 ເມື່ອດາວໂຫຼດຂໍ້ມູນສຳເລັດ ໃຫ້ Redirect ໄປໜ້າ /home ທັນທີ
      router.push('/home');
    } catch (err) {
      console.error('Error fetching categories:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, [router]);

  // 2. ເພີ່ມ Category ໃໝ່
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    setBtnLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (res.ok) {
        setName('');
        loadCategories();
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setBtnLoading(false);
    }
  };

  // 3. ແກ້ໄຂ Category
  const handleUpdate = async (id: number) => {
    if (!editName) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editName }),
      });
      if (res.ok) {
        setEditingId(null);
        loadCategories();
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  // 4. ລົບ Category
  const handleDelete = async (id: number) => {
    if (!confirm('ທ່ານຕ້ອງການລົບໝວດໝູ່ເລື່ອງນີ້ແທ້ບໍ?')) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        loadCategories();
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Loading Screen ແບບດຽວກັບ UsersPage
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium text-gray-600">
          ກຳລັງດາວໂຫຼດຂໍ້ມູນ Categories ແລະ ກຳລັງພາໄປໜ້າ Home...
        </p>
      </div>
    );
  }

  // Backup redirect ຖ້າ loading ບໍ່ເຮັດວຽກ
 
  return (
    <div className="p-5 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📁 ຈັດການໝວດໝູ່ເອກະສານ (Categories)</h1>

      {/* Form ເພີ່ມ Category ໃຊ້ Tailwind CSS */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="ຊື່ Category ໃໝ່..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={btnLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {btnLoading ? 'ບັນທຶກ...' : 'ເພີ່ມ'}
        </button>
      </form>

      {/* ລາຍການ Categories ໃຊ້ Tailwind CSS */}
      <ul className="divide-y border-t border-b">
        {categories.map((cat) => (
          <li key={cat.id} className="py-3 flex justify-between items-center">
            {editingId === cat.id ? (
              <div className="flex gap-2 flex-1 mr-2">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-1 p-1 border rounded"
                />
                <button
                  onClick={() => handleUpdate(cat.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                >
                  ບັນທຶກ
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
                >
                  ຍົກເລີກ
                </button>
              </div>
            ) : (
              <>
                <span className="font-medium text-gray-800">{cat.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingId(cat.id);
                      setEditName(cat.name);
                    }}
                    className="bg-amber-500 text-white px-3 py-1 rounded text-sm hover:bg-amber-600"
                  >
                    ແກ້ໄຂ
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                  >
                    ລົບ
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}