import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, FolderDown } from 'lucide-react';

export const ResourceEditorModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { createResource } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileType, setFileType] = useState<'PDF' | 'TEMPLATE' | 'CODE' | 'VIDEO' | 'ZIP'>('CODE');
  const [fileSize, setFileSize] = useState('3.8 MB');
  const [category, setCategory] = useState('Source Code');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createResource({
      title,
      description,
      fileType,
      fileSize,
      category,
      downloadUrl: '#'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-white dark:bg-[#0a0718] border border-zinc-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden ring-1 ring-purple-500/20">
        <div className="p-5 border-b border-zinc-200 dark:border-white/[0.08] flex items-center justify-between bg-zinc-50 dark:bg-[#16161d]">
          <div className="flex items-center gap-2">
            <FolderDown className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Đăng Tải Tài Nguyên Mới (Resource Studio)</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-zinc-400 hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs text-zinc-600 dark:text-zinc-400 font-medium block mb-1">Tên tài nguyên / File</label>
            <input
              type="text"
              placeholder="Ví dụ: Starter Kit LangGraph + Fastify + MCP Docker"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-[#16161f] border border-zinc-200 dark:border-white/10 rounded-xl p-3 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-600 dark:text-zinc-400 font-medium block mb-1">Loại file</label>
              <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value as any)}
                className="w-full bg-zinc-50 dark:bg-[#16161f] border border-zinc-200 dark:border-white/10 rounded-xl p-2.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-purple-500"
              >
                <option value="CODE">Source Code</option>
                <option value="PDF">Ebook / PDF</option>
                <option value="TEMPLATE">Design Template / Figma</option>
                <option value="ZIP">ZIP Archive</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-zinc-600 dark:text-zinc-400 font-medium block mb-1">Dung lượng ước tính</label>
              <input
                type="text"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-[#16161f] border border-zinc-200 dark:border-white/10 rounded-xl p-2.5 text-xs text-zinc-900 dark:text-zinc-100 font-mono focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-600 dark:text-zinc-400 font-medium block mb-1">Danh mục</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-[#16161f] border border-zinc-200 dark:border-white/10 rounded-xl p-2.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-600 dark:text-zinc-400 font-medium block mb-1">Mô tả tệp tin</label>
            <textarea
              rows={3}
              placeholder="Hướng dẫn sử dụng hoặc mô tả file đính kèm..."
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
              Upload Tài Nguyên
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
