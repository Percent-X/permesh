import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Challenge } from '../../types';
import { MarkdownRenderer } from '../common/MarkdownRenderer';
import {
  Trophy,
  Flame,
  Send,
  Link as LinkIcon,
  Heart,
  Plus,
  Sparkles,
  Users,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Filter
} from 'lucide-react';

export const ChallengesView: React.FC<{ onOpenChallengeEditor?: () => void }> = ({ onOpenChallengeEditor }) => {
  const {
    activeCommunityId,
    challenges,
    submitChallengeProof,
    toggleLikeSubmission,
    currentUser,
    activeRole,
    setInspectedUser
  } = useApp();

  const communityChallenges = challenges.filter(c => c.communityId === activeCommunityId);
  const [selectedChallenge] = useState<Challenge | null>(communityChallenges[0] || null);

  // Filter states
  const [activeWeek, setActiveWeek] = useState<number | 'ALL'>('ALL');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'TODAY' | 'COMPLETED'>('ALL');

  // Open/collapsed state for each day card. Default open the active day (14)
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({ 14: true });

  // Submission form per day state
  const [proofInputs, setProofInputs] = useState<Record<number, { text: string; link: string }>>({});

  const isCreator = activeRole === 'CREATOR';

  if (!selectedChallenge) {
    return (
      <div className="v-card p-12 text-center">
        <Trophy className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-3 opacity-60" />
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Chưa có thử thách nào đang chạy</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto">
          Cộng đồng hiện chưa có thử thách (Challenges) nào.
        </p>
        {isCreator && onOpenChallengeEditor && (
          <button
            onClick={onOpenChallengeEditor}
            className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold shadow-purple-glow"
          >
            + Tạo Thử thách Mới
          </button>
        )}
      </div>
    );
  }

  const toggleDayAccordion = (dayNum: number) => {
    setExpandedDays(prev => ({ ...prev, [dayNum]: !prev[dayNum] }));
  };

  const handleInputChange = (dayNum: number, field: 'text' | 'link', val: string) => {
    setProofInputs(prev => ({
      ...prev,
      [dayNum]: {
        text: field === 'text' ? val : (prev[dayNum]?.text || ''),
        link: field === 'link' ? val : (prev[dayNum]?.link || '')
      }
    }));
  };

  const handleSubmitProof = (e: React.FormEvent, dayNum: number) => {
    e.preventDefault();
    const input = proofInputs[dayNum];
    if (!input || !input.text.trim()) return;

    submitChallengeProof(selectedChallenge.id, dayNum, input.text, input.link);
    setProofInputs(prev => ({ ...prev, [dayNum]: { text: '', link: '' } }));
  };

  // Build full 30 days list
  const allDays = Array.from({ length: selectedChallenge.durationDays }, (_, idx) => {
    const dayNum = idx + 1;
    const prompt = selectedChallenge.dailyPrompts.find(p => p.day === dayNum) || {
      day: dayNum,
      title: `Ngày ${dayNum}: Tối ưu hóa & Phát triển tính năng mới`,
      description: 'Dành tối thiểu 45 phút tập trung code, cập nhật tiến độ và chia sẻ những gì bạn đã hoàn thành hôm nay.'
    };
    const isToday = dayNum === selectedChallenge.currentDay;
    const isPast = dayNum < selectedChallenge.currentDay;
    const isFuture = dayNum > selectedChallenge.currentDay;
    const submissions = selectedChallenge.submissions.filter(s => s.day === dayNum);
    const hasMySubmission = submissions.some(s => s.author.id === currentUser.id);

    return {
      dayNum,
      prompt,
      isToday,
      isPast,
      isFuture,
      submissions,
      hasMySubmission
    };
  });

  // Apply filters
  const filteredDays = allDays.filter(day => {
    if (activeWeek !== 'ALL') {
      const weekNum = Math.ceil(day.dayNum / 7);
      if (weekNum !== activeWeek) return false;
    }
    if (filterStatus === 'TODAY' && !day.isToday) return false;
    if (filterStatus === 'COMPLETED' && !day.hasMySubmission && !day.isPast) return false;
    return true;
  });

  return (
    <div className="space-y-6 w-full">
      {/* Banner */}
      <div className="v-card p-6 sm:p-8 relative overflow-hidden bg-gradient-to-br from-purple-100/90 via-white to-indigo-100/60 dark:from-purple-950/40 dark:via-[#111118] dark:to-indigo-950/40 border-purple-200 dark:border-purple-500/30 shadow-sm">
        <div className="absolute right-0 top-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="badge-linear-purple">
                <Flame className="w-3.5 h-3.5 fill-purple-500 text-purple-500" />
                <span>Ngày {selectedChallenge.currentDay} / {selectedChallenge.durationDays}</span>
              </span>
              <span className="badge-linear-emerald">
                <Trophy className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Chứng chỉ Top Builder</span>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              {selectedChallenge.title}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {selectedChallenge.description}
            </p>

            {/* Overall Progress Bar */}
            <div className="pt-2 max-w-md">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-1.5">
                <span>Tiến độ thử thách cộng đồng</span>
                <span className="font-bold text-purple-700 dark:text-purple-300">
                  {Math.round((selectedChallenge.currentDay / selectedChallenge.durationDays) * 100)}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden p-[1px]">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 rounded-full shadow-purple-glow-sm transition-all duration-500"
                  style={{ width: `${(selectedChallenge.currentDay / selectedChallenge.durationDays) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <div className="text-left sm:text-right">
              <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 sm:justify-end">
                <Users className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>{selectedChallenge.participantsCount} thành viên tham gia</span>
              </div>
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">Đang tham gia ✓</div>
            </div>

            {isCreator && onOpenChallengeEditor && (
              <button
                onClick={onOpenChallengeEditor}
                className="px-3.5 py-2 bg-purple-100 dark:bg-purple-600/20 hover:bg-purple-200 dark:hover:bg-purple-600/40 border border-purple-300 dark:border-purple-500/40 text-purple-700 dark:text-purple-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Tạo Thử thách</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Week & Status Filter Controls */}
      <div className="v-card p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Week Selector Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mr-1 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> Tuần:
            </span>
            <button
              onClick={() => setActiveWeek('ALL')}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                activeWeek === 'ALL'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              Tất cả (D1-D30)
            </button>
            {[1, 2, 3, 4, 5].map(wk => (
              <button
                key={wk}
                onClick={() => setActiveWeek(wk)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  activeWeek === wk
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                Tuần {wk}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setFilterStatus('ALL')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                filterStatus === 'ALL'
                  ? 'text-purple-700 dark:text-purple-300 font-bold bg-purple-100 dark:bg-purple-950/60'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setFilterStatus('TODAY')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                filterStatus === 'TODAY'
                  ? 'text-purple-700 dark:text-purple-300 font-bold bg-purple-100 dark:bg-purple-950/60'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              Hôm nay (D14)
            </button>
            <button
              onClick={() => setFilterStatus('COMPLETED')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                filterStatus === 'COMPLETED'
                  ? 'text-purple-700 dark:text-purple-300 font-bold bg-purple-100 dark:bg-purple-950/60'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              Đã qua
            </button>
          </div>
        </div>
      </div>

      {/* Vertical Timeline List (Dạng List Dọc) */}
      <div className="space-y-4 relative">
        {filteredDays.map((day) => {
          const isExpanded = expandedDays[day.dayNum] ?? (day.isToday || day.dayNum === 1);
          const currentInput = proofInputs[day.dayNum] || { text: '', link: '' };

          return (
            <div
              key={day.dayNum}
              className={`v-card overflow-hidden transition-all duration-200 ${
                day.isToday
                  ? 'border-purple-400 dark:border-purple-500/60 shadow-[0_0_20px_rgba(168,85,247,0.15)] ring-1 ring-purple-400/40'
                  : day.hasMySubmission
                  ? 'border-emerald-200 dark:border-emerald-500/30'
                  : 'hover:border-zinc-300 dark:hover:border-white/20'
              }`}
            >
              {/* Day Header Row (Always Visible & Clickable) */}
              <div
                onClick={() => toggleDayAccordion(day.dayNum)}
                className={`p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none transition-colors ${
                  day.isToday
                    ? 'bg-purple-50/70 dark:bg-purple-950/20'
                    : 'hover:bg-zinc-50/80 dark:hover:bg-white/[0.02]'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Status Beacon / Icon */}
                  <div className="shrink-0">
                    {day.isToday ? (
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-purple-glow ring-2 ring-purple-400/60 animate-pulse-subtle">
                        <Flame className="w-5 h-5 fill-amber-300 text-amber-300" />
                      </div>
                    ) : day.hasMySubmission || day.isPast ? (
                      <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center font-bold text-xs">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border border-zinc-200 dark:border-white/10 flex items-center justify-center font-bold text-xs font-mono">
                        D{day.dayNum}
                      </div>
                    )}
                  </div>

                  {/* Day Info & Title */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                        day.isToday
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                      }`}>
                        Ngày {day.dayNum < 10 ? `0${day.dayNum}` : day.dayNum}
                      </span>

                      {day.isToday && (
                        <span className="badge-linear-purple">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                          <span>Hôm nay</span>
                        </span>
                      )}

                      {day.hasMySubmission && (
                        <span className="badge-linear-emerald">
                          <span>Đã nộp bài ✓</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 mt-1 truncate">
                      {day.prompt.title}
                    </h3>
                  </div>
                </div>

                {/* Right side stats & Toggle */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="hidden sm:flex flex-col items-end text-right">
                    <span className="text-xs font-mono font-bold text-purple-700 dark:text-purple-300">
                      {day.submissions.length} bài nộp
                    </span>
                    <span className="text-[10px] text-zinc-400">
                      {day.hasMySubmission ? 'Đã hoàn thành' : 'Chưa nộp'}
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 flex items-center justify-center text-zinc-500">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Day Collapsible Detail Section */}
              {isExpanded && (
                <div className="p-5 sm:p-6 border-t border-zinc-200 dark:border-white/[0.08] bg-zinc-50/50 dark:bg-[#0f0f15] space-y-6">
                  {/* Detailed Description */}
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                      Mục tiêu & hướng dẫn ngày {day.dayNum}
                    </div>
                    <div className="bg-white dark:bg-white/[0.02] p-4 rounded-xl border border-zinc-200 dark:border-white/[0.06]">
                      <MarkdownRenderer content={day.prompt.description} />
                    </div>
                  </div>

                  {/* Submit Proof Form */}
                  <form onSubmit={(e) => handleSubmitProof(e, day.dayNum)} className="v-card p-4 sm:p-5 space-y-3 bg-white dark:bg-[#12121a]">
                    <div className="flex items-center justify-between text-xs font-bold text-zinc-900 dark:text-zinc-200">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <span>Báo cáo tiến độ & nộp bài Ngày {day.dayNum}</span>
                      </span>
                    </div>

                    <textarea
                      placeholder={`Chia sẻ kết quả bạn đã làm được trong Ngày ${day.dayNum} (Code, giải pháp, khó khăn đã vượt qua)...`}
                      value={currentInput.text}
                      onChange={(e) => handleInputChange(day.dayNum, 'text', e.target.value)}
                      rows={3}
                      className="w-full bg-zinc-50 dark:bg-[#16161f] border border-zinc-200 dark:border-white/10 rounded-xl p-3 text-xs text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-purple-500 resize-none"
                    />

                    <div className="flex items-center gap-2 bg-zinc-50 dark:bg-[#16161f] border border-zinc-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs">
                      <LinkIcon className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <input
                        type="url"
                        placeholder="Link GitHub repo / Live Demo / Post chia sẻ (Tùy chọn)..."
                        value={currentInput.link}
                        onChange={(e) => handleInputChange(day.dayNum, 'link', e.target.value)}
                        className="w-full bg-transparent text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!currentInput.text.trim()}
                      className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-purple-glow transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Nộp Báo Cáo Ngày {day.dayNum}</span>
                    </button>
                  </form>

                  {/* Community Submissions Stream for this Day */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300 font-mono">
                      <span>Bài nộp của cộng đồng ({day.submissions.length})</span>
                    </div>

                    {day.submissions.length === 0 ? (
                      <div className="text-center py-6 text-zinc-500 text-xs bg-white dark:bg-white/[0.01] rounded-xl border border-zinc-200 dark:border-white/[0.04]">
                        Chưa có thành viên nào nộp bài cho Ngày {day.dayNum}. Hãy là người đầu tiên!
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {day.submissions.map((sub) => {
                          const hasLiked = sub.likedByUserIds.includes(currentUser.id);
                          return (
                            <div
                              key={sub.id}
                              className="v-card p-4 space-y-2.5 bg-white dark:bg-[#14141c] hover:border-zinc-300 dark:hover:border-white/20 transition-all"
                            >
                              <div className="flex items-center justify-between">
                                <div
                                  onClick={() => setInspectedUser(sub.author)}
                                  className="flex items-center gap-2.5 cursor-pointer group"
                                >
                                  <img src={sub.author.avatar} alt={sub.author.name} className="w-8 h-8 rounded-lg object-cover ring-1 ring-zinc-200 dark:ring-white/10" />
                                  <div>
                                    <div className="text-xs font-bold text-zinc-900 dark:text-zinc-200 group-hover:text-purple-600 dark:group-hover:text-purple-300">
                                      {sub.author.name}
                                    </div>
                                    <div className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
                                      {sub.submittedAt}
                                    </div>
                                  </div>
                                </div>

                                {/* Like Button */}
                                <button
                                  onClick={() => toggleLikeSubmission(selectedChallenge.id, sub.id)}
                                  className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border transition-all ${
                                    hasLiked
                                      ? 'bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 border-pink-300 dark:border-pink-700/50 shadow-sm'
                                      : 'bg-zinc-100 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 hover:text-pink-600 dark:hover:text-pink-300 border-zinc-200 dark:border-white/[0.06]'
                                  }`}
                                >
                                  <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-pink-500 text-pink-500' : ''}`} />
                                  <span className="font-mono font-semibold">{sub.likesCount}</span>
                                </button>
                              </div>

                              <MarkdownRenderer content={sub.content} />

                              {sub.linkUrl && (
                                <a
                                  href={sub.linkUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[11px] text-purple-700 dark:text-purple-400 hover:underline font-mono bg-purple-50 dark:bg-purple-950/40 px-2.5 py-1 rounded-lg border border-purple-200 dark:border-purple-800/40"
                                >
                                  <LinkIcon className="w-3 h-3" />
                                  <span>{sub.linkUrl}</span>
                                </a>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
