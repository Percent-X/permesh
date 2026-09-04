import React, { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MarkdownRenderer } from '../common/MarkdownRenderer';
import {
  Globe,
  FileText,
  Star,
  Inbox,
  ChevronDown,
  Search,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Send,
  ThumbsUp,
  Flag,
  BookOpen,
  MessageSquareWarning,
  Lightbulb,
  Trash2,
} from 'lucide-react';

export type SupportTabId = 'guide' | 'rules' | 'reviews' | 'feedback';

interface GuideItem {
  id: string;
  title: string;
  content: string;
}

interface LocalReview {
  id: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  content: string;
  createdAt: string;
  helpfulCount: number;
  helpfulByMe: boolean;
  isMine?: boolean;
}

interface LocalFeedback {
  id: string;
  type: 'suggestion' | 'complaint' | 'bug' | 'other';
  title: string;
  content: string;
  status: 'pending' | 'replied' | 'closed';
  reply?: string;
  createdAt: string;
  isMine?: boolean;
}

const GUIDE_ITEMS: GuideItem[] = [
  {
    id: 'g1',
    title: 'Làm quen với Bảng tin (Feed) & Check-in giữ Streak',
    content: `**Bảng tin** là nơi cập nhật thông báo, showcase và thảo luận.\n\n1. Bấm **Check-in hàng ngày** ở cột bên phải (hoặc nút Streak trên TopBar) để giữ chuỗi Streak và nhận +100 XP.\n2. Thả tim, bình luận để tăng điểm hoạt động — điểm này hiển thị trên heatmap GitHub-style ở trang Profile.\n3. Bài ghim (Pinned) luôn là thông báo quan trọng nhất — đọc trước khi hỏi.`,
  },
  {
    id: 'g2',
    title: 'Học trong Classroom như thế nào cho hiệu quả?',
    content: `1. Vào tab **Khóa học (Classroom)** → chọn khóa học → xem từng bài theo thứ tự.\n2. Bài có nhãn **Free Preview** xem được ngay, bài còn lại cần là thành viên.\n3. Tick **Hoàn thành** sau mỗi bài để mở khóa tiến độ và nhận confetti + XP.\n4. Tài liệu đính kèm (slide, PDF) nằm ngay dưới nội dung bài học.`,
  },
  {
    id: 'g3',
    title: 'Tham gia Thử thách 30 ngày & nộp bài',
    content: `1. Vào **Thử thách 30 ngày** → bấm **Tham gia**.\n2. Mỗi ngày có 1 đề bài (prompt). Bấm vào ngày hiện tại → viết tiến độ + dán link GitHub/demo.\n3. Nộp bài đều giúp tăng điểm và có cơ hội showcase ở Demo Day.\n4. Thả tim bài nộp của nhau để tạo động lực — ai cũng thích được ghi nhận.`,
  },
  {
    id: 'g4',
    title: 'Đặt câu hỏi kỹ thuật đúng cách (Q&A)',
    content: `1. Vào **Hỏi đáp kỹ thuật (Q&A)** → **Đặt câu hỏi mới**.\n2. Tiêu đề ngắn gọn, nêu đúng lỗi (VD: *Lỗi CORS khi gọi Claude API từ Next.js*).\n3. Phần chi tiết ghi rõ: code snippet, thông báo lỗi, những gì đã thử.\n4. Khi được giải đáp, nhờ Mentor bấm **Đã giải quyết** để đóng thread.`,
  },
  {
    id: 'g5',
    title: 'Sự kiện, Tài nguyên & Xếp hạng thành viên',
    content: `- **Lịch & sự kiện:** bấm RSVP để giữ chỗ. Link Meet/Zoom hiện khi bạn đã RSVP.\n- **Thư viện tài nguyên:** tải Ebook, template, UI kit. Creator có thể đăng tài nguyên mới.\n- **Thành viên & Xếp hạng:** bảng xếp hạng theo điểm XP và streak. Bấm vào avatar bất kỳ để xem profile.`,
  },
  {
    id: 'g6',
    title: 'Tài khoản, gói PRO & thanh toán',
    content: `1. Cộng đồng có bản **Miễn phí** và bản **PRO** (trả phí theo tháng).\n2. Bấm **Nâng cấp Thành viên** trên banner cộng đồng → nhập mã coupon (nếu có) → thanh toán.\n3. Mã giảm giá lấy ở tab **Quản lý Coupon** (dành cho Creator) hoặc từ sự kiện.\n4. Gặp lỗi thanh toán? Gửi **Góp ý & Khiếu nại** loại *Báo lỗi* để được hỗ trợ.`,
  },
];

