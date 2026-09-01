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
  RotateCcw,
  AlertTriangle,
  Search,
  Clock,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface TrashedDocument {
  id: string;
  code: string;
  title: string;
  deletedBy: string;
  deletedDate: string;
  daysRemaining: number;
  fileSize: string;
}

export default function TrashPage() {
  const [activeMenuTab, setActiveMenuTab] = useState('3-2'); // Active selector ສຳລັບ ເມນູ ຖັງຂີ້ເຫຍື້ອ
  const [searchQuery, setSearchQuery] = useState('');

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

  // ຂໍ້ມູນຈຳລອງເອກະສານໃນຖັງຂີ້ເຫຍື້ອ
  const [trashedDocs, setTrashedDocs] = useState<TrashedDocument[]>([
    {
      id: '1',
      code: 'DOC-2026-089',
      title: 'ຮ່າງຂໍ້ສະເໜີໂຄງການພັດທະນາແອັບຯ (Draft V1)',
      deletedBy: 'ສົມຊາຍ ວົງສາ',
      deletedDate: '24/08/2026',
      daysRemaining: 26,
      fileSize: '3.2 MB',
    },
    {
      id: '2',
      code: 'DOC-2026-045',
      title: 'ໃບສະເໜີຊື້ອຸປະກອນໄອທີທີ່ຍົກເລີກ',
      deletedBy: 'ວິໄລພອນ ພັນທະວົງ',
      deletedDate: '10/08/2026',
      daysRemaining: 12,
      fileSize: '1.8 MB',
    },
    {
      id: '3',
      code: 'DOC-2026-012',
      title: 'ລາຍງານການປະຊຸມເກົ່າ ປະຈຳເດືອນມັງກອນ 2026',
      deletedBy: 'ສົມຊາຍ ວົງສາ',
      deletedDate: '01/08/2026',
      daysRemaining: 3,
      fileSize: '5.4 MB',
    },
  ]);

  // Handlers
  const handleRestore = (id: string, title: string) => {
    if (confirm(`ທ່ານຕ້ອງການຟື້ນຟູເອກະສານ "${title}" ກັບຄືນສູ່ລະບົບແທ້ບໍ?`)) {
      setTrashedDocs(trashedDocs.filter((doc) => doc.id !== id));
      alert('ຟື້ນຟູເອກະສານສຳເລັດ!');
    }
  };

  const handleDeletePermanent = (id: string, title: string) => {
    if (confirm(`ເຕືອນ: ທ່ານຕ້ອງການລົບເອກະສານ "${title}" ຖາວອນແທ້ບໍ? ຂໍ້ມູນນີ້ບໍ່ສາມາດຟື້ນຟູໄດ້ອີກ!`)) {
      setTrashedDocs(trashedDocs.filter((doc) => doc.id !== id));
    }
  };

  const handleEmptyTrash = () => {
    if (confirm('ເຕືອນ: ທ່ານຕ້ອງການລົບເອກະສານທັງໝົດໃນຖັງຂີ້ເຫຍື້ອຖາວອນແທ້ບໍ?')) {
      setTrashedDocs([]);
    }
  };

  // Filter Search
  const filteredDocs = trashedDocs.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        {/* System Status Bottom */}
        <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-slate-300">Trash Retention</span>
          </div>
          <span className="text-xs font-semibold text-rose-400">30 Days Auto</span>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Data Recovery & Temporary Storage Management</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 max-w-7xl w-full mx-auto space-y-8">
          
          {/* Header Title & Empty Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20">
                <Trash2 className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">ຖັງຂີ້ເຫຍື້ອ (Trash)</h1>
                <p className="text-slate-400 text-sm mt-0.5">
                  ເອກະສານທີ່ຖືກລົບຈະຖືກເກັບໄວ້ຢູ່ທີ່ນີ້ເປັນເວລາ 30 ວັນ ກ່ອນທີ່ຈະຖືກລົບຖາວອນໂດຍອັດໂຕໂນມັດ
                </p>
              </div>
            </div>

            {trashedDocs.length > 0 && (
              <button
                onClick={handleEmptyTrash}
                className="px-4 py-2 bg-rose-600/10 hover:bg-rose-600 border border-rose-500/30 text-rose-400 hover:text-white rounded-xl text-xs font-semibold transition flex items-center gap-2 shadow-lg shadow-rose-600/10"
              >
                <Trash2 className="w-4 h-4" />
                <span>ລ້າງຖັງຂີ້ເຫຍື້ອທັງໝົດ</span>
              </button>
            )}
          </div>

          {/* Info Banner */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-center gap-3 text-amber-300 text-xs">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-400" />
            <span>
              <strong>ຂໍ້ຄວນລະວັງ:</strong> ເອກະສານທີ່ຢູ່ໃນຖັງຂີ້ເຫຍື້ອກາຍ 30 ວັນ ຈະຖືກລົບອອກຈາກລະບົບຢ່າງຖາວອນໂດຍອັດໂຕໂນມັດ ແລະ ບໍ່ສາມາດຟື້ນຟູໄດ້ອີກ.
            </span>
          </div>

          {/* Search Bar */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
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

            <div className="text-xs text-slate-400 font-medium hidden sm:block">
              ຈຳນວນເອກະສານໃນຖັງ: <strong className="text-slate-200">{filteredDocs.length}</strong> ລາຍການ
            </div>
          </div>

          {/* Trash Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-950/60 text-slate-400 text-xs uppercase border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4 font-semibold">ເອກະສານ</th>
                    <th className="px-6 py-4 font-semibold">ຜູ້ລົບ</th>
                    <th className="px-6 py-4 font-semibold">ວັນທີລົບ</th>
                    <th className="px-6 py-4 font-semibold">ເວລາເຫຼືອ</th>
                    <th className="px-6 py-4 font-semibold text-center">ການດຳເນີນການ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredDocs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                        ບໍ່ມີເອກະສານໃນຖັງຂີ້ເຫຍື້ອ
                      </td>
                    </tr>
                  ) : (
                    filteredDocs.map((doc) => (
                      <tr key={doc.id} className="hover:bg-slate-800/40 transition">
                        {/* Title & Code */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-slate-800 text-slate-400 rounded-xl border border-slate-700">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-200 line-through opacity-80">
                                {doc.title}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5 font-mono">
                                <span>{doc.code}</span>
                                <span>•</span>
                                <span>{doc.fileSize}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Deleted By */}
                        <td className="px-6 py-4 text-xs text-slate-300">{doc.deletedBy}</td>

                        {/* Deleted Date */}
                        <td className="px-6 py-4 text-xs text-slate-400">{doc.deletedDate}</td>

                        {/* Days Remaining */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5">
                            <Clock className={`w-3.5 h-3.5 ${doc.daysRemaining <= 5 ? 'text-rose-400' : 'text-amber-400'}`} />
                            <span
                              className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                                doc.daysRemaining <= 5
                                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                  : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                              }`}
                            >
                              ເຫຼືອ {doc.daysRemaining} ວັນ
                            </span>
                          </div>
                        </td>

                        {/* Action Buttons */}
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            {/* Restore Button */}
                            <button
                              onClick={() => handleRestore(doc.id, doc.title)}
                              className="px-3 py-1.5 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition border border-indigo-500/20"
                              title="ຟື້ນຟູເອກະສານ"
                            >
                              <RotateCcw className="w-3.5 h-3.5" /> ຟື້ນຟູ
                            </button>

                            {/* Permanent Delete Button */}
                            <button
                              onClick={() => handleDeletePermanent(doc.id, doc.title)}
                              className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition border border-rose-500/20"
                              title="ລົບຖາວອນ"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> ລົບຖາວອນ
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
          <span>Trash Module</span>
        </footer>
      </div>
    </div>
  );
}