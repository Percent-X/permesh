import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  Users,
  CheckCircle2,
  Plus,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  List,
  Sparkles
} from 'lucide-react';

export const EventsView: React.FC<{ onOpenEventEditor?: () => void }> = ({ onOpenEventEditor }) => {
  const {
    activeCommunityId,
    events,
    toggleRSVPEvent,
    currentUser,
    activeRole
  } = useApp();

  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [selectedDay, setSelectedDay] = useState<number | null>(2); // Default to today (Sept 2)
  const [currentMonth, setCurrentMonth] = useState({ month: 9, year: 2026 });

  const communityEvents = events.filter(e => e.communityId === activeCommunityId);
  const isCreator = activeRole === 'CREATOR';

  // Calendar calculations for September 2026
  // September 1, 2026 is a Tuesday (dayIndex 1 in Monday-based week 0-6)
  const daysInMonth = 30;
  const startDayOffset = 1; // Tuesday is index 1

  const weekDays = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];

  // Map events to days of current month
  const getEventsForDay = (dayNum: number) => {
    const dayStr = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
    const dateQuery = `2026-09-${dayStr}`;
    return communityEvents.filter(e => e.date === dateQuery);
  };

  const selectedEvents = selectedDay ? getEventsForDay(selectedDay) : communityEvents;

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span>Lịch & sự kiện trực tuyến</span>
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
            Lịch sinh hoạt cộng đồng, Live coding workshop và Q&A cùng chuyên gia.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {/* View Mode Toggle Switcher */}
          <div className="flex items-center gap-1 bg-purple-50/60 dark:bg-[#0f0926] p-1 rounded-xl border border-purple-200/60 dark:border-purple-800/30">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'calendar'
                  ? 'bg-purple-600 text-white shadow-purple-glow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Lịch tháng</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'list'
                  ? 'bg-purple-600 text-white shadow-purple-glow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Danh sách</span>
            </button>
          </div>

          {isCreator && onOpenEventEditor && (
            <button
              onClick={onOpenEventEditor}
              className="px-3.5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 shadow-purple-glow-sm active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tạo sự kiện</span>
            </button>
          )}
        </div>
      </div>

      {/* CALENDAR VIEW MODE */}
      {viewMode === 'calendar' && (
        <div className="space-y-6">
          {/* Month Navigation Card */}
          <div className="v-card p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  Tháng {currentMonth.month}, {currentMonth.year}
                </h3>
                <span className="badge-linear-purple">
                  <span>{communityEvents.length} Sự kiện đã lên lịch</span>
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setSelectedDay(2)}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40 hover:bg-purple-100 transition-all"
                >
                  Hôm nay
                </button>
                <button
                  onClick={() => setCurrentMonth(prev => prev.month === 1 ? { month: 12, year: prev.year - 1 } : { ...prev, month: prev.month - 1 })}
                  className="p-1.5 rounded-lg border border-purple-200 dark:border-purple-800/30 hover:bg-purple-50 dark:hover:bg-purple-950/30 text-zinc-600 dark:text-zinc-400 transition-all active:scale-95"
                  title="Tháng trước"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentMonth(prev => prev.month === 12 ? { month: 1, year: prev.year + 1 } : { ...prev, month: prev.month + 1 })}
                  className="p-1.5 rounded-lg border border-purple-200 dark:border-purple-800/30 hover:bg-purple-50 dark:hover:bg-purple-950/30 text-zinc-600 dark:text-zinc-400 transition-all active:scale-95"
                  title="Tháng sau"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs font-semibold text-zinc-500 dark:text-zinc-400 border-b border-purple-100 dark:border-purple-900/20 pb-2">
              {weekDays.map((w, idx) => (
                <div key={idx} className={idx >= 5 ? 'text-purple-600 dark:text-purple-400' : ''}>
                  {w}
                </div>
              ))}
            </div>

            {/* Calendar Grid Cells */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {/* Blank offset days */}
              {Array.from({ length: startDayOffset }).map((_, idx) => (
                <div key={`empty-${idx}`} className="min-h-[80px] sm:min-h-[95px] rounded-xl bg-purple-50/20 dark:bg-white/[0.01] opacity-40" />
              ))}

              {/* Days 1 to 30 */}
              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const dayNum = idx + 1;
                const isToday = dayNum === 2; // Sept 2, 2026
                const isSelected = selectedDay === dayNum;
                const dayEvents = getEventsForDay(dayNum);
                const hasEvents = dayEvents.length > 0;

                return (
                  <div
                    key={`day-${dayNum}`}
                    onClick={() => setSelectedDay(dayNum)}
                    className={`min-h-[80px] sm:min-h-[95px] p-2 rounded-xl border transition-all cursor-pointer flex flex-col justify-between group ${
                      isSelected
                        ? 'bg-purple-50/80 dark:bg-purple-950/40 border-purple-500 shadow-purple-glow-sm'
                        : isToday
                        ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-400/60 hover:border-purple-400'
                        : hasEvents
                        ? 'bg-white dark:bg-[#0f0926] border-purple-200/60 dark:border-purple-800/30 hover:border-purple-400'
                        : 'bg-white dark:bg-white/[0.01] border-purple-100/40 dark:border-white/[0.04] hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full ${
                        isToday
                          ? 'bg-amber-500 text-white shadow-sm'
                          : isSelected
                          ? 'bg-purple-600 text-white'
                          : 'text-zinc-800 dark:text-zinc-200 group-hover:text-purple-600'
                      }`}>
                        {dayNum}
                      </span>
                      {hasEvents && (
                        <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                      )}
                    </div>

                    {/* Event Pill in Cell */}
                    <div className="space-y-1 mt-1">
                      {dayEvents.map(evt => (
                        <div
                          key={evt.id}
                          className="text-[10px] font-semibold truncate px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40 leading-tight"
                          title={`${evt.time} - ${evt.title}`}
                        >
                          {evt.time} {evt.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Day Agenda Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>
                  {selectedDay
                    ? `Sự kiện ngày ${selectedDay} Tháng 9, 2026 (${selectedEvents.length})`
                    : 'Tất cả sự kiện'}
                </span>
              </h3>
              {selectedDay && (
                <button
                  onClick={() => setSelectedDay(null)}
                  className="text-xs text-purple-600 dark:text-purple-400 hover:underline font-medium"
                >
                  Xem toàn bộ sự kiện trong tháng
                </button>
              )}
            </div>

            {selectedEvents.length === 0 ? (
              <div className="v-card p-8 text-center text-zinc-500 text-xs">
                Không có sự kiện nào được lên lịch cho ngày {selectedDay} Tháng 9. Hãy chọn ngày khác có chấm tím trên lịch!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedEvents.map(evt => {
                  const hasRSVP = evt.rsvpUserIds.includes(currentUser.id);
                  return (
                    <div key={evt.id} className="v-card p-5 space-y-4 hover:border-purple-400 transition-all flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="badge-linear-purple">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                            <Video className="w-3.5 h-3.5" />
                            <span>Live Video</span>
                          </span>
                          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{evt.durationMinutes} phút</span>
                          </div>
                        </div>

                        <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                          {evt.title}
                        </h4>

                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                          {evt.description}
                        </p>

                        <div className="flex items-center gap-2.5 pt-2 border-t border-purple-100 dark:border-purple-900/20">
                          <img src={evt.speakerAvatar} alt={evt.speakerName} className="w-7 h-7 rounded-lg object-cover ring-1 ring-purple-200 dark:ring-purple-700/40" />
                          <div>
                            <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-200">{evt.speakerName}</div>
                            <div className="text-[10px] text-zinc-500">Host / Diễn giả</div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-purple-100 dark:border-purple-900/20 space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <div className="font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                            <CalendarIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            <span>{evt.date} lúc {evt.time}</span>
                          </div>
                          <div className="text-zinc-500 text-[11px] flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" />
                            <span>{evt.rsvpUserIds.length} tham gia</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleRSVPEvent(evt.id)}
                            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                              hasRSVP
                                ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
                                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-glow-sm'
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{hasRSVP ? 'Đã đăng ký tham gia ✓' : 'Đăng ký tham gia'}</span>
                          </button>

                          {evt.meetingUrl && (
                            <a
                              href={evt.meetingUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-xl border border-purple-200 dark:border-purple-800/40 hover:bg-purple-50 dark:hover:bg-purple-950/30 text-purple-700 dark:text-purple-300 transition-all"
                              title="Mở đường link cuộc họp"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* AGENDA LIST VIEW MODE */}
      {viewMode === 'list' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {communityEvents.map((evt) => {
            const hasRSVP = evt.rsvpUserIds.includes(currentUser.id);
            return (
              <div key={evt.id} className="v-card p-6 flex flex-col justify-between space-y-4 hover:border-purple-400 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="badge-linear-purple">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                      <Video className="w-3.5 h-3.5" />
                      <span>Trực tuyến (Online)</span>
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                      <Clock className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{evt.durationMinutes} phút</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 leading-snug hover:text-purple-600 dark:hover:text-purple-300 transition-colors">
                    {evt.title}
                  </h3>

                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {evt.description}
                  </p>

                  {/* Speaker info */}
                  <div className="flex items-center gap-2.5 pt-2 border-t border-purple-100 dark:border-purple-900/20">
                    <img src={evt.speakerAvatar} alt={evt.speakerName} className="w-7 h-7 rounded-lg object-cover ring-1 ring-purple-200 dark:ring-purple-700/40" />
                    <div>
                      <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-200">{evt.speakerName}</div>
                      <div className="text-[10px] text-zinc-500">Host / Diễn giả</div>
                    </div>
                  </div>
                </div>

                {/* Event Time & RSVP Action */}
                <div className="pt-4 border-t border-purple-100 dark:border-purple-900/20 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="text-purple-700 dark:text-purple-300 font-bold flex items-center gap-1.5">
                      <CalendarIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <span>{evt.date} lúc {evt.time}</span>
                    </div>
                    <div className="text-zinc-500 dark:text-zinc-400 text-[11px] flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>{evt.rsvpUserIds.length} đã đăng ký</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleRSVPEvent(evt.id)}
                      className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                        hasRSVP
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 shadow-sm'
                          : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-glow-sm active:scale-95'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{hasRSVP ? 'Đã đăng ký tham gia ✓' : 'Đăng ký tham gia ngay'}</span>
                    </button>

                    {evt.meetingUrl && (
                      <a
                        href={evt.meetingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl border border-purple-200 dark:border-purple-800/40 hover:bg-purple-50 dark:hover:bg-purple-950/30 text-purple-700 dark:text-purple-300 transition-all"
                        title="Vào phòng học trực tuyến"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
