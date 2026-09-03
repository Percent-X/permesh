import React, { useState } from 'react';
import { ActivityHeatmapDay } from '../../types';
import { useApp } from '../../context/AppContext';

interface GithubHeatmapProps {
  days?: ActivityHeatmapDay[];
  title?: string;
  showYears?: boolean;
}

export const GithubHeatmap: React.FC<GithubHeatmapProps> = ({
  days,
  title,
  showYears = true
}) => {
  const { activityDays, theme } = useApp();
  const data = days && days.length > 0 ? days : activityDays;

  const [hoveredCell, setHoveredCell] = useState<{
    date: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  const [selectedYear, setSelectedYear] = useState('2026');

  // Compute total contributions
  const totalContributions = data.reduce((acc, curr) => acc + curr.count, 0);

  // Group days into weeks (columns of 7 days: Sun=0 to Sat=6)
  const weeks: ActivityHeatmapDay[][] = [];
  let currentWeek: ActivityHeatmapDay[] = [];

  data.forEach((day, index) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || index === data.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  // Calculate month labels positions
  const monthLabels: { label: string; weekIndex: number }[] = [];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  let lastMonth = -1;
  weeks.forEach((week, wIdx) => {
    if (week.length > 0) {
      const firstDayDate = new Date(week[0].date);
      const month = firstDayDate.getMonth();
      if (month !== lastMonth) {
        monthLabels.push({
          label: monthNames[month],
          weekIndex: wIdx
        });
        lastMonth = month;
      }
    }
  });

  const getCellColor = (level: number) => {
    const isDark = theme === 'dark';
    if (isDark) {
      switch (level) {
        case 4: return 'bg-[#d8b4fe] shadow-[0_0_8px_rgba(216,180,254,0.6)]';
        case 3: return 'bg-[#a855f7]';
        case 2: return 'bg-[#6b21a8]';
        case 1: return 'bg-[#3c1d70] border border-purple-500/20';
        default: return 'bg-[#161b22] border border-white/[0.04]';
      }
    } else {
      switch (level) {
        case 4: return 'bg-[#581c87] shadow-[0_0_6px_rgba(88,28,135,0.4)]';
        case 3: return 'bg-[#7e22ce]';
        case 2: return 'bg-[#a855f7]';
        case 1: return 'bg-[#d8b4fe]';
        default: return 'bg-[#ebedf0] border border-zinc-200/60';
      }
    }
  };

  const formatDateTooltip = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="w-full space-y-3">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <span>{totalContributions.toLocaleString()} hoạt động trong năm qua</span>
          {title && <span className="text-zinc-500 font-normal">• {title}</span>}
        </div>

        {showYears && (
          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            {['2026', '2025', '2024'].map(yr => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`px-2.5 py-1 text-xs font-mono font-semibold rounded-lg transition-all ${
                  selectedYear === yr
                    ? 'bg-purple-600 text-white shadow-purple-glow-sm'
                    : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Contribution Box like GitHub */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0d1117] border border-zinc-200 dark:border-[#30363d] shadow-sm relative overflow-hidden">
        {/* Scrollable Container */}
        <div className="overflow-x-auto pb-2 select-none relative">
          <div className="inline-block min-w-full">
            {/* Months Header Row */}
            <div className="flex pl-8 mb-1.5 text-[10px] font-mono text-zinc-500 dark:text-zinc-400 h-4 relative">
              {monthLabels.map((m, idx) => (
                <span
                  key={idx}
                  className="absolute"
                  style={{ left: `${32 + m.weekIndex * 14}px` }}
                >
                  {m.label}
                </span>
              ))}
            </div>

            {/* Heatmap Grid Row (Days + Matrix) */}
            <div className="flex items-start gap-1">
              {/* Day-of-week labels (Mon, Wed, Fri) */}
              <div className="flex flex-col gap-[3px] text-[9px] font-mono text-zinc-400 dark:text-zinc-500 pr-1.5 shrink-0 pt-[2px]">
                <span className="h-[11px] leading-none opacity-0">Sun</span>
                <span className="h-[11px] leading-none">Mon</span>
                <span className="h-[11px] leading-none opacity-0">Tue</span>
                <span className="h-[11px] leading-none">Wed</span>
                <span className="h-[11px] leading-none opacity-0">Thu</span>
                <span className="h-[11px] leading-none">Fri</span>
                <span className="h-[11px] leading-none opacity-0">Sat</span>
              </div>

              {/* Weeks Matrix Columns */}
              <div className="flex gap-[3px] flex-1">
                {weeks.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-[3px] shrink-0">
                    {week.map((day, dIdx) => (
                      <div
                        key={dIdx}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoveredCell({
                            date: day.date,
                            count: day.count,
                            x: rect.left + rect.width / 2,
                            y: rect.top
                          });
                        }}
                        onMouseLeave={() => setHoveredCell(null)}
                        className={`w-[11px] h-[11px] rounded-[2px] cursor-pointer transition-all duration-150 hover:ring-2 hover:ring-purple-400 hover:scale-125 z-0 hover:z-10 ${getCellColor(
                          day.level
                        )}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Tooltip */}
        {hoveredCell && (
          <div className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2"
            style={{ left: hoveredCell.x, top: hoveredCell.y - 6 }}
          >
            <div className="bg-zinc-900/95 dark:bg-black/95 text-zinc-100 text-[11px] font-medium px-3 py-1.5 rounded-lg shadow-2xl border border-white/10 whitespace-nowrap backdrop-blur-md">
              <span className="font-bold text-purple-300">
                {hoveredCell.count > 0 ? `${hoveredCell.count} hoạt động` : 'Không có hoạt động'}
              </span>{' '}
              vào {formatDateTooltip(hoveredCell.date)}
            </div>
          </div>
        )}

        {/* Bottom Bar / Legend */}
        <div className="pt-3 mt-2 border-t border-zinc-100 dark:border-[#30363d]/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 gap-2">
          <a
            href="#activity-guide"
            onClick={(e) => { e.preventDefault(); alert('Hoạt động được tính khi: Đăng bài, bình luận, nộp bài challenge, hoàn thành bài học, hoặc check-in mỗi ngày.'); }}
            className="text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 font-medium"
          >
            Tìm hiểu cách tính hoạt động
          </a>

          {/* Less -> More Legend */}
          <div className="flex items-center gap-1.5 font-mono text-[10px]">
            <span>Ít</span>
            <div className={`w-[11px] h-[11px] rounded-[2px] ${getCellColor(0)}`} />
            <div className={`w-[11px] h-[11px] rounded-[2px] ${getCellColor(1)}`} />
            <div className={`w-[11px] h-[11px] rounded-[2px] ${getCellColor(2)}`} />
            <div className={`w-[11px] h-[11px] rounded-[2px] ${getCellColor(3)}`} />
            <div className={`w-[11px] h-[11px] rounded-[2px] ${getCellColor(4)}`} />
            <span>Nhiều</span>
          </div>
        </div>
      </div>
    </div>
  );
};
