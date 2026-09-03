import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Calendar } from 'lucide-react';

export const EventEditorModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { createEvent, currentUser } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('2026-09-15');
  const [time, setTime] = useState('20:00');
  const [durationMinutes, setDurationMinutes] = useState(90);
  const [meetingUrl, setMeetingUrl] = useState('https://meet.google.com/xyz-work-shop');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createEvent({
      title,
      description,
      date,
      time,
      durationMinutes: Number(durationMinutes),
      locationType: 'ONLINE',
      meetingUrl,
      speakerName: currentUser.name,
      speakerAvatar: currentUser.avatar
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-white dark:bg-[#0a0718] border border-zinc-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden ring-1 ring-purple-500/20">
        <div className="p-5 border-b border-zinc-200 dark:border-white/[0.08] flex items-center justify-between bg-zinc-50 dark:bg-[#16161d]">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Tổ Chức Sự Kiện Mới (Event Studio)</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-zinc-400 hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs text-zinc-600 dark:text-zinc-400 font-medium block mb-1">Tên buổi Workshop / Sự kiện</label>
            <input
              type="text"
              placeholder="Ví dụ: Live Coding: Deploy LangGraph Multi-Agent lên VPS"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-[#16161f] border border-zinc-200 dark:border-white/10 rounded-xl p-3 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-zinc-600 dark:text-zinc-400 font-medium block mb-1">Ngày diễn ra</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-[#16161f] border border-zinc-200 dark:border-white/10 rounded-xl p-2.5 text-xs text-zinc-900 dark:text-zinc-100 font-mono focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-600 dark:text-zinc-400 font-medium block mb-1">Giờ bắt đầu</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-[#16161f] border border-zinc-200 dark:border-white/10 rounded-xl p-2.5 text-xs text-zinc-900 dark:text-zinc-100 font-mono focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-600 dark:text-zinc-400 font-medium block mb-1">Thời lượng (phút)</label>
              <input
                type="number"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full bg-zinc-50 dark:bg-[#16161f] border border-zinc-200 dark:border-white/10 rounded-xl p-2.5 text-xs text-zinc-900 dark:text-zinc-100 font-mono focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-600 dark:text-zinc-400 font-medium block mb-1">Link Google Meet / Zoom</label>
            <input
              type="url"
              value={meetingUrl}
              onChange={(e) => setMeetingUrl(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-[#16161f] border border-zinc-200 dark:border-white/10 rounded-xl p-2.5 text-xs text-zinc-900 dark:text-zinc-100 font-mono focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-600 dark:text-zinc-400 font-medium block mb-1">Mô tả nội dung & Agenda</label>
            <textarea
              rows={3}
              placeholder="Chi tiết các phần sẽ trình bày trong sự kiện..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-[#16161f] border border-zinc-200 dark:border-white/10 rounded-xl p-3 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-purple-500 resize-none"
            />
          </div>

          <div className="pt-3 border-t border-zinc-200 dark:border-white/[0.08] flex items-center justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-xs text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white">
              Hủy
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-purple-glow"
            >
              Lên Lịch Sự Kiện
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
