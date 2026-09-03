import React from 'react';
import { useApp } from '../../context/AppContext';
import { GithubHeatmap } from '../common/GithubHeatmap';
import {
  X,
  Flame,
  Award,
  Shield,
  Crown
} from 'lucide-react';

export const UserProfileModal: React.FC = () => {
  const { inspectedUser, setInspectedUser } = useApp();

  if (!inspectedUser) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-3xl bg-white dark:bg-[#0a0718] border border-zinc-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden ring-1 ring-purple-500/20 max-h-[92vh] flex flex-col">
        {/* Cover / Header */}
        <div className="h-32 bg-gradient-to-r from-purple-200 via-indigo-200 to-purple-300 dark:from-purple-900/60 dark:via-violet-900/40 dark:to-indigo-900/60 relative p-4 flex justify-end shrink-0">
          <button
            onClick={() => setInspectedUser(null)}
            className="w-8 h-8 rounded-full bg-white/80 dark:bg-black/40 hover:bg-white dark:hover:bg-black/80 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white flex items-center justify-center transition-all shadow-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Details */}
        <div className="px-6 pb-6 pt-0 relative -mt-12 space-y-5 overflow-y-auto flex-1">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <img
              src={inspectedUser.avatar}
              alt={inspectedUser.name}
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white dark:ring-[#0a0718] border border-zinc-200 dark:border-white/10 shadow-2xl shrink-0"
            />
            <div className="flex items-center gap-2">
              <span className="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800/60 text-xs font-mono font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {inspectedUser.streakDays} Ngày Streak
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{inspectedUser.name}</h2>
              {inspectedUser.role === 'CREATOR' && (
                <span className="text-[10px] bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 px-2 py-0.5 rounded-md border border-purple-300 dark:border-purple-700/60 font-semibold flex items-center gap-1">
                  <Crown className="w-3 h-3 text-purple-600 dark:text-purple-400" /> Creator
                </span>
              )}
              {inspectedUser.role === 'ADMIN' && (
                <span className="text-[10px] bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 px-2 py-0.5 rounded-md border border-indigo-300 dark:border-indigo-700/60 font-semibold flex items-center gap-1">
                  <Shield className="w-3 h-3 text-indigo-600 dark:text-indigo-400" /> Super Admin
                </span>
              )}
            </div>
            <div className="text-xs text-purple-700 dark:text-purple-400 font-mono mt-0.5">@{inspectedUser.username} • Tham gia {inspectedUser.joinedDate}</div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-2 leading-relaxed">{inspectedUser.bio}</p>
          </div>

          {/* Badges */}
          <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-white/[0.06]">
            <div className="text-xs font-bold text-zinc-500 dark:text-zinc-400 font-mono flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Huy hiệu thành tựu</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {inspectedUser.badges.map((badge, idx) => (
                <span
                  key={idx}
                  className="bg-zinc-100 dark:bg-white/[0.04] hover:bg-purple-100 dark:hover:bg-purple-950/40 border border-zinc-200 dark:border-white/[0.08] hover:border-purple-300 dark:hover:border-purple-500/40 text-zinc-700 dark:text-zinc-300 hover:text-purple-700 dark:hover:text-purple-300 text-xs px-3 py-1 rounded-xl transition-all font-medium"
                >
                  ✨ {badge}
                </span>
              ))}
            </div>
          </div>

          {/* GitHub Full Year Activity Heatmap */}
          <div className="pt-2 border-t border-zinc-200 dark:border-white/[0.06] space-y-2">
            <GithubHeatmap title={`Thành viên: ${inspectedUser.name}`} />
          </div>
        </div>
      </div>
    </div>
  );
};
