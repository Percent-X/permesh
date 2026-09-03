import React from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Shield, Sparkles, Compass } from 'lucide-react';

export const CommunityRail: React.FC = () => {
  const {
    communities,
    activeCommunityId,
    setActiveCommunityId,
    activeRole,
    activeTab,
    setActiveTab,
    setIsCreateCommunityOpen,
    setCheckoutCommunity
  } = useApp();

  return (
    <aside className="w-18 md:w-20 bg-zinc-100/90 dark:bg-[#0d0d12] border-r border-zinc-200 dark:border-white/[0.08] flex flex-col items-center py-4 select-none shrink-0 z-30 transition-colors">
      {/* Brand Logo / Home */}
      <div 
        onClick={() => {
          setActiveTab('feed');
          if (communities.length > 0) setActiveCommunityId(communities[0].id);
        }}
        className="relative group cursor-pointer mb-4"
        title="Skool Space Home"
      >
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-violet-500 to-indigo-500 p-[1.5px] shadow-purple-glow hover:scale-105 transition-all duration-200">
          <div className="w-full h-full bg-white dark:bg-[#0d0d12] rounded-2xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
          </div>
        </div>
        <div className="absolute left-16 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center z-50 pointer-events-none">
          <div className="bg-zinc-900 border border-purple-500/30 text-purple-200 text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
            Skool Space
          </div>
        </div>
      </div>

      <div className="w-8 h-[1px] bg-zinc-300 dark:bg-white/[0.08] my-1" />

      {/* Communities Stack */}
      <div className="flex-1 w-full flex flex-col items-center gap-3 overflow-y-auto overflow-x-hidden py-2 px-1">
        {communities.map((community) => {
          const isActive = activeCommunityId === community.id && activeRole !== 'ADMIN';
          return (
            <div key={community.id} className="relative group w-full flex justify-center">
              {/* Active Indicator Bar */}
              <div
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full bg-purple-600 dark:bg-purple-500 transition-all duration-300 ${
                  isActive ? 'h-9 opacity-100' : 'h-0 opacity-0 group-hover:h-4 group-hover:opacity-60'
                }`}
              />

              <button
                onClick={() => {
                  setActiveCommunityId(community.id);
                  if (activeTab === 'admin') setActiveTab('feed');
                }}
                className={`w-12 h-12 rounded-2xl relative transition-all duration-200 overflow-hidden flex items-center justify-center group-hover:scale-105 ${
                  isActive
                    ? 'ring-2 ring-purple-600 dark:ring-purple-500 shadow-purple-glow ring-offset-2 ring-offset-zinc-100 dark:ring-offset-[#0d0d12]'
                    : 'opacity-70 hover:opacity-100 hover:ring-1 hover:ring-zinc-400 dark:hover:ring-white/20'
                }`}
              >
                <img
                  src={community.avatar}
                  alt={community.name}
                  className="w-full h-full object-cover"
                />
                {community.priceMonthly > 0 && (
                  <span className="absolute bottom-0 right-0 bg-purple-600 text-[9px] font-bold text-white px-1 rounded-tl-md">
                    PRO
                  </span>
                )}
              </button>

              {/* Tooltip */}
              <div className="absolute left-16 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center z-50 pointer-events-none">
                <div className="bg-zinc-900/95 backdrop-blur-md border border-white/10 text-zinc-100 text-xs font-medium px-3 py-2 rounded-xl shadow-2xl whitespace-nowrap flex flex-col gap-0.5">
                  <div className="font-semibold text-purple-300 flex items-center gap-1.5">
                    {community.name}
                    {community.isVerified && <span className="text-[10px] text-emerald-400">✓</span>}
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    {community.membersCount.toLocaleString()} thành viên {community.priceMonthly > 0 ? `• $${community.priceMonthly}/tháng` : '• Miễn phí'}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Add New Community Button */}
        <div className="relative group w-full flex justify-center mt-1">
          <button
            onClick={() => setIsCreateCommunityOpen(true)}
            className="w-12 h-12 rounded-2xl border border-dashed border-purple-400 dark:border-purple-500/40 hover:border-purple-600 dark:hover:border-purple-400 bg-purple-50 dark:bg-purple-950/20 hover:bg-purple-100 dark:hover:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center transition-all duration-200 group-hover:scale-105"
            title="Tạo Community Mới"
          >
            <Plus className="w-5 h-5" />
          </button>
          <div className="absolute left-16 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center z-50 pointer-events-none">
            <div className="bg-zinc-900 border border-white/10 text-zinc-200 text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
              + Tạo Community mới
            </div>
          </div>
        </div>

        {/* Discover / Explore Communities */}
        <div className="relative group w-full flex justify-center">
          <button
            onClick={() => {
              const paidComm = communities.find(c => c.priceMonthly > 0);
              if (paidComm) setCheckoutCommunity(paidComm);
            }}
            className="w-12 h-12 rounded-2xl border border-zinc-200 dark:border-white/10 hover:border-zinc-400 dark:hover:border-white/30 bg-white dark:bg-zinc-900/60 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center justify-center transition-all duration-200 group-hover:scale-105 shadow-sm"
            title="Khám phá Cộng đồng PRO"
          >
            <Compass className="w-5 h-5" />
          </button>
          <div className="absolute left-16 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center z-50 pointer-events-none">
            <div className="bg-zinc-900 border border-white/10 text-zinc-200 text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
              Khám phá cộng đồng PRO (Thử Coupon)
            </div>
          </div>
        </div>
      </div>

      {/* Admin Quick Switch (if role is ADMIN) */}
      {activeRole === 'ADMIN' && (
        <div className="pt-2 border-t border-zinc-300 dark:border-white/[0.08] w-full flex justify-center">
          <div className="relative group">
            <button
              onClick={() => setActiveTab('admin')}
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-700 to-purple-700 text-white border border-purple-400 flex items-center justify-center ring-2 ring-purple-500 shadow-purple-glow"
              title="Super Admin Portal"
            >
              <Shield className="w-5 h-5" />
            </button>
            <div className="absolute left-16 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center z-50 pointer-events-none">
              <div className="bg-zinc-900 border border-purple-500 text-purple-200 text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
                Super Admin Portal
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
