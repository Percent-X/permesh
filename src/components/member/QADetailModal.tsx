import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useApp } from '../../context/AppContext';
import { QAThread } from '../../types';
import { MarkdownRenderer } from '../common/MarkdownRenderer';
import {
  X,
  CheckCircle2,
  Heart,
  MessageSquare,
  Send,
  HelpCircle
} from 'lucide-react';

interface QADetailModalProps {
  thread: QAThread;
  onClose: () => void;
}

export const QADetailModal: React.FC<QADetailModalProps> = ({ thread, onClose }) => {
  const {
    currentUser,
    toggleUpvoteQA,
    toggleSolveQA,
    addQAAnswer,
    setInspectedUser
  } = useApp();

  const [answerText, setAnswerText] = useState('');

  const hasUpvoted = thread.upvotedByUserIds.includes(currentUser.id);
  const canManage = currentUser.role === 'ADMIN' || currentUser.id === thread.author.id;

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSendAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answerText.trim()) return;
    addQAAnswer(thread.id, answerText.trim());
    setAnswerText('');
  };

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-zinc-900/25 dark:bg-black/45 transition-all duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#0a0718] border border-zinc-200 dark:border-white/10 rounded-2xl w-full max-w-3xl max-h-[88vh] flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.18)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_35px_rgba(110,86,207,0.2)] ring-1 ring-zinc-300/70 dark:ring-white/15 overflow-hidden animate-modal-in"
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-zinc-200/80 dark:border-white/[0.08] flex items-center justify-between gap-3 bg-zinc-50/50 dark:bg-white/[0.02]">
          <div className="flex items-center gap-2.5 flex-wrap">
            {thread.isSolved ? (
              <button
                onClick={() => (canManage ? toggleSolveQA(thread.id) : null)}
                className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border transition-all ${
                  canManage ? 'cursor-pointer hover:opacity-85 active:scale-95' : 'cursor-default'
                } bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300/80 dark:border-emerald-800/60`}
                title={canManage ? 'Bấm để mở lại câu hỏi' : 'Câu hỏi đã giải quyết'}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Đã giải quyết</span>
              </button>
            ) : (
              <button
                onClick={() => (canManage ? toggleSolveQA(thread.id) : null)}
                className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border transition-all ${
                  canManage ? 'cursor-pointer hover:opacity-85 active:scale-95' : 'cursor-default'
                } bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300/80 dark:border-amber-800/60`}
                title={canManage ? 'Bấm để đánh dấu đã giải quyết' : 'Đang chờ câu trả lời'}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span>Đang chờ câu trả lời</span>
              </button>
            )}

            <span className="badge-linear-zinc text-[11px]">
              {thread.category}
            </span>

            <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono">
              {thread.createdAt}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-white/[0.06] hover:bg-zinc-200 dark:hover:bg-white/10 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
            title="Đóng (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Author info */}
          <div
            onClick={() => setInspectedUser(thread.author)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img
              src={thread.author.avatar}
              alt={thread.author.name}
              className="w-10 h-10 rounded-xl object-cover ring-1 ring-zinc-200 dark:ring-white/10 group-hover:ring-purple-400 transition-all"
            />
            <div>
              <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors flex items-center gap-1.5">
                {thread.author.name}
                {thread.author.badges[0] && (
                  <span className="text-[10px] text-purple-700 dark:text-purple-400 bg-purple-100 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-800/40 px-1.5 py-0.2 rounded font-normal">
                    {thread.author.badges[0]}
                  </span>
                )}
              </div>
              <div className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono">@{thread.author.username}</div>
            </div>
          </div>

          {/* Question Title */}
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-snug">
            {thread.question}
          </h2>

          {/* Question Details */}
          <div className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed bg-zinc-50/50 dark:bg-white/[0.015] p-4 rounded-xl border border-zinc-200/60 dark:border-white/[0.04]">
            <MarkdownRenderer content={thread.details} />
          </div>

          {/* Thread Actions & Stats Bar */}
          <div className="py-2.5 border-y border-zinc-200/80 dark:border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-900 dark:text-zinc-200">
              <MessageSquare className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>{thread.answers.length} Câu trả lời</span>
            </div>

            <button
              onClick={() => toggleUpvoteQA(thread.id)}
              className={`group flex items-center gap-1.5 transition-colors cursor-pointer active:scale-90 ${
                hasUpvoted
                  ? 'text-rose-500'
                  : 'text-zinc-500 hover:text-rose-500 dark:text-zinc-400 dark:hover:text-rose-400'
              }`}
              title={hasUpvoted ? 'Bỏ thích' : 'Thả tim câu hỏi'}
            >
              <Heart className={`w-4 h-4 transition-transform duration-150 group-hover:scale-110 ${hasUpvoted ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span className="font-mono text-xs font-semibold">{thread.upvotesCount}</span>
            </button>
          </div>

          {/* Answers List */}
          <div className="space-y-3">
            {thread.answers.length === 0 ? (
              <div className="py-8 text-center space-y-2">
                <HelpCircle className="w-8 h-8 text-zinc-300 dark:text-zinc-600 mx-auto" />
                <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Chưa có câu trả lời nào</p>
                <p className="text-[11px] text-zinc-400 dark:text-zinc-500">Hãy là người đầu tiên chia sẻ giải pháp hoặc gợi ý cho câu hỏi này!</p>
              </div>
            ) : (
              thread.answers.map((ans) => (
                <div
                  key={ans.id}
                  className="p-4 rounded-xl border border-zinc-200/80 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div
                      onClick={() => setInspectedUser(ans.author)}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <img
                        src={ans.author.avatar}
                        alt={ans.author.name}
                        className="w-7 h-7 rounded-lg object-cover ring-1 ring-zinc-200 dark:ring-white/10 group-hover:ring-purple-400 transition-all"
                      />
                      <span className="font-bold text-xs text-zinc-900 dark:text-zinc-200 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                        {ans.author.name}
                      </span>
                    </div>
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">{ans.createdAt}</span>
                  </div>
                  <div className="text-xs text-zinc-800 dark:text-zinc-300 leading-relaxed pl-9">
                    <MarkdownRenderer content={ans.content} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sticky Bottom Form */}
        <form
          onSubmit={handleSendAnswer}
          className="p-4 border-t border-zinc-200/80 dark:border-white/[0.08] bg-zinc-50/80 dark:bg-[#0a0718] flex items-center gap-2.5"
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-xl object-cover ring-1 ring-zinc-200 dark:ring-white/10 shrink-0"
          />
          <input
            type="text"
            placeholder="Viết câu trả lời hoặc đề xuất giải pháp..."
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            className="flex-1 bg-white dark:bg-[#120e24] border border-zinc-200 dark:border-white/10 rounded-xl px-3.5 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-purple-glow shrink-0 transition-all active:scale-95 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Gửi</span>
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};
