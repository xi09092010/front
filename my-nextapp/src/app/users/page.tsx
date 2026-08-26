'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // 🔴 Import useRouter ເພື່ອໃຊ້ Redirect

interface User {
  id: string | number;
  name?: string;
  email: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // 🔴 ເອີ້ນໃຊ້ router

  useEffect(() => {
    // ດຶງຂໍ້ມູນຈາກ API Backend NestJS
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`)
      .then((res) => res.json())
      .then((data: User[]) => {
        setUsers(data);
        setLoading(false);

        // 🚀 ເມື່ອ ດາວໂຫຼດຂໍ້ມູນສຳເລັດແລ້ວ ໃຫ້ Redirect ໄປຫາໜ້າ /home ທັນທີ
        router.push('/home'); 
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium text-gray-600">
          ກຳລັງດາວໂຫຼດຂໍ້ມູນ ແລະ ກຳລັງພາໄປໜ້າ Home...
        </p>
      </div>
    );
  }

setTimeout(() => {
  router.push('/home'); // ເພື່ອໃຫ້ Redirect ໄປຫາ /home ຫາກຜູ້ໃຊ້ບໍ່ໄດ້ຖືກ Redirect ໃນ useEffect
},1500);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">ລາຍຊື່ Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="border-b py-2">
            {user.name || user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}