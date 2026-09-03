import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FolderDown,
  FileCode,
  FileText,
  LayoutTemplate,
  Download,
  Plus,
  Search
} from 'lucide-react';

export const ResourcesView: React.FC<{ onOpenResourceEditor?: () => void }> = ({ onOpenResourceEditor }) => {
  const {
    activeCommunityId,
    resources,
    activeRole
  } = useApp();

  const [selectedCat, setSelectedCat] = useState('Tất cả');
  const [search, setSearch] = useState('');

  const isCreator = activeRole === 'CREATOR';
  const communityResources = resources.filter(r => r.communityId === activeCommunityId);

  const categories = ['Tất cả', 'Source Code', 'Ebook / Tài liệu', 'Design Template'];

  const filtered = communityResources.filter(r => {
    const matchCat = selectedCat === 'Tất cả' || r.category === selectedCat;
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'CODE': return <FileCode className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      case 'PDF': return <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'TEMPLATE': return <LayoutTemplate className="w-5 h-5 text-pink-600 dark:text-pink-400" />;
      default: return <FolderDown className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <FolderDown className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span>Thư viện Tài nguyên & Mẫu code</span>
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
            Kho tài nguyên độc quyền (Ebook, Figma UI kit, Template mã nguồn) dành cho thành viên.
          </p>
        </div>

        {isCreator && onOpenResourceEditor && (
          <button
            onClick={onOpenResourceEditor}
            className="px-3.5 py-2 bg-purple-100 dark:bg-purple-600/20 hover:bg-purple-200 dark:hover:bg-purple-600/40 border border-purple-300 dark:border-purple-500/40 text-purple-700 dark:text-purple-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>+ Tải lên Tài nguyên</span>
          </button>
        )}
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCat === cat
                  ? 'bg-purple-600 text-white shadow-purple-glow-sm font-semibold'
                  : 'bg-white dark:bg-[#121217] hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-white/[0.06]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative max-w-xs">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm tài liệu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white dark:bg-[#121217] border border-zinc-200 dark:border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((res) => (
          <div
            key={res.id}
            className="v-card p-5 hover:border-purple-400 dark:hover:border-purple-500/40 transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-800/40 flex items-center justify-center">
                  {getFileIcon(res.fileType)}
                </div>
                <span className="text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-white/10 px-2 py-0.5 rounded text-zinc-600 dark:text-zinc-400">
                  {res.fileSize}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors line-clamp-2">
                  {res.title}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed">
                  {res.description}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-200 dark:border-white/[0.06] flex items-center justify-between">
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
                {res.downloadsCount} lượt tải
              </span>

              <button
                onClick={() => alert(`Đang tải file ${res.title}...`)}
                className="px-3 py-1.5 bg-zinc-100 dark:bg-[#181822] hover:bg-purple-600 hover:text-white border border-zinc-200 dark:border-white/10 hover:border-purple-500 text-zinc-700 dark:text-zinc-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải về</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
