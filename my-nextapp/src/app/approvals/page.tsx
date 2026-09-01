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
  Eye,
  Clock,
  Check,
  X,
  AlertCircle,
  UserCheck,
  FileCheck2
} from 'lucide-react';

interface PendingDocument {
  id: string;
  code: string;
  title: string;
  category: string;
  requester: string;
  department: string;
  date: string;
  urgency: 'high' | 'medium' | 'normal';
  fileSize: string;
}

export default function ApprovalsPage() {
  const [activeTab, setActiveTab] = useState('2-4'); // Active selector ສຳລັບ ເມນູ ລໍຖ້າອະນຸມັດ
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUrgency, setSelectedUrgency] = useState('all');

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

  // ຂໍ້ມູນຈຳລອງເອກະສານລໍຖ້າອະນຸມັດ
  const [pendingDocs, setPendingDocs] = useState<PendingDocument[]>([
    {
      id: '1',
      code: 'REQ-2026-089',
      title: 'ຂໍອະນຸມັດຈັດຊື້ອຸປະກອນ IT ປະຈຳໄຕມາດ 3',
      category: 'ສັນຍາ ແລະ ຂໍ້ຕົກລົງ',
      requester: 'ສົມຊາຍ ວົງສາ',
      department: 'ແຜນກ IT',
      date: '27/08/2026',
      urgency: 'high',
      fileSize: '3.5 MB',
    },
    {
      id: '2',
      code: 'REQ-2026-090',
      title: 'ບົດບັນທຶກຄວາມເຂົ້າໃຈ (MOU) ຮ່ວມກັບ Partner ຕ່າງປະເທດ',
      category: 'ເອກະສານຂາເຂົ້າ',
      requester: 'ມາລີ ດວງດີ',
      department: 'ແຜນກ ການຕ່າງປະເທດ',
      date: '26/08/2026',
      urgency: 'medium',
      fileSize: '5.1 MB',
    },
    {
      id: '3',
      code: 'REQ-2026-092',
      title: 'ຂໍອະນຸມັດງົບປະມານຈັດງານสัมມนาປະຈຳປີ',
      category: 'ເອກະສານຂາອອກ',
      requester: 'ຄຳພາ ພົມມະວົງ',
      department: 'ແຜນກ ການຕະຫຼາດ',
      date: '25/08/2026',
      urgency: 'normal',
      fileSize: '1.8 MB',
    },
  ]);

  // Handle ການອະນຸມັດ
  const handleApprove = (id: string, title: string) => {
    if (confirm(`ທ່ານຕ້ອງການ "ອະນຸມັດ" ເອກະສານ: ${title} ແທ້ບໍ?`)) {
      setPendingDocs(pendingDocs.filter((doc) => doc.id !== id));
      alert('ອະນຸມັດເອກະສານเรียບຮ້ອຍແລ້ວ!');
    }
  };

  // Handle ການປະຕິເສດ
  const handleReject = (id: string, title: string) => {
    const reason = prompt(`ລະບຸເຫດຜົນການປະຕິເສດເອກະສານ: ${title}`);
    if (reason !== null) {
      setPendingDocs(pendingDocs.filter((doc) => doc.id !== id));
      alert('ສົ່ງກັບ / ປະຕິເສດເອກະສານเรียບຮ້ອຍແລ້ວ!');
    }
  };

  // Filter ຂໍ້ມູນ
  const filteredDocs = pendingDocs.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.requester.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUrgency =
      selectedUrgency === 'all' || doc.urgency === selectedUrgency;
    return matchesSearch && matchesUrgency;
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
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-slate-300">Manager Mode</span>
          </div>
          <span className="text-xs font-semibold text-emerald-400">Online</span>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Document Approval Workflow Management</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 max-w-7xl w-full mx-auto space-y-8">
          
          {/* Header Title */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight">ລາຍການລໍຖ້າອະນຸມັດ</h1>
              </div>
              <p className="text-slate-400 text-sm">
                ກວດສອບ ແລະ ດຳເນີນການອະນຸມັດ ຫຼື ປະຕິເສດເອກະສານທີ່ສົ່ງເຂົ້າມາ
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
              <Clock className="w-4 h-4 text-amber-400 animate-spin" />
              <span className="text-sm font-semibold text-slate-300">
                ຄ້າງກວດສອບ: <span className="text-amber-400">{pendingDocs.length}</span> ລາຍການ
              </span>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ຄົ້ນຫາຊື່ເອກະສານ, ລະຫັດ ຫຼື ຜູ້ສົ່ງ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={selectedUrgency}
                onChange={(e) => setSelectedUrgency(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500 transition w-full sm:w-auto"
              >
                <option value="all">ຄວາມດ່ວນທັງໝົດ</option>
                <option value="high">ດ່ວນຫຼາຍ (High)</option>
                <option value="medium">ດ່ວນປານກາງ (Medium)</option>
                <option value="normal">ປົກກະຕິ (Normal)</option>
              </select>
            </div>
          </div>

          {/* Pending Approvals Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-950/60 text-slate-400 text-xs uppercase border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4 font-semibold">ເອກະສານ</th>
                    <th className="px-6 py-4 font-semibold">ຜູ້ສະເໜີ / ແຜນກ</th>
                    <th className="px-6 py-4 font-semibold">ຄວາມດ່ວນ</th>
                    <th className="px-6 py-4 font-semibold">ວັນທີສົ່ງ</th>
                    <th className="px-6 py-4 font-semibold text-center">ການດຳເນີນການ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredDocs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <FileCheck2 className="w-10 h-10 text-slate-600" />
                          <p>ບໍ່ມີເອກະສານທີ່ຕົກຄ້າງລໍຖ້າອະນຸມັດ</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredDocs.map((doc) => (
                      <tr key={doc.id} className="hover:bg-slate-800/40 transition">
                        {/* Title & Code */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-slate-800 text-indigo-400 rounded-xl border border-slate-700">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-100 hover:text-indigo-400 cursor-pointer transition">
                                {doc.title}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5 font-mono">
                                <span>{doc.code}</span>
                                <span>•</span>
                                <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-400">
                                  {doc.category}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Requester & Department */}
                        <td className="px-6 py-4">
                          <p className="font-medium text-slate-200">{doc.requester}</p>
                          <p className="text-xs text-slate-400">{doc.department}</p>
                        </td>

                        {/* Urgency Badge */}
                        <td className="px-6 py-4">
                          {doc.urgency === 'high' && (
                            <span className="inline-flex items-center gap-1 text-xs bg-rose-500/10 text-rose-400 px-2.5 py-1 rounded-full border border-rose-500/20 font-medium">
                              <AlertCircle className="w-3.5 h-3.5" /> ດ່ວນຫຼາຍ
                            </span>
                          )}
                          {doc.urgency === 'medium' && (
                            <span className="inline-flex items-center gap-1 text-xs bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-full border border-amber-500/20 font-medium">
                              <Clock className="w-3.5 h-3.5" /> ດ່ວນປານກາງ
                            </span>
                          )}
                          {doc.urgency === 'normal' && (
                            <span className="inline-flex items-center gap-1 text-xs bg-slate-800 text-slate-400 px-2.5 py-1 rounded-full border border-slate-700 font-medium">
                              ປົກກະຕິ
                            </span>
                          )}
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4 text-xs text-slate-400">{doc.date}</td>

                        {/* Action Buttons */}
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            {/* Preview */}
                            <button
                              className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition"
                              title="ເບິ່ງລາຍລະອຽດ"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {/* Approve Button */}
                            <button
                              onClick={() => handleApprove(doc.id, doc.title)}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition shadow-sm shadow-emerald-600/20"
                            >
                              <Check className="w-3.5 h-3.5" /> ອະນຸມັດ
                            </button>

                            {/* Reject Button */}
                            <button
                              onClick={() => handleReject(doc.id, doc.title)}
                              className="px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition border border-rose-500/30"
                            >
                              <X className="w-3.5 h-3.5" /> ປະຕິເສດ
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
          <span>Approval Workflow Module</span>
        </footer>
      </div>
    </div>
  );
}