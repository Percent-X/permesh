import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  DollarSign,
  Users,
  TrendingUp,
  Award,
  Sparkles,
  ArrowUpRight,
  Download,
  CreditCard,
  BookOpen,
  CheckCircle2,
  Star,
  Zap,
  PieChart,
  Activity,
  Check
} from 'lucide-react';

type TimeHorizon = '7d' | '30d' | '90d' | '1y';
type MetricTab = 'overview' | 'revenue' | 'courses' | 'members';

interface Transaction {
  id: string;
  user: { name: string; avatar: string; email: string };
  plan: string;
  coupon?: string;
  amount: number;
  net: number;
  status: 'COMPLETED' | 'PENDING';
  date: string;
}

interface CourseStat {
  id: string;
  title: string;
  lessonsCount: number;
  enrolled: number;
  completionRate: number;
  rating: number;
  avgTimeDays: number;
}

export const CreatorDashboard: React.FC = () => {
  const { activeCommunity, courses } = useApp();

  const [timeHorizon, setTimeHorizon] = useState<TimeHorizon>('30d');
  const [activeMetricTab, setActiveMetricTab] = useState<MetricTab>('overview');
  const [chartMetric, setChartMetric] = useState<'revenue' | 'members'>('revenue');
  const [hoveredPointIdx, setHoveredPointIdx] = useState<number | null>(null);
  const [isExported, setIsExported] = useState(false);

  if (!activeCommunity) return null;

  // Multiplier depending on selected timeHorizon
  const horizonMultiplier = timeHorizon === '7d' ? 0.25 : timeHorizon === '30d' ? 1 : timeHorizon === '90d' ? 2.8 : 10.5;

  const grossMRR = Math.round(activeCommunity.priceMonthly * (activeCommunity.membersCount * 0.16) * (timeHorizon === '1y' ? 12 : 1));
  const platformFee = Math.round(grossMRR * 0.05);
  const netEarnings = grossMRR - platformFee;
  const payingMembers = Math.round(activeCommunity.membersCount * 0.16);
  const arpu = activeCommunity.priceMonthly > 0 ? activeCommunity.priceMonthly : 29;
  const ltv = arpu * 12;

  // Chart datasets
  const chartData = [
    { label: '01 Th9', revenue: Math.round(2800 * horizonMultiplier / 4), members: 42 },
    { label: '06 Th9', revenue: Math.round(3400 * horizonMultiplier / 4), members: 68 },
    { label: '12 Th9', revenue: Math.round(4100 * horizonMultiplier / 4), members: 95 },
    { label: '18 Th9', revenue: Math.round(5600 * horizonMultiplier / 4), members: 130 },
    { label: '24 Th9', revenue: Math.round(7200 * horizonMultiplier / 4), members: 185 },
    { label: '30 Th9', revenue: Math.round(8900 * horizonMultiplier / 4), members: 240 },
    { label: 'Hôm nay', revenue: Math.round(grossMRR), members: payingMembers },
  ];

  const maxVal = Math.max(...chartData.map(d => chartMetric === 'revenue' ? d.revenue : d.members)) * 1.15 || 1;

  // SVG Line Chart coordinates (600 x 160)
  const svgWidth = 600;
  const svgHeight = 160;
  const paddingX = 40;
  const paddingY = 25;

  const points = chartData.map((d, idx) => {
    const val = chartMetric === 'revenue' ? d.revenue : d.members;
    const x = paddingX + (idx / (chartData.length - 1)) * (svgWidth - paddingX * 2);
    const y = svgHeight - paddingY - (val / maxVal) * (svgHeight - paddingY * 2);
    return { x, y, ...d };
  });

  // Generate smooth SVG curve path
  const linePathD = points.reduce((acc, pt, idx, arr) => {
    if (idx === 0) return `M ${pt.x},${pt.y}`;
    const prev = arr[idx - 1];
    const cp1x = prev.x + (pt.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (pt.x - prev.x) / 2;
    const cp2y = pt.y;
    return `${acc} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${pt.x},${pt.y}`;
  }, '');

  const areaPathD = `${linePathD} L ${points[points.length - 1].x},${svgHeight - paddingY} L ${points[0].x},${svgHeight - paddingY} Z`;

  // Mock Recent Transactions
  const recentTransactions: Transaction[] = [
    {
      id: 'TXN-9842',
      user: { name: 'Nguyễn Văn Nam', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', email: 'nam.nguyen@gmail.com' },
      plan: 'Gói Hội Viên Hàng Tháng (Pro)',
      coupon: 'VIP20 (-20%)',
      amount: 39.20,
      net: 37.24,
      status: 'COMPLETED',
      date: '12 phút trước'
    },
    {
      id: 'TXN-9841',
      user: { name: 'Trần Thu Thảo', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80', email: 'thao.tran@outlook.com' },
      plan: 'Khóa Học: AI Agent Builder Pro',
      amount: 89.00,
      net: 84.55,
      status: 'COMPLETED',
      date: '1 giờ trước'
    },
    {
      id: 'TXN-9840',
      user: { name: 'Lê Hoàng Long', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', email: 'long.le@techcorp.io' },
      plan: 'Vé Workshop: Tối ưu RAG & Embedding',
      coupon: 'EARLYBIRD (-15%)',
      amount: 42.50,
      net: 40.38,
      status: 'COMPLETED',
      date: '4 giờ trước'
    },
    {
      id: 'TXN-9839',
      user: { name: 'Phạm Minh Đức', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80', email: 'duc.pham@dev.vn' },
      plan: 'Gói Hội Viên Hàng Năm (Annual VIP)',
      amount: 299.00,
      net: 284.05,
      status: 'COMPLETED',
      date: 'Hôm qua'
    },
    {
      id: 'TXN-9838',
      user: { name: 'Vũ Hải Yến', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80', email: 'yen.vu@gmail.com' },
      plan: 'Gói Hội Viên Hàng Tháng (Pro)',
      amount: 49.00,
      net: 46.55,
      status: 'COMPLETED',
      date: '2 ngày trước'
    }
  ];

  // Course performance stats
  const courseStats: CourseStat[] = courses
    .filter(c => c.communityId === activeCommunity.id)
    .map((c, idx) => ({
      id: c.id,
      title: c.title,
      lessonsCount: c.modules.reduce((sum, m) => sum + m.lessons.length, 0),
      enrolled: Math.round((activeCommunity.membersCount * (0.8 - idx * 0.18))),
      completionRate: Math.round(76 - idx * 12),
      rating: Number((4.9 - idx * 0.1).toFixed(1)),
      avgTimeDays: 14 + idx * 5
    }));

  // Top community contributors
  const topContributors = [
    { rank: 1, name: 'Minh Quang', badge: 'AI Architect', posts: 28, likes: 142, xp: 2450, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80' },
    { rank: 2, name: 'Sarah Tran', badge: 'Prompt Engineer', posts: 21, likes: 98, xp: 1890, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
    { rank: 3, name: 'Alex Vance', badge: 'Fullstack Dev', posts: 19, likes: 84, xp: 1620, avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80' },
    { rank: 4, name: 'Hoàng Long', badge: 'Researcher', posts: 14, likes: 62, xp: 1240, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' }
  ];

  const handleExport = () => {
    setIsExported(true);
    setTimeout(() => setIsExported(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header with Control Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-purple-700 dark:text-purple-400 bg-purple-100 dark:bg-purple-950/80 px-2 py-0.5 rounded border border-purple-300 dark:border-purple-800/40">
              Creator Studio Pro
            </span>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Báo Cáo Doanh Thu & Chỉ Số Tăng Trưởng
            </h2>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
            Phân tích chuyên sâu doanh thu MRR, sức khỏe cộng đồng và hiệu suất học tập của <strong className="text-zinc-800 dark:text-zinc-200">{activeCommunity.name}</strong>.
          </p>
        </div>

        {/* Time Horizon Selector & Export Button */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="inline-flex rounded-xl p-1 bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200/80 dark:border-white/[0.08]">
            {(['7d', '30d', '90d', '1y'] as TimeHorizon[]).map((hz) => (
              <button
                key={hz}
                onClick={() => setTimeHorizon(hz)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  timeHorizon === hz
                    ? 'bg-white dark:bg-purple-600 text-purple-700 dark:text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                {hz === '7d' ? '7 Ngày' : hz === '30d' ? '30 Ngày' : hz === '90d' ? '90 Ngày' : 'Năm nay'}
              </button>
            ))}
          </div>

          <button
            onClick={handleExport}
            className="px-3.5 py-1.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.03] hover:bg-zinc-50 dark:hover:bg-white/[0.07] text-xs font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-sm"
            title="Xuất bảng dữ liệu CSV"
          >
            {isExported ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Đã xuất CSV!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Xuất Báo Cáo</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Metric Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-white/[0.08] overflow-x-auto no-scrollbar">
        {[
          { id: 'overview', label: 'Tổng quan (Overview)', icon: Activity },
          { id: 'revenue', label: 'Doanh thu & Dòng tiền', icon: DollarSign },
          { id: 'courses', label: 'Hiệu suất Khóa học', icon: BookOpen },
          { id: 'members', label: 'Giữ chân & Phễu chuyển đổi', icon: Users },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeMetricTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveMetricTab(tab.id as MetricTab)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400'
                  : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-purple-600 dark:text-purple-400' : 'text-zinc-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Executive Financial KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: MRR */}
        <div className="v-card p-5 relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>Doanh thu Định kỳ (MRR)</span>
            <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/80 border border-purple-300 dark:border-purple-800/40 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 font-mono mt-2 tracking-tight">
            ${grossMRR.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% so với kỳ trước</span>
          </div>
        </div>

        {/* Metric 2: Net Payout */}
        <div className="v-card p-5 relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>Thực nhận (Net Payout)</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-mono mt-2 tracking-tight">
            ${netEarnings.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400 mt-2">
            <span>Đã trừ 5% phí sàn (${platformFee.toLocaleString()})</span>
          </div>
        </div>

        {/* Metric 3: Paying Members & Churn */}
        <div className="v-card p-5 relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>Hội viên trả phí (Paid Subs)</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-300 dark:border-indigo-800/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 font-mono mt-2 tracking-tight">
            {payingMembers.toLocaleString()}
          </div>
          <div className="flex items-center gap-2 text-[11px] font-semibold mt-2">
            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" />
              +16 mới tuần này
            </span>
            <span className="text-zinc-400">•</span>
            <span className="text-zinc-500 dark:text-zinc-400">Churn: 2.1%</span>
          </div>
        </div>

        {/* Metric 4: ARPU / LTV */}
        <div className="v-card p-5 relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>Giá trị Hội viên (ARPU / LTV)</span>
            <div className="w-8 h-8 rounded-xl bg-pink-100 dark:bg-pink-950/80 border border-pink-300 dark:border-pink-800/40 flex items-center justify-center text-pink-600 dark:text-pink-400">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 font-mono mt-2 tracking-tight">
            ${arpu.toFixed(0)} <span className="text-xs text-zinc-400 font-normal">/tháng</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-purple-700 dark:text-purple-400 font-semibold mt-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LTV ước tính: ${ltv.toLocaleString()} (12 tháng)</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Chart & Revenue Composition */}
      {(activeMetricTab === 'overview' || activeMetricTab === 'revenue') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* SVG Smooth Area Chart */}
          <div className="lg:col-span-8 v-card p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>Động Lực Tăng Trưởng Doanh Thu & Thành Viên</span>
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Biểu đồ theo chu kỳ {timeHorizon === '7d' ? '7 ngày' : timeHorizon === '30d' ? '30 ngày' : timeHorizon === '90d' ? '90 ngày' : '1 năm'}
                </p>
              </div>

              {/* Chart Toggle */}
              <div className="inline-flex rounded-lg p-0.5 bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200 dark:border-white/10 text-xs">
                <button
                  onClick={() => setChartMetric('revenue')}
                  className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                    chartMetric === 'revenue'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  Doanh thu ($)
                </button>
                <button
                  onClick={() => setChartMetric('members')}
                  className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                    chartMetric === 'members'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  Hội viên VIP
                </button>
              </div>
            </div>

            {/* SVG Chart Container */}
            <div className="relative pt-2">
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full h-52 overflow-visible select-none"
              >
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.38" />
                    <stop offset="85%" stopColor="#6366f1" stopOpacity="0.03" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Grid horizontal dashed reference lines */}
                {[0.25, 0.5, 0.75, 1].map((ratio, i) => {
                  const y = svgHeight - paddingY - ratio * (svgHeight - paddingY * 2);
                  return (
                    <line
                      key={i}
                      x1={paddingX}
                      y1={y}
                      x2={svgWidth - paddingX}
                      y2={y}
                      stroke="currentColor"
                      className="text-zinc-200 dark:text-white/[0.06]"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Area Fill */}
                <path d={areaPathD} fill="url(#chartGradient)" />

                {/* Main Curve Line */}
                <path
                  d={linePathD}
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="3"
                  filter="url(#glow)"
                  strokeLinecap="round"
                />

                {/* Data Points on Hover */}
                {points.map((pt, idx) => {
                  const isHovered = hoveredPointIdx === idx;
                  const displayValue = chartMetric === 'revenue' ? `$${pt.revenue.toLocaleString()}` : `${pt.members} mems`;
                  return (
                    <g key={idx}>
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isHovered ? 6 : 4}
                        className={`transition-all cursor-pointer ${
                          isHovered
                            ? 'fill-purple-600 stroke-white stroke-2'
                            : 'fill-purple-500 dark:fill-purple-400 stroke-white dark:stroke-[#0a0718] stroke-2'
                        }`}
                        onMouseEnter={() => setHoveredPointIdx(idx)}
                        onMouseLeave={() => setHoveredPointIdx(null)}
                      />

                      {/* Tooltip Badge on hover */}
                      {isHovered && (
                        <g>
                          <rect
                            x={pt.x - 45}
                            y={pt.y - 38}
                            width="90"
                            height="28"
                            rx="8"
                            className="fill-zinc-900 dark:fill-white text-white dark:text-zinc-900 filter drop-shadow-md"
                          />
                          <text
                            x={pt.x}
                            y={pt.y - 20}
                            textAnchor="middle"
                            className="fill-white dark:fill-zinc-900 font-mono text-[11px] font-bold"
                          >
                            {displayValue}
                          </text>
                        </g>
                      )}

                      {/* Bottom X-axis label */}
                      <text
                        x={pt.x}
                        y={svgHeight - 6}
                        textAnchor="middle"
                        className="fill-zinc-400 dark:fill-zinc-500 text-[10px] font-mono"
                      >
                        {pt.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Revenue Composition Breakdown */}
          <div className="lg:col-span-4 v-card p-6 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>Cơ Cấu Nguồn Doanh Thu</span>
                </h3>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-800">
                  Khỏe mạnh
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Đa dạng hóa nguồn thu từ hội viên định kỳ, khóa học và workshop.
              </p>

              {/* Progress Composition Bar */}
              <div className="w-full h-3 bg-zinc-200 dark:bg-white/[0.06] rounded-full overflow-hidden flex mt-5 shadow-inner">
                <div style={{ width: '72%' }} className="bg-purple-600 h-full" title="Gói Hội viên: 72%" />
                <div style={{ width: '18%' }} className="bg-indigo-500 h-full" title="Bán Khóa học: 18%" />
                <div style={{ width: '10%' }} className="bg-emerald-500 h-full" title="Vé Sự kiện: 10%" />
              </div>

              {/* Breakdown List */}
              <div className="space-y-3 mt-5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                    <span className="text-zinc-700 dark:text-zinc-300 font-medium">Hội viên trả phí (Subs)</span>
                  </div>
                  <div className="text-right font-mono">
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">72%</span>
                    <span className="text-zinc-400 text-[10px] ml-1.5">(${Math.round(grossMRR * 0.72).toLocaleString()})</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                    <span className="text-zinc-700 dark:text-zinc-300 font-medium">Bán Khóa học (Upsell)</span>
                  </div>
                  <div className="text-right font-mono">
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">18%</span>
                    <span className="text-zinc-400 text-[10px] ml-1.5">(${Math.round(grossMRR * 0.18).toLocaleString()})</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-zinc-700 dark:text-zinc-300 font-medium">Vé Workshop & Sự kiện</span>
                  </div>
                  <div className="text-right font-mono">
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">10%</span>
                    <span className="text-zinc-400 text-[10px] ml-1.5">(${Math.round(grossMRR * 0.10).toLocaleString()})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategic Insight Box */}
            <div className="p-3.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/25 border border-purple-200/80 dark:border-purple-800/40 text-xs text-purple-900 dark:text-purple-300 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-purple-800 dark:text-purple-200">
                <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Gợi ý chiến lược:</span>
              </div>
              <p className="text-[11px] leading-relaxed text-purple-900/80 dark:text-purple-300/80">
                Mô hình Subscription chiếm 72% giúp dòng tiền của bạn luôn ổn định. Hãy mở bán thêm 1 khóa học chuyên sâu tuần tới để gia tăng doanh thu bán lẻ thêm 20%!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Revenue Transactions */}
      {(activeMetricTab === 'overview' || activeMetricTab === 'revenue') && (
        <div className="v-card p-6 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Lịch Sử Giao Dịch Gần Nhất</span>
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Các khoản thanh toán phí hội viên và mua khóa học theo thời gian thực</p>
            </div>

            <span className="text-xs font-mono text-zinc-400">
              Tổng cộng {recentTransactions.length} giao dịch gần đây
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-white/[0.08] text-zinc-400 font-mono text-[11px]">
                  <th className="pb-3 font-semibold">Mã GD</th>
                  <th className="pb-3 font-semibold">Khách Hàng</th>
                  <th className="pb-3 font-semibold">Gói / Khóa học</th>
                  <th className="pb-3 font-semibold">Mã Giảm Giá</th>
                  <th className="pb-3 font-semibold text-right">Tổng Tiền</th>
                  <th className="pb-3 font-semibold text-right">Thực Nhận</th>
                  <th className="pb-3 font-semibold text-center">Trạng Thái</th>
                  <th className="pb-3 font-semibold text-right">Thời Gian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-white/[0.04]">
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-zinc-50/50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 font-mono text-purple-600 dark:text-purple-400 font-semibold">{tx.id}</td>
                    <td className="py-3.5">
                      <div className="flex items-center gap-2.5">
                        <img src={tx.user.avatar} alt={tx.user.name} className="w-7 h-7 rounded-lg object-cover ring-1 ring-zinc-200 dark:ring-white/10" />
                        <div>
                          <div className="font-bold text-zinc-900 dark:text-zinc-100">{tx.user.name}</div>
                          <div className="text-[10px] text-zinc-400 font-mono">{tx.user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 text-zinc-700 dark:text-zinc-300 font-medium">{tx.plan}</td>
                    <td className="py-3.5">
                      {tx.coupon ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800/50 font-semibold">
                          {tx.coupon}
                        </span>
                      ) : (
                        <span className="text-zinc-400 text-[11px]">—</span>
                      )}
                    </td>
                    <td className="py-3.5 text-right font-mono font-bold text-zinc-900 dark:text-zinc-100">
                      ${tx.amount.toFixed(2)}
                    </td>
                    <td className="py-3.5 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      +${tx.net.toFixed(2)}
                    </td>
                    <td className="py-3.5 text-center">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300/80 dark:border-emerald-800/60">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        Thành công
                      </span>
                    </td>
                    <td className="py-3.5 text-right font-mono text-zinc-400 text-[11px]">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content: Course & Content Performance */}
      {(activeMetricTab === 'overview' || activeMetricTab === 'courses') && (
        <div className="v-card p-6 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Hiệu Suất Từng Khóa Học (Course Performance)</span>
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Theo dõi tỷ lệ hoàn thành bài giảng, số học viên và điểm đánh giá thực tế</p>
            </div>

            <span className="text-xs font-mono text-purple-700 dark:text-purple-400 bg-purple-100 dark:bg-purple-950/80 px-2 py-0.5 rounded border border-purple-300 dark:border-purple-800 font-semibold">
              {courseStats.length} Khóa học hoạt động
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-white/[0.08] text-zinc-400 font-mono text-[11px]">
                  <th className="pb-3 font-semibold">Tên Khóa Học</th>
                  <th className="pb-3 font-semibold text-center">Số Bài Giảng</th>
                  <th className="pb-3 font-semibold text-right">Học Viên</th>
                  <th className="pb-3 font-semibold w-48">Tỷ Lệ Hoàn Thành</th>
                  <th className="pb-3 font-semibold text-center">Đánh Giá</th>
                  <th className="pb-3 font-semibold text-right">Thời Gian TB</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-white/[0.04]">
                {courseStats.map((cs) => (
                  <tr key={cs.id} className="hover:bg-zinc-50/50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5">
                      <div className="font-bold text-zinc-900 dark:text-zinc-100">{cs.title}</div>
                      <div className="text-[10px] text-zinc-400">Cộng đồng: {activeCommunity.name}</div>
                    </td>
                    <td className="py-3.5 text-center font-mono font-semibold text-zinc-700 dark:text-zinc-300">
                      {cs.lessonsCount} bài
                    </td>
                    <td className="py-3.5 text-right font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {cs.enrolled}
                    </td>
                    <td className="py-3.5">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="text-zinc-500">Hoàn thành</span>
                          <span className="font-bold text-purple-600 dark:text-purple-400">{cs.completionRate}%</span>
                        </div>
                        <div className="w-full h-2 bg-zinc-100 dark:bg-white/[0.08] rounded-full overflow-hidden">
                          <div
                            style={{ width: `${cs.completionRate}%` }}
                            className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 text-center">
                      <div className="inline-flex items-center gap-1 text-amber-500 font-bold font-mono">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{cs.rating}</span>
                      </div>
                    </td>
                    <td className="py-3.5 text-right font-mono text-zinc-500 dark:text-zinc-400">
                      {cs.avgTimeDays} ngày
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content: Members, Retention & Conversion Funnel */}
      {(activeMetricTab === 'overview' || activeMetricTab === 'members') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Conversion Funnel */}
          <div className="lg:col-span-6 v-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Phễu Chuyển Đổi Hội Viên (Funnel)</span>
              </h3>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                CR: 3.4%
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Hành trình từ khách ghé thăm trang công khai đến hội viên trả phí và hoàn thành khóa học.
            </p>

            {/* Funnel Steps */}
            <div className="space-y-3 pt-2">
              {[
                { step: 'Khách ghé thăm Landing Page', count: '14,250', percent: '100%', color: 'bg-zinc-300 dark:bg-zinc-700' },
                { step: 'Đăng ký tài khoản miễn phí', count: '2,420', percent: '17.0%', color: 'bg-indigo-400' },
                { step: 'Nâng cấp Gói Trả Phí VIP', count: `${payingMembers}`, percent: `${((payingMembers / 2420) * 100).toFixed(1)}%`, color: 'bg-purple-600' },
                { step: 'Hoàn thành Khóa học & Thử thách', count: '185', percent: '48.4%', color: 'bg-emerald-500' },
              ].map((fn, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">{fn.step}</span>
                    <div className="font-mono text-right">
                      <span className="font-bold text-zinc-900 dark:text-zinc-100">{fn.count}</span>
                      <span className="text-[10px] text-zinc-400 ml-1.5">({fn.percent})</span>
                    </div>
                  </div>
                  <div className="w-full h-2.5 bg-zinc-100 dark:bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      style={{ width: `${Math.max(10, 100 - idx * 28)}%` }}
                      className={`h-full ${fn.color} rounded-full transition-all duration-500`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Community Contributors */}
          <div className="lg:col-span-6 v-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Top Đại Sứ & Thành Viên Tích Cực Nhất</span>
              </h3>
              <span className="text-xs font-mono text-purple-600 dark:text-purple-400 font-semibold">
                Tháng này
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Những cá nhân tạo ra nhiều giá trị thảo luận và hỗ trợ thành viên khác nhiều nhất.
            </p>

            <div className="space-y-3">
              {topContributors.map((user) => (
                <div
                  key={user.rank}
                  className="flex items-center justify-between p-3 rounded-xl border border-zinc-100 dark:border-white/[0.04] bg-zinc-50/50 dark:bg-white/[0.015] hover:border-purple-300 dark:hover:border-purple-500/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                      user.rank === 1 ? 'bg-amber-400 text-amber-950 shadow-sm' :
                      user.rank === 2 ? 'bg-zinc-300 text-zinc-800' :
                      user.rank === 3 ? 'bg-amber-700/60 text-amber-100' :
                      'bg-zinc-100 dark:bg-white/10 text-zinc-500'
                    }`}>
                      {user.rank}
                    </span>
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-lg object-cover ring-1 ring-zinc-200 dark:ring-white/10" />
                    <div>
                      <div className="font-bold text-xs text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                        <span>{user.name}</span>
                        <span className="text-[10px] font-normal px-1.5 py-0.2 rounded bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800/40">
                          {user.badge}
                        </span>
                      </div>
                      <div className="text-[10px] text-zinc-400 flex items-center gap-2 mt-0.5">
                        <span>{user.posts} bài thảo luận</span>
                        <span>•</span>
                        <span className="text-rose-500 font-semibold">{user.likes} lượt Tim</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <div className="text-xs font-bold text-purple-600 dark:text-purple-400">+{user.xp} XP</div>
                    <div className="text-[10px] text-zinc-400">Điểm cống hiến</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
