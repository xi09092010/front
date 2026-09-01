'use client';

import { useState, useRef } from 'react';
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
  X,
  FileCheck2,
  AlertCircle,
  Upload,
  UserCheck
} from 'lucide-react';

interface UploadedFile {
  file: File;
  id: string;
  name: string;
  size: string;
}

export default function UploadPage() {
  const [activeTab, setActiveTab] = useState('2-5'); // Active selector ສຳລັບ ເມນູ ອັບໂຫລດເອກະສານ
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Form states
  const [docTitle, setDocTitle] = useState('');
  const [category, setCategory] = useState('ເອກະສານຂາເຂົ້າ');
  const [urgency, setUrgency] = useState('normal');
  const [approver, setApprover] = useState('1');
  const [description, setDescription] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

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

  // Helper แปลงขนาดไฟล์
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Drag & Drop Handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      addFiles(Array.from(e.target.files));
    }
  };

  const addFiles = (files: File[]) => {
    const newFiles: UploadedFile[] = files.map((f) => ({
      file: f,
      id: Math.random().toString(36).substring(2, 9),
      name: f.name,
      size: formatBytes(f.size),
    }));
    setSelectedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setSelectedFiles(selectedFiles.filter((f) => f.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      alert('ກະລຸນາເລືອກໄຟລ໌ເອກະສານຢ່າງນ້ອຍ 1 ໄຟລ໌');
      return;
    }

    setUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setUploading(false);
          setUploadProgress(0);
          alert('ອັບໂຫລດເອກະສານ ແລະ ສົ່ງຂໍອະນຸມັດສຳເລັດ!');
          setSelectedFiles([]);
          setDocTitle('');
          setDescription('');
        }, 500);
      }
    }, 250);
  };

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
            <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-slate-300">System Ready</span>
          </div>
          <span className="text-xs font-semibold text-indigo-400">Online</span>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Secure Encrypted File Upload Channel</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 max-w-5xl w-full mx-auto space-y-8">
          
          {/* Header Title */}
          <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
            <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
              <UploadCloud className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">ອັບໂຫລດເອກະສານ</h1>
              <p className="text-slate-400 text-sm mt-0.5">
                ເພີ່ມເອກະສານໃໝ່ເຂົ້າสู่ລະບົບ ພ້ອມສົ່ງຕໍ່ໃຫ້ຜູ້ທີ່ມີອຳນາດອະນຸມັດ
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Drag and Drop Zone */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition flex flex-col items-center justify-center gap-4 ${
                dragActive
                  ? 'border-indigo-500 bg-indigo-500/10'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                accept=".pdf,.docx,.xlsx,.png,.jpg"
              />

              <div className="p-4 bg-indigo-600/20 text-indigo-400 rounded-full border border-indigo-500/30 shadow-inner">
                <Upload className="w-8 h-8" />
              </div>

              <div>
                <p className="text-base font-semibold text-slate-200">
                  ລາກໄຟລ໌ມາ ວາງໄວ້ທີ່ນີ້ ຫຼື <span className="text-indigo-400 underline">ເລືອກໄຟລ໌</span>
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  ຮອງຮັບໄຟລ໌ PDF, DOCX, XLSX, PNG, JPG (ຂະໜາດບໍ່ເກີນ 25MB/ໄຟລ໌)
                </p>
              </div>
            </div>

            {/* Selected Files List */}
            {selectedFiles.length > 0 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-emerald-400" />
                  ໄຟລ໌ທີ່ເລືອກ ({selectedFiles.length} ໄຟລ໌)
                </h3>
                <div className="divide-y divide-slate-800/60">
                  {selectedFiles.map((file) => (
                    <div key={file.id} className="py-2.5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-indigo-400" />
                        <div>
                          <p className="text-sm font-medium text-slate-200">{file.name}</p>
                          <p className="text-xs text-slate-500">{file.size}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(file.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Document Details Form */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <h2 className="text-lg font-bold text-slate-200 border-b border-slate-800 pb-3">
                ຂໍ້ມູນເອກະສານ
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    ຊື່ເອກະສານ / ຫົວຂໍ້ <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ປ້ອນຊື່ເອກະສານ ຫຼື ຫົວຂໍ້ສະເໜີ..."
                    value={docTitle}
                    onChange={(e) => setDocTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    ໝວດໝູ່ເອກະສານ
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition"
                  >
                    <option value="ເອກະສານຂາເຂົ້າ">ເອກະສານຂາເຂົ້າ</option>
                    <option value="ເອກະສານຂາອອກ">ເອກະສານຂາອອກ</option>
                    <option value="ສັນຍາ ແລະ ຂໍ້ຕົກລົງ">ສັນຍາ ແລະ ຂໍ້ຕົກລົງ</option>
                    <option value="ບົດບັນທຶກກອງປະຊຸມ">ບົດບັນທຶກກອງປະຊຸມ</option>
                    <option value="ໃບສະເໜີງົບປະມານ">ໃບສະເໜີງົບປະມານ</option>
                  </select>
                </div>

                {/* Urgency */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    ລະດັບຄວາມດ່ວນ
                  </label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition"
                  >
                    <option value="normal">ປົກກະຕິ (Normal)</option>
                    <option value="medium">ດ່ວນປານກາງ (Medium)</option>
                    <option value="high">ດ່ວນຫຼາຍ (High Priority)</option>
                  </select>
                </div>

                {/* Approver Select */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-indigo-400" />
                    ຜູ້ອະນຸມັດ (Approver) <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={approver}
                    onChange={(e) => setApprover(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition"
                  >
                    <option value="1">ທ່ານ ສົມພອນ ວິໄລສັກ (Director of IT)</option>
                    <option value="2">ທ່ານ ດາວວີ ແກ້ວປະເສີດ (General Manager)</option>
                    <option value="3">ທ່ານ ນາງ ສຸພາພອນ ຈັນທະວົງ (Finance Head)</option>
                  </select>
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    ລາຍລະອຽດເພີ່ມເຕີມ / ໝາຍເຫດ
                  </label>
                  <textarea
                    rows={4}
                    placeholder="ປ້ອນລາຍລະອຽດ ຫຼື ໝາຍເຫດເພີ່ມເຕີມຖ້າມີ..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>
              </div>
            </div>

            {/* Upload Progress Bar */}
            {uploading && (
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">ກຳລັງອັບໂຫລດ ແລະ ສົ່ງຂໍ້ມູນ...</span>
                  <span className="text-indigo-400">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex items-center justify-end gap-4">
              <Link
                href="/documents"
                className="px-6 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white text-sm font-medium transition"
              >
                ຍົກເລີກ
              </Link>
              <button
                type="submit"
                disabled={uploading}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition shadow-lg shadow-indigo-600/25 flex items-center gap-2"
              >
                <UploadCloud className="w-4 h-4" />
                {uploading ? 'ກຳລັງອັບໂຫລດ...' : 'ອັບໂຫລດ & ສົ່ງອະນຸມັດ'}
              </button>
            </div>

          </form>

        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800 py-4 px-8 text-xs text-slate-500 flex justify-between items-center mt-auto">
          <span>© 2026 Project-W & MyNextApp. All rights reserved.</span>
          <span>Upload Module</span>
        </footer>
      </div>
    </div>
  );
}