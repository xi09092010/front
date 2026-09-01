'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import {
  FileText,
  Folder,
  CheckCircle,
  Users,
  LayoutDashboard,
  BarChart2,
  //FileIncoming,
  //FileOutgoing,
  UploadCloud,
  Archive,
  Settings,
  Trash2,
  ShieldCheck,
  TrendingUp,
  PieChart as PieIcon,
  FileOutput,
  FileInput
} from 'lucide-react';

// 📊 ຂໍ້ມູນຈຳລອງ: ສະຖິຕິເອກະສານຕາມໝວດໝູ່ (ຄິດໄລ່ເປັນ % ຟຣີ)
const categoryData = [
  { name: 'ເອກະສານຂາເຂົ້າ', count: 24, color: '#6366f1' }, // Indigo
  { name: 'ເອກະສານຂາອອກ', count: 18, color: '#3b82f6' }, // Blue
  { name: 'ສັນຍາ ແລະ ຂໍ້ຕົກລົງ', count: 12, color: '#10b981' }, // Emerald
  { name: 'ບົດບັນທຶກກອງປະຊຸມ', count: 5, color: '#f59e0b' }, // Amber
];

// 📊 ຂໍ້ມູນຈຳລອງ: ແນວໂນ້ມເອກະສານປະຈຳເດືອນ
const monthlyData = [
  { month: 'ມັງກອນ', incoming: 12, outgoing: 8 },
  { month: 'ກຸມພາ', incoming: 19, outgoing: 12 },
  { month: 'ມີນາ', incoming: 15, outgoing: 10 },
  { month: 'ເມສາ', incoming: 22, outgoing: 16 },
  { month: 'ພຶດສະພາ', incoming: 28, outgoing: 20 },
  { month: 'ມິຖຸນາ', incoming: 24, outgoing: 18 },
];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('1-2');

  // ຄິດໄລ່ຈຳນວນເອກະສານທັງໝົດ
  const totalDocuments = categoryData.reduce((acc, item) => acc + item.count, 0);

  // ເມນູ Sidebar ດຽວກັນກັບໜ້າ Dashboard
  const menuSections = [
    {
      groupTitle: 'ເມນູຫຼັກ',
      items: [
        { id: '1-1', title: 'ໜ້າຫຼັກ', href: '/home', icon: LayoutDashboard },
        { id: '1-2', title: 'ລາຍງານ & ສະຖິຕິ', href: '/reports', icon: BarChart2 },
      ],
    },
    {
      groupTitle: 'ຈັດການເອກະສານ',
      items: [
       { id: '2-1', title: 'ເອກະສານທັງໝົດ', href: '/documents', icon: FileText },
        { id: '2-2', title: 'ເອກະສານຂາເຂົ້າ', href: '/documents/inbox', icon: FileInput },
        { id: '2-3', title: 'ເອກະສານຂາອອກ', href: '/documents/outbox', icon: FileOutput },
        { id: '2-4', title: 'ລໍຖ້າອະນຸມັດ', href: '/approvals', icon: CheckCircle, badge: 5 },
        { id: '2-5', title: 'ອັບໂຫລດເອກະສານ', href: '/upload', icon: UploadCloud },
        { id: '2-6', title: 'ໝວດໝູ່ເອກະສານ', href: '/categories', icon: Folder },
        { id: '2-7', title: 'ຄັງເອກະສານ', href: '/archive', icon: Archive },
      ],
    },
    {
      groupTitle: 'ລະບົບ & ການຕັ້ງຄ່າ',
      items: [
        { id: '3-1', title: 'ຈັດການຜູ້ໃຊ້ງານ', href: '/users', icon: Users },
        { id: '3-2', title: 'ຖັງຂີ້ເຫຍື້ອ', href: '/trash', icon: Trash2 },
        { id: '3-3', title: 'ການຕັ້ງຄ່າ', href: '/settings', icon: Settings },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* 1. SIDEBAR */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-4 flex-shrink-0">
        <div className="overflow-y-auto pr-1">
          <div className="flex items-center gap-3 px-3 py-4 border-b border-slate-800 mb-4">
            <div className="p-2 bg-indigo-600/20 rounded-lg border border-indigo-500/30 text-indigo-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                DMS Portal
              </h1>
              <p className="text-xs text-slate-500">v1.0.0 Enterprise</p>
            </div>
          </div>

          <nav className="space-y-6">
            {menuSections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-1">
                <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  {section.groupTitle}
                </h3>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setActiveTab(item.id)}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                          : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </div>
                      {item.badge && (
                        <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-slate-800 text-amber-400">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Secure Enterprise Document Management System</span>
          </div>
        </header>

        <main className="flex-1 p-8 max-w-7xl w-full mx-auto space-y-8">
          <div className="space-y-1">
            <h2 className="text-3xl font-extrabold tracking-tight">
              ລາຍງານ & ສະຖິຕິເອກະສານ
            </h2>
            <p className="text-slate-400 text-sm">
              ພາບລວມສະຖິຕິ ແລະ ສັດສ່ວນເອກະສານໃນລະບົບຄິດໄລ່ເປັນເປີເຊັນ.
            </p>
          </div>

          {/* GRID SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* 📈 1. ຕາຕະລາງກຣາຟເປີເຊັນ (Donut/Pie Chart) */}
            <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <PieIcon className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-lg font-bold text-slate-200">
                    ສັດສ່ວນໝວດໝູ່ (% Percent)
                  </h3>
                </div>

                {/* Donut Chart Canvas */}
                <div className="h-64 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="count"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0f172a',
                          borderColor: '#334155',
                          borderRadius: '8px',
                          color: '#fff',
                        }}
                        formatter={(value: any) => [
                          `${value} ໄຟລ໌ (${((value / totalDocuments) * 100).toFixed(1)}%)`,
                          'ຈຳນວນ',
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  {/* Total Center Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-bold text-white">{totalDocuments}</span>
                    <span className="text-xs text-slate-400">ເອກະສານທັງໝົດ</span>
                  </div>
                </div>
              </div>

              {/* Legend Summary Box */}
              <div className="space-y-3 mt-4 pt-4 border-t border-slate-800">
                {categoryData.map((item, idx) => {
                  const percent = ((item.count / totalDocuments) * 100).toFixed(1);
                  return (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-slate-300">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400">{item.count} ໄຟລ໌</span>
                        <span className="font-semibold text-indigo-400 w-12 text-right">
                          {percent}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 📊 2. ກຣາຟແທ່ງ ສະຖິຕິລາຍເດືອນ (Bar Chart) */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-lg font-bold text-slate-200">
                      ສະຖິຕິເອກະສານ ຂາເຂົ້າ - ຂາອອກ
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                    6 ເດືອນຍ້ອນຫຼັງ
                  </span>
                </div>

                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="month" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0f172a',
                          borderColor: '#334155',
                          borderRadius: '8px',
                          color: '#fff',
                        }}
                      />
                      <Legend />
                      <Bar dataKey="incoming" name="ເອກະສານຂາເຂົ້າ" fill="#6366f1" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="outgoing" name="ເອກະສານຂາອອກ" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Banner Suggestion Footer */}
              <div className="mt-6 p-4 bg-indigo-950/40 border border-indigo-800/40 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-indigo-200">
                    💡 ໝວດໝູ່ທີ່ມີເອກະສານຫຼາຍທີ່ສຸດ
                  </h4>
                  <p className="text-xs text-slate-400">
                    ເອກະສານຂາເຂົ້າ ກວມເອົາ <b>{((24 / totalDocuments) * 100).toFixed(1)}%</b> ຂອງເອກະສານທັງໝົດໃນລະບົບ.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </main>

        <footer className="border-t border-slate-800 py-4 px-8 text-xs text-slate-500 flex justify-between items-center">
          <span>© 2026 Project-W & MyNextApp. All rights reserved.</span>
          <span>DMS Reports Module</span>
        </footer>
      </div>
    </div>
  );
}