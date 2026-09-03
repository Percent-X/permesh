import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  Search,
  Bell,
  Heart,
  Flame,
  Trophy,
  Calendar,
  MessageSquare,
  CheckCircle2,
  CheckCheck,
  Shield,
  UserCheck,
  Crown,
  Sparkles,
  Command,
  ChevronDown,
  Sun,
  Moon,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';

export const TopBar: React.FC = () => {
  const {
    currentUser,
    activeRole,
    setActiveRole,
    activeCommunity,
    activeTab,
    setActiveTab,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    deleteNotification,
    toggleNotificationRead,
    setIsSearchOpen,
    setInspectedUser,
    dailyCheckin,
    theme,
    toggleTheme
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifFilter, setNotifFilter] = useState<'all' | 'unread'>('all');
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const filteredNotifications = notifFilter === 'unread'
    ? notifications.filter(n => !n.isRead)
    : notifications;

  // Notification Icon & Color metadata helper
  const getNotificationMeta = (type: string) => {
    switch (type) {
      case 'UPVOTE':
        return {
          icon: Heart,
          iconColor: 'text-rose-500 dark:text-rose-400',
          badgeBg: 'bg-rose-500/10 dark:bg-rose-500/15 border-rose-500/25',
          pinBg: 'bg-rose-500 text-white',
        };
      case 'CHALLENGE':
        return {
          icon: Trophy,
          iconColor: 'text-purple-600 dark:text-purple-400',
          badgeBg: 'bg-purple-500/10 dark:bg-purple-500/15 border-purple-500/25',
          pinBg: 'bg-purple-600 text-white',
        };
      case 'EVENT':
        return {
          icon: Calendar,
          iconColor: 'text-blue-600 dark:text-blue-400',
          badgeBg: 'bg-blue-500/10 dark:bg-blue-500/15 border-blue-500/25',
          pinBg: 'bg-blue-600 text-white',
        };
      case 'COMMENT':
        return {
          icon: MessageSquare,
          iconColor: 'text-emerald-600 dark:text-emerald-400',
          badgeBg: 'bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/25',
          pinBg: 'bg-emerald-600 text-white',
        };
      case 'CHECKIN':
        return {
          icon: CheckCircle2,
          iconColor: 'text-rose-600 dark:text-rose-400',
          badgeBg: 'bg-rose-500/10 dark:bg-rose-500/15 border-rose-500/25',
          pinBg: 'bg-rose-600 text-white',
        };
      default:
        return {
          icon: Sparkles,
          iconColor: 'text-indigo-600 dark:text-indigo-400',
          badgeBg: 'bg-indigo-500/10 dark:bg-indigo-500/15 border-indigo-500/25',
          pinBg: 'bg-indigo-600 text-white',
        };
    }
  };

  // Close notifications dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const roles: { role: UserRole; label: string; icon: any; color: string; desc: string }[] = [
    { role: 'MEMBER', label: 'Member', icon: UserCheck, color: 'text-zinc-500 dark:text-zinc-300', desc: 'Trải nghiệm thành viên: xem feed, học, nộp bài' },
    { role: 'CREATOR', label: 'Creator', icon: Crown, color: 'text-purple-600 dark:text-purple-400', desc: 'Chủ cộng đồng: quản trị, tạo khóa học, coupon' },
    { role: 'ADMIN', label: 'Super Admin', icon: Shield, color: 'text-indigo-600 dark:text-indigo-400', desc: 'Quản trị hệ thống: duyệt community, user, report' }
  ];

  return (
    <header className="h-16 border-b border-purple-100 dark:border-purple-900/20 bg-white/95 dark:bg-[#070414]/95 backdrop-blur-2xl px-4 md:px-6 flex items-center justify-between sticky top-0 z-20 transition-colors">
      {/* Left: Community Title & Quick Nav */}
      <div className="flex items-center gap-4">
        {activeRole === 'ADMIN' ? (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-300 dark:border-indigo-500/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-indigo-600 dark:text-indigo-400 font-mono font-medium">Platform Admin</div>
              <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Superadmin Control Center</div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <img
              src={activeCommunity?.avatar}
              alt={activeCommunity?.name}
              className="w-8 h-8 rounded-lg object-cover ring-1 ring-purple-200 dark:ring-purple-700/40"
            />
            <div className="hidden sm:block">
              <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                {activeCommunity?.name}
                {activeCommunity?.isVerified && (
                  <span className="w-3.5 h-3.5 rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 text-[10px] inline-flex items-center justify-center font-bold">✓</span>
                )}
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                <span>{activeCommunity?.membersCount.toLocaleString()} thành viên</span>
                <span>•</span>
                <span className="text-purple-600 dark:text-purple-400 font-medium">{activeCommunity?.tagline}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Middle: Search Bar (Trigger Cmd+K) */}
      <div className="hidden lg:flex items-center justify-center flex-1 max-w-md mx-6">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="w-full bg-purple-50/50 dark:bg-[#0f0926] hover:bg-purple-100/60 dark:hover:bg-[#160e38] border border-purple-200/60 dark:border-purple-800/30 hover:border-purple-400/70 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 px-3.5 py-1.5 rounded-xl text-xs flex items-center justify-between transition-all duration-200 shadow-sm group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-zinc-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
            <span>Tìm bài viết, khóa học, thành viên...</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[10px] bg-white dark:bg-[#150e33] border border-purple-200 dark:border-purple-700/40 px-1.5 py-0.5 rounded text-purple-700 dark:text-purple-300">
            <Command className="w-2.5 h-2.5" /> K
          </div>
        </button>
      </div>

      {/* Right: Quick Role Switcher + Theme Toggle + Gamification + Notifs + Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Role Switcher Pill Container */}
        <div className="bg-purple-50/60 dark:bg-[#0f0926] p-1 rounded-xl border border-purple-200/60 dark:border-purple-800/30 flex items-center gap-1 shadow-sm">
          {roles.map(({ role, label, icon: Icon, color, desc }) => {
            const isSelected = activeRole === role;
            return (
              <button
                key={role}
                onClick={() => {
                  setActiveRole(role);
                  if (role === 'ADMIN') {
                    setActiveTab('admin');
                  } else if (activeTab === 'admin') {
                    setActiveTab('feed');
                  }
                }}
                title={desc}
                className={`relative px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-purple-glow-sm ring-1 ring-purple-400/50'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : color}`} />
                <span className="hidden md:inline">{label}</span>
              </button>
            );
          })}
        </div>

        {/* Theme Toggle Button (Light / Dark) */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-[#121217] hover:bg-zinc-200/70 dark:hover:bg-[#181820] border border-zinc-200 dark:border-white/[0.08] hover:border-purple-400/40 text-zinc-700 dark:text-zinc-300 flex items-center justify-center transition-all duration-200"
          title={theme === 'dark' ? 'Chuyển sang Giao diện Sáng (Light Theme)' : 'Chuyển sang Giao diện Tối (Dark Theme)'}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
          ) : (
            <Moon className="w-4 h-4 text-purple-600 hover:-rotate-12 transition-transform" />
          )}
        </button>

        {/* Streak Badge (Click to checkin) */}
        {activeRole !== 'ADMIN' && (
          <button
            onClick={dailyCheckin}
            title="Bấm để điểm danh Check-in & duy trì Streak!"
            className="hidden sm:flex items-center gap-1.5 bg-zinc-100 dark:bg-[#121217] hover:bg-zinc-200/70 dark:hover:bg-[#181822] border border-zinc-200 dark:border-white/[0.08] hover:border-purple-400/50 px-2.5 py-1.5 rounded-xl transition-all duration-200 group"
          >
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 group-hover:scale-110 transition-transform animate-pulse-subtle" />
            <span className="text-amber-600 dark:text-amber-400 font-bold text-xs">{currentUser.streakDays} ngày streak</span>
          </button>
        )}

        {/* Notification Bell Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-[#121217] hover:bg-zinc-200/70 dark:hover:bg-[#181820] border border-zinc-200 dark:border-white/[0.08] hover:border-purple-400/40 text-zinc-700 dark:text-zinc-300 flex items-center justify-center relative transition-all duration-200"
            title="Thông báo"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple-600 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-[#09090b] animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Ultra-Luxurious Minimalist Notification Popover */}
          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-84 sm:w-[420px] bg-white/95 dark:bg-[#080512]/95 backdrop-blur-2xl border border-zinc-200/80 dark:border-white/[0.08] rounded-2xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 overflow-hidden ring-1 ring-purple-500/20 flex flex-col">
              {/* Ambient purple top-right glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/10 dark:bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="p-4 border-b border-zinc-200/80 dark:border-white/[0.07] flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2.5">
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Thông báo</h4>
                  {unreadCount > 0 ? (
                    <span className="text-[10px] font-mono font-bold bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-300/80 dark:border-purple-800/60 px-2 py-0.5 rounded-full shadow-xs">
                      {unreadCount} mới
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-white/[0.04] px-2 py-0.5 rounded-full">
                      Tất cả đã đọc
                    </span>
                  )}
                </div>

                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer active:scale-95"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>Đã đọc tất cả</span>
                  </button>
                )}
              </div>

              {/* Segmented Control Filter Tabs (Apple / Linear style) */}
              <div className="px-3.5 pt-3 pb-2 relative z-10">
                <div className="bg-zinc-100 dark:bg-white/[0.04] p-1 rounded-xl flex items-center gap-1 border border-zinc-200/50 dark:border-white/[0.04]">
                  <button
                    onClick={() => setNotifFilter('all')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      notifFilter === 'all'
                        ? 'bg-white dark:bg-purple-600 text-zinc-900 dark:text-white shadow-xs font-bold'
                        : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                    }`}
                  >
                    <span>Tất cả</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                      notifFilter === 'all'
                        ? 'bg-zinc-100 dark:bg-white/20 text-zinc-900 dark:text-white'
                        : 'bg-zinc-200/60 dark:bg-white/[0.06] text-zinc-500'
                    }`}>
                      {notifications.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setNotifFilter('unread')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      notifFilter === 'unread'
                        ? 'bg-white dark:bg-purple-600 text-zinc-900 dark:text-white shadow-xs font-bold'
                        : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                    }`}
                  >
                    <span>Chưa đọc</span>
                    {unreadCount > 0 && (
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                        notifFilter === 'unread'
                          ? 'bg-zinc-100 dark:bg-white/20 text-zinc-900 dark:text-white'
                          : 'bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300'
                      }`}>
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Notification Items List */}
              <div className="p-2 space-y-1 max-h-[380px] overflow-y-auto relative z-10 divide-y divide-zinc-100/50 dark:divide-white/[0.03]">
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-12 px-4 space-y-2.5">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/30 flex items-center justify-center mx-auto text-purple-600 dark:text-purple-400 shadow-sm">
                      <Bell className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Không có thông báo nào</div>
                    <p className="text-[11px] text-zinc-500 max-w-xs mx-auto leading-relaxed">
                      {notifFilter === 'unread' ? 'Bạn đã đọc toàn bộ thông báo.' : 'Mọi thông báo cập nhật, upvote và sự kiện sẽ xuất hiện tại đây.'}
                    </p>
                  </div>
                ) : (
                  filteredNotifications.map((notif) => {
                    const meta = getNotificationMeta(notif.type);
                    const IconComponent = meta.icon;

                    return (
                      <div
                        key={notif.id}
                        onClick={() => {
                          markNotificationRead(notif.id);
                          if (notif.linkTab) setActiveTab(notif.linkTab);
                          setIsNotifOpen(false);
                        }}
                        className={`p-3 rounded-xl transition-all cursor-pointer flex items-start gap-3 relative group pt-3 ${
                          notif.isRead
                            ? 'hover:bg-zinc-100/60 dark:hover:bg-white/[0.03] opacity-75 hover:opacity-100'
                            : 'bg-purple-500/[0.03] dark:bg-purple-500/[0.06] hover:bg-purple-500/[0.07] dark:hover:bg-purple-500/[0.1]'
                        }`}
                      >
                        {/* Avatar with Pinned Micro-Badge */}
                        <div className="relative shrink-0">
                          {notif.actorAvatar ? (
                            <img
                              src={notif.actorAvatar}
                              alt={notif.actorName || 'User'}
                              className="w-9 h-9 rounded-xl object-cover ring-1 ring-black/10 dark:ring-white/10 group-hover:ring-purple-500/40 transition-all shadow-xs"
                            />
                          ) : (
                            <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shadow-xs ${meta.badgeBg}`}>
                              <IconComponent className={`w-4 h-4 ${meta.iconColor}`} />
                            </div>
                          )}

                          {/* Pinned Micro-Badge on corner */}
                          {notif.actorAvatar && (
                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white dark:ring-[#080512] shadow-xs ${meta.pinBg}`}>
                              <IconComponent className="w-2.5 h-2.5" />
                            </div>
                          )}
                        </div>

                        {/* Content Body */}
                        <div className="flex-1 min-w-0 pr-1">
                          <div className="flex items-center justify-between gap-2 mb-0.5">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                                {notif.title}
                              </span>
                              {notif.tag && (
                                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-zinc-100 dark:bg-white/[0.06] text-zinc-500 dark:text-zinc-400 shrink-0">
                                  {notif.tag}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 shrink-0">
                              {notif.createdAt}
                            </span>
                          </div>

                          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                            {notif.message}
                          </p>
                        </div>

                        {/* Hover Quick Actions / Unread Dot */}
                        <div className="flex items-center gap-1 shrink-0 mt-0.5">
                          {/* Quick action buttons on hover */}
                          <div className="hidden group-hover:flex items-center gap-1 transition-all animate-in fade-in duration-150">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleNotificationRead(notif.id);
                              }}
                              title={notif.isRead ? 'Đánh dấu chưa đọc' : 'Đánh dấu đã đọc'}
                              className="w-6 h-6 rounded-lg bg-zinc-200/70 dark:bg-white/10 hover:bg-purple-100 dark:hover:bg-purple-900/50 text-zinc-600 dark:text-zinc-300 hover:text-purple-600 dark:hover:text-purple-300 flex items-center justify-center transition-all cursor-pointer"
                            >
                              {notif.isRead ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notif.id);
                              }}
                              title="Xóa thông báo"
                              className="w-6 h-6 rounded-lg bg-zinc-200/70 dark:bg-white/10 hover:bg-rose-100 dark:hover:bg-rose-950 text-zinc-600 dark:text-zinc-300 hover:text-rose-600 dark:hover:text-rose-400 flex items-center justify-center transition-all cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Glowing Unread Dot (when not hovered) */}
                          {!notif.isRead && (
                            <span className="group-hover:hidden w-2 h-2 rounded-full bg-purple-500 shadow-purple-glow-sm ring-2 ring-purple-500/20" />
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Minimalist Footer */}
              <div className="p-2.5 px-4 bg-zinc-50/70 dark:bg-white/[0.02] border-t border-zinc-200/70 dark:border-white/[0.05] flex items-center justify-between text-[11px] text-zinc-500">
                <span className="font-mono text-[10px]">Permesh Notification Engine</span>
                <span className="text-[10px] text-zinc-400">Tự động đồng bộ thời gian thực</span>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill */}
        <button
          onClick={() => {
            setInspectedUser(null);
            setActiveTab('profile');
          }}
          className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-xl bg-zinc-100 dark:bg-[#121217] hover:bg-zinc-200/70 dark:hover:bg-[#181822] border border-zinc-200 dark:border-white/[0.08] hover:border-purple-400/40 transition-all duration-200"
          title="Xem Trang cá nhân (Profile)"
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-7 h-7 rounded-lg object-cover ring-1 ring-purple-500/40"
          />
          <div className="hidden xl:block text-left">
            <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 leading-none">{currentUser.name}</div>
            <div className="text-[10px] text-purple-600 dark:text-purple-400 leading-none mt-0.5 font-mono">@{currentUser.username}</div>
          </div>
          <ChevronDown className="w-3 h-3 text-zinc-400 dark:text-zinc-500" />
        </button>
      </div>
    </header>
  );
};
