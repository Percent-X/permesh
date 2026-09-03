import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GithubHeatmap } from '../common/GithubHeatmap';
import { PostCard } from './PostCard';
import {
  Flame,
  Award,
  Shield,
  Crown,
  Calendar,
  MessageSquare,
  Bookmark,
  Trophy,
  ArrowLeft,
  Share2,
  CheckCircle2,
  Link as LinkIcon
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const {
    currentUser,
    inspectedUser,
    setInspectedUser,
    posts,
    challenges
  } = useApp();

  const user = inspectedUser || currentUser;
  const isMe = user.id === currentUser.id;

  const [activeProfileSubTab, setActiveProfileSubTab] = useState<'posts' | 'bookmarks' | 'challenges' | 'badges'>('posts');
  const [copiedLink, setCopiedLink] = useState(false);

  // User posts
  const userPosts = posts.filter(p => p.author.id === user.id);

  // Bookmarked posts (if me)
  const bookmarkedPosts = posts.filter(p => currentUser.bookmarkedPostIds.includes(p.id));

  // User challenge submissions
  const userSubmissions = challenges.flatMap(c => 
    c.submissions.filter(s => s.author.id === user.id).map(s => ({ ...s, challengeTitle: c.title }))
  );

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-6 w-full pb-12">
      {/* Back button if inspecting another member */}
      {!isMe && (
        <button
          onClick={() => setInspectedUser(null)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-[#121218] border border-slate-200 dark:border-white/10 hover:border-purple-400 text-zinc-700 dark:text-zinc-300 transition-all shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Quay lại trang trước</span>
        </button>
      )}

      {/* Main Profile Header Card */}
      <div className="v-card overflow-hidden relative">
        {/* Panoramic Cover */}
        <div className="h-44 sm:h-60 w-full bg-gradient-to-r from-purple-300 via-indigo-200 to-purple-400 dark:from-purple-950/80 dark:via-violet-950/60 dark:to-indigo-950/80 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md bg-white/80 dark:bg-black/50 text-zinc-900 dark:text-zinc-100 hover:bg-white dark:hover:bg-black/80 border border-white/20 transition-all flex items-center gap-1.5 shadow-md"
            >
              {copiedLink ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Đã sao chép link!' : 'Chia sẻ hồ sơ'}</span>
            </button>
          </div>
        </div>

        {/* Profile Avatar & Info Bar */}
        <div className="px-6 sm:px-8 pb-6 pt-2">
          {/* Top Row: Avatar (overlapping cover) & Action Buttons */}
          <div className="flex items-end justify-between -mt-16 sm:-mt-20 mb-4">
            <div className="relative shrink-0">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl object-cover ring-4 ring-white dark:ring-[#0d0822] border border-slate-200 dark:border-purple-800/40 shadow-2xl bg-white dark:bg-[#0d0822]"
              />
              <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-[#0d0822]" title="Đang trực tuyến" />
            </div>

            {/* Top Right Action & Streak Pill */}
            <div className="flex items-center gap-2.5 shrink-0 mb-1">
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/60 text-xs font-bold text-amber-800 dark:text-amber-300 shadow-sm">
                <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>{user.streakDays} Ngày streak</span>
              </div>
            </div>
          </div>

          {/* User Name & Details Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                {user.name}
              </h1>

              {user.role === 'CREATOR' && (
                <span className="badge-linear-purple">
                  <Crown className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  <span>Creator</span>
                </span>
              )}

              {user.role === 'ADMIN' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">
                  <Shield className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Super Admin</span>
                </span>
              )}
            </div>

            <div className="text-xs text-purple-700 dark:text-purple-400 flex items-center gap-2 font-medium">
              <span>@{user.username}</span>
              <span className="text-zinc-400">•</span>
              <span className="text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Tham gia {user.joinedDate}
              </span>
            </div>

            {/* Bio text */}
            <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 pt-1 leading-relaxed max-w-3xl">
              {user.bio}
            </p>
          </div>

          {/* Quick Badges Showcase */}
          <div className="flex items-center gap-2 flex-wrap pt-4 mt-4 border-t border-slate-100 dark:border-white/[0.05]">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 mr-1">
              <Award className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Huy hiệu:</span>
            </span>
            {user.badges.map((b, idx) => (
              <span
                key={idx}
                className="badge-linear-zinc"
              >
                ✨ {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* GitHub 52-Week Full Year Activity Heatmap */}
      <div className="v-card p-6 space-y-3">
        <GithubHeatmap title={`Lịch sử đóng góp: ${user.name}`} showYears={true} />
      </div>

      {/* Profile Navigation Tabs (Posts / Bookmarks / Challenges / Badges) */}
      <div className="space-y-4">
        <div className="flex items-center gap-1 border-b border-slate-200 dark:border-white/[0.08] pb-1 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveProfileSubTab('posts')}
            className={`px-4 py-2.5 text-xs font-bold flex items-center gap-2 rounded-xl transition-all ${
              activeProfileSubTab === 'posts'
                ? 'bg-purple-600 text-white shadow-purple-glow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.03]'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Bài viết ({userPosts.length})</span>
          </button>

          {isMe && (
            <button
              onClick={() => setActiveProfileSubTab('bookmarks')}
              className={`px-4 py-2.5 text-xs font-bold flex items-center gap-2 rounded-xl transition-all ${
                activeProfileSubTab === 'bookmarks'
                  ? 'bg-purple-600 text-white shadow-purple-glow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.03]'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Đã lưu ({bookmarkedPosts.length})</span>
            </button>
          )}

          <button
            onClick={() => setActiveProfileSubTab('challenges')}
            className={`px-4 py-2.5 text-xs font-bold flex items-center gap-2 rounded-xl transition-all ${
              activeProfileSubTab === 'challenges'
                ? 'bg-purple-600 text-white shadow-purple-glow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.03]'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Thử thách & Chứng chỉ ({userSubmissions.length})</span>
          </button>

          <button
            onClick={() => setActiveProfileSubTab('badges')}
            className={`px-4 py-2.5 text-xs font-bold flex items-center gap-2 rounded-xl transition-all ${
              activeProfileSubTab === 'badges'
                ? 'bg-purple-600 text-white shadow-purple-glow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.03]'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Bộ sưu tập Huy hiệu ({user.badges.length})</span>
          </button>
        </div>

        {/* Tab 1: Posts Stream */}
        {activeProfileSubTab === 'posts' && (
          <div className="space-y-4">
            {userPosts.length === 0 ? (
              <div className="v-card p-12 text-center text-zinc-500 text-xs">
                Thành viên chưa có bài viết nào được đăng tải.
              </div>
            ) : (
              userPosts.map(post => <PostCard key={post.id} post={post} />)
            )}
          </div>
        )}

        {/* Tab 2: Bookmarks Stream */}
        {activeProfileSubTab === 'bookmarks' && (
          <div className="space-y-4">
            {bookmarkedPosts.length === 0 ? (
              <div className="v-card p-12 text-center text-zinc-500 text-xs">
                Bạn chưa lưu bài viết nào. Hãy bấm vào biểu tượng Bookmark trên các bài viết trong Feed để xem lại tại đây!
              </div>
            ) : (
              bookmarkedPosts.map(post => <PostCard key={post.id} post={post} />)
            )}
          </div>
        )}

        {/* Tab 3: Challenges Submissions */}
        {activeProfileSubTab === 'challenges' && (
          <div className="space-y-4">
            {userSubmissions.length === 0 ? (
              <div className="v-card p-12 text-center text-zinc-500 text-xs">
                Chưa có bài nộp báo cáo thử thách nào.
              </div>
            ) : (
              userSubmissions.map(sub => (
                <div key={sub.id} className="v-card p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="badge-linear-purple">
                        <Flame className="w-3.5 h-3.5 fill-purple-500 text-purple-500" />
                        <span>Ngày {sub.day}</span>
                      </span>
                      <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                        {sub.challengeTitle}
                      </span>
                    </div>
                    <span className="text-[10px] text-zinc-400 font-mono">{sub.submittedAt}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                    {sub.content}
                  </p>

                  {sub.linkUrl && (
                    <a
                      href={sub.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-purple-700 dark:text-purple-400 font-mono hover:underline bg-purple-50 dark:bg-purple-950/30 px-3 py-1.5 rounded-lg border border-purple-200 dark:border-purple-800/40"
                    >
                      <LinkIcon className="w-3.5 h-3.5" />
                      <span>{sub.linkUrl}</span>
                    </a>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 4: Badges Grid */}
        {activeProfileSubTab === 'badges' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {user.badges.map((badge, idx) => (
              <div key={idx} className="v-card p-5 space-y-2 hover:border-purple-400 transition-all flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/40 text-purple-600 dark:text-purple-400 flex items-center justify-center text-lg shrink-0">
                  ✨
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{badge}</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Huy hiệu danh dự vinh danh thành tích và đóng góp tích cực cho cộng đồng.
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
