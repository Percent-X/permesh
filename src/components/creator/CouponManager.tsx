import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Tag, Plus, Copy, Check, Sparkles, X } from 'lucide-react';

export const CouponManager: React.FC = () => {
  const { coupons, createCoupon } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(20);
  const [maxUses, setMaxUses] = useState<number>(100);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (cCode: string) => {
    navigator.clipboard.writeText(cCode);
    setCopiedCode(cCode);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    createCoupon({
      code: code.toUpperCase().trim(),
      discountPercent: Number(discountPercent),
      maxUses: Number(maxUses),
      expiresAt: '2026-12-31'
    });

    setCode('');
    setDiscountPercent(20);
    setMaxUses(100);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Tag className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span>Quản lý Mã Giảm Giá (Coupons & Promo)</span>
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
            Tạo mã ưu đãi học phí hoặc chiết khấu gói thành viên PRO để kích thích chuyển đổi.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-purple-glow shrink-0 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tạo Mã Coupon Mới</span>
        </button>
      </div>

      {/* Coupon List Table */}
      <div className="v-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-white/[0.02] border-b border-zinc-200 dark:border-white/[0.06] text-zinc-600 dark:text-zinc-400 font-mono">
              <tr>
                <th className="p-4">MÃ CODE</th>
                <th className="p-4">CHIẾT KHẤU</th>
                <th className="p-4">LƯỢT DÙNG</th>
                <th className="p-4">HẾT HẠN</th>
                <th className="p-4">TRẠNG THÁI</th>
                <th className="p-4 text-right">THAO TÁC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-white/[0.04] text-zinc-800 dark:text-zinc-200">
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-mono font-bold text-purple-700 dark:text-purple-300">
                    <span className="bg-purple-100 dark:bg-purple-950/80 border border-purple-300 dark:border-purple-800/60 px-2.5 py-1 rounded-lg">
                      {coupon.code}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {coupon.discountPercent}% OFF
                  </td>
                  <td className="p-4 font-mono">
                    {coupon.currentUses} / {coupon.maxUses}
                  </td>
                  <td className="p-4 text-zinc-500 dark:text-zinc-400 font-mono">
                    {coupon.expiresAt}
                  </td>
                  <td className="p-4">
                    {coupon.isActive ? (
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                        Đang hoạt động
                      </span>
                    ) : (
                      <span className="text-[10px] text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                        Đã đóng
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleCopy(coupon.code)}
                      className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-purple-600 hover:text-white rounded-lg text-[11px] font-medium transition-all inline-flex items-center gap-1"
                    >
                      {copiedCode === coupon.code ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Đã copy</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="v-card w-full max-w-md p-6 border-purple-400 dark:border-purple-500/40 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/[0.08] pb-3">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Tạo Mã Khuyến Mãi Mới</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">Mã Code (Viết hoa liền)</label>
                <input
                  type="text"
                  placeholder="Ví dụ: SUMMER2026, VIP50..."
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full bg-white dark:bg-[#16161f] border border-zinc-200 dark:border-white/10 rounded-xl p-2.5 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 font-mono font-bold focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">% Giảm giá</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(Number(e.target.value))}
                    className="w-full bg-white dark:bg-[#16161f] border border-zinc-200 dark:border-white/10 rounded-xl p-2.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">Giới hạn số lượt</label>
                  <input
                    type="number"
                    min="1"
                    value={maxUses}
                    onChange={(e) => setMaxUses(Number(e.target.value))}
                    className="w-full bg-white dark:bg-[#16161f] border border-zinc-200 dark:border-white/10 rounded-xl p-2.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none font-mono"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-white"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-purple-glow"
                >
                  Lưu & Kích hoạt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
