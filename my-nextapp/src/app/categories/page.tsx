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
  Plus,
  FolderPlus,
  Edit,
  X,
  Layers,
  ArrowRight
} from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  description: string;
  count: number;
  color: string;
  updatedAt: string;
}

export default function CategoriesPage() {
  const [activeTab, setActiveTab] = useState('2-6'); // Active selector ສຳລັບ ເມນູ ໝວດໝູ່ເອກະສານ
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states ສຳລັບເພີ່ມ/ແກ້ໄຂໝວດໝູ່
  const [catName, setCatName] = useState('');
  const [catDesc, setCatDesc] = useState('');

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

  // ຂໍ້ມູນຈຳລອງໝວດໝູ່ເອກະສານ
  const [categories, setCategories] = useState<CategoryItem[]>([
    {
      id: '1',
      name: 'ເອກະສານຂາເຂົ້າ',
      description: 'ບັນທຶກ, ຫນັງສືທາງການ ແລະ ເອກະສານຮັບຈາກພາຍນອກ',
      count: 142,
      color: 'from-blue-500 to-cyan-500',
      updatedAt: '28/08/2026',
    },
    {
      id: '2',
      name: 'ເອກະສານຂາອອກ',
      description: 'ຫນັງສືແຈ້ງການ, ຄຳສັ່ງ, ແລະ ຂໍ້ຕົກລົງສົ່ງອອກພາຍນອກ',
      count: 98,
      color: 'from-indigo-500 to-purple-500',
      updatedAt: '27/08/2026',
    },
    {
      id: '3',
      name: 'ສັນຍາ ແລະ ຂໍ້ຕົກລົງ',
      description: 'ສັນຍາການວ່າຈ້າງ, MOU, ແລະ ຂໍ້ຕົກລົງທາງທຸລະກິດ',
      count: 45,
      color: 'from-amber-500 to-orange-500',
      updatedAt: '25/08/2026',
    },
    {
      id: '4',
      name: 'ໃບສະເໜີງົບປະມານ',
      description: 'ເອກະສານຂໍອຸມັດງົບປະມານ, ໃບເບີກຈ່າຍ ແລະ ໃບເສັດ',
      count: 67,
      color: 'from-emerald-500 to-teal-500',
      updatedAt: '20/08/2026',
    },
    {
      id: '5',
      name: 'ບົດບັນທຶກກອງປະຊຸມ',
      description: 'ລາຍງານການປະຊຸມປະຈຳອາທິດ, ປະຈຳເດືອນ ແລະ ວາລະພິເສດ',
      count: 31,
      color: 'from-rose-500 to-pink-500',
      updatedAt: '18/08/2026',
    },
    {
      id: '6',
      name: 'ລະບຽບ ແລະ ນະໂຍບາຍ',
      description: 'ຂໍ້ບັງຄັບອົງກອນ, ນະໂຍບາຍບໍລິຫານ ແລະ Standard Operating Procedures',
      count: 19,
      color: 'from-violet-500 to-fuchsia-500',
      updatedAt: '10/08/2026',
    },
  ]);

  // Add Category Handler
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;

    const newCategory: CategoryItem = {
      id: Date.now().toString(),
      name: catName,
      description: catDesc || 'ບໍ່ມີລາຍລະອຽດ',
      count: 0,
      color: 'from-blue-500 to-indigo-500',
      updatedAt: '28/08/2026',
    };

    setCategories([...categories, newCategory]);
    setCatName('');
    setCatDesc('');
    setIsModalOpen(false);
  };

  // Delete Handler
  const handleDeleteCategory = (id: string, name: string) => {
    if (confirm(`ທ່ານຕ້ອງການລຶບໝວດໝູ່ "${name}" ແທ້ບໍ?`)) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  // Filter Search
  const filteredCategories = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase())
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
            <span className="text-xs font-medium text-slate-300">Category Mgmt</span>
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
            <span>Document Taxonomy & Structure Management</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 max-w-7xl w-full mx-auto space-y-8">
          
          {/* Header Title & Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                <Folder className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">ໝວດໝູ່ເອກະສານ</h1>
                <p className="text-slate-400 text-sm mt-0.5">
                  ຈັດການ ແລະ ແຍກປະເພດເອກະສານເພື່ອຄວາມສະດວກໃນການຄົ້ນຫາ
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>ເພີ່ມໝວດໝູ່ໃໝ່</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ຄົ້ນຫາໝວດໝູ່ເອກະສານ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline-block">
              ໝວດໝູ່ທັງໝົດ: <strong className="text-slate-200">{filteredCategories.length}</strong> ລາຍການ
            </span>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((cat) => (
              <div
                key={cat.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition flex flex-col justify-between group shadow-lg hover:shadow-indigo-500/5 relative overflow-hidden"
              >
                {/* Decorative Gradient Line Top */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cat.color}`}
                />

                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-slate-950 text-indigo-400 rounded-xl border border-slate-800 group-hover:scale-105 transition-transform">
                        <Folder className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-100 text-lg group-hover:text-indigo-400 transition">
                          {cat.name}
                        </h3>
                        <span className="text-xs text-slate-500">ອັບເດດ: {cat.updatedAt}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                {/* Bottom Stats & Actions */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{cat.count} ເອກະສານ</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDeleteCategory(cat.id, cat.name)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition"
                      title="ລຶບ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <Link
                      href="/documents"
                      className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition flex items-center gap-1 text-xs"
                      title="ເບິ່ງເອກະສານ"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </main>

        {/* Modal: ເພີ່ມໝວດໝູ່ໃໝ່ */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-6 relative animate-in fade-in zoom-in duration-200">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <FolderPlus className="w-5 h-5 text-indigo-400" />
                  <h2 className="text-lg font-bold text-slate-100">ເພີ່ມໝວດໝູ່ໃໝ່</h2>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddCategory} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    ຊື່ໝວດໝູ່ <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ປ້ອນຊື່ໝວດໝູ່..."
                    value={catName}
                    onChange={(e) => setCatName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    ລາຍລະອຽດ
                  </label>
                  <textarea
                    rows={3}
                    placeholder="ປ້ອນລາຍລະອຽດ ຫຼື ຄຳອະທິບາຍ..."
                    value={catDesc}
                    onChange={(e) => setCatDesc(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-400 hover:bg-slate-800 rounded-xl transition"
                  >
                    ຍົກເລີກ
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition shadow-lg shadow-indigo-600/25"
                  >
                    ບັນທຶກໝວດໝູ່
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="border-t border-slate-800 py-4 px-8 text-xs text-slate-500 flex justify-between items-center mt-auto">
          <span>© 2026 Project-W & MyNextApp. All rights reserved.</span>
          <span>Category Module</span>
        </footer>
      </div>
    </div>
  );
}