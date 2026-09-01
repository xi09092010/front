'use client';

import { useState, useEffect, ComponentType } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Folder, 
  CheckCircle, 
  Server, 
  Plus, 
  Edit3, 
  Trash2, 
  ShieldCheck, 
  Users, 
  LayoutDashboard,
  FolderPlus,
  BarChart2,
  UploadCloud,
  Archive,
  Settings,
  X,
  FileOutput,
  FileInput,
} from 'lucide-react'; 

// --- Interfaces & Types ---
interface CategoryItem {
  id: string;
  name: string;
  count: number;
}

interface MenuItem {
  id: string;
  title: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  badge?: number;
}

interface MenuSection {
  groupTitle: string;
  items: MenuItem[];
}

interface ModalState {
  isOpen: boolean;
  type: 'ADD_CAT' | 'EDIT_CAT' | 'DELETE_CAT' | 'EDIT_MENU' | 'DELETE_MENU' | null;
  targetId?: string;
  sectionIdx?: number;
  initialValue?: string;
}

export default function HomePage() {
  const [apiConnected, setApiConnected] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<string>('2-6');

  // 1. Dynamic Categories State
  const [categories, setCategories] = useState<CategoryItem[]>([
    { id: '1', name: 'ເອກະສານຂາເຂົ້າ', count: 24 },
    { id: '2', name: 'ເອກະສານຂາອອກ', count: 18 },
    { id: '3', name: 'ສັນຍາ ແລະ ຂໍ້ຕົກລົງ', count: 12 },
    { id: '4', name: 'ບົດບັນທຶກກອງປະຊຸມ', count: 5 },
  ]);

  // 2. Sidebar Menu Sections State
  const [menuSections, setMenuSections] = useState<MenuSection[]>([
    {
      groupTitle: 'ເມນູຫຼັກ',
      items: [
        { id: '1-1', title: 'ໜ້າຫຼັກ', href: '/', icon: LayoutDashboard },
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
  ]);

  // 3. Modal Dialog State
  const [modal, setModal] = useState<ModalState>({ isOpen: false, type: null });
  const [inputValue, setInputValue] = useState<string>('');

  // NestJS API Health Check
  useEffect(() => {
    const controller = new AbortController();
    fetch('http://localhost:3000/api/health', { signal: controller.signal })
      .then((res) => setApiConnected(res.ok))
      .catch(() => setApiConnected(false));

    return () => controller.abort();
  }, []);

  // --- Handlers ສຳລັບຈັດການ Modal/Actions ---
  const openModal = (
    type: ModalState['type'], 
    targetId?: string, 
    sectionIdx?: number, 
    initialValue: string = ''
  ) => {
    setInputValue(initialValue);
    setModal({ isOpen: true, type, targetId, sectionIdx, initialValue });
  };

  const closeModal = () => {
    setModal({ isOpen: false, type: null });
    setInputValue('');
  };

  const handleModalSubmit = () => {
    const trimmed = inputValue.trim();

    if (modal.type === 'ADD_CAT') {
      if (!trimmed) return;
      setCategories((prev) => [
        ...prev,
        { id: Date.now().toString(), name: trimmed, count: 0 },
      ]);
    } else if (modal.type === 'EDIT_CAT' && modal.targetId) {
      if (!trimmed) return;
      setCategories((prev) =>
        prev.map((cat) => (cat.id === modal.targetId ? { ...cat, name: trimmed } : cat))
      );
    } else if (modal.type === 'DELETE_CAT' && modal.targetId) {
      setCategories((prev) => prev.filter((cat) => cat.id !== modal.targetId));
    } else if (modal.type === 'EDIT_MENU' && modal.sectionIdx !== undefined && modal.targetId) {
      if (!trimmed) return;
      setMenuSections((prev) => {
        const next = [...prev];
        next[modal.sectionIdx!] = {
          ...next[modal.sectionIdx!],
          items: next[modal.sectionIdx!].items.map((item) =>
            item.id === modal.targetId ? { ...item, title: trimmed } : item
          ),
        };
        return next;
      });
    } else if (modal.type === 'DELETE_MENU' && modal.sectionIdx !== undefined && modal.targetId) {
      setMenuSections((prev) => {
        const next = [...prev];
        next[modal.sectionIdx!] = {
          ...next[modal.sectionIdx!],
          items: next[modal.sectionIdx!].items.filter((item) => item.id !== modal.targetId),
        };
        return next;
      });
    }

    closeModal();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans antialiased">
      
      {/* 1. SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-4 flex-shrink-0">
        <div className="overflow-y-auto pr-1">
          {/* Logo Header */}
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

          {/* Navigation Sections */}
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
                    <div 
                      key={item.id} 
                      className={`group relative flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                        isActive 
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                          : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                      }`}
                    >
                      <Link 
                        href={item.href} 
                        onClick={() => setActiveTab(item.id)}
                        className="flex items-center gap-3 flex-1 overflow-hidden"
                      >
                        <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
                        <span className="truncate">{item.title}</span>
                      </Link>

                      {item.badge !== undefined && (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${isActive ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-amber-400 border border-amber-500/20'}`}>
                          {item.badge}
                        </span>
                      )}

                      {/* Action Buttons on Hover */}
                      <div className="hidden group-hover:flex items-center gap-1 ml-2 bg-slate-900/90 rounded px-1 border border-slate-700/50">
                        <button 
                          onClick={() => openModal('EDIT_MENU', item.id, sIdx, item.title)} 
                          className="p-1 hover:text-indigo-400 text-slate-400 transition"
                          title="ແກ້ໄຂເມນູ"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                        <button 
                          onClick={() => openModal('DELETE_MENU', item.id, sIdx)} 
                          className="p-1 hover:text-rose-400 text-slate-400 transition"
                          title="ລົບເມນູ"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* API Status Indicator */}
        <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl mt-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-slate-500" /> API Status
            </span>
            {apiConnected === null && <span className="text-amber-400 animate-pulse">ກວດສອບ...</span>}
            {apiConnected === true && (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Online
              </span>
            )}
            {apiConnected === false && <span className="text-rose-400 font-semibold">Offline</span>}
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-h-screen">
        
        {/* Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Secure Enterprise Document Management System</span>
          </div>

          <button 
            onClick={() => openModal('ADD_CAT')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition shadow-md shadow-indigo-600/20 flex items-center gap-2"
          >
            <FolderPlus className="w-4 h-4" /> ເພີ່ມໝວດໝູ່ໃໝ່
          </button>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-8 max-w-7xl w-full mx-auto space-y-8">
          
          <div className="space-y-1">
            <h2 className="text-3xl font-extrabold tracking-tight text-white">
              ຈັດການໝວດໝູ່ເອກະສານ
            </h2>
            <p className="text-slate-400 text-sm">
              ເພີ່ມ, ແກ້ໄຂ, ຫຼື ລົບ ໝວດໝູ່ເອກະສານຕ່າງໆໃນລະບົບຢ່າງເປັນລະບຽບ.
            </p>
          </div>

          {/* Category Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div key={cat.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between shadow-sm hover:border-slate-700 transition">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20">
                    <Folder className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">{cat.name}</h4>
                    <p className="text-xs text-slate-500">{cat.count} ເອກະສານ</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Table / List Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-slate-200">ລາຍການໝວດໝູ່ທັງໝົດ ({categories.length})</h3>
              <button 
                onClick={() => openModal('ADD_CAT')}
                className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-indigo-400 hover:text-indigo-300 font-medium rounded-lg transition border border-slate-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> ເພີ່ມໝວດໝູ່
              </button>
            </div>

            <div className="divide-y divide-slate-800/60">
              {categories.length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-sm">
                  ບໍ່ມີໝວດໝູ່ເທື່ອ, ກະລຸນາກົດເພີ່ມໝວດໝູ່.
                </div>
              ) : (
                categories.map((cat, idx) => (
                  <div key={cat.id} className="py-3.5 flex items-center justify-between text-sm hover:bg-slate-800/40 px-3 rounded-lg transition">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-slate-500 w-6">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <Folder className="w-4 h-4 text-indigo-400" />
                      <span className="font-medium text-slate-200">{cat.name}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-xs text-slate-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
                        {cat.count} ໄຟລ໌
                      </span>
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => openModal('EDIT_CAT', cat.id, undefined, cat.name)} 
                          className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-indigo-400 rounded-md transition"
                          title="ແກ້ໄຂ"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => openModal('DELETE_CAT', cat.id)} 
                          className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-rose-400 rounded-md transition"
                          title="ລົບ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800 py-4 px-8 text-xs text-slate-500 flex justify-between items-center">
          <span>© 2026 Project-W & MyNextApp. All rights reserved.</span>
          <span>DMS Categories Module</span>
        </footer>

      </div>

      {/* 3. REUSABLE MODAL DIALOG */}
      {modal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-100">
                {modal.type === 'ADD_CAT' && 'ເພີ່ມໝວດໝູ່ໃໝ່'}
                {modal.type === 'EDIT_CAT' && 'ແກ້ໄຂຊື່ໝວດໝູ່'}
                {modal.type === 'DELETE_CAT' && 'ຢືນຢັນການລົບໝວດໝູ່'}
                {modal.type === 'EDIT_MENU' && 'ແກ້ໄຂຊື່ເມນູ'}
                {modal.type === 'DELETE_MENU' && 'ຢືນຢັນການລົບເມນູ'}
              </h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-white transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Input form or Warning Message */}
            {modal.type?.startsWith('DELETE') ? (
              <p className="text-sm text-slate-300">
                ທ່ານແນ່ໃຈບໍວ່າຕ້ອງການລົບລາຍການນີ້? ການກະທຳນີ້ບໍ່ສາມາດຍົກເລີກໄດ້.
              </p>
            ) : (
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400">ຊື່ລາຍການ</label>
                <input 
                  type="text" 
                  autoFocus
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleModalSubmit()}
                  placeholder="ປ້ອນຊື່..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button 
                onClick={closeModal}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
              >
                ຍົກເລີກ
              </button>
              <button 
                onClick={handleModalSubmit}
                className={`px-4 py-2 text-xs font-medium text-white rounded-lg transition ${
                  modal.type?.startsWith('DELETE')
                    ? 'bg-rose-600 hover:bg-rose-500'
                    : 'bg-indigo-600 hover:bg-indigo-500'
                }`}
              >
                {modal.type?.startsWith('DELETE') ? 'ລົບ' : 'ບັນທຶກ'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}