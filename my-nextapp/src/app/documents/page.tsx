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
  Edit3,
  Plus,
  Eye,
  FileCheck,
  Clock,
  AlertCircle,
  FolderOpen
} from 'lucide-react';

interface DocumentItem {
  id: string;
  code: string;
  title: string;
  category: string;
  author: string;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
  size: string;
}

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState('2-1'); // Active selector ສຳລັບ ເອກະສານທັງໝົດ
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // ຂໍ້ມູນຈຳລອງ Side Menu (ຮັກສາໄວ້ຄືກັບໜ້າອື່ນໆ)
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

  // ຂໍ້ມູນຈຳລອງເອກະສານ
  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: '1',
      code: 'DOC-2026-001',
      title: 'ໜັງສືສະເໜີຂໍອະນຸມັດງົບປະມານປະຈຳປີ 2026',
      category: 'ເອກະສານຂາເຂົ້າ',
      author: 'ສົມຊາຍ ວົງສາ',
      date: '25/08/2026',
      status: 'approved',
      size: '2.4 MB',
    },
    {
      id: '2',
      code: 'DOC-2026-002',
      title: 'ສັນຍາວ່າຈ້າງພັດທະນາລະບົບ Enterprise DMS',
      category: 'ສັນຍາ ແລະ ຂໍ້ຕົກລົງ',
      author: 'ມາລີ ດວງດີ',
      date: '24/08/2026',
      status: 'pending',
      size: '4.1 MB',
    },
    {
      id: '3',
      code: 'DOC-2026-003',
      title: 'ບົດບັນທຶກກອງປະຊຸມສະພາບໍລິຫານ ຄັ້ງທີ 2',
      category: 'ບົດບັນທຶກກອງປະຊຸມ',
      author: 'ຄຳພາ ພົມມະວົງ',
      date: '20/08/2026',
      status: 'approved',
      size: '1.2 MB',
    },
    {
      id: '4',
      code: 'DOC-2026-004',
      title: 'ແຈ້ງການເລື່ອງການຢຸດພັກຊົ່ວຄາວປະຈຳເດືອນ',
      category: 'ເອກະສານຂາອອກ',
      author: 'ອານຸສອນ ແກ້ວມະນີ',
      date: '18/08/2026',
      status: 'rejected',
      size: '850 KB',
    },
  ]);

  // ຄິດໄລ່ສະຖິຕິ
  const totalCount = documents.length;
  const approvedCount = documents.filter((d) => d.status === 'approved').length;
  const pendingCount = documents.filter((d) => d.status === 'pending').length;
  const rejectedCount = documents.filter((d) => d.status === 'rejected').length;

  // Filter ຂໍ້ມູນ
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id: string) => {
    if (confirm('ທ່ານຕ້ອງການລົບເອກະສານນີ້ແທ້ບໍ?')) {
      setDocuments(documents.filter((d) => d.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      
      {/* 1. SIDEBAR METU (ຮັກສາໄວ້ຕາມຕ້ອງການ) */}
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

        {/* User Status Bottom */}
        <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-slate-300">PI Status</span>
          </div>
          <span className="text-xs font-semibold text-rose-400">Offline</span>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Secure Enterprise Document Management System</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 max-w-7xl w-full mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <FolderOpen className="w-7 h-7 text-indigo-400" />
                <h1 className="text-3xl font-extrabold tracking-tight">ເອກະສານທັງໝົດ</h1>
              </div>
              <p className="text-slate-400 text-sm">
                ຈັດການ, ຄົ້ນຫາ ແລະ ຕິດຕາມສະຖານະເອກະສານທັງໝົດໃນລະບົບ
              </p>
            </div>

            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition shadow-md shadow-indigo-600/20 flex items-center gap-2">
              <Plus className="w-4 h-4" /> ເພີ່ມເອກະສານໃໝ່
            </button>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-md">
              <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">ເອກະສານທັງໝົດ</p>
                <h3 className="text-2xl font-bold text-white mt-1">{totalCount} ໄຟລ໌</h3>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-md">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">ອະນຸມັດແລ້ວ</p>
                <h3 className="text-2xl font-bold text-white mt-1">{approvedCount} ໄຟລ໌</h3>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-md">
              <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">ລໍຖ້າອະນຸມັດ</p>
                <h3 className="text-2xl font-bold text-white mt-1">{pendingCount} ໄຟລ໌</h3>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-md">
              <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">ປະຕິເສດ</p>
                <h3 className="text-2xl font-bold text-white mt-1">{rejectedCount} ໄຟລ໌</h3>
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ຄົ້ນຫາຊື່ເອກະສານ ຫຼື ລະຫັດ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500 transition w-full sm:w-auto"
              >
                <option value="all">ໝວດໝູ່ທັງໝົດ</option>
                <option value="ເອກະສານຂາເຂົ້າ">ເອກະສານຂາເຂົ້າ</option>
                <option value="ເອກະສານຂາອອກ">ເອກະສານຂາອອກ</option>
                <option value="ສັນຍາ ແລະ ຂໍ້ຕົກລົງ">ສັນຍາ ແລະ ຂໍ້ຕົກລົງ</option>
                <option value="ບົດບັນທຶກກອງປະຊຸມ">ບົດບັນທຶກກອງປະຊຸມ</option>
              </select>
            </div>
          </div>

          {/* Document Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-950/60 text-slate-400 text-xs uppercase border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4 font-semibold">ລະຫັດ & ຊື່ເອກະສານ</th>
                    <th className="px-6 py-4 font-semibold">ໝວດໝູ່</th>
                    <th className="px-6 py-4 font-semibold">ຜູ້ເພີ່ມ/ເຈົ້າຂອງ</th>
                    <th className="px-6 py-4 font-semibold">ວັນທີ</th>
                    <th className="px-6 py-4 font-semibold">ສະຖານະ</th>
                    <th className="px-6 py-4 font-semibold text-right">ຈັດການ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredDocuments.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                        ບໍ່ພົບເອກະສານທີ່ຕົງກັບການຄົ້ນຫາ
                      </td>
                    </tr>
                  ) : (
                    filteredDocuments.map((doc) => (
                      <tr key={doc.id} className="hover:bg-slate-800/40 transition">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-100 hover:text-indigo-400 cursor-pointer transition">
                                {doc.title}
                              </p>
                              <span className="text-xs font-mono text-slate-500">
                                {doc.code} • {doc.size}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">
                            {doc.category}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-slate-300">{doc.author}</td>
                        <td className="px-6 py-4 text-slate-400 text-xs">{doc.date}</td>

                        <td className="px-6 py-4">
                          {doc.status === 'approved' && (
                            <span className="inline-flex items-center gap-1 text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20">
                              <FileCheck className="w-3.5 h-3.5" /> ອະນຸມັດແລ້ວ
                            </span>
                          )}
                          {doc.status === 'pending' && (
                            <span className="inline-flex items-center gap-1 text-xs bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-full border border-amber-500/20">
                              <Clock className="w-3.5 h-3.5" /> ລໍຖ້າອະນຸມັດ
                            </span>
                          )}
                          {doc.status === 'rejected' && (
                            <span className="inline-flex items-center gap-1 text-xs bg-rose-500/10 text-rose-400 px-2.5 py-1 rounded-full border border-rose-500/20">
                              <AlertCircle className="w-3.5 h-3.5" /> ປະຕິເສດ
                            </span>
                          )}
                        </td>

                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition" title="ເບິ່ງຕົວຢ່າງ">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition" title="ດາວໂຫລດ">
                              <Download className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition" title="ແກ້ໄຂ">
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(doc.id)} className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition" title="ລົບ">
                              <Trash2 className="w-4 h-4" />
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
        <footer className="border-t border-slate-800 py-4 px-8 text-xs text-slate-500 flex justify-between items-center">
          <span>© 2026 Project-W & MyNextApp. All rights reserved.</span>
          <span>DMS Documents Module</span>
        </footer>
      </div>
    </div>
  );
}