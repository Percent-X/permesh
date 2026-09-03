import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { SearchModal } from './SearchModal';
import { CommunityHeader } from '../member/CommunityHeader';
import { FeedView } from '../member/FeedView';
import { CheckinHeatmap } from '../member/CheckinHeatmap';
import { ClassroomView } from '../member/ClassroomView';
import { ChallengesView } from '../member/ChallengesView';
import { EventsView } from '../member/EventsView';
import { ResourcesView } from '../member/ResourcesView';
import { QAView } from '../member/QAView';
import { LeaderboardView } from '../member/LeaderboardView';
import { ProfileView } from '../member/ProfileView';
import { CreatorDashboard } from '../creator/CreatorDashboard';
import { CouponManager } from '../creator/CouponManager';
import { CourseEditorModal } from '../creator/CourseEditorModal';
import { ChallengeEditorModal } from '../creator/ChallengeEditorModal';
import { EventEditorModal } from '../creator/EventEditorModal';
import { ResourceEditorModal } from '../creator/ResourceEditorModal';
import { AdminPortal } from '../admin/AdminPortal';
import { CreateCommunityModal } from '../modals/CreateCommunityModal';
import { CheckoutModal } from '../modals/CheckoutModal';

export const AppShell: React.FC = () => {
  const { activeTab, activeRole } = useApp();

  // Creator Modal controls
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);

  const isAdmin = activeRole === 'ADMIN' || activeTab === 'admin';

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#ffffff] dark:bg-[#030014] text-zinc-900 dark:text-zinc-100 transition-colors relative font-sans">
      {/* Ambient Cosmic Background Lighting */}
      <div className="fixed inset-0 mesh-glow pointer-events-none z-0" />
      <div className="fixed -top-24 left-1/4 w-[750px] h-[400px] bg-purple-600/10 dark:bg-purple-600/20 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[350px] bg-indigo-600/8 dark:bg-indigo-600/18 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Modern Vertical Tab Navigation Sidebar */}
      <Sidebar />

      {/* Main Workspace Column */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative z-10">
        {/* Sticky TopBar */}
        <TopBar />

        {/* Scrollable Workspace Pages */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {isAdmin ? (
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
              <AdminPortal />
            </div>
          ) : (
            <div>
              {/* Show Community Banner on Feed View */}
              {activeTab === 'feed' && <CommunityHeader />}

              {/* Dedicated Full Page Content per Section */}
              <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                {activeTab === 'feed' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8">
                      <FeedView />
                    </div>
                    <div className="lg:col-span-4">
                      <div className="sticky top-6">
                        <CheckinHeatmap />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'classroom' && (
                  <ClassroomView onOpenCourseEditor={() => setIsCourseModalOpen(true)} />
                )}

                {activeTab === 'challenges' && (
                  <ChallengesView onOpenChallengeEditor={() => setIsChallengeModalOpen(true)} />
                )}

                {activeTab === 'events' && (
                  <EventsView onOpenEventEditor={() => setIsEventModalOpen(true)} />
                )}

                {activeTab === 'resources' && (
                  <ResourcesView onOpenResourceEditor={() => setIsResourceModalOpen(true)} />
                )}

                {activeTab === 'qa' && <QAView />}

                {activeTab === 'members' && <LeaderboardView />}

                {activeTab === 'profile' && <ProfileView />}

                {activeTab === 'coupons' && <CouponManager />}

                {activeTab === 'dashboard' && <CreatorDashboard />}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Global Modals */}
      <SearchModal />
      <CreateCommunityModal />
      <CheckoutModal />

      {/* Creator Modals */}
      <CourseEditorModal isOpen={isCourseModalOpen} onClose={() => setIsCourseModalOpen(false)} />
      <ChallengeEditorModal isOpen={isChallengeModalOpen} onClose={() => setIsChallengeModalOpen(false)} />
      <EventEditorModal isOpen={isEventModalOpen} onClose={() => setIsEventModalOpen(false)} />
      <ResourceEditorModal isOpen={isResourceModalOpen} onClose={() => setIsResourceModalOpen(false)} />
    </div>
  );
};
