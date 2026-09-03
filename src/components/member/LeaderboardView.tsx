import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Flame, Search, Shield, Crown, Trophy } from 'lucide-react';

export const LeaderboardView: React.FC = () => {
  const { users, setInspectedUser } = useApp();
  const [search, setSearch] = useState('');
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | 'ALL'>('30D');

  const sortedUsers = [...users].sort((a, b) => {
    if (timeRange === '7D') return (b.streakDays % 7 || b.streakDays) - (a.streakDays % 7 || a.streakDays);
    return b.streakDays - a.streakDays;
  });

  const filtered = sortedUsers.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  const top3 = filtered.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header & Range Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span>Bảng Xếp Hạng & Thành Viên</span>
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
            Vinh danh những thành viên tích cực đóng góp và duy trì chuỗi học tập dài nhất.
          </p>
        </div>

        {/* Time Range Pills (Skool Style) */}
        <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-[#15151c] p-1 rounded-xl border border-zinc-200 dark:border-white/10 self-start sm:self-auto">
          <button
            onClick={() => setTimeRange('7D')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              timeRange === '7D'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            7 Ngày qua
          </button>
          <button
            onClick={() => setTimeRange('30D')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              timeRange === '30D'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            30 Ngày qua
          </button>
          <button
            onClick={() => setTimeRange('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              timeRange === 'ALL'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Tất cả
          </button>
        </div>
      </div>

      {/* Top 3 Podium (Bục Vinh Danh Skool Style) */}
      {top3.length >= 3 && !search && (
        <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 pb-2 max-w-2xl mx-auto items-end">
          {/* Rank 2 (Silver) */}
          <div
            onClick={() => setInspectedUser(top3[1])}
            className="v-card p-4 text-center space-y-2 cursor-pointer hover:border-zinc-400 dark:hover:border-zinc-500 transition-all relative order-1"
          >
            <div className="relative inline-block">
              <img
                src={top3[1].avatar}
                alt={top3[1].name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover ring-2 ring-zinc-300 dark:ring-zinc-600 mx-auto shadow-md"
              />
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-zinc-300 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs font-bold flex items-center justify-center ring-2 ring-white dark:ring-[#111116] shadow-sm">
                🥈 2
              </span>
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">{top3[1].name}</h3>
              <div className="text-[10px] text-zinc-400 font-mono">@{top3[1].username}</div>
            </div>
            <div className="inline-flex items-center gap-1 text-xs font-mono font-bold text-amber-500">
              <Flame className="w-3.5 h-3.5 fill-amber-500" />
              <span>{top3[1].streakDays}d Streak</span>
            </div>
          </div>

          {/* Rank 1 (Gold - Highest & Center) */}
          <div
            onClick={() => setInspectedUser(top3[0])}
            className="v-card p-5 text-center space-y-2 cursor-pointer border-amber-400/50 dark:border-amber-500/40 shadow-lg hover:border-amber-400 transition-all relative order-2 -mt-4 bg-gradient-to-b from-amber-50/40 to-transparent dark:from-amber-950/20"
          >
            <div className="relative inline-block">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-amber-500 animate-bounce">
                <Crown className="w-5 h-5 fill-amber-500" />
              </div>
              <img
                src={top3[0].avatar}
                alt={top3[0].name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-amber-400 dark:ring-amber-500/80 mx-auto shadow-xl"
              />
              <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-zinc-950 text-xs font-bold flex items-center justify-center ring-2 ring-white dark:ring-[#111116] shadow-md">
                🥇 1
              </span>
            </div>
            <div>
              <h3 className="text-xs sm:text-base font-bold text-zinc-900 dark:text-zinc-100 truncate">{top3[0].name}</h3>
              <div className="text-[11px] text-purple-600 dark:text-purple-400 font-mono">@{top3[0].username}</div>
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-xs font-mono font-bold text-amber-800 dark:text-amber-300">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{top3[0].streakDays} Ngày Streak</span>
            </div>
          </div>

          {/* Rank 3 (Bronze) */}
          <div
            onClick={() => setInspectedUser(top3[2])}
            className="v-card p-4 text-center space-y-2 cursor-pointer hover:border-amber-700/60 transition-all relative order-3"
          >
            <div className="relative inline-block">
              <img
                src={top3[2].avatar}
                alt={top3[2].name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover ring-2 ring-amber-700/60 mx-auto shadow-md"
              />
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-700 text-white text-xs font-bold flex items-center justify-center ring-2 ring-white dark:ring-[#111116] shadow-sm">
                🥉 3
              </span>
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">{top3[2].name}</h3>
              <div className="text-[10px] text-zinc-400 font-mono">@{top3[2].username}</div>
            </div>
            <div className="inline-flex items-center gap-1 text-xs font-mono font-bold text-amber-500">
              <Flame className="w-3.5 h-3.5 fill-amber-500" />
              <span>{top3[2].streakDays}d Streak</span>
            </div>
          </div>
        </div>
      )}

      {/* Search & All Members Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Tất cả thành viên ({filtered.length})</span>
          </div>

          <div className="relative max-w-xs flex-1">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm theo tên hoặc @username..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white dark:bg-[#121217] border border-zinc-200 dark:border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Member Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filtered.map((user, idx) => (
            <div
              key={user.id}
              onClick={() => setInspectedUser(user)}
              className="v-card p-4 hover:border-purple-400 dark:hover:border-purple-500/40 cursor-pointer transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0">
                  <img src={user.avatar} alt={user.name} className="w-11 h-11 rounded-xl object-cover ring-1 ring-zinc-200 dark:ring-white/10 group-hover:ring-purple-500/50" />
                  <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[10px] font-mono font-bold flex items-center justify-center ring-1 ring-zinc-200 dark:ring-white/10">
                    #{idx + 1}
                  </span>
                </div>

                <div className="min-w-0">
                  <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-purple-600 dark:group-hover:text-purple-300 flex items-center gap-1.5 truncate">
                    {user.name}
                    {user.role === 'CREATOR' && <Crown className="w-3 h-3 text-purple-600 dark:text-purple-400 shrink-0" />}
                    {user.role === 'ADMIN' && <Shield className="w-3 h-3 text-indigo-600 dark:text-indigo-400 shrink-0" />}
                  </div>
                  <div className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono truncate">@{user.username}</div>
                  <div className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                    {user.badges[0] || 'Thành viên'}
                  </div>
                </div>
              </div>

              {/* Streak Stat */}
              <div className="text-right shrink-0">
                <div className="text-xs font-mono font-bold text-amber-500 dark:text-amber-400 flex items-center justify-end gap-1">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{user.streakDays}d</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
