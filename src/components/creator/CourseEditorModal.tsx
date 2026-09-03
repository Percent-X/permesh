import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, BookOpen, Sparkles } from 'lucide-react';

export const CourseEditorModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { createCourse } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Mastery'>('Mastery');
  const [moduleTitle, setModuleTitle] = useState('Chương 1: Kiến thức Cốt lõi');
  const [lessonTitle, setLessonTitle] = useState('1.1 Nhập môn & Cài đặt môi trường');
  const [lessonDuration, setLessonDuration] = useState('15:00');
  const [lessonContent, setLessonContent] = useState('Nội dung tổng quan về bài học...');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createCourse({
      title,
      description,
      level,
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      modules: [
        {
          id: `mod_${Date.now()}`,
          title: moduleTitle,
          order: 1,
          lessons: [
            {
              id: `les_${Date.now()}`,
              title: lessonTitle,
              duration: lessonDuration,
              videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
              content: lessonContent,
              isFreePreview: true,
              isCompleted: false
            }
          ]
        }
      ]
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white dark:bg-[#0a0718] border border-zinc-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden ring-1 ring-purple-500/20 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-zinc-200 dark:border-white/[0.08] flex items-center justify-between bg-zinc-50 dark:bg-[#16161d]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Tạo Khóa Học Mới (Course Studio)</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-zinc-400 hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          <div>
            <label className="text-xs text-zinc-600 dark:text-zinc-400 font-medium block mb-1">Tên khóa học</label>
            <input
              type="text"
              placeholder="Ví dụ: Làm chủ Multi-Agent System với LangGraph & Python"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-[#16161f] border border-zinc-200 dark:border-white/10 rounded-xl p-3 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-600 dark:text-zinc-400 font-medium block mb-1">Cấp độ (Level)</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as any)}
                className="w-full bg-zinc-50 dark:bg-[#16161f] border border-zinc-200 dark:border-white/10 rounded-xl p-3 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-purple-500"
              >
                <option value="Beginner">Beginner (Cơ bản)</option>
                <option value="Intermediate">Intermediate (Trung cấp)</option>
                <option value="Advanced">Advanced (Nâng cao)</option>
                <option value="Mastery">Mastery (Chuyên gia)</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-zinc-600 dark:text-zinc-400 font-medium block mb-1">Thời lượng bài học đầu</label>
              <input
                type="text"
                value={lessonDuration}
                onChange={(e) => setLessonDuration(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-[#16161f] border border-zinc-200 dark:border-white/10 rounded-xl p-3 text-xs text-zinc-900 dark:text-zinc-100 font-mono focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-600 dark:text-zinc-400 font-medium block mb-1">Mô tả tổng quan khóa học</label>
            <textarea
              rows={2}
              placeholder="Mô tả mục tiêu đầu ra và kiến thức học viên sẽ đạt được..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-[#16161f] border border-zinc-200 dark:border-white/10 rounded-xl p-3 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-purple-500 resize-none"
            />
          </div>

          {/* Module & Lesson Initial Setup */}
          <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-500/20 space-y-3">
            <div className="text-xs font-bold text-purple-800 dark:text-purple-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> Khởi tạo Chương & Bài học đầu tiên
            </div>

            <div>
              <label className="text-[11px] text-zinc-600 dark:text-zinc-400 block mb-1">Tên Chương (Module Title)</label>
              <input
                type="text"
                value={moduleTitle}
                onChange={(e) => setModuleTitle(e.target.value)}
                className="w-full bg-white dark:bg-[#16161f] border border-zinc-200 dark:border-white/10 rounded-xl p-2.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="text-[11px] text-zinc-600 dark:text-zinc-400 block mb-1">Tên Bài học (Lesson Title)</label>
              <input
                type="text"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                className="w-full bg-white dark:bg-[#16161f] border border-zinc-200 dark:border-white/10 rounded-xl p-2.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="text-[11px] text-zinc-600 dark:text-zinc-400 block mb-1">Nội dung bài học</label>
              <textarea
                rows={2}
                value={lessonContent}
                onChange={(e) => setLessonContent(e.target.value)}
                className="w-full bg-white dark:bg-[#16161f] border border-zinc-200 dark:border-white/10 rounded-xl p-2.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-zinc-200 dark:border-white/[0.08] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-purple-glow transition-all"
            >
              Tạo Khóa Học
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
