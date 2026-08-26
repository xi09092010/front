'use client';

import { useState, useEffect } from 'react';
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
  //FileIncoming,
  //FileOutgoing,
  UploadCloud,
  Archive,
  Settings
} from 'lucide-react'; 

// Type Definitions
interface CategoryItem {
  id: string;
  name: string;
  count?: number;
}

interface MenuItem {
  id: string;
  title: string;
  href: string;
  icon: any;
  badge?: number;
}

interface MenuSection {
  groupTitle: string;
  items: MenuItem[];
}

export default function HomePage() {
  const [apiConnected, setApiConnected] = useState<boolean | null>(null);

  // 1. State ສຳລັບຈັດການ dynamic Categories
  const [categories, setCategories] = useState<CategoryItem[]>([
    { id: '1', name: 'ເອກະສານຂາເຂົ້າ', count: 24 },
    { id: '2', name: 'ເອກະສານຂາອອກ', count: 18 },
    { id: '3', name: 'ສັນຍາ ແລະ ຂໍ້ຕົກລົງ', count: 12 },
    { id: '4', name: 'ບົດບັນທຶກກອງປະຊຸມ', count: 5 },
  ]);

  // 2. ຈັດກຸ່ມ Sidebar Menu ເປັນ Group Sections
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
        //{ id: '2-2', title: 'ເອກະສານຂາເຂົ້າ', href: '/documents/inbox', icon: FileIncoming },
       // { id: '2-3', title: 'ເອກະສານຂາອອກ', href: '/documents/outbox', icon: FileOutgoing },
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

  const [activeTab, setActiveTab] = useState<string>('1-1');

  // ເຊື່ອມຕໍ່ NestJS API Health Check
  useEffect(() => {
    fetch('http://localhost:3000/api/health')
      .then((res) => setApiConnected(res.ok))
      .catch(() => setApiConnected(false));
  }, []);

  // --- ຟັງຊັນຈັດການ Categories (ເພີ່ມ, ແກ້ໄຂ, ລົບ) ---
  const handleAddCategory = () => {
    const categoryName = prompt('ປ້ອນຊື່ໝວດໝູ່ເອກະສານໃໝ່:');
    if (!categoryName || !categoryName.trim()) return;

    const newCategory: CategoryItem = {
      id: Date.now().toString(),
      name: categoryName.trim(),
      count: 0,
    };
    setCategories([...categories, newCategory]);
  };

  const handleEditCategory = (id: string, currentName: string) => {
    const updatedName = prompt('ແກ້ໄຂຊື່ໝວດໝູ່:', currentName);
    if (!updatedName || !updatedName.trim()) return;

    setCategories(
      categories.map((cat) =>
        cat.id === id ? { ...cat, name: updatedName.trim() } : cat
      )
    );
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm('ທ່ານຕ້ອງການລົບໝວດໝູ່ນີ້ແທ້ບໍ?')) {
      setCategories(categories.filter((cat) => cat.id !== id));
    }
  };

  // --- ຟັງຊັນຈັດການ Menu Sidebar ---
  const handleEditMenu = (sectionIdx: number, itemId: string, currentTitle: string) => {
    const newTitle = prompt('ແກ້ໄຂຊື່ເມນູ:', currentTitle);
    if (!newTitle) return;

    const updatedSections = [...menuSections];
    updatedSections[sectionIdx].items = updatedSections[sectionIdx].items.map((item) =>
      item.id === itemId ? { ...item, title: newTitle } : item
    );
    setMenuSections(updatedSections);
  };

  const handleDeleteMenu = (sectionIdx: number, itemId: string) => {
    if (confirm('ທ່ານຕ້ອງການລົບເມນູນີ້ແທ້ບໍ?')) {
      const updatedSections = [...menuSections];
      updatedSections[sectionIdx].items = updatedSections[sectionIdx].items.filter(
        (item) => item.id !== itemId
      );
      setMenuSections(updatedSections);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      
      {/* 1. SIDEBAR (ແຖບດ້ານຊ້າຍ) */}
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

          {/* Sidebar Navigation ຈັດກຸ່ມ */}
          <nav className="space-y-6">
            {menuSections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-1">
                {/* ຊື່ກຸ່ມເມນູ */}
                <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  {section.groupTitle}
                </h3>

                {/* ລາຍການເມນູໃນກຸ່ມ */}
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <div 
                      key={item.id} 
                      className={`group relative flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition ${
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

                      {item.badge && (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${isActive ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-amber-400'}`}>
                          {item.badge}
                        </span>
                      )}

                      {/* ປຸ່ມ Edit / Delete ຈະສະແດງເມື່ອ Hover */}
                      <div className="hidden group-hover:flex items-center gap-1 ml-2 bg-slate-900/90 rounded px-1 border border-slate-700/50">
                        <button onClick={() => handleEditMenu(sIdx, item.id, item.title)} className="p-1 hover:text-indigo-400 text-slate-400">
                          <Edit3 className="w-3 h-3" />
                        </button>
                        <button onClick={() => handleDeleteMenu(sIdx, item.id)} className="p-1 hover:text-rose-400 text-slate-400">
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

        {/* API Indicator */}
        <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl mt-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-slate-500" /> API Status
            </span>
            {apiConnected === null && <span className="text-amber-400">ກວດສອບ...</span>}
            {apiConnected === true && (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Online
              </span>
            )}
            {apiConnected === false && <span className="text-rose-400 font-semibold">Offline</span>}
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-h-screen">
        
        {/* Top Navbar */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Secure Enterprise Document Management System</span>
          </div>

          <button 
            onClick={handleAddCategory}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition shadow-md shadow-indigo-600/20 flex items-center gap-2"
          >
            <FolderPlus className="w-4 h-4" /> ເພີ່ມໝວດໝູ່ໃໝ່
          </button>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-8 max-w-7xl w-full mx-auto space-y-8">
          
          <div className="space-y-1">
            <h2 className="text-3xl font-extrabold tracking-tight">
              ຈັດການໝວດໝູ່ເອກະສານ
            </h2>
            <p className="text-slate-400 text-sm">
              ເພີ່ມ, ແກ້ໄຂ, ຫຼື ລົບ ໝວດໝູ່ເອກະສານຕ່າງໆໃນລະບົບ.
            </p>
          </div>

          {/* Quick Category Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div key={cat.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20">
                    <Folder className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">{cat.name}</h4>
                    <p className="text-xs text-slate-500">{cat.count ?? 0} ເອກະສານ</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Table / List ຈັດການ Category */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-200">ລາຍການໝວດໝູ່ທັງໝົດ ({categories.length})</h3>
              <button 
                onClick={handleAddCategory}
                className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-indigo-400 font-medium rounded-lg transition border border-slate-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> ເພີ່ມໝວດໝູ່
              </button>
            </div>

            <div className="divide-y divide-slate-800">
              {categories.length === 0 ? (
                <div className="py-8 text-center text-slate-500 text-sm">
                  ບໍ່ມີໝວດໝູ່ເທື່ອ, ກະລຸນາກົດເພີ່ມໝວດໝູ່.
                </div>
              ) : (
                categories.map((cat, idx) => (
                  <div key={cat.id} className="py-3.5 flex items-center justify-between text-sm hover:bg-slate-800/30 px-3 rounded-lg transition">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-slate-500 w-6">0{idx + 1}</span>
                      <Folder className="w-4 h-4 text-indigo-400" />
                      <span className="font-medium text-slate-200">{cat.name}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
                        {cat.count ?? 0} ໄຟລ໌
                      </span>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleEditCategory(cat.id, cat.name)} 
                          className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-indigo-400 rounded-md transition"
                          title="ແກ້ໄຂ"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteCategory(cat.id)} 
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

        <footer className="border-t border-slate-800 py-4 px-8 text-xs text-slate-500 flex justify-between items-center">
          <span>© 2026 Project-W & MyNextApp. All rights reserved.</span>
          <span>DMS Categories Module</span>
        </footer>

      </div>
    </div>
  );
}