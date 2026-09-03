import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MarkdownRenderer } from '../common/MarkdownRenderer';
import { QADetailModal } from './QADetailModal';
import {
  HelpCircle,
  CheckCircle2,
  Heart,
  MessageSquare,
  Plus,
  X,
  Sparkles
} from 'lucide-react';

export const QAView: React.FC = () => {
  const {
    activeCommunityId,
    qaThreads,
    createQAQuestion,
    toggleUpvoteQA,
    toggleSolveQA,
    currentUser,
    setInspectedUser
  } = useApp();

  const [isAsking, setIsAsking] = useState(false);
  const [question, setQuestion] = useState('');
  const [details, setDetails] = useState('');
  const [category, setCategory] = useState('Chung');
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);

  const communityThreads = qaThreads.filter(t => t.communityId === activeCommunityId);
  const activeThread = qaThreads.find(t => t.id === selectedThreadId) || null;

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    createQAQuestion(question, details, category);
    setQuestion('');
    setDetails('');
    setIsAsking(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span>Hỏi & Đáp Kỹ Thuật (Q&A)</span>
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
            Không gian giải đáp khúc mắc về code, kiến trúc hệ thống và nhận lời khuyên từ Mentor.
          </p>
        </div>

        <button
          onClick={() => setIsAsking(true)}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-purple-glow shrink-0 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Đặt câu hỏi mới</span>
        </button>
      </div>

      {/* Ask Question Modal */}
      {isAsking && (
        <div className="v-card p-5 border-purple-400 dark:border-purple-500/40 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/[0.08] pb-3">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>Tạo câu hỏi mới</span>
            </h3>
            <button onClick={() => setIsAsking(false)} className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleAsk} className="space-y-3">
            <input
              type="text"
              placeholder="Vấn đề ngắn gọn bạn đang gặp phải? (Ví dụ: Lỗi CORS khi gọi Claude API từ Next.js)"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full bg-white dark:bg-[#16161f] border border-zinc-200 dark:border-white/10 rounded-xl p-3 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-purple-500"
              autoFocus
            />

            <textarea
              placeholder="Mô tả chi tiết: code snippet, thông báo lỗi cụ thể và những gì bạn đã thử..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={4}
              className="w-full bg-white dark:bg-[#16161f] border border-zinc-200 dark:border-white/10 rounded-xl p-3 text-xs text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-purple-500 resize-none"
            />

            <div className="flex items-center justify-between pt-2">
              <input
                type="text"
                placeholder="Chủ đề (ví dụ: LangGraph, Next.js, Docker)..."
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-white dark:bg-[#16161f] border border-zinc-200 dark:border-white/10 rounded-xl px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none"
              />

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAsking(false)}
                  className="px-3 py-1.5 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-white"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={!question.trim()}
                  className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-purple-glow"
                >
                  Đăng câu hỏi (+20 XP)
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Threads List */}
      <div className="space-y-4">
        {communityThreads.map((thread) => {
          const hasUpvoted = thread.upvotedByUserIds.includes(currentUser.id);
          const canManage = currentUser.role === 'ADMIN' || currentUser.id === thread.author.id;

          return (
            <div
              key={thread.id}
              onClick={() => setSelectedThreadId(thread.id)}
              className="v-card p-5 space-y-3 cursor-pointer select-none hover:border-zinc-300 dark:hover:border-white/20 transition-all group"
            >
              {/* Header: Status badge, Category pill & Timestamp */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  {thread.isSolved ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (canManage) toggleSolveQA(thread.id);
                      }}
                      className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border transition-all ${
                        canManage ? 'cursor-pointer hover:opacity-85 active:scale-95' : 'cursor-default'
                      } bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300/80 dark:border-emerald-800/60`}
                      title={canManage ? 'Bấm để đổi trạng thái câu hỏi' : 'Câu hỏi đã được giải quyết'}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Đã giải quyết</span>
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (canManage) toggleSolveQA(thread.id);
                      }}
                      className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border transition-all ${
                        canManage ? 'cursor-pointer hover:opacity-85 active:scale-95' : 'cursor-default'
                      } bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300/80 dark:border-amber-800/60`}
                      title={canManage ? 'Bấm để đánh dấu đã giải quyết' : 'Đang chờ các thành viên trả lời'}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      <span>Đang chờ câu trả lời</span>
                    </button>
                  )}

                  <span className="badge-linear-zinc text-[11px]">
                    {thread.category}
                  </span>
                </div>

                <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono">
                  {thread.createdAt}
                </span>
              </div>

              {/* Title & Question details */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors leading-snug tracking-tight">
                  {thread.question}
                </h3>
                <div className="mt-2 text-zinc-600 dark:text-zinc-300 text-xs leading-relaxed line-clamp-2">
                  <MarkdownRenderer content={thread.details} />
                </div>
              </div>

              {/* Footer Bar: Author on left, Heart & Answers on right */}
              <div className="pt-2 border-t border-zinc-100 dark:border-white/[0.04] flex items-center justify-between flex-wrap gap-3">
                {/* Author */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setInspectedUser(thread.author);
                  }}
                  className="flex items-center gap-2 cursor-pointer group/author"
                  title={`Xem trang cá nhân của ${thread.author.name}`}
                >
                  <img
                    src={thread.author.avatar}
                    alt={thread.author.name}
                    className="w-6 h-6 rounded-lg object-cover ring-1 ring-zinc-200 dark:ring-white/10 group-hover/author:ring-purple-400 transition-all"
                  />
                  <span className="text-xs text-zinc-600 dark:text-zinc-400 group-hover/author:text-purple-600 dark:group-hover/author:text-purple-300 transition-colors">
                    bởi <span className="font-semibold text-zinc-900 dark:text-zinc-200">{thread.author.name}</span>
                  </span>
                </div>

                {/* Actions: Heart & Answers */}
                <div className="flex items-center gap-5">
                  {/* Thả tim */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleUpvoteQA(thread.id);
                    }}
                    className={`group/heart flex items-center gap-1.5 transition-colors cursor-pointer active:scale-90 ${
                      hasUpvoted
                        ? 'text-rose-500'
                        : 'text-zinc-500 hover:text-rose-500 dark:text-zinc-400 dark:hover:text-rose-400'
                    }`}
                    title={hasUpvoted ? 'Bỏ thích' : 'Thả tim'}
                  >
                    <Heart className={`w-4 h-4 transition-transform duration-150 group-hover/heart:scale-110 ${hasUpvoted ? 'fill-rose-500 text-rose-500' : ''}`} />
                    <span className="font-mono text-xs font-semibold">{thread.upvotesCount}</span>
                  </button>

                  {/* Số câu trả lời */}
                  <div
                    className="flex items-center gap-1.5 text-zinc-500 group-hover:text-purple-600 dark:text-zinc-400 dark:group-hover:text-purple-300 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 transition-transform duration-150 group-hover:scale-110" />
                    <span className="font-mono text-xs font-semibold">{thread.answers.length}</span>
                    <span className="text-xs font-medium">Câu trả lời</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Q&A Detail Modal (Popup full Q&A thread and answers) */}
      {activeThread && (
        <QADetailModal
          thread={activeThread}
          onClose={() => setSelectedThreadId(null)}
        />
      )}
    </div>
  );
};
