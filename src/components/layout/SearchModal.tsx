import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, X, MessageSquare, BookOpen, Users, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    posts,
    courses,
    challenges,
    users,
    setActiveTab,
    setInspectedUser
  } = useApp();

  const [query, setQuery] = useState('');

  // Keyboard shortcut Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.content.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const filteredCourses = courses.filter(c =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.description.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 2);

  const filteredChallenges = challenges.filter(ch =>
    ch.title.toLowerCase().includes(query.toLowerCase()) ||
    ch.description.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 2);

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(query.toLowerCase()) ||
    u.username.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const hasResults = filteredPosts.length > 0 || filteredCourses.length > 0 || filteredChallenges.length > 0 || filteredUsers.length > 0;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-start justify-center pt-20 px-4 animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white dark:bg-[#0a0718] border border-zinc-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-purple-500/20">
        {/* Input Bar */}
        <div className="flex items-center px-4 border-b border-zinc-200 dark:border-white/[0.08] bg-zinc-50 dark:bg-[#16161d]">
          <Search className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Tìm kiếm bài viết, khóa học, thử thách, thành viên..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full py-4 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-white/10 text-zinc-400 hover:text-zinc-800 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!query.trim() ? (
            <div className="text-center py-8 text-zinc-500 text-xs">
              Nhập từ khóa để bắt đầu tìm kiếm trong toàn bộ không gian cộng đồng...
            </div>
          ) : !hasResults ? (
            <div className="text-center py-8 text-zinc-500 text-xs">
              Không tìm thấy kết quả phù hợp cho "{query}"
            </div>
          ) : (
            <>
              {/* Posts */}
              {filteredPosts.length > 0 && (
                <div>
                  <div className="text-xs text-purple-700 dark:text-purple-400 font-semibold mb-2 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" /> Bài viết cộng đồng
                  </div>
                  <div className="space-y-1.5">
                    {filteredPosts.map(post => (
                      <div
                        key={post.id}
                        onClick={() => {
                          setActiveTab('feed');
                          setIsSearchOpen(false);
                        }}
                        className="p-2.5 rounded-xl bg-zinc-50 dark:bg-white/[0.02] hover:bg-purple-50 dark:hover:bg-purple-950/30 border border-zinc-200 dark:border-white/[0.04] hover:border-purple-300 dark:hover:border-purple-500/30 cursor-pointer flex items-center justify-between group transition-all"
                      >
                        <div className="min-w-0 pr-3">
                          <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 group-hover:text-purple-600 dark:group-hover:text-purple-300 truncate">
                            {post.title}
                          </div>
                          <div className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                            {post.content.slice(0, 90)}...
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Courses */}
              {filteredCourses.length > 0 && (
                <div>
                  <div className="text-xs text-indigo-700 dark:text-indigo-400 font-semibold mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> Khóa học & bài giảng
                  </div>
                  <div className="space-y-1.5">
                    {filteredCourses.map(course => (
                      <div
                        key={course.id}
                        onClick={() => {
                          setActiveTab('classroom');
                          setIsSearchOpen(false);
                        }}
                        className="p-2.5 rounded-xl bg-zinc-50 dark:bg-white/[0.02] hover:bg-indigo-50 dark:hover:bg-indigo-950/30 border border-zinc-200 dark:border-white/[0.04] hover:border-indigo-300 dark:hover:border-indigo-500/30 cursor-pointer flex items-center justify-between group transition-all"
                      >
                        <div className="min-w-0 pr-3">
                          <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 truncate">
                            {course.title}
                          </div>
                          <div className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                            {course.modules.length} chương học • {course.level}
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Challenges */}
              {filteredChallenges.length > 0 && (
                <div>
                  <div className="text-xs text-amber-600 dark:text-amber-400 font-semibold mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> Thử thách & Mục tiêu
                  </div>
                  <div className="space-y-1.5">
                    {filteredChallenges.map(ch => (
                      <div
                        key={ch.id}
                        onClick={() => {
                          setActiveTab('challenges');
                          setIsSearchOpen(false);
                        }}
                        className="p-2.5 rounded-xl bg-zinc-50 dark:bg-white/[0.02] hover:bg-amber-50 dark:hover:bg-amber-950/30 border border-zinc-200 dark:border-white/[0.04] hover:border-amber-300 dark:hover:border-amber-500/30 cursor-pointer flex items-center justify-between group transition-all"
                      >
                        <div className="min-w-0 pr-3">
                          <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 group-hover:text-amber-600 dark:group-hover:text-amber-300 truncate">
                            {ch.title}
                          </div>
                          <div className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                            {ch.durationDays} ngày thử thách • {ch.participantsCount} người tham gia
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Members */}
              {filteredUsers.length > 0 && (
                <div>
                  <div className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Thành viên
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {filteredUsers.map(user => (
                      <div
                        key={user.id}
                        onClick={() => {
                          setInspectedUser(user);
                          setIsSearchOpen(false);
                        }}
                        className="p-2.5 rounded-xl bg-zinc-50 dark:bg-white/[0.02] hover:bg-zinc-100 dark:hover:bg-zinc-800/60 border border-zinc-200 dark:border-white/[0.04] hover:border-zinc-300 dark:hover:border-white/20 cursor-pointer flex items-center gap-3 group transition-all"
                      >
                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-lg object-cover" />
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 group-hover:text-purple-600 dark:group-hover:text-white truncate">
                            {user.name}
                          </div>
                          <div className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono truncate">
                            @{user.username}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-zinc-100 dark:bg-[#0e0e13] border-t border-zinc-200 dark:border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-500">
          <span>Dùng phím <kbd className="font-mono bg-white dark:bg-zinc-800 px-1 py-0.5 rounded border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-400">ESC</kbd> để đóng</span>
          <span className="text-purple-600 dark:text-purple-400 font-mono font-semibold">Permesh Search</span>
        </div>
      </div>
    </div>
  );
};
