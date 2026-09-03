import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Course, Lesson } from '../../types';
import { MarkdownRenderer } from '../common/MarkdownRenderer';
import {
  BookOpen,
  Play,
  CheckCircle2,
  Circle,
  Clock,
  FileText,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Plus,
  Tv,
  Download
} from 'lucide-react';

export const ClassroomView: React.FC<{ onOpenCourseEditor?: () => void }> = ({ onOpenCourseEditor }) => {
  const {
    activeCommunityId,
    courses,
    toggleLessonComplete,
    activeRole
  } = useApp();

  const communityCourses = courses.filter(c => c.communityId === activeCommunityId);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(communityCourses[0] || null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(
    communityCourses[0]?.modules[0]?.lessons[0] || null
  );
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({ mod_1: true, mod_2: true });

  const isCreator = activeRole === 'CREATOR';

  // Calculate course completion percentage
  const getCourseProgress = (course: Course) => {
    let totalLessons = 0;
    let completedLessons = 0;
    course.modules.forEach(m => {
      m.lessons.forEach(l => {
        totalLessons++;
        if (l.isCompleted) completedLessons++;
      });
    });
    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  };

  const toggleModuleAccordion = (modId: string) => {
    setExpandedModules(prev => ({ ...prev, [modId]: !prev[modId] }));
  };

  if (!selectedCourse) {
    return (
      <div className="v-card p-12 text-center">
        <BookOpen className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-3 opacity-60" />
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Chưa có khóa học nào</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto">
          Chủ cộng đồng chưa đăng tải khóa học nào trong không gian này.
        </p>
        {isCreator && onOpenCourseEditor && (
          <button
            onClick={onOpenCourseEditor}
            className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold shadow-purple-glow"
          >
            + Tạo Khóa học Mới
          </button>
        )}
      </div>
    );
  }

  const progress = getCourseProgress(selectedCourse);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold text-purple-700 dark:text-purple-400 bg-purple-100 dark:bg-purple-950 px-2 py-0.5 rounded border border-purple-300 dark:border-purple-800/40">
              {selectedCourse.level}
            </span>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{selectedCourse.title}</h2>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 max-w-3xl">{selectedCourse.description}</p>
        </div>

        {isCreator && onOpenCourseEditor && (
          <button
            onClick={onOpenCourseEditor}
            className="px-3.5 py-2 bg-purple-100 dark:bg-purple-600/20 hover:bg-purple-200 dark:hover:bg-purple-600/40 border border-purple-300 dark:border-purple-500/40 text-purple-700 dark:text-purple-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm / Quản lý Khóa học</span>
          </button>
        )}
      </div>

      {/* Multiple Courses Switcher (if more than 1 course exists) */}
      {communityCourses.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {communityCourses.map(course => (
            <button
              key={course.id}
              onClick={() => {
                setSelectedCourse(course);
                setSelectedLesson(course.modules[0]?.lessons[0] || null);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                selectedCourse.id === course.id
                  ? 'bg-purple-600 text-white shadow-purple-glow-sm'
                  : 'bg-white dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              {course.title}
            </button>
          ))}
        </div>
      )}

      {/* Main LMS Layout: Video Player (Left 2/3) + Modules List (Right 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Video Player & Lesson Content */}
        <div className="lg:col-span-8 space-y-4">
          {selectedLesson ? (
            <div className="v-card overflow-hidden">
              {/* Video Player Box */}
              <div className="relative aspect-video w-full bg-zinc-950 flex items-center justify-center group overflow-hidden border-b border-zinc-200 dark:border-white/[0.08]">
                {/* Ambient glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 via-transparent to-indigo-900/30 pointer-events-none" />

                {/* Simulated Player */}
                <div className="text-center p-6 space-y-3 z-10">
                  <div className="w-16 h-16 rounded-full bg-purple-600/90 text-white flex items-center justify-center mx-auto shadow-purple-glow-lg group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <Play className="w-7 h-7 fill-white ml-1" />
                  </div>
                  <div className="text-xs text-zinc-200 font-medium">
                    Video Bài Giảng: <span className="text-purple-300 font-bold">{selectedLesson.title}</span>
                  </div>
                  <div className="text-[11px] text-zinc-400 font-mono">Thời lượng: {selectedLesson.duration} • 1080p 60fps</div>
                </div>

                {/* Video Controls Mock */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 flex items-center justify-between text-xs text-zinc-300">
                  <div className="flex items-center gap-3">
                    <Play className="w-4 h-4 cursor-pointer hover:text-purple-400" />
                    <span className="font-mono text-[10px]">03:12 / {selectedLesson.duration}</span>
                  </div>
                  <div className="h-1 bg-zinc-800 rounded-full flex-1 mx-4 overflow-hidden">
                    <div className="h-full bg-purple-500 w-1/4 rounded-full" />
                  </div>
                  <Tv className="w-4 h-4 cursor-pointer hover:text-purple-400" />
                </div>
              </div>

              {/* Lesson Details & Action */}
              <div className="p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-200 dark:border-white/[0.06]">
                  <div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{selectedLesson.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      <Clock className="w-3.5 h-3.5" /> {selectedLesson.duration}
                      {selectedLesson.isFreePreview && (
                        <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.2 rounded border border-emerald-300 dark:border-emerald-800 font-semibold">
                          Học thử miễn phí
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Mark Complete Button */}
                  <button
                    onClick={() => toggleLessonComplete(selectedCourse.id, selectedLesson.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                      selectedLesson.isCompleted
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-300 shadow-sm'
                        : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-glow'
                    }`}
                  >
                    <CheckCircle2 className={`w-4 h-4 ${selectedLesson.isCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-white'}`} />
                    <span>{selectedLesson.isCompleted ? 'Đã hoàn thành bài học' : 'Đánh dấu hoàn thành'}</span>
                  </button>
                </div>

                {/* Lesson Description Content */}
                <div className="pt-1">
                  <MarkdownRenderer content={selectedLesson.content} />
                </div>

                {/* Lesson Attachments */}
                {selectedLesson.attachments && selectedLesson.attachments.length > 0 && (
                  <div className="pt-3 border-t border-zinc-200 dark:border-white/[0.06] space-y-2">
                    <div className="text-xs font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" /> Tài liệu đính kèm
                    </div>
                    <div className="space-y-1.5">
                      {selectedLesson.attachments.map((att, idx) => (
                        <a
                          key={idx}
                          href={att.url}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-100 dark:bg-[#16161f] hover:bg-purple-50 dark:hover:bg-purple-950/30 border border-zinc-200 dark:border-white/10 hover:border-purple-300 dark:hover:border-purple-500/40 text-xs transition-all group"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            <span className="font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-purple-600 dark:group-hover:text-purple-300">{att.name}</span>
                          </div>
                          <span className="text-zinc-500 font-mono text-[10px] flex items-center gap-1">
                            {att.size} <Download className="w-3 h-3 text-zinc-400 group-hover:text-purple-600 dark:group-hover:text-purple-400" />
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="v-card p-12 text-center text-zinc-500 text-xs">
              Chọn một bài học từ danh sách bên phải để bắt đầu học.
            </div>
          )}
        </div>

        {/* Right: Modules & Lessons Navigator */}
        <div className="lg:col-span-4 space-y-4">
          {/* Progress Card */}
          <div className="v-card p-4">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-zinc-900 dark:text-zinc-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> Tiến độ học tập
              </span>
              <span className="font-mono font-bold text-purple-600 dark:text-purple-400">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500 shadow-purple-glow-sm"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Modules Accordion */}
          <div className="space-y-3">
            {selectedCourse.modules.map((mod) => {
              const isExpanded = expandedModules[mod.id] ?? true;
              return (
                <div key={mod.id} className="v-card overflow-hidden">
                  {/* Module Header */}
                  <button
                    onClick={() => toggleModuleAccordion(mod.id)}
                    className="w-full p-3.5 bg-zinc-50/50 dark:bg-white/[0.02] hover:bg-zinc-100 dark:hover:bg-white/[0.04] flex items-center justify-between text-left transition-colors border-b border-zinc-200 dark:border-white/[0.06]"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">{mod.title}</div>
                      <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">{mod.lessons.length} bài học</div>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-zinc-400 shrink-0" />
                    )}
                  </button>

                  {/* Lessons List */}
                  {isExpanded && (
                    <div className="divide-y divide-zinc-100 dark:divide-white/[0.04]">
                      {mod.lessons.map((les) => {
                        const isCurrent = selectedLesson?.id === les.id;
                        return (
                          <div
                            key={les.id}
                            onClick={() => setSelectedLesson(les)}
                            className={`p-3 flex items-start justify-between gap-2.5 cursor-pointer transition-all text-xs ${
                              isCurrent
                                ? 'bg-purple-100/70 dark:bg-purple-950/40 border-l-4 border-purple-600 dark:border-purple-500 text-purple-900 dark:text-purple-200'
                                : 'hover:bg-zinc-50 dark:hover:bg-white/[0.02] text-zinc-700 dark:text-zinc-300'
                            }`}
                          >
                            <div className="flex items-start gap-2.5 min-w-0">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleLessonComplete(selectedCourse.id, les.id);
                                }}
                                className="mt-0.5"
                              >
                                {les.isCompleted ? (
                                  <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 fill-purple-100 dark:fill-purple-950" />
                                ) : (
                                  <Circle className="w-4 h-4 text-zinc-400 dark:text-zinc-600 hover:text-purple-600 dark:hover:text-purple-400" />
                                )}
                              </button>
                              <div className="min-w-0">
                                <div className={`font-semibold leading-tight line-clamp-1 ${isCurrent ? 'text-purple-700 dark:text-purple-300 font-bold' : 'text-zinc-800 dark:text-zinc-200'}`}>
                                  {les.title}
                                </div>
                                <div className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono mt-0.5">
                                  {les.duration}
                                </div>
                              </div>
                            </div>
                            {isCurrent && (
                              <Play className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0 mt-1 fill-purple-600 dark:fill-purple-400" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
