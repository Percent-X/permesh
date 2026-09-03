import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ShieldCheck, Users } from 'lucide-react';

export const CommunityHeader: React.FC = () => {
  const {
    activeCommunity,
    setCheckoutCommunity
  } = useApp();

  if (!activeCommunity) return null;

  return (
    <div className="bg-white/80 dark:bg-[#0e0e14]/90 border-b border-slate-200 dark:border-white/[0.07] relative transition-colors">
      {/* Cover Banner */}
      <div className="h-40 sm:h-52 w-full relative overflow-hidden">
        <img
          src={activeCommunity.coverImage}
          alt={activeCommunity.name}
          className="w-full h-full object-cover opacity-80 dark:opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0e0e14] via-white/40 dark:via-[#0e0e14]/50 to-transparent" />
        <div className="absolute top-4 right-4 flex items-center gap-2">
          {activeCommunity.priceMonthly > 0 ? (
            <span className="bg-purple-900/90 dark:bg-purple-900/80 backdrop-blur-md border border-purple-400/40 text-purple-100 dark:text-purple-200 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              PRO • ${activeCommunity.priceMonthly}/tháng
            </span>
          ) : (
            <span className="bg-emerald-800/90 dark:bg-emerald-950/80 backdrop-blur-md border border-emerald-400/40 text-emerald-100 dark:text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
              Miễn phí
            </span>
          )}
        </div>
      </div>

      {/* Community Info Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-14 sm:-mt-16 pb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="flex items-end gap-4">
            <img
              src={activeCommunity.avatar}
              alt={activeCommunity.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-white dark:ring-[#0e0e14] border border-slate-200 dark:border-white/10 shadow-2xl shrink-0"
            />
            <div className="mb-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight flex items-center gap-2">
                  {activeCommunity.name}
                  {activeCommunity.isVerified && (
                    <span className="badge-linear-purple">
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                      <span>Verified Space</span>
                    </span>
                  )}
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl line-clamp-2">
                {activeCommunity.description}
              </p>
            </div>
          </div>

          {/* Quick Action Button */}
          <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
              <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>{activeCommunity.membersCount.toLocaleString()} members</span>
            </div>

            {activeCommunity.priceMonthly > 0 && (
              <button
                onClick={() => setCheckoutCommunity(activeCommunity)}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-purple-glow flex items-center gap-1.5 transition-all active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Nâng cấp Thành viên
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
