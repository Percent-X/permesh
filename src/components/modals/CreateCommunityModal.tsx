import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Building } from 'lucide-react';

export const CreateCommunityModal: React.FC = () => {
  const { isCreateCommunityOpen, setIsCreateCommunityOpen, createCommunity } = useApp();

  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [priceMonthly, setPriceMonthly] = useState(29);

  if (!isCreateCommunityOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createCommunity({
      name,
      tagline: tagline || 'Cộng đồng Chuyên gia & Lập trình viên',
      description: description || 'Không gian thảo luận, chia sẻ kiến thức và cùng nhau phát triển.',
      isPrivate: isPaid,
      priceMonthly: isPaid ? Number(priceMonthly) : 0,
      categories: ['Thông báo', 'Hỏi đáp', 'Showcase', 'Tài nguyên'],
      rules: ['Tôn trọng các thành viên khác', 'Không quảng cáo rác', 'Chia sẻ kiến thức tích cực']
    });

    setName('');
    setTagline('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-white dark:bg-[#0a0718] border border-zinc-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden ring-1 ring-purple-500/20">
        <div className="p-5 border-b border-zinc-200 dark:border-white/[0.08] flex items-center justify-between bg-zinc-50 dark:bg-[#16161d]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950 border border-purple-300 dark:border-purple-600/40 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Building className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Tạo Cộng Đồng Mới (Launch Community)</h3>
          </div>
          <button
            onClick={() => setIsCreateCommunityOpen(false)}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs text-zinc-600 dark:text-zinc-400 font-medium block mb-1">Tên Cộng Đồng</label>
            <input
              type="text"
              placeholder="Ví dụ: Next.js SaaS Founders Vietnam"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-[#16161f] border border-zinc-200 dark:border-white/10 rounded-xl p-3 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-purple-500"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="text-xs text-zinc-600 dark:text-zinc-400 font-medium block mb-1">Khẩu hiệu (Tagline ngắn)</label>
            <input
              type="text"
              placeholder="Ví dụ: Xây dựng và mở rộng sản phẩm từ 0 đến $10k MRR"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-[#16161f] border border-zinc-200 dark:border-white/10 rounded-xl p-2.5 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-600 dark:text-zinc-400 font-medium block mb-1">Mô tả chi tiết</label>
            <textarea
              rows={3}
              placeholder="Giới thiệu về mục đích, đối tượng tham gia và giá trị cộng đồng mang lại..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-[#16161f] border border-zinc-200 dark:border-white/10 rounded-xl p-3 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-purple-500 resize-none"
            />
          </div>

          {/* Pricing Model */}
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.06] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-zinc-900 dark:text-zinc-200">Mô hình Hội phí (Subscription)</div>
                <div className="text-[11px] text-zinc-500 dark:text-zinc-400">Thu phí định kỳ hàng tháng từ thành viên</div>
              </div>
              <button
                type="button"
                onClick={() => setIsPaid(!isPaid)}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                  isPaid ? 'bg-purple-600' : 'bg-zinc-300 dark:bg-zinc-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    isPaid ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {isPaid && (
              <div className="pt-2 border-t border-zinc-200 dark:border-white/[0.06] flex items-center gap-3">
                <label className="text-xs text-zinc-700 dark:text-zinc-300 font-medium">Giá mỗi tháng ($ USD):</label>
                <input
                  type="number"
                  min="1"
                  value={priceMonthly}
                  onChange={(e) => setPriceMonthly(Number(e.target.value))}
                  className="w-28 bg-white dark:bg-[#16161f] border border-zinc-200 dark:border-white/10 rounded-xl px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 font-mono font-bold focus:outline-none focus:border-purple-500"
                />
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-zinc-200 dark:border-white/[0.08] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsCreateCommunityOpen(false)}
              className="px-4 py-2 text-xs text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-purple-glow transition-all"
            >
              Khởi Tạo Ngay 🚀
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