const MOCK_REVIEWS: LocalReview[] = [
  {
    id: 'rv1',
    authorName: 'Minh Quang',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    content: 'Khóa LangGraph rất thực chiến, mình áp dụng ngay được cho dự án e-commerce. Mentor trả lời Q&A siêu nhanh.',
    createdAt: '2 ngày trước',
    helpfulCount: 24,
    helpfulByMe: false,
  },
  {
    id: 'rv2',
    authorName: 'Lan Anh Hoang',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    content: 'UI kit Figma + bài Figma to Code đáng tiền. Cộng đồng văn minh, ít spam, showcase chất lượng.',
    createdAt: '1 tuần trước',
    helpfulCount: 18,
    helpfulByMe: false,
  },
  {
    id: 'rv3',
    authorName: 'Sarah Tran',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 4,
    content: 'Thử thách 30 ngày tạo kỷ luật tốt. Mong có thêm buổi review 1-1 cho người mới.',
    createdAt: '2 tuần trước',
    helpfulCount: 9,
    helpfulByMe: false,
  },
];

const MOCK_FEEDBACKS: LocalFeedback[] = [
  {
    id: 'fb1',
    type: 'suggestion',
    title: 'Mong có thêm tag Lộ trình học cho người mới',
    content: 'Mình là newbie, hơi ngợp khi vào Classroom. Nếu có lộ trình gợi ý theo level thì tuyệt.',
    status: 'replied',
    reply: 'Cảm ơn bạn! Team đã thêm nhãn Beginner / Intermediate / Advanced cho từng khóa học. Lộ trình chi tiết sẽ ra mắt tuần sau.',
    createdAt: '3 ngày trước',
  },
  {
    id: 'fb2',
    type: 'bug',
    title: 'Video bài 2.1 đôi lúc không load trên Safari',
    content: 'Mình dùng Safari thì video đứng ở 0:00, phải reload 2-3 lần mới chạy.',
    status: 'pending',
    createdAt: '1 ngày trước',
  },
];

