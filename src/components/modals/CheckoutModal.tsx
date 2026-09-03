import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Sparkles,
  Tag,
  CheckCircle2,
  ShieldCheck,
  Lock
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    checkoutCommunity,
    setCheckoutCommunity,
    applyCouponToCheckout,
    completeCheckout
  } = useApp();

  const [couponCode, setCouponCode] = useState('VIP50');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponFeedback, setCouponFeedback] = useState<{ valid: boolean; message: string } | null>(null);

  if (!checkoutCommunity) return null;

  const originalPrice = checkoutCommunity.priceMonthly || 29;
  const discountAmount = (originalPrice * discountPercent) / 100;
  const finalPrice = Math.max(0, originalPrice - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCouponToCheckout(couponCode);
    setCouponFeedback({ valid: res.valid, message: res.message });
    if (res.valid) {
      setDiscountPercent(res.discountPercent);
    } else {
      setDiscountPercent(0);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-white dark:bg-[#0a0718] border border-zinc-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden ring-1 ring-purple-500/20">
        {/* Header */}
        <div className="p-5 border-b border-zinc-200 dark:border-white/[0.08] flex items-center justify-between bg-gradient-to-r from-purple-100 via-white to-indigo-100 dark:from-purple-950/40 dark:via-[#16161f] dark:to-indigo-950/40">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Đăng Ký Thành Viên PRO</h3>
          </div>
          <button
            onClick={() => setCheckoutCommunity(null)}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Community Info */}
        <div className="p-6 space-y-5">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.06]">
            <img
              src={checkoutCommunity.avatar}
              alt={checkoutCommunity.name}
              className="w-12 h-12 rounded-xl object-cover ring-1 ring-zinc-200 dark:ring-white/10"
            />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">{checkoutCommunity.name}</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">{checkoutCommunity.tagline}</div>
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
              <span>Toàn quyền truy cập tất cả Video Khóa học & Modules</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
              <span>Tham gia tất cả Thử thách 30 ngày & nhận chứng chỉ</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
              <span>Tham gia Live Workshop & Demo Day cùng Founders</span>
            </div>
          </div>

          {/* Coupon Input Form */}
          <form onSubmit={handleApplyCoupon} className="space-y-1.5">
            <label className="text-xs text-zinc-600 dark:text-zinc-400 font-medium flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Mã Giảm Giá (Thử mã: <code className="text-purple-700 dark:text-purple-300 font-mono font-bold">VIP50</code>)</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nhập mã coupon..."
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="flex-1 bg-zinc-50 dark:bg-[#16161f] border border-zinc-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 font-mono font-bold placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-purple-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-purple-600 hover:text-white border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-zinc-200 rounded-xl text-xs font-semibold transition-all shadow-sm"
              >
                Áp dụng
              </button>
            </div>
            {couponFeedback && (
              <p className={`text-[11px] mt-1 font-medium ${couponFeedback.valid ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                {couponFeedback.message}
              </p>
            )}
          </form>

          {/* Price Breakdown */}
          <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-500/20 space-y-2 text-xs">
            <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-400">
              <span>Hội phí gốc</span>
              <span className="font-mono text-zinc-800 dark:text-zinc-200">${originalPrice.toFixed(2)}/tháng</span>
            </div>
            {discountPercent > 0 && (
              <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                <span>Ưu đãi Coupon (-{discountPercent}%)</span>
                <span className="font-mono">-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="pt-2 border-t border-zinc-200 dark:border-white/[0.08] flex items-center justify-between font-bold text-sm text-zinc-900 dark:text-zinc-100">
              <span>Tổng thanh toán</span>
              <span className="font-mono text-base text-purple-700 dark:text-purple-300">
                ${finalPrice.toFixed(2)} <span className="text-xs text-zinc-500 dark:text-zinc-400 font-normal">/ tháng</span>
              </span>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={completeCheckout}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-purple-glow transition-all"
          >
            <Lock className="w-4 h-4" />
            <span>Kích Hoạt Tư Cách Thành Viên (${finalPrice.toFixed(2)})</span>
          </button>

          <div className="text-[10px] text-zinc-500 text-center flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Bảo mật 256-bit SSL • Có thể hủy bất kỳ lúc nào</span>
          </div>
        </div>
      </div>
    </div>
  );
};
