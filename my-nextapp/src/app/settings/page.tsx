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
  User,
  Bell,
  Lock,
  Globe,
  Save,
  Check,
  KeyRound,
  Database
} from 'lucide-react';

export default function SettingsPage() {
  const [activeMenuTab, setActiveMenuTab] = useState('3-3'); // Active selector ສຳລັບ ເມນູ ການຕັ້ງຄ່າ
  const [activeSettingTab, setActiveSettingTab] = useState('profile'); // Tab ພາຍໃນໜ້າຕັ້ງຄ່າ
  const [isSaved, setIsSaved] = useState(false);

  // Profile Form State
  const [profile, setProfile] = useState({
    name: 'ສົມຊາຍ ວົງສາ',
    email: 'somchai.v@company.la',
    role: 'IT Administrator',
    department: 'ແຜນກ ເຕັກໂນໂລຊີຂໍ້ມູນຂ່າວສານ',
  });

  // Notification State
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    approvalAlerts: true,
    documentUpdates: false,
    weeklyReport: true,
  });

  // System Config State
  const [sysConfig, setSysConfig] = useState({
    maxFileSize: '25',
    allowedFormats: '.pdf, .docx, .xlsx, .png, .jpg',
    autoArchiveDays: '90',
  });

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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
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
            <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-slate-300">System Preferences</span>
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
            <span>Global System Configuration & Settings</span>
          </div>
          {isSaved && (
            <div className="flex items-center gap-2 text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-lg animate-in fade-in">
              <Check className="w-4 h-4" />
              <span>ບັນທຶກການຕັ້ງຄ່າສຳເລັດ!</span>
            </div>
          )}
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 max-w-5xl w-full mx-auto space-y-8">
          
          {/* Header Title */}
          <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
            <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
              <Settings className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">ການຕັ້ງຄ່າ</h1>
              <p className="text-slate-400 text-sm mt-0.5">
                ຈັດການຂໍ້ມູນສ່ວນຕົວ, ການແຈ້ງເຕືອນ, ຄວາມປອດໄພ ແລະ ຕັ້ງຄ່າລະບົບ
              </p>
            </div>
          </div>

          {/* Settings Sub-Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            {[
              { id: 'profile', label: 'ຂໍ້ມູນສ່ວນຕົວ', icon: User },
              { id: 'notifications', label: 'ການແຈ້ງເຕືອນ', icon: Bell },
              { id: 'security', label: 'ຄວາມປອດໄພ', icon: Lock },
              { id: 'system', label: 'ລະບົບເອກະສານ', icon: Database },
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeSettingTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSettingTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form Content */}
          <form onSubmit={handleSave} className="space-y-6">
            
            {/* TAB 1: PROFILE SETTINGS */}
            {activeSettingTab === 'profile' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <h2 className="text-lg font-bold text-slate-200 border-b border-slate-800 pb-3">
                  ຂໍ້ມູນຜູ້ໃຊ້ງານ
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      ຊື່ ແລະ ນາມສະກຸນ
                    </label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      ອີເມວ
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      ຕຳແໜ່ງ
                    </label>
                    <input
                      type="text"
                      value={profile.role}
                      disabled
                      className="w-full bg-slate-950/50 border border-slate-800/80 text-slate-500 text-sm rounded-xl px-4 py-2.5 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      ແຜນກ
                    </label>
                    <input
                      type="text"
                      value={profile.department}
                      disabled
                      className="w-full bg-slate-950/50 border border-slate-800/80 text-slate-500 text-sm rounded-xl px-4 py-2.5 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: NOTIFICATIONS SETTINGS */}
            {activeSettingTab === 'notifications' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <h2 className="text-lg font-bold text-slate-200 border-b border-slate-800 pb-3">
                  ການແຈ້ງເຕືອນ
                </h2>

                <div className="space-y-4">
                  {[
                    {
                      id: 'emailAlerts',
                      title: 'ແຈ້ງເຕືອນຜ່ານອີເມວ (Email Alerts)',
                      desc: 'ຮັບອີເມວເມື່ອມີການອະນຸມັດ ຫຼື ການເຄື່ອນໄຫວສຳຄັນ',
                    },
                    {
                      id: 'approvalAlerts',
                      title: 'ແຈ້ງເຕືອນເອກະສານລໍຖ້າອະນຸມັດ',
                      desc: 'ແຈ້ງເຕືອນທັນທີເມື່ອມີເອກະສານໃໝ່ສົ່ງເຂົ້າມາໃຫ້ອະນຸມັດ',
                    },
                    {
                      id: 'documentUpdates',
                      title: 'ແຈ້ງເຕືອນການແກ້ໄຂເອກະສານ',
                      desc: 'ແຈ້ງເຕືອນເມື່ອເອກະສານທີ່ທ່ານຕິດຕາມຖືກອັບເດດ',
                    },
                    {
                      id: 'weeklyReport',
                      title: 'ລາຍງານສະຫຼຸບປະຈຳອາທິດ',
                      desc: 'ຮັບສະຫຼຸບສະຖິຕິເອກະສານຜ່ານອີເມວທຸກໆ ວັນຈັນ',
                    },
                  ].map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800/80"
                    >
                      <div>
                        <p className="font-semibold text-sm text-slate-200">{item.title}</p>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications[item.id as keyof typeof notifications]}
                        onChange={(e) =>
                          setNotifications({
                            ...notifications,
                            [item.id]: e.target.checked,
                          })
                        }
                        className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: SECURITY SETTINGS */}
            {activeSettingTab === 'security' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <h2 className="text-lg font-bold text-slate-200 border-b border-slate-800 pb-3">
                  ປ່ຽນລະຫັດຜ່ານ
                </h2>

                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      ລະຫັດຜ່ານປັດຈຸບັນ
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      ລະຫັດຜ່ານໃໝ່
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      ຢືນຢັນລະຫັດຜ່ານໃໝ່
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: SYSTEM CONFIG */}
            {activeSettingTab === 'system' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <h2 className="text-lg font-bold text-slate-200 border-b border-slate-800 pb-3">
                  ຕັ້ງຄ່າລະບົບເອກະສານ (System Configuration)
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      ຂະໜາດໄຟລ໌ສູງສຸດ (MB)
                    </label>
                    <input
                      type="number"
                      value={sysConfig.maxFileSize}
                      onChange={(e) => setSysConfig({ ...sysConfig, maxFileSize: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      ຈຳນວນວັນຍ້າຍເຂົ້າຄັງເອກະສານອັດໂຕໂນມັດ (Days)
                    </label>
                    <input
                      type="number"
                      value={sysConfig.autoArchiveDays}
                      onChange={(e) => setSysConfig({ ...sysConfig, autoArchiveDays: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      ນາມສະກຸນໄຟລ໌ທີ່ອະນຸຍາດ (Allowed Extensions)
                    </label>
                    <input
                      type="text"
                      value={sysConfig.allowedFormats}
                      onChange={(e) => setSysConfig({ ...sysConfig, allowedFormats: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition shadow-lg shadow-indigo-600/25 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>ບັນທຶກການຕັ້ງຄ່າ</span>
              </button>
            </div>

          </form>

        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800 py-4 px-8 text-xs text-slate-500 flex justify-between items-center mt-auto">
          <span>© 2026 Project-W & MyNextApp. All rights reserved.</span>
          <span>System Settings Module</span>
        </footer>
      </div>
    </div>
  );
}