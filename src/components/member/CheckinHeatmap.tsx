import React from 'react';
import { useApp } from '../../context/AppContext';
import { GithubHeatmap } from '../common/GithubHeatmap';
import {
  Flame,
  CheckCircle2,
  Trophy,
  ArrowUpRight,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const CheckinHeatmap: React.FC = () => {
  const {
    currentUser,
    dailyCheckin,
    setActiveTab,
    users,
    setInspectedUser,
    activeCommunity
  } = useApp();

  const todayStr = new Date().toISOString().split('T')[0];
  const isCheckedInToday = currentUser.lastCheckinDate === todayStr;

  return (
    <div className="space-y-4">
      {/* Daily Check-in Card */}
      <div className="v-card p-4 relative overflow-hidden group">
        <div className="absolute -right-6 -top-6 w-28 h-28 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all pointer-events-none" />

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 dark:bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 dark:text-amber-400">
              <Flame className="w-5 h-5 fill-amber-500 dark:fill-amber-400 animate-pulse-subtle" />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                Chuỗi Streak: <span className="text-amber-500 dark:text-amber-400 font-mono font-bold">{currentUser.streakDays} Ngày</span>
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400">Duy trì điểm danh đều đặn mỗi ngày</div>
            </div>
          </div>
        </div>

        <button
          onClick={dailyCheckin}
          disabled={isCheckedInToday}
          className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 ${
            isCheckedInToday
              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30 cursor-default'
              : 'bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-glow hover:scale-[1.01] active:scale-[0.99]'
          }`}
        >
          {isCheckedInToday ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Đã check-in hôm nay 🔥</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-purple-200" />
              <span>Điểm danh Check-in Ngay 🔥</span>
            </>
          )}
        </button>
      </div>

      {/* GitHub Full Activity Heatmap Card */}
      <div className="v-card p-4">
        <GithubHeatmap showYears={false} />
      </div>

      {/* Community Leaderboard Preview */}
      <div className="v-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
              Top chuỗi streak
            </h3>
          </div>
          <button
            onClick={() => setActiveTab('members')}
            className="text-[11px] text-purple-600 dark:text-purple-400 hover:underline flex items-center font-medium"
          >
            Tất cả <ArrowUpRight className="w-3 h-3 ml-0.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {[...users].sort((a,b) => b.streakDays - a.streakDays).slice(0, 4).map((user, idx) => (
            <div
              key={user.id}
              onClick={() => setInspectedUser(user)}
              className="flex items-center justify-between p-1.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-white/[0.03] cursor-pointer transition-all group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className={`w-4 text-center text-xs font-mono font-bold ${
                  idx === 0 ? 'text-amber-500' : idx === 1 ? 'text-zinc-400' : idx === 2 ? 'text-amber-700' : 'text-zinc-400'
                }`}>
                  #{idx + 1}
                </span>
                <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-lg object-cover ring-1 ring-zinc-200 dark:ring-white/10" />
                <div className="min-w-0 truncate">
                  <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 group-hover:text-purple-600 dark:group-hover:text-purple-300 truncate">
                    {user.name}
                  </div>
                  <div className="text-[10px] text-zinc-500 truncate">
                    {user.badges[0] || 'Member'}
                  </div>
                </div>
              </div>
              <div className="text-xs font-mono font-bold text-amber-500 dark:text-amber-400 flex items-center gap-1 shrink-0">
                <Flame className="w-3.5 h-3.5 fill-amber-500" />
                <span>{user.streakDays}d</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Info & Rules */}
      {activeCommunity && (
        <div className="v-card p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 dark:text-zinc-100">
            <ShieldCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Nội quy & tiêu chuẩn</span>
          </div>
          <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
            {activeCommunity.rules.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-purple-600 dark:text-purple-400 font-bold">•</span>
                <span className="leading-snug">{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