const FEEDBACK_TYPE_META: Record<LocalFeedback['type'], { label: string; color: string }> = {
  suggestion: { label: 'Góp ý', color: 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border-sky-300/70 dark:border-sky-800/60' },
  complaint: { label: 'Khiếu nại', color: 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-300/70 dark:border-rose-800/60' },
  bug: { label: 'Báo lỗi', color: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300/70 dark:border-amber-800/60' },
  other: { label: 'Khác', color: 'bg-zinc-100 dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-300 border-zinc-300/60 dark:border-white/10' },
};

const STATUS_META: Record<LocalFeedback['status'], { label: string; icon: any; color: string }> = {
  pending: { label: 'Đang xử lý', icon: Clock, color: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300/70 dark:border-amber-800/60' },
  replied: { label: 'Đã phản hồi', icon: CheckCircle2, color: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300/70 dark:border-emerald-800/60' },
  closed: { label: 'Đã đóng', icon: Flag, color: 'bg-zinc-100 dark:bg-white/[0.06] text-zinc-500 dark:text-zinc-400 border-zinc-300/60 dark:border-white/10' },
};

function Stars({ value, size = 'w-4 h-4', onSelect }: { value: number; size?: string; onSelect?: (v: number) => void }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type={onSelect ? 'button' : undefined}
          onClick={onSelect ? () => onSelect(s) : undefined}
          className={onSelect ? 'cursor-pointer active:scale-90 transition-transform' : 'cursor-default'}
          title={`${s} sao`}
        >
          <Star
            className={`${size} transition-colors ${s <= value ? 'fill-amber-400 text-amber-400' : 'text-zinc-300 dark:text-zinc-600'}`}
          />
        </button>
      ))}
    </div>
  );
}

export const SupportView: React.FC<{ tab: SupportTabId }> = ({ tab }) => {
  const { activeCommunity, activeCommunityId, currentUser, setActiveTab } = useApp();

  // ---- Guide state ----
  const [guideQuery, setGuideQuery] = useState('');
  const [openGuideId, setOpenGuideId] = useState<string | null>('g1');

  // ---- Rules state ----
  const [rulesAccepted, setRulesAccepted] = useState(() => {
    try {
      return localStorage.getItem(`permesh_rules_accepted_${activeCommunityId}`) === '1';
    } catch {
      return false;
    }
  });

  // ---- Reviews state ----
  const [reviews, setReviews] = useState<LocalReview[]>(() => {
    try {
      const saved = localStorage.getItem(`permesh_reviews_${activeCommunityId}`);
      return saved ? (JSON.parse(saved) as LocalReview[]) : MOCK_REVIEWS;
    } catch {
      return MOCK_REVIEWS;
    }
  });
  const [myRating, setMyRating] = useState(5);
  const [myReview, setMyReview] = useState('');
  const [reviewFilter, setReviewFilter] = useState<number | 'all'>('all');

  // ---- Feedback state ----
  const [feedbacks, setFeedbacks] = useState<LocalFeedback[]>(() => {
    try {
      const saved = localStorage.getItem(`permesh_feedbacks_${activeCommunityId}`);
      return saved ? (JSON.parse(saved) as LocalFeedback[]) : MOCK_FEEDBACKS;
    } catch {
      return MOCK_FEEDBACKS;
    }
  });
  const [fbType, setFbType] = useState<LocalFeedback['type']>('suggestion');
  const [fbTitle, setFbTitle] = useState('');
  const [fbContent, setFbContent] = useState('');
  const [fbFilter, setFbFilter] = useState<'all' | LocalFeedback['status']>('all');

  const persist = (key: string, val: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch {
      /* ignore */
    }
  };

  const filteredGuides = useMemo(() => {
    const q = guideQuery.trim().toLowerCase();
    if (!q) return GUIDE_ITEMS;
    return GUIDE_ITEMS.filter((g) => g.title.toLowerCase().includes(q) || g.content.toLowerCase().includes(q));
  }, [guideQuery]);

  const reviewStats = useMemo(() => {
    const total = reviews.length || 1;
    const avg = reviews.reduce((a, r) => a + r.rating, 0) / (reviews.length || 1);
    const dist = [5, 4, 3, 2, 1].map((s) => ({
      star: s,
      count: reviews.filter((r) => r.rating === s).length,
      pct: Math.round((reviews.filter((r) => r.rating === s).length / total) * 100),
    }));
    return { avg, total: reviews.length, dist };
  }, [reviews]);

  const visibleReviews = useMemo(
    () => (reviewFilter === 'all' ? reviews : reviews.filter((r) => r.rating === reviewFilter)),
    [reviews, reviewFilter]
  );

  const visibleFeedbacks = useMemo(
    () => (fbFilter === 'all' ? feedbacks : feedbacks.filter((f) => f.status === fbFilter)),
    [feedbacks, fbFilter]
  );

  const handleAcceptRules = () => {
    const next = !rulesAccepted;
    setRulesAccepted(next);
    try {
      localStorage.setItem(`permesh_rules_accepted_${activeCommunityId}`, next ? '1' : '0');
    } catch {
      /* ignore */
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!myReview.trim()) return;
    const item: LocalReview = {
      id: `rv_${Date.now()}`,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      rating: myRating,
      content: myReview.trim(),
      createdAt: 'Vừa xong',
      helpfulCount: 0,
      helpfulByMe: false,
      isMine: true,
    };
    const next = [item, ...reviews];
    setReviews(next);
    persist(`permesh_reviews_${activeCommunityId}`, next);
    setMyReview('');
    setMyRating(5);
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fbTitle.trim() || !fbContent.trim()) return;
    const item: LocalFeedback = {
      id: `fb_${Date.now()}`,
      type: fbType,
      title: fbTitle.trim(),
      content: fbContent.trim(),
      status: 'pending',
      createdAt: 'Vừa xong',
      isMine: true,
    };
    const next = [item, ...feedbacks];
    setFeedbacks(next);
    persist(`permesh_feedbacks_${activeCommunityId}`, next);
    setFbTitle('');
    setFbContent('');
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
            {tab === 'guide' && (
              <>
                <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span>Hướng dẫn sử dụng</span>
              </>
            )}
            {tab === 'rules' && (
              <>
                <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span>Nội quy cộng đồng</span>
              </>
            )}
            {tab === 'reviews' && (
              <>
                <Star className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span>Đánh giá cộng đồng</span>
              </>
            )}
            {tab === 'feedback' && (
              <>
                <Inbox className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span>Góp ý & Khiếu nại</span>
              </>
            )}
          </h2>
          <p className="text-xs sm:text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400 mt-1">
            {tab === 'guide' && 'Mọi thao tác từ học tập, nộp bài đến thanh toán gói PRO — gói gọn trong 2 phút đọc.'}
            {tab === 'rules' && `Quy định áp dụng cho mọi thành viên của ${activeCommunity?.name || 'cộng đồng'}. Vui lòng đọc kỹ trước khi đăng bài.`}
            {tab === 'reviews' && 'Điểm số và nhận xét thật từ thành viên giúp cộng đồng ngày càng tốt hơn.'}
            {tab === 'feedback' && 'Gửi góp ý, báo lỗi hoặc khiếu nại — đội ngũ quản trị sẽ phản hồi sớm nhất có thể.'}
          </p>
        </div>

      {/* GUIDE */}
      {tab === 'guide' && (
        <div className="space-y-4">
          <div className="v-card p-4 flex items-center gap-2.5">
            <Search className="w-4 h-4 text-zinc-400 shrink-0" />
            <input
              value={guideQuery}
              onChange={(e) => setGuideQuery(e.target.value)}
              placeholder="Tìm hướng dẫn: streak, nộp bài, coupon, thanh toán..."
              className="w-full bg-transparent text-xs sm:text-[13px] text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none"
            />
          </div>

          <div className="space-y-3">
            {filteredGuides.map((g) => {
              const expanded = openGuideId === g.id;
              return (
                <div key={g.id} className={`v-card overflow-hidden ${expanded ? '!border-purple-400/60 dark:!border-purple-500/40' : ''}`}>
                  <button
                    onClick={() => setOpenGuideId(expanded ? null : g.id)}
                    className="w-full flex items-center justify-between gap-3 p-4 text-left"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800/40 flex items-center justify-center shrink-0">
                        <BookOpen className="w-3.5 h-3.5 text-purple-600 dark:text-purple-300" />
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate sm:whitespace-normal">{g.title}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${expanded ? 'rotate-180 text-purple-600' : ''}`} />
                  </button>
                  <div className={`accordion-wrapper ${expanded ? 'expanded' : ''}`}>
                    <div className="accordion-content">
                      <div className="px-4 pb-4 pl-[52px] text-xs sm:text-[13px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                        <MarkdownRenderer content={g.content} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {filteredGuides.length === 0 && (
              <div className="v-card p-8 text-center text-xs text-zinc-500">
                Không tìm thấy hướng dẫn phù hợp. Hãy gửi câu hỏi ở mục <button onClick={() => setActiveTab('feedback')} className="text-purple-600 font-semibold">Góp ý & Khiếu nại</button>.
              </div>
            )}
          </div>

          <div className="v-card p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <MessageSquareWarning className="w-4 h-4 text-amber-500" />
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Vẫn chưa rõ? Đọc nội quy hoặc gửi yêu cầu hỗ trợ trực tiếp.</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setActiveTab('rules')} className="px-3 py-1.5 rounded-xl text-xs font-medium border border-zinc-200 dark:border-white/10 hover:border-purple-400/50 transition-all">
                Xem nội quy
              </button>
              <button onClick={() => setActiveTab('feedback')} className="px-4 py-1.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#6e56cf] to-[#5e6ad2] shadow-purple-glow">
                Liên hệ hỗ trợ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RULES */}
      {tab === 'rules' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-4">
            <div className="v-card p-5 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                  Quy định của {activeCommunity?.name}
                </h3>
                <span className="badge-linear-purple"><ShieldCheck className="w-3.5 h-3.5" /> Áp dụng cho mọi thành viên</span>
              </div>
              <div className="space-y-3">
                {(activeCommunity?.rules || []).map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/70 dark:border-white/[0.06]">
                    <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 font-mono">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-[13px] leading-relaxed text-zinc-700 dark:text-zinc-300">{rule}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="v-card p-5 space-y-3">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Mức xử lý vi phạm</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { t: 'Lần 1 — Nhắc nhở', d: 'Xóa nội dung vi phạm + cảnh báo riêng.', c: 'text-amber-600 dark:text-amber-400' },
                  { t: 'Lần 2 — Hạn chế', d: 'Tạm khóa đăng bài / bình luận 7 ngày.', c: 'text-orange-600 dark:text-orange-400' },
                  { t: 'Lần 3 — Cấm vĩnh viễn', d: 'Ban khỏi cộng đồng, không hoàn phí PRO.', c: 'text-rose-600 dark:text-rose-400' },
                ].map((m) => (
                  <div key={m.t} className="p-3 rounded-xl border border-zinc-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.02]">
                    <div className={`text-xs font-bold ${m.c}`}>{m.t}</div>
                    <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">{m.d}</div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
                Thấy nội dung vi phạm? Dùng nút Báo cáo ở bài viết, hoặc gửi Khiếu nại kèm link bài viết.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="v-card p-5 space-y-3 lg:sticky lg:top-6">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Cam kết thành viên</h3>
              <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Khi bấm xác nhận, bạn đồng ý tuân thủ toàn bộ nội quy trên trong suốt thời gian tham gia cộng đồng.
              </p>
              <button
                onClick={handleAcceptRules}
                className={`w-full px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
                  rulesAccepted
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300'
                    : 'bg-gradient-to-r from-[#6e56cf] to-[#5e6ad2] text-white shadow-purple-glow'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{rulesAccepted ? 'Đã đồng ý tuân thủ nội quy' : 'Tôi đã đọc & đồng ý tuân thủ'}</span>
              </button>
              {rulesAccepted && (
                <p className="text-[11px] text-center text-emerald-600 dark:text-emerald-400 font-medium">Cảm ơn bạn đã cùng xây dựng cộng đồng văn minh.</p>
              )}
              <div className="pt-2 border-t border-zinc-100 dark:border-white/[0.06] space-y-2">
                <button onClick={() => setActiveTab('feedback')} className="w-full px-3 py-2 rounded-xl text-xs font-medium border border-zinc-200 dark:border-white/10 hover:border-purple-400/50 flex items-center justify-center gap-1.5 transition-all">
                  <Flag className="w-3.5 h-3.5" /> Báo cáo vi phạm
                </button>
                <button onClick={() => setActiveTab('guide')} className="w-full px-3 py-2 rounded-xl text-xs text-zinc-500 hover:text-purple-600 transition-colors">
                  ← Quay lại Hướng dẫn sử dụng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REVIEWS */}
      {tab === 'reviews' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-4">
            <div className="v-card p-5 space-y-4 lg:sticky lg:top-6">
              <div className="text-center space-y-1">
                <div className="text-4xl font-bold text-zinc-900 dark:text-white font-mono">{reviewStats.avg.toFixed(1)}</div>
                <div className="flex justify-center"><Stars value={Math.round(reviewStats.avg)} /></div>
                <div className="text-[11px] font-mono text-zinc-400">{reviewStats.total} đánh giá</div>
              </div>
              <div className="space-y-1.5">
                {reviewStats.dist.map((d) => (
                  <button
                    key={d.star}
                    onClick={() => setReviewFilter(reviewFilter === d.star ? 'all' : d.star)}
                    className={`w-full flex items-center gap-2 text-[11px] p-1.5 rounded-lg transition-all ${reviewFilter === d.star ? 'bg-purple-50 dark:bg-purple-950/40' : 'hover:bg-zinc-50 dark:hover:bg-white/[0.03]'}`}
                  >
                    <span className="font-mono w-6 shrink-0 text-zinc-500">{d.star}★</span>
                    <span className="flex-1 h-1.5 rounded-full bg-zinc-100 dark:bg-white/[0.07] overflow-hidden">
                      <span className="block h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500" style={{ width: `${d.pct}%` }} />
                    </span>
                    <span className="font-mono w-8 text-right text-zinc-400">{d.pct}%</span>
                  </button>
                ))}
              </div>
              <form onSubmit={handleSubmitReview} className="pt-3 border-t border-zinc-100 dark:border-white/[0.06] space-y-3">
                <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Viết đánh giá của bạn</div>
                <Stars value={myRating} onSelect={setMyRating} />
                <textarea
                  value={myReview}
                  onChange={(e) => setMyReview(e.target.value)}
                  rows={3}
                  placeholder="Điều bạn thích nhất / mong muốn cải thiện..."
                  className="w-full v-input px-3 py-2 text-xs resize-none placeholder-zinc-400"
                />
                <button
                  type="submit"
                  disabled={!myReview.trim()}
                  className="w-full px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#6e56cf] to-[#5e6ad2] shadow-purple-glow disabled:opacity-50 flex items-center justify-center gap-1.5 transition-all active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" /> Gửi đánh giá
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-3">
            {visibleReviews.map((r) => (
              <div key={r.id} className="v-card p-4 space-y-2.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img src={r.authorAvatar} alt={r.authorName} className="w-8 h-8 rounded-lg object-cover ring-1 ring-zinc-200 dark:ring-white/10" />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate flex items-center gap-1.5">
                        {r.authorName}
                        {r.isMine && <span className="text-[9px] font-mono bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 px-1.5 py-0.5 rounded">Bạn</span>}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Stars value={r.rating} size="w-3 h-3" />
                        <span className="text-[10px] font-mono text-zinc-400">{r.createdAt}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs sm:text-[13px] leading-relaxed text-zinc-700 dark:text-zinc-300">{r.content}</p>
                <div className="pt-2 border-t border-zinc-100 dark:border-white/[0.04]">
                  <button
                    onClick={() => {
                      const next = reviews.map((x) =>
                        x.id === r.id
                          ? { ...x, helpfulByMe: !x.helpfulByMe, helpfulCount: x.helpfulCount + (x.helpfulByMe ? -1 : 1) }
                          : x
                      );
                      setReviews(next);
                      persist(`permesh_reviews_${activeCommunityId}`, next);
                    }}
                    className={`flex items-center gap-1.5 text-xs transition-colors ${r.helpfulByMe ? 'text-purple-600 dark:text-purple-300 font-semibold' : 'text-zinc-500 hover:text-purple-600'}`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${r.helpfulByMe ? 'fill-purple-200 dark:fill-purple-900' : ''}`} />
                    <span>Hữu ích ({r.helpfulCount})</span>
                  </button>
                </div>
              </div>
            ))}
            {visibleReviews.length === 0 && (
              <div className="v-card p-8 text-center text-xs text-zinc-500">Chưa có đánh giá {reviewFilter} sao nào. Hãy là người đầu tiên!</div>
            )}
          </div>
        </div>
      )}

      {/* FEEDBACK */}
      {tab === 'feedback' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-4">
            <form onSubmit={handleSubmitFeedback} className="v-card p-5 space-y-3 lg:sticky lg:top-6">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Gửi yêu cầu mới</span>
              </h3>
              <div className="grid grid-cols-2 gap-1.5">
                {(Object.keys(FEEDBACK_TYPE_META) as LocalFeedback['type'][]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFbType(t)}
                    className={`px-2.5 py-1.5 rounded-xl text-[11px] font-semibold border transition-all ${
                      fbType === t
                        ? 'bg-purple-600 text-white border-purple-600 shadow-purple-glow-sm'
                        : 'border-zinc-200 dark:border-white/10 text-zinc-500 hover:border-purple-400/50'
                    }`}
                  >
                    {FEEDBACK_TYPE_META[t].label}
                  </button>
                ))}
              </div>
              <input
                value={fbTitle}
                onChange={(e) => setFbTitle(e.target.value)}
                placeholder="Tiêu đề ngắn gọn..."
                className="w-full v-input px-3 py-2 text-xs placeholder-zinc-400"
              />
              <textarea
                value={fbContent}
                onChange={(e) => setFbContent(e.target.value)}
                rows={5}
                placeholder="Mô tả chi tiết: bạn gặp vấn đề gì, khi nào, đã thử cách nào... (kèm link bài viết nếu khiếu nại)"
                className="w-full v-input px-3 py-2 text-xs resize-none placeholder-zinc-400"
              />
              <button
                type="submit"
                disabled={!fbTitle.trim() || !fbContent.trim()}
                className="w-full px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#6e56cf] to-[#5e6ad2] shadow-purple-glow disabled:opacity-50 flex items-center justify-center gap-1.5 transition-all active:scale-95"
              >
                <Send className="w-3.5 h-3.5" /> Gửi cho quản trị viên
              </button>
              <p className="text-[10px] font-mono text-zinc-400 text-center">Thời gian phản hồi trung bình: trong 24h</p>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200/60 dark:border-white/[0.06] w-fit">
              {(['all', 'pending', 'replied', 'closed'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setFbFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                    fbFilter === s ? 'bg-white dark:bg-purple-600 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                >
                  {s === 'all' ? `Tất cả (${feedbacks.length})` : STATUS_META[s].label}
                </button>
              ))}
            </div>

            {visibleFeedbacks.map((f) => {
              const tm = FEEDBACK_TYPE_META[f.type];
              const sm = STATUS_META[f.status];
              const SIcon = sm.icon;
              return (
                <div key={f.id} className="v-card p-4 space-y-2.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${tm.color}`}>{tm.label}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1 ${sm.color}`}>
                        <SIcon className="w-3 h-3" /> {sm.label}
                      </span>
                      {f.isMine && <span className="text-[9px] font-mono bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 px-1.5 py-0.5 rounded">Bạn gửi</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-zinc-400">{f.createdAt}</span>
                      {f.isMine && (
                        <button
                          onClick={() => {
                            const next = feedbacks.filter((x) => x.id !== f.id);
                            setFeedbacks(next);
                            persist(`permesh_feedbacks_${activeCommunityId}`, next);
                          }}
                          title="Xóa yêu cầu"
                          className="text-zinc-400 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">{f.title}</div>
                  <p className="text-xs sm:text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">{f.content}</p>
                  {f.reply && (
                    <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 space-y-1">
                      <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" /> Phản hồi từ quản trị viên
                      </div>
                      <p className="text-xs leading-relaxed text-emerald-900/80 dark:text-emerald-100/80">{f.reply}</p>
                    </div>
                  )}
                </div>
              );
            })}
            {visibleFeedbacks.length === 0 && (
              <div className="v-card p-8 text-center space-y-2">
                <Inbox className="w-6 h-6 text-zinc-300 mx-auto" />
                <div className="text-xs text-zinc-500">Chưa có yêu cầu nào ở trạng thái này.</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportView;
