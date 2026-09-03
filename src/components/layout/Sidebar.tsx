import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare,
  BookOpen,
  Trophy,
  Calendar,
  FolderDown,
  HelpCircle,
  Users,
  Tag,
  BarChart3,
  Shield,
  ChevronsUpDown,
  Check,
  Plus,
  Compass,
  Flame,
  Sparkles
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    communities,
    activeCommunityId,
    setActiveCommunityId,
    activeCommunity,
    activeTab,
    setActiveTab,
    activeRole,
    currentUser,
    inspectedUser,
    setInspectedUser,
    setIsCreateCommunityOpen,
    setCheckoutCommunity
  } = useApp();

  const [isCommunityDropdownOpen, setIsCommunityDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isCreator = activeRole === 'CREATOR';
  const isAdmin = activeRole === 'ADMIN';

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsCommunityDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navSections = [
    {
      title: 'Cộng Đồng',
      items: [
        { id: 'feed', label: 'Bảng tin (Feed)', icon: MessageSquare },
        { id: 'classroom', label: 'Khóa học (Classroom)', icon: BookOpen },
        { id: 'challenges', label: 'Thử thách 30 ngày', icon: Trophy, badge: 'HOT' },
        { id: 'events', label: 'Lịch & sự kiện (Calendar)', icon: Calendar },
        { id: 'resources', label: 'Thư viện tài nguyên', icon: FolderDown },
        { id: 'qa', label: 'Hỏi đáp kỹ thuật (Q&A)', icon: HelpCircle },
        { id: 'members', label: 'Thành viên & Xếp hạng', icon: Users },
      ]
    },
    ...(isCreator ? [{
      title: 'Creator Studio',
      items: [
        { id: 'dashboard', label: 'Analytics & Doanh thu', icon: BarChart3 },
        { id: 'coupons', label: 'Quản lý Coupon', icon: Tag, badge: 'NEW' },
      ]
    }] : []),
    ...(isAdmin ? [{
      title: 'Quản Trị Hệ Thống',
      items: [
        { id: 'admin', label: 'Super Admin Portal', icon: Shield, badge: 'CORE' },
      ]
    }] : [])
  ];

  return (
    <aside className="w-64 lg:w-72 bg-white/95 dark:bg-[#070414]/95 backdrop-blur-2xl border-r border-purple-100 dark:border-purple-900/20 flex flex-col h-full select-none shrink-0 z-30 transition-colors">
      {/* Brand Header */}
      <div className="p-4 border-b border-purple-50 dark:border-purple-900/20 flex items-center justify-between">
        <div
          onClick={() => {
            setActiveTab('feed');
            if (communities.length > 0) setActiveCommunityId(communities[0].id);
          }}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-violet-600 to-indigo-600 p-[1.5px] shadow-purple-glow-sm group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white dark:bg-[#070414] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <h1 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-1.5">
              <span>Permesh</span>
              <span className="text-[10px] bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 px-1.5 py-0.2 rounded font-mono font-bold">PRO</span>
            </h1>
            <p className="text-[10px] text-zinc-500 font-medium">AI & Community Platform</p>
          </div>
        </div>
      </div>

      {/* Community Dropdown Switcher (Vercel / Linear Style) */}
      <div className="p-3 border-b border-purple-50 dark:border-purple-900/20 relative" ref={dropdownRef}>
        <button
          onClick={() => setIsCommunityDropdownOpen(!isCommunityDropdownOpen)}
          className="w-full p-2.5 rounded-xl bg-purple-50/50 dark:bg-[#0f0926] hover:bg-purple-100/60 dark:hover:bg-[#160e38] border border-purple-200/60 dark:border-purple-800/30 hover:border-purple-400/70 flex items-center justify-between gap-2 transition-all duration-200 text-left group shadow-sm"
        >
          {activeCommunity ? (
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={activeCommunity.avatar}
                alt={activeCommunity.name}
                className="w-7 h-7 rounded-lg object-cover ring-1 ring-purple-300 dark:ring-purple-700/50 shrink-0"
              />
              <div className="min-w-0 truncate">
                <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                  {activeCommunity.name}
                </div>
                <div className="text-[10px] text-zinc-500 dark:text-zinc-400 flex items-center gap-1 font-medium">
                  <span>{activeCommunity.membersCount.toLocaleString()} members</span>
                  {activeCommunity.priceMonthly > 0 && (
                    <span className="text-purple-600 dark:text-purple-400 font-semibold">• PRO</span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <span className="text-xs text-zinc-500">Chọn cộng đồng...</span>
          )}

          <ChevronsUpDown className="w-4 h-4 text-zinc-400 dark:text-zinc-500 shrink-0 group-hover:text-purple-600 dark:group-hover:text-purple-300" />
        </button>

        {/* Dropdown Popover */}
        {isCommunityDropdownOpen && (
          <div className="absolute top-full left-3 right-3 mt-1.5 bg-white dark:bg-[#0f0a28] border border-purple-200 dark:border-purple-800/40 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in duration-150 space-y-1">
            <div className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 px-2 py-1">
              Chuyển đổi cộng đồng
            </div>

            <div className="max-h-56 overflow-y-auto space-y-1 pr-0.5">
              {communities.map((c) => {
                const isSelected = activeCommunityId === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => {
                      setActiveCommunityId(c.id);
                      setIsCommunityDropdownOpen(false);
                      if (activeTab === 'admin') setActiveTab('feed');
                    }}
                    className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40 font-bold'
                        : 'hover:bg-slate-100 dark:hover:bg-white/[0.04] text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img src={c.avatar} alt={c.name} className="w-6 h-6 rounded-md object-cover" />
                      <div className="min-w-0 truncate">
                        <div className="text-xs font-semibold truncate">{c.name}</div>
                        <div className="text-[10px] text-zinc-600 dark:text-zinc-400 font-medium">
                          {c.membersCount} mem {c.priceMonthly > 0 ? `• $${c.priceMonthly}/th` : ''}
                        </div>
                      </div>
                    </div>

                    {isSelected && <Check className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />}
                  </div>
                );
              })}
            </div>

            <div className="pt-2 mt-1 border-t border-slate-100 dark:border-white/[0.06] space-y-1">
              <button
                onClick={() => {
                  setIsCommunityDropdownOpen(false);
                  setIsCreateCommunityOpen(true);
                }}
                className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-medium text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Tạo cộng đồng mới</span>
              </button>

              <button
                onClick={() => {
                  setIsCommunityDropdownOpen(false);
                  const paidComm = communities.find(c => c.priceMonthly > 0);
                  if (paidComm) setCheckoutCommunity(paidComm);
                }}
                className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-all"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Khám phá cộng đồng PRO</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Sections (Vertical Tabs / Pages) */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {navSections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 px-3 py-1">
              {section.title}
            </div>

            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 group ${
                      isActive
                        ? 'bg-purple-600 text-white shadow-purple-glow-sm font-bold'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                        isActive ? 'text-white' : 'text-zinc-600 dark:text-zinc-400 group-hover:text-purple-600 dark:group-hover:text-purple-300'
                      }`} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Mini Card at Bottom */}
      <div className="p-3 border-t border-purple-100 dark:border-purple-900/20 bg-purple-50/30 dark:bg-[#0c0722]/50">
        <div
          onClick={() => {
            setInspectedUser(null);
            setActiveTab('profile');
          }}
          className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all group ${
            activeTab === 'profile' && !inspectedUser
              ? 'bg-purple-100/70 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-800/60 shadow-sm'
              : 'hover:bg-purple-100/40 dark:hover:bg-[#140c36]'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-lg object-cover ring-1 ring-purple-200 dark:ring-purple-700/40"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#070414]" />
            </div>
            <div className="min-w-0 truncate">
              <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-purple-600 dark:group-hover:text-purple-300 truncate">
                {currentUser.name}
              </div>
              <div className="text-[10px] text-zinc-600 dark:text-zinc-400 font-mono truncate">
                @{currentUser.username}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-1 rounded-lg border border-amber-200 dark:border-amber-800/40 shrink-0">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{currentUser.streakDays}d</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
