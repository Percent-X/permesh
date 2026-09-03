import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  Users,
  Building,
  AlertTriangle,
  CreditCard,
  DollarSign,
  TrendingUp,
  Search,
  Crown
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const {
    adminSubTab,
    setAdminSubTab,
    users,
    communities,
    reports,
    resolveReport,
    toggleBanUser,
    approveCommunity,
    suspendCommunity,
    setInspectedUser
  } = useApp();

  const [userSearch, setUserSearch] = useState('');
  const [commSearch, setCommSearch] = useState('');

  const tabs = [
    { id: 'overview', label: 'Platform Overview', icon: TrendingUp },
    { id: 'users', label: 'User Directory', icon: Users, badge: users.length.toString() },
    { id: 'communities', label: 'Community Approvals', icon: Building, badge: communities.length.toString() },
    { id: 'reports', label: 'Report Center', icon: AlertTriangle, badge: reports.filter(r => r.status === 'PENDING').length.toString() },
    { id: 'subscriptions', label: 'Subscriptions & Billing', icon: CreditCard },
  ];

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.username.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredCommunities = communities.filter(c =>
    c.name.toLowerCase().includes(commSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Admin Title Header */}
      <div className="v-card p-6 border-indigo-300 dark:border-indigo-500/30 bg-gradient-to-r from-indigo-50 via-white to-purple-50 dark:from-indigo-950/40 dark:via-[#12121a] dark:to-purple-950/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/60 border border-indigo-300 dark:border-indigo-500/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-sm">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-mono text-indigo-700 dark:text-indigo-400 font-bold">Superadmin Portal</div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Bảng Điều Khiển Toàn Nền Tảng (Platform Core)</h2>
          </div>
        </div>

        {/* Sub-tabs pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-zinc-100 dark:bg-[#0f0f15] p-1.5 rounded-2xl border border-zinc-200 dark:border-white/10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = adminSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setAdminSubTab(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-indigo-900 text-indigo-200' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Subtab 1: Platform Overview */}
      {adminSubTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="v-card p-5">
              <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
                <span>Tổng GMV Giao Dịch</span>
                <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-100 mt-2">$84,250</div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">+24.5% MoM</div>
            </div>

            <div className="v-card p-5">
              <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
                <span>Phí Nền Tảng (Take Rate 10%)</span>
                <DollarSign className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-purple-700 dark:text-purple-300 mt-2">$8,425</div>
              <div className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold mt-1">Doanh thu ròng sàn</div>
            </div>

            <div className="v-card p-5">
              <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
                <span>Tổng Người Dùng Sàn</span>
                <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-100 mt-2">2,960</div>
              <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold mt-1">84% active trong 7 ngày</div>
            </div>

            <div className="v-card p-5">
              <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
                <span>Cộng Đồng Đang Hoạt Động</span>
                <Building className="w-4 h-4 text-pink-600 dark:text-pink-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-100 mt-2">{communities.length}</div>
              <div className="text-[11px] text-pink-600 dark:text-pink-400 font-semibold mt-1">100% tuân thủ tiêu chuẩn</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="v-card p-6 space-y-3">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Cộng đồng mới cần duyệt</h3>
              <div className="space-y-2">
                {communities.map(c => (
                  <div key={c.id} className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.04]">
                    <div className="flex items-center gap-3">
                      <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-lg object-cover" />
                      <div>
                        <div className="text-xs font-bold text-zinc-900 dark:text-zinc-200">{c.name}</div>
                        <div className="text-[10px] text-zinc-500">{c.membersCount} thành viên</div>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 px-2 py-0.5 rounded font-bold">
                      {c.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="v-card p-6 space-y-3">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Báo cáo vi phạm đang chờ xử lý</h3>
              <div className="space-y-2">
                {reports.filter(r => r.status === 'PENDING').length === 0 ? (
                  <div className="text-xs text-zinc-500 py-6 text-center">Không có báo cáo vi phạm nào tồn đọng! 🎉</div>
                ) : (
                  reports.filter(r => r.status === 'PENDING').map(rep => (
                    <div key={rep.id} className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-500/30 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-amber-900 dark:text-amber-300">{rep.reason}</div>
                        <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">Bởi {rep.reportedBy.name}</div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => resolveReport(rep.id, 'RESOLVE')}
                          className="px-2.5 py-1 bg-purple-600 text-white rounded-lg text-xs font-bold shadow-sm"
                        >
                          Xử lý
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 2: User Directory */}
      {adminSubTab === 'users' && (
        <div className="v-card overflow-hidden space-y-4 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative max-w-sm flex-1">
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm user theo tên, username..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-[#16161f] border border-zinc-200 dark:border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">Hiển thị {filteredUsers.length} tài khoản</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-100 dark:bg-white/[0.02] border-b border-zinc-200 dark:border-white/[0.08] text-zinc-600 dark:text-zinc-400 font-mono">
                <tr>
                  <th className="p-3">User</th>
                  <th className="p-3">Vai trò</th>
                  <th className="p-3">Huy hiệu</th>
                  <th className="p-3">Streak</th>
                  <th className="p-3">Trạng thái</th>
                  <th className="p-3 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-white/[0.04]">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="p-3">
                      <div
                        onClick={() => setInspectedUser(user)}
                        className="flex items-center gap-2.5 cursor-pointer group"
                      >
                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-lg object-cover ring-1 ring-zinc-200 dark:ring-white/10" />
                        <div>
                          <div className="font-bold text-zinc-900 dark:text-zinc-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-300">{user.name}</div>
                          <div className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">@{user.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        user.role === 'ADMIN' ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700' :
                        user.role === 'CREATOR' ? 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-700' :
                        'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-3 font-medium text-purple-700 dark:text-purple-300">{user.badges[0] || 'Thành viên'}</td>
                    <td className="p-3 font-mono text-amber-500 dark:text-amber-400 font-bold">{user.streakDays} ngày</td>
                    <td className="p-3">
                      {user.isBanned ? (
                        <span className="text-[10px] bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-800 px-2 py-0.5 rounded font-bold">
                          Đã bị khóa (Banned)
                        </span>
                      ) : (
                        <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 px-2 py-0.5 rounded font-bold">
                          Hoạt động tốt
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => toggleBanUser(user.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                          user.isBanned
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-600'
                            : 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border-red-300 dark:border-red-800'
                        }`}
                      >
                        {user.isBanned ? 'Mở Khóa' : 'Khóa Tài Khoản'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Subtab 3: Community Approvals */}
      {adminSubTab === 'communities' && (
        <div className="v-card overflow-hidden space-y-4 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative max-w-sm flex-1">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm kiếm cộng đồng theo tên..."
                value={commSearch}
                onChange={(e) => setCommSearch(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-white/[0.04] border border-zinc-200 dark:border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="text-xs text-zinc-500 font-mono">
              Hiển thị {filteredCommunities.length} / {communities.length} không gian
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-100 dark:bg-white/[0.02] border-b border-zinc-200 dark:border-white/[0.08] text-zinc-600 dark:text-zinc-400 font-mono">
                <tr>
                  <th className="p-3">Community</th>
                  <th className="p-3">Mô hình giá</th>
                  <th className="p-3">Thành viên</th>
                  <th className="p-3">Trạng thái</th>
                  <th className="p-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-white/[0.04]">
                {filteredCommunities.map((comm) => (
                  <tr key={comm.id} className="hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img src={comm.avatar} alt={comm.name} className="w-10 h-10 rounded-xl object-cover" />
                        <div>
                          <div className="font-bold text-zinc-900 dark:text-zinc-200 flex items-center gap-1.5">
                            {comm.name}
                            {comm.isVerified && <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>}
                          </div>
                          <div className="text-[10px] text-zinc-500 line-clamp-1">{comm.tagline}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 font-mono font-bold">
                      {comm.priceMonthly > 0 ? (
                        <span className="text-purple-700 dark:text-purple-300">${comm.priceMonthly}/tháng</span>
                      ) : (
                        <span className="text-emerald-600 dark:text-emerald-400">Miễn phí</span>
                      )}
                    </td>
                    <td className="p-3 font-mono text-zinc-700 dark:text-zinc-300">{comm.membersCount.toLocaleString()}</td>
                    <td className="p-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        comm.status === 'ACTIVE' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800' :
                        comm.status === 'PENDING' ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800' :
                        'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-800'
                      }`}>
                        {comm.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {comm.status === 'PENDING' && (
                          <button
                            onClick={() => approveCommunity(comm.id)}
                            className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold"
                          >
                            Phê duyệt
                          </button>
                        )}
                        {comm.status === 'ACTIVE' ? (
                          <button
                            onClick={() => suspendCommunity(comm.id)}
                            className="px-2.5 py-1 bg-red-50 dark:bg-red-950/80 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-800 rounded-lg text-xs font-semibold"
                          >
                            Đình chỉ
                          </button>
                        ) : (
                          <button
                            onClick={() => approveCommunity(comm.id)}
                            className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 rounded-lg text-xs font-semibold"
                          >
                            Mở lại
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Subtab 4: Report Center */}
      {adminSubTab === 'reports' && (
        <div className="space-y-4">
          {reports.map((rep) => (
            <div
              key={rep.id}
              className={`v-card p-5 transition-all ${
                rep.status === 'PENDING' ? 'border-amber-300 dark:border-amber-500/40 bg-amber-50/50 dark:bg-amber-950/10' : ''
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-700 dark:text-zinc-300">
                      Loại: {rep.type}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      rep.status === 'PENDING' ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800' :
                      rep.status === 'RESOLVED' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800' :
                      'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                    }`}>
                      {rep.status}
                    </span>
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">{rep.createdAt}</span>
                  </div>

                  <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    Lý do báo cáo: <span className="text-amber-700 dark:text-amber-400">{rep.reason}</span>
                  </div>

                  <div className="text-xs text-zinc-700 dark:text-zinc-300 p-2.5 bg-white dark:bg-black/40 rounded-xl border border-zinc-200 dark:border-white/5 font-mono">
                    "{rep.targetPreview}"
                  </div>

                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    Người báo cáo: <span className="font-semibold text-zinc-800 dark:text-zinc-200">{rep.reportedBy.name}</span> (@{rep.reportedBy.username})
                  </div>
                </div>

                {rep.status === 'PENDING' && (
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => resolveReport(rep.id, 'DISMISS')}
                      className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl text-xs font-semibold"
                    >
                      Bỏ qua
                    </button>
                    <button
                      onClick={() => resolveReport(rep.id, 'RESOLVE')}
                      className="px-3.5 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold shadow-lg"
                    >
                      Xóa nội dung & Xử lý
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Subtab 5: Subscriptions & Billing */}
      {adminSubTab === 'subscriptions' && (
        <div className="v-card p-6 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Quản Lý Gói Creator & Cấu Hình Phí Sàn</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Mô hình phí thu định kỳ đối với các Creator sở hữu cộng đồng trên nền tảng.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.08] space-y-3">
              <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 font-semibold">Starter Creator</div>
              <div className="text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-100">$0 / tháng</div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Phí sàn 10% trên mỗi giao dịch thành viên trả phí.</p>
            </div>

            <div className="p-5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-300 dark:border-purple-500/40 space-y-3 relative overflow-hidden shadow-sm">
              <div className="text-xs font-mono text-purple-800 dark:text-purple-300 font-bold flex items-center justify-between">
                <span>Pro Creator (Permesh Standard)</span>
                <Crown className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-purple-900 dark:text-purple-200">$99 / tháng</div>
              <p className="text-xs text-zinc-700 dark:text-zinc-300">Phí sàn ưu đãi chỉ 2.9% + Unlimited Members & Video Hosting.</p>
            </div>

            <div className="p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-300 dark:border-indigo-500/30 space-y-3">
              <div className="text-xs font-mono text-indigo-800 dark:text-indigo-300 font-bold">Enterprise Farm</div>
              <div className="text-2xl font-bold font-mono text-indigo-900 dark:text-indigo-200">$299 / tháng</div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Tùy biến domain riêng + White-label Branding + 0% platform fee.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
