'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Folder,
  CheckCircle,
  Users,
  LayoutDashboard,
  BarChart2,
  FileInput,
  FileOutput,
  UploadCloud,
  Archive,
  Settings,
  Trash2,
  ShieldCheck,
  Search,
  Filter,
  Download,
  RotateCcw,
  Eye,
  Calendar,
  Lock,
  FileCheck
} from 'lucide-react';

interface ArchivedDocument {
  id: string;
  code: string;
  title: string;
  category: string;
  archivedDate: string;
  year: string;
  fileSize: string;
  fileType: string;
}

export default function ArchivePage() {
  const [activeMenuTab, setActiveMenuTab] = useState('2-7'); // Active selector ສຳລັບ ເມນູ ຄັງເອກະສານ
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // ຂໍ້ມູນຈຳລອງ Side Menu (ຮັກສາໄວ້ຄົບຖ້ວນ)
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
        { id: '2-4', title: 'ລໍຖ້າອະນຸມັດ', href: '/approvals', icon: CheckCircle, badge: 3 },
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

  // ຂໍ້ມູນຈຳລອງເອກະສານໃນຄັງ ARCHIVE
  const [archivedDocs, setArchivedDocs] = useState<ArchivedDocument[]>([
    {
      id: '1',
      code: 'ARC-2024-001',
      title: 'ລາຍງານການເງິນປະຈຳປີ 2024',
      category: 'ໃບສະເໜີງົບປະມານ',
      archivedDate: '15/01/2025',
      year: '2024',
      fileSize: '12.4 MB',
      fileType: 'PDF',
    },
    {
      id: '2',
      code: 'ARC-2024-018',
      title: 'ສັນຍາການເຊົ່າອາຄານສຳນັກງານໃຫຍ່ (ໝົດອາຍຸ)',
      category: 'ສັນຍາ ແລະ ຂໍ້ຕົກລົງ',
      archivedDate: '10/02/2025',
      year: '2024',
      fileSize: '8.1 MB',
      fileType: 'PDF',
    },
    {
      id: '3',
      code: 'ARC-2023-104',
      title: 'ບົດບັນທຶກຄວາມເຂົ້າໃຈໂຄງການພັດທະນາ IT ປີ 2023',
      category: 'ເອກະສານຂາເຂົ້າ',
      archivedDate: '05/01/2024',
      year: '2023',
      fileSize: '4.5 MB',
      fileType: 'DOCX',
    },
    {
      id: '4',
      code: 'ARC-2023-221',
      title: 'ແຜນຍຸດທະສາດການບໍລິຫານຊັບພະຍາກອນມະນຸດ 2023',
      category: 'ເອກະສານຂາອອກ',
      archivedDate: '20/12/2023',
      year: '2023',
      fileSize: '6.2 MB',
      fileType: 'PDF',
    },
  ]);

  // Restore Handler
  const handleRestore = (id: string, title: string) => {
    if (confirm(`ທ່ານຕ້ອງການຟື້ນຟູເອກະສານ "${title}" ກັບຄືນສູ່ລະບົບຫຼັກແທ້ບໍ?`)) {
      setArchivedDocs(archivedDocs.filter((doc) => doc.id !== id));
      alert('ຟື້ນຟູເອກະສານສຳເລັດ!');
    }
  };

  // Filter Search
  const filteredDocs = archivedDocs.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesYear = selectedYear === 'all' || doc.year === selectedYear;
    const matchesCategory =
      selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesYear && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      
      {/* 1. SIDEBAR MENU (ຮັກສາໄວ້ຄົບຖ້ວນ) */}
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
                  const isActive = activeMenuTab === item.id;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setActiveMenuTab(item.id)}
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
                        <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
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

        {/* User Status Bottom */}
        <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-slate-300">Archive Vault</span>
          </div>
          <span className="text-xs font-semibold text-amber-400">Read-Only</span>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <Lock className="w-4 h-4 text-amber-400" />
            <span>Cold Storage Archive Vault (Long-term Retention)</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 max-w-7xl w-full mx-auto space-y-8">
          
          {/* Header Title */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                <Archive className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">ຄັງເອກະສານ (Archive)</h1>
                <p className="text-slate-400 text-sm mt-0.5">
                  ຄັງຈັດເກັບເອກະສານເກົ່າໄລຍະຍາວ ທີ່ຜ່ານການອະນຸມັດ ແລະ ຈັດເກັບຢ່າງປອດໄພ
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 text-xs text-slate-400">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              <span>ເອກະສານທັງໝົດໃນຄັງ: <strong className="text-slate-200">{archivedDocs.length}</strong> ລາຍການ</span>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ຄົ້ນຫາຊື່ ຫຼື ລະຫັດເອກະສານ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Year Filter */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Calendar className="w-4 h-4 text-slate-400" />
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500 transition w-full sm:w-auto"
                >
                  <option value="all">ທຸກໆ ປີ</option>
                  <option value="2024">ປີ 2024</option>
                  <option value="2023">ປີ 2023</option>
                </select>
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500 transition w-full sm:w-auto"
                >
                  <option value="all">ທຸກໝວດໝູ່</option>
                  <option value="ເອກະສານຂາເຂົ້າ">ເອກະສານຂາເຂົ້າ</option>
                  <option value="ເອກະສານຂາອອກ">ເອກະສານຂາອອກ</option>
                  <option value="ສັນຍາ ແລະ ຂໍ້ຕົກລົງ">ສັນຍາ ແລະ ຂໍ້ຕົກລົງ</option>
                  <option value="ໃບສະເໜີງົບປະມານ">ໃບສະເໜີງົບປະມານ</option>
                </select>
              </div>
            </div>
          </div>

          {/* Archive Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-950/60 text-slate-400 text-xs uppercase border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4 font-semibold">ເອກະສານ</th>
                    <th className="px-6 py-4 font-semibold">ໝວດໝູ່</th>
                    <th className="px-6 py-4 font-semibold">ວັນທີຍ້າຍເຂົ້າຄັງ</th>
                    <th className="px-6 py-4 font-semibold">ຂະໜາດໄຟລ໌</th>
                    <th className="px-6 py-4 font-semibold text-center">ການດຳເນີນການ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredDocs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                        ບໍ່ພົບຂໍ້ມູນເອກະສານໃນຄັງ
                      </td>
                    </tr>
                  ) : (
                    filteredDocs.map((doc) => (
                      <tr key={doc.id} className="hover:bg-slate-800/40 transition">
                        {/* Title & Code */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-slate-800 text-amber-400 rounded-xl border border-slate-700">
                              <Archive className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-100 hover:text-amber-400 cursor-pointer transition">
                                {doc.title}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5 font-mono">
                                <span>{doc.code}</span>
                                <span>•</span>
                                <span className="text-amber-400 font-semibold">{doc.year}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-6 py-4">
                          <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs font-medium border border-slate-700">
                            {doc.category}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4 text-xs text-slate-400">{doc.archivedDate}</td>

                        {/* File Size & Type */}
                        <td className="px-6 py-4 text-xs font-mono text-slate-400">
                          {doc.fileSize} ({doc.fileType})
                        </td>

                        {/* Action Buttons */}
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            {/* Preview */}
                            <button
                              className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition"
                              title="ເບິ່ງເອກະສານ"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {/* Download */}
                            <button
                              className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition"
                              title="ດາວໂຫລດ"
                            >
                              <Download className="w-4 h-4" />
                            </button>

                            {/* Restore Button */}
                            <button
                              onClick={() => handleRestore(doc.id, doc.title)}
                              className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-slate-950 rounded-lg text-xs font-semibold flex items-center gap-1 transition border border-amber-500/20"
                              title="ຟື້ນຟູກັບຄືນສູ່ລະບົບ"
                            >
                              <RotateCcw className="w-3.5 h-3.5" /> ຟື້ນຟູ
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800 py-4 px-8 text-xs text-slate-500 flex justify-between items-center mt-auto">
          <span>© 2026 Project-W & MyNextApp. All rights reserved.</span>
          <span>Archive Module</span>
        </footer>
      </div>
    </div>
  );
}