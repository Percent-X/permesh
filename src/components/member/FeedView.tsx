import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PostCard } from './PostCard';
import {
  BarChart2,
  Send,
  Filter,
  MessageSquarePlus,
  HelpCircle,
  X
} from 'lucide-react';

export const FeedView: React.FC = () => {
  const {
    activeCommunity,
    posts,
    createPost,
    currentUser
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [isQuestion, setIsQuestion] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Chung');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(['Discussion']);
  const [showPollInput, setShowPollInput] = useState(false);
  const [pollOptions, setPollOptions] = useState<string[]>(['', '']);

  if (!activeCommunity) return null;

  const communityPosts = posts.filter(p => p.communityId === activeCommunity.id);

  const categories = ['Tất cả', 'Câu hỏi', ...(activeCommunity.categories || ['Chung'])];

  const filteredPosts = communityPosts.filter(p => {
    if (selectedCategory === 'Tất cả') return true;
    if (selectedCategory === 'Câu hỏi') return !!p.isQuestion;
    return p.category === selectedCategory;
  });

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    createPost({
      title,
      content,
      category,
      tags,
      pollOptions: !isQuestion && showPollInput ? pollOptions.filter(o => o.trim()) : undefined,
      isQuestion
    });

    // Reset
    setTitle('');
    setContent('');
    setTags(['Discussion']);
    setShowPollInput(false);
    setPollOptions(['', '']);
    setIsQuestion(false);
    setIsCreatingPost(false);
  };

  return (
    <div className="space-y-6">
      {/* Create Post Banner / Input Box */}
      <div className="v-card p-4 transition-all">
        {!isCreatingPost ? (
          <div
            onClick={() => setIsCreatingPost(true)}
            className="flex items-center gap-3 cursor-pointer p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-white/[0.03] transition-colors"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-xl object-cover ring-1 ring-zinc-200 dark:ring-white/10"
            />
            <div className="flex-1 bg-zinc-100 dark:bg-[#15151c] border border-zinc-200 dark:border-white/10 hover:border-purple-400 dark:hover:border-purple-500/40 rounded-xl px-4 py-2.5 text-xs text-zinc-500 dark:text-zinc-400 flex items-center justify-between transition-all">
              <span>Chia sẻ kiến thức, đặt câu hỏi hoặc showcase dự án mới...</span>
              <MessageSquarePlus className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitPost} className="space-y-3 pt-1">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/[0.08] pb-2">
              <div className="flex items-center gap-2">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-7 h-7 rounded-lg object-cover" />
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-200">{currentUser.name}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsCreatingPost(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <input
              type="text"
              placeholder={isQuestion ? 'Câu hỏi ngắn gọn bạn đang gặp phải? (VD: Lỗi CORS khi gọi Claude API từ Next.js)' : 'Tiêu đề bài viết...'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent text-sm font-bold text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none border-b border-zinc-200 dark:border-white/[0.06] pb-2"
              autoFocus
            />

            <textarea
              placeholder={isQuestion ? 'Mô tả chi tiết: code, thông báo lỗi và những gì bạn đã thử...' : 'Nội dung chi tiết (hỗ trợ markdown, bullet points, links)...'}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full bg-transparent text-xs text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none resize-none"
            />

            {/* Poll Option Inputs */}
            {!isQuestion && showPollInput && (
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-500/30 space-y-2">
                <div className="text-xs font-bold text-purple-900 dark:text-purple-300 flex items-center gap-1.5">
                  <BarChart2 className="w-3.5 h-3.5" /> Thêm bình chọn (Poll)
                </div>
                {pollOptions.map((opt, idx) => (
                  <input
                    key={idx}
                    type="text"
                    placeholder={`Lựa chọn ${idx + 1}...`}
                    value={opt}
                    onChange={(e) => {
                      const newOpts = [...pollOptions];
                      newOpts[idx] = e.target.value;
                      setPollOptions(newOpts);
                    }}
                    className="w-full bg-white dark:bg-[#16161f] border border-zinc-200 dark:border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-purple-500"
                  />
                ))}
                {pollOptions.length < 5 && (
                  <button
                    type="button"
                    onClick={() => setPollOptions([...pollOptions, ''])}
                    className="text-[11px] text-purple-600 dark:text-purple-400 hover:underline font-semibold"
                  >
                    + Thêm lựa chọn khác
                  </button>
                )}
              </div>
            )}

            {/* Tags & Categories selection */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-200 dark:border-white/[0.06]">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-zinc-100 dark:bg-[#181822] border border-zinc-200 dark:border-white/10 text-xs text-zinc-800 dark:text-zinc-200 rounded-lg px-2 py-1.5 focus:outline-none"
              >
                {activeCommunity.categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              {/* Tags Badge List */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {tags.map(t => (
                  <span key={t} className="bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                    #{t}
                    <button type="button" onClick={() => handleRemoveTag(t)}>×</button>
                  </span>
                ))}
              </div>

              {/* Tag input */}
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  placeholder="Thêm tag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  className="bg-zinc-100 dark:bg-[#181822] border border-zinc-200 dark:border-white/10 text-[11px] text-zinc-800 dark:text-zinc-300 rounded-lg px-2 py-1 w-24 focus:outline-none"
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsQuestion(!isQuestion);
                    if (!isQuestion) setShowPollInput(false);
                  }}
                  className={`p-2 rounded-lg text-xs flex items-center gap-1 transition-all ${
                    isQuestion
                      ? 'bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-500'
                      : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5'
                  }`}
                  title="Đăng dưới dạng câu hỏi cần giải đáp"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Câu hỏi</span>
                </button>
                {!isQuestion && (
                <button
                  type="button"
                  onClick={() => setShowPollInput(!showPollInput)}
                  className={`p-2 rounded-lg text-xs flex items-center gap-1 transition-all ${
                    showPollInput
                      ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-500'
                      : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5'
                  }`}
                  title="Thêm bình chọn"
                >
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Poll</span>
                </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingPost(false)}
                  className="px-3 py-1.5 text-xs text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={!title.trim() || !content.trim()}
                  className="h-7 px-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white rounded-md text-[11px] font-semibold flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
                >
                  <Send className="w-3 h-3" />
                  <span>{isQuestion ? 'Đăng câu hỏi (+20 XP)' : 'Đăng bài'}</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        <Filter className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                isSelected
                  ? 'bg-purple-600 text-white shadow-purple-glow-sm font-semibold'
                  : 'bg-white dark:bg-[#121217] hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 border border-zinc-200 dark:border-white/[0.06]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="v-card p-12 text-center text-zinc-500 text-xs">
            {selectedCategory === 'Câu hỏi'
              ? 'Chưa có câu hỏi nào. Hãy là người đầu tiên đặt câu hỏi!'
              : 'Chưa có bài viết nào trong danh mục này. Hãy là người đầu tiên chia sẻ!'}
          </div>
        ) : (
          filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  );
};
