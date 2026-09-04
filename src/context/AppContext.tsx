import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  User,
  UserRole,
  Community,
  Post,
  Comment,
  Course,
  Challenge,
  CommunityEvent,
  ResourceItem,
  Coupon,
  ReportItem,
  NotificationItem,
  ActivityHeatmapDay
} from '../types';
import {
  CURRENT_USER,
  MOCK_USERS,
  MOCK_COMMUNITIES,
  MOCK_POSTS,
  MOCK_COMMENTS,
  MOCK_COURSES,
  MOCK_CHALLENGES,
  MOCK_EVENTS,
  MOCK_RESOURCES,
  MOCK_COUPONS,
  MOCK_REPORTS,
  MOCK_NOTIFICATIONS,
  generateMockHeatmap
} from '../data/mockData';

interface AppContextType {
  currentUser: User;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  activeCommunityId: string;
  setActiveCommunityId: (id: string) => void;
  activeCommunity: Community | undefined;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  adminSubTab: string;
  setAdminSubTab: (subtab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;

  // Data lists
  users: User[];
  communities: Community[];
  posts: Post[];
  comments: Record<string, Comment[]>;
  courses: Course[];
  challenges: Challenge[];
  events: CommunityEvent[];
  resources: ResourceItem[];
  coupons: Coupon[];
  reports: ReportItem[];
  notifications: NotificationItem[];
  activityDays: ActivityHeatmapDay[];

  // Modal states
  inspectedUser: User | null;
  setInspectedUser: (user: User | null) => void;
  checkoutCommunity: Community | null;
  setCheckoutCommunity: (community: Community | null) => void;
  isCreateCommunityOpen: boolean;
  setIsCreateCommunityOpen: (open: boolean) => void;

  // Actions
  createPost: (post: { title: string; content: string; category: string; tags: string[]; pollOptions?: string[]; isQuestion?: boolean }) => void;
  toggleUpvotePost: (postId: string) => void;
  toggleDownvotePost: (postId: string) => void;
  toggleBookmarkPost: (postId: string) => void;
  toggleSolvePost: (postId: string) => void;
  markCommentAsSolution: (postId: string, commentId: string) => void;
  votePoll: (postId: string, optionId: string) => void;
  addComment: (postId: string, content: string, parentId?: string) => void;
  toggleUpvoteComment: (postId: string, commentId: string) => void;
  toggleDownvoteComment: (postId: string, commentId: string) => void;
  toggleLessonComplete: (courseId: string, lessonId: string) => void;
  submitChallengeProof: (challengeId: string, day: number, content: string, linkUrl?: string) => void;
  toggleLikeSubmission: (challengeId: string, submissionId: string) => void;
  dailyCheckin: () => void;
  toggleRSVPEvent: (eventId: string) => void;
  createCommunity: (data: Partial<Community>) => void;
  createCourse: (data: Partial<Course>) => void;
  createChallenge: (data: Partial<Challenge>) => void;
  createEvent: (data: Partial<CommunityEvent>) => void;
  createResource: (data: Partial<ResourceItem>) => void;
  createCoupon: (data: Partial<Coupon>) => void;
  resolveReport: (reportId: string, action: 'RESOLVE' | 'DISMISS') => void;
  toggleBanUser: (userId: string) => void;
  approveCommunity: (communityId: string) => void;
  suspendCommunity: (communityId: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  deleteNotification: (id: string) => void;
  toggleNotificationRead: (id: string) => void;
  applyCouponToCheckout: (code: string) => { valid: boolean; discountPercent: number; message: string };
  completeCheckout: () => void;
  resetToDefaultData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'skool_platform_state_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial states
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_user`);
    return saved ? JSON.parse(saved) : CURRENT_USER;
  });

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_theme`);
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  // Apply theme class to document
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_theme`, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const [activeRole, setActiveRole] = useState<UserRole>('CREATOR');
  const [activeCommunityId, setActiveCommunityId] = useState<string>('comm_ai_builders');
  const [activeTab, setActiveTab] = useState<string>('feed');
  const [adminSubTab, setAdminSubTab] = useState<string>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_users`);
    return saved ? JSON.parse(saved) : MOCK_USERS;
  });

  const [communities, setCommunities] = useState<Community[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_communities`);
    return saved ? JSON.parse(saved) : MOCK_COMMUNITIES;
  });

  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_posts`);
    return saved ? JSON.parse(saved) : MOCK_POSTS;
  });

  const [comments, setComments] = useState<Record<string, Comment[]>>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_comments`);
    return saved ? JSON.parse(saved) : MOCK_COMMENTS;
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_courses`);
    return saved ? JSON.parse(saved) : MOCK_COURSES;
  });

  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_challenges`);
    return saved ? JSON.parse(saved) : MOCK_CHALLENGES;
  });

  const [events, setEvents] = useState<CommunityEvent[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_events`);
    return saved ? JSON.parse(saved) : MOCK_EVENTS;
  });

  const [resources, setResources] = useState<ResourceItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_resources`);
    return saved ? JSON.parse(saved) : MOCK_RESOURCES;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_coupons`);
    return saved ? JSON.parse(saved) : MOCK_COUPONS;
  });

  const [reports, setReports] = useState<ReportItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_reports`);
    return saved ? JSON.parse(saved) : MOCK_REPORTS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_notifications`);
    return saved ? JSON.parse(saved) : MOCK_NOTIFICATIONS;
  });

  const [activityDays, setActivityDays] = useState<ActivityHeatmapDay[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_heatmap`);
    return saved ? JSON.parse(saved) : generateMockHeatmap();
  });

  // Modals & Navigation
  const [inspectedUser, setInspectedUserState] = useState<User | null>(null);

  const setInspectedUser = (user: User | null) => {
    setInspectedUserState(user);
    if (user) {
      setActiveTab('profile');
    }
  };

  const [checkoutCommunity, setCheckoutCommunity] = useState<Community | null>(null);
  const [isCreateCommunityOpen, setIsCreateCommunityOpen] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_user`, JSON.stringify(currentUser));
    localStorage.setItem(`${STORAGE_KEY}_users`, JSON.stringify(users));
    localStorage.setItem(`${STORAGE_KEY}_communities`, JSON.stringify(communities));
    localStorage.setItem(`${STORAGE_KEY}_posts`, JSON.stringify(posts));
    localStorage.setItem(`${STORAGE_KEY}_comments`, JSON.stringify(comments));
    localStorage.setItem(`${STORAGE_KEY}_courses`, JSON.stringify(courses));
    localStorage.setItem(`${STORAGE_KEY}_challenges`, JSON.stringify(challenges));
    localStorage.setItem(`${STORAGE_KEY}_events`, JSON.stringify(events));
    localStorage.setItem(`${STORAGE_KEY}_resources`, JSON.stringify(resources));
    localStorage.setItem(`${STORAGE_KEY}_coupons`, JSON.stringify(coupons));
    localStorage.setItem(`${STORAGE_KEY}_reports`, JSON.stringify(reports));
    localStorage.setItem(`${STORAGE_KEY}_notifications`, JSON.stringify(notifications));
    localStorage.setItem(`${STORAGE_KEY}_heatmap`, JSON.stringify(activityDays));
  }, [currentUser, users, communities, posts, comments, courses, challenges, events, resources, coupons, reports, notifications, activityDays]);

  const activeCommunity = communities.find(c => c.id === activeCommunityId) || communities[0];

  // Record Activity in Heatmap
  const recordActivity = (pointsToAdd = 10) => {
    const today = new Date().toISOString().split('T')[0];
    setActivityDays(prev => {
      const existing = prev.find(d => d.date === today);
      if (existing) {
        return prev.map(d => {
          if (d.date === today) {
            const nextCount = d.count + 1;
            let level: 0 | 1 | 2 | 3 | 4 = 1;
            if (nextCount > 6) level = 4;
            else if (nextCount > 4) level = 3;
            else if (nextCount > 2) level = 2;
            return { ...d, count: nextCount, level };
          }
          return d;
        });
      } else {
        return [...prev.slice(1), { date: today, count: 1, level: 1 }];
      }
    });

    setCurrentUser(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + pointsToAdd
    }));
  };

  // Actions
  const createPost = (data: { title: string; content: string; category: string; tags: string[]; pollOptions?: string[]; isQuestion?: boolean }) => {
    const newPost: Post = {
      id: `post_${Date.now()}`,
      communityId: activeCommunityId,
      author: currentUser,
      title: data.title,
      content: data.content,
      category: data.isQuestion ? (data.category && data.category !== 'Chung' ? data.category : 'Hỏi đáp Kỹ thuật') : (data.category || 'Chung'),
      tags: data.tags.length > 0 ? data.tags : (data.isQuestion ? ['Hỏi đáp'] : ['Discussions']),
      upvotesCount: 1,
      upvotedByUserIds: [currentUser.id],
      commentsCount: 0,
      isQuestion: !!data.isQuestion,
      isSolved: false,
      createdAt: 'Vừa xong',
      poll: data.pollOptions && data.pollOptions.filter(o => o.trim()).length > 0 ? {
        question: data.title,
        options: data.pollOptions.filter(o => o.trim()).map((opt, idx) => ({
          id: `opt_${Date.now()}_${idx}`,
          text: opt,
          votes: 0,
          votedUserIds: []
        })),
        totalVotes: 0
      } : undefined
    };

    setPosts(prev => [newPost, ...prev]);
    recordActivity(25);
  };

  const toggleUpvotePost = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const hasUpvoted = post.upvotedByUserIds.includes(currentUser.id);
        const hasDownvoted = (post.downvotedByUserIds || []).includes(currentUser.id);

        let upvotedByUserIds = post.upvotedByUserIds;
        let downvotedByUserIds = post.downvotedByUserIds || [];
        let upvotesCount = post.upvotesCount;
        let downvotesCount = post.downvotesCount || 0;

        if (hasUpvoted) {
          upvotedByUserIds = upvotedByUserIds.filter(id => id !== currentUser.id);
          upvotesCount -= 1;
        } else {
          upvotedByUserIds = [...upvotedByUserIds, currentUser.id];
          upvotesCount += 1;
          if (hasDownvoted) {
            downvotedByUserIds = downvotedByUserIds.filter(id => id !== currentUser.id);
            downvotesCount = Math.max(0, downvotesCount - 1);
          }
        }

        return {
          ...post,
          upvotesCount,
          downvotesCount,
          upvotedByUserIds,
          downvotedByUserIds
        };
      }
      return post;
    }));
    recordActivity(5);
  };

  const toggleDownvotePost = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const hasUpvoted = post.upvotedByUserIds.includes(currentUser.id);
        const hasDownvoted = (post.downvotedByUserIds || []).includes(currentUser.id);

        let upvotedByUserIds = post.upvotedByUserIds;
        let downvotedByUserIds = post.downvotedByUserIds || [];
        let upvotesCount = post.upvotesCount;
        let downvotesCount = post.downvotesCount || 0;

        if (hasDownvoted) {
          downvotedByUserIds = downvotedByUserIds.filter(id => id !== currentUser.id);
          downvotesCount = Math.max(0, downvotesCount - 1);
        } else {
          downvotedByUserIds = [...downvotedByUserIds, currentUser.id];
          downvotesCount += 1;
          if (hasUpvoted) {
            upvotedByUserIds = upvotedByUserIds.filter(id => id !== currentUser.id);
            upvotesCount = Math.max(0, upvotesCount - 1);
          }
        }

        return {
          ...post,
          upvotesCount,
          downvotesCount,
          upvotedByUserIds,
          downvotedByUserIds
        };
      }
      return post;
    }));
  };

  const toggleBookmarkPost = (postId: string) => {
    const isBookmarked = currentUser.bookmarkedPostIds.includes(postId);
    const updatedIds = isBookmarked
      ? currentUser.bookmarkedPostIds.filter(id => id !== postId)
      : [...currentUser.bookmarkedPostIds, postId];

    setCurrentUser(prev => ({ ...prev, bookmarkedPostIds: updatedIds }));
  };

  const votePoll = (postId: string, optionId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId && post.poll) {
        // Remove previous vote if any
        let hasVotedAny = false;
        const newOptions = post.poll.options.map(opt => {
          const userHasVotedThis = opt.votedUserIds.includes(currentUser.id);
          if (userHasVotedThis) hasVotedAny = true;
          if (opt.id === optionId) {
            if (userHasVotedThis) {
              return { ...opt, votes: opt.votes - 1, votedUserIds: opt.votedUserIds.filter(id => id !== currentUser.id) };
            } else {
              return { ...opt, votes: opt.votes + 1, votedUserIds: [...opt.votedUserIds, currentUser.id] };
            }
          } else if (userHasVotedThis) {
            return { ...opt, votes: opt.votes - 1, votedUserIds: opt.votedUserIds.filter(id => id !== currentUser.id) };
          }
          return opt;
        });

        const totalVotes = newOptions.reduce((acc, curr) => acc + curr.votes, 0);
        return {
          ...post,
          poll: {
            ...post.poll,
            options: newOptions,
            totalVotes
          }
        };
      }
      return post;
    }));
    recordActivity(10);
  };

  const addComment = (postId: string, content: string, parentId?: string) => {
    const newComment: Comment = {
      id: `cmt_${Date.now()}`,
      postId,
      author: currentUser,
      content,
      upvotesCount: 0,
      upvotedByUserIds: [],
      parentId,
      createdAt: 'Vừa xong',
      replies: []
    };

    setComments(prev => {
      const currentComments = prev[postId] || [];
      if (!parentId) {
        return { ...prev, [postId]: [...currentComments, newComment] };
      } else {
        // Add to parent replies
        const updated = currentComments.map(c => {
          if (c.id === parentId) {
            return {
              ...c,
              replies: [...(c.replies || []), newComment]
            };
          }
          return c;
        });
        return { ...prev, [postId]: updated };
      }
    });

    setPosts(prev => prev.map(p => p.id === postId ? { ...p, commentsCount: p.commentsCount + 1 } : p));
    recordActivity(15);
  };

  const toggleUpvoteComment = (postId: string, commentId: string) => {
    setComments(prev => {
      const list = prev[postId] || [];
      const updateItem = (item: Comment): Comment => {
        if (item.id === commentId) {
          const hasUpvoted = item.upvotedByUserIds.includes(currentUser.id);
          const hasDownvoted = (item.downvotedByUserIds || []).includes(currentUser.id);

          let upvotedByUserIds = item.upvotedByUserIds;
          let downvotedByUserIds = item.downvotedByUserIds || [];
          let upvotesCount = item.upvotesCount;
          let downvotesCount = item.downvotesCount || 0;

          if (hasUpvoted) {
            upvotedByUserIds = upvotedByUserIds.filter(id => id !== currentUser.id);
            upvotesCount -= 1;
          } else {
            upvotedByUserIds = [...upvotedByUserIds, currentUser.id];
            upvotesCount += 1;
            if (hasDownvoted) {
              downvotedByUserIds = downvotedByUserIds.filter(id => id !== currentUser.id);
              downvotesCount = Math.max(0, downvotesCount - 1);
            }
          }

          return {
            ...item,
            upvotesCount,
            downvotesCount,
            upvotedByUserIds,
            downvotedByUserIds
          };
        }
        if (item.replies && item.replies.length > 0) {
          return { ...item, replies: item.replies.map(updateItem) };
        }
        return item;
      };

      return {
        ...prev,
        [postId]: list.map(updateItem)
      };
    });
    recordActivity(5);
  };

  const toggleDownvoteComment = (postId: string, commentId: string) => {
    setComments(prev => {
      const list = prev[postId] || [];
      const updateItem = (item: Comment): Comment => {
        if (item.id === commentId) {
          const hasUpvoted = item.upvotedByUserIds.includes(currentUser.id);
          const hasDownvoted = (item.downvotedByUserIds || []).includes(currentUser.id);

          let upvotedByUserIds = item.upvotedByUserIds;
          let downvotedByUserIds = item.downvotedByUserIds || [];
          let upvotesCount = item.upvotesCount;
          let downvotesCount = item.downvotesCount || 0;

          if (hasDownvoted) {
            downvotedByUserIds = downvotedByUserIds.filter(id => id !== currentUser.id);
            downvotesCount = Math.max(0, downvotesCount - 1);
          } else {
            downvotedByUserIds = [...downvotedByUserIds, currentUser.id];
            downvotesCount += 1;
            if (hasUpvoted) {
              upvotedByUserIds = upvotedByUserIds.filter(id => id !== currentUser.id);
              upvotesCount = Math.max(0, upvotesCount - 1);
            }
          }

          return {
            ...item,
            upvotesCount,
            downvotesCount,
            upvotedByUserIds,
            downvotedByUserIds
          };
        }
        if (item.replies && item.replies.length > 0) {
          return { ...item, replies: item.replies.map(updateItem) };
        }
        return item;
      };

      return {
        ...prev,
        [postId]: list.map(updateItem)
      };
    });
  };

  const toggleLessonComplete = (courseId: string, lessonId: string) => {
    setCourses(prev => prev.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          modules: course.modules.map(mod => ({
            ...mod,
            lessons: mod.lessons.map(les => {
              if (les.id === lessonId) {
                const nextState = !les.isCompleted;
                if (nextState) {
                  confetti({
                    particleCount: 80,
                    spread: 60,
                    origin: { y: 0.8 },
                    colors: ['#a855f7', '#6366f1', '#c084fc']
                  });
                }
                return { ...les, isCompleted: nextState };
              }
              return les;
            })
          }))
        };
      }
      return course;
    }));
    recordActivity(30);
  };

  const submitChallengeProof = (challengeId: string, day: number, content: string, linkUrl?: string) => {
    const submission: import('../types').ChallengeSubmission = {
      id: `sub_${Date.now()}`,
      challengeId,
      day,
      author: currentUser,
      content,
      linkUrl,
      submittedAt: 'Vừa xong',
      likesCount: 1,
      likedByUserIds: [currentUser.id]
    };

    setChallenges(prev => prev.map(ch => {
      if (ch.id === challengeId) {
        return {
          ...ch,
          submissions: [submission, ...ch.submissions]
        };
      }
      return ch;
    }));

    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#a855f7', '#8b5cf6', '#ec4899']
    });

    recordActivity(50);
  };

  const toggleLikeSubmission = (challengeId: string, submissionId: string) => {
    setChallenges(prev => prev.map(ch => {
      if (ch.id === challengeId) {
        return {
          ...ch,
          submissions: ch.submissions.map(sub => {
            if (sub.id === submissionId) {
              const hasLiked = sub.likedByUserIds.includes(currentUser.id);
              return {
                ...sub,
                likesCount: hasLiked ? sub.likesCount - 1 : sub.likesCount + 1,
                likedByUserIds: hasLiked ? sub.likedByUserIds.filter(id => id !== currentUser.id) : [...sub.likedByUserIds, currentUser.id]
              };
            }
            return sub;
          })
        };
      }
      return ch;
    }));
    recordActivity(5);
  };

  const dailyCheckin = () => {
    const today = new Date().toISOString().split('T')[0];
    if (currentUser.lastCheckinDate === today) return;

    setCurrentUser(prev => ({
      ...prev,
      streakDays: prev.streakDays + 1,
      lastCheckinDate: today,
      totalPoints: prev.totalPoints + 100
    }));

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#ec4899', '#f59e0b', '#10b981']
    });

    recordActivity(100);

    setNotifications(prev => [
      {
        id: `notif_${Date.now()}`,
        userId: currentUser.id,
        title: 'Check-in thành công! 🔥',
        message: `Bạn đã duy trì chuỗi ${currentUser.streakDays + 1} ngày liên tiếp!`,
        type: 'CHECKIN',
        isRead: false,
        createdAt: 'Vừa xong'
      },
      ...prev
    ]);
  };

  const toggleRSVPEvent = (eventId: string) => {
    setEvents(prev => prev.map(evt => {
      if (evt.id === eventId) {
        const hasRSVP = evt.rsvpUserIds.includes(currentUser.id);
        const rsvpUserIds = hasRSVP
          ? evt.rsvpUserIds.filter(id => id !== currentUser.id)
          : [...evt.rsvpUserIds, currentUser.id];
        return {
          ...evt,
          rsvpUserIds
        };
      }
      return evt;
    }));
    recordActivity(10);
  };

  const createCommunity = (data: Partial<Community>) => {
    const newCommunity: Community = {
      id: `comm_${Date.now()}`,
      name: data.name || 'Cộng đồng Mới',
      slug: (data.name || 'new-community').toLowerCase().replace(/\s+/g, '-'),
      avatar: data.avatar || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=250&q=80',
      coverImage: data.coverImage || 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1200&q=80',
      description: data.description || 'Mô tả cộng đồng...',
      tagline: data.tagline || 'Cộng đồng chuyên môn',
      creatorId: currentUser.id,
      membersCount: 1,
      isPrivate: !!data.isPrivate,
      priceMonthly: data.priceMonthly || 0,
      isVerified: false,
      status: 'ACTIVE',
      categories: data.categories || ['Chung', 'Hỏi đáp', 'Tài liệu'],
      rules: data.rules || ['Tôn trọng các thành viên']
    };

    setCommunities(prev => [newCommunity, ...prev]);
    setActiveCommunityId(newCommunity.id);
    setIsCreateCommunityOpen(false);
  };

  const createCourse = (data: Partial<Course>) => {
    const newCourse: Course = {
      id: `course_${Date.now()}`,
      communityId: activeCommunityId,
      title: data.title || 'Khóa học mới',
      description: data.description || '',
      thumbnail: data.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      level: data.level || 'Beginner',
      modules: data.modules || []
    };
    setCourses(prev => [newCourse, ...prev]);
  };

  const createChallenge = (data: Partial<Challenge>) => {
    const newChallenge: Challenge = {
      id: `chal_${Date.now()}`,
      communityId: activeCommunityId,
      title: data.title || 'Thử thách mới',
      description: data.description || '',
      durationDays: data.durationDays || 30,
      currentDay: 1,
      rewardPoints: data.rewardPoints || 500,
      participantsCount: 1,
      isJoined: true,
      dailyPrompts: data.dailyPrompts || [],
      submissions: []
    };
    setChallenges(prev => [newChallenge, ...prev]);
  };

  const createEvent = (data: Partial<CommunityEvent>) => {
    const newEvent: CommunityEvent = {
      id: `evt_${Date.now()}`,
      communityId: activeCommunityId,
      title: data.title || 'Sự kiện mới',
      description: data.description || '',
      date: data.date || new Date().toISOString().split('T')[0],
      time: data.time || '20:00',
      durationMinutes: data.durationMinutes || 60,
      locationType: data.locationType || 'ONLINE',
      meetingUrl: data.meetingUrl || 'https://meet.google.com/demo',
      speakerName: data.speakerName || currentUser.name,
      speakerAvatar: data.speakerAvatar || currentUser.avatar,
      rsvpUserIds: [currentUser.id],
      maxAttendees: data.maxAttendees || 100
    };
    setEvents(prev => [newEvent, ...prev]);
  };

  const createResource = (data: Partial<ResourceItem>) => {
    const newResource: ResourceItem = {
      id: `res_${Date.now()}`,
      communityId: activeCommunityId,
      title: data.title || 'Tài nguyên mới',
      description: data.description || '',
      fileType: data.fileType || 'PDF',
      fileSize: data.fileSize || '2.5 MB',
      downloadUrl: data.downloadUrl || '#',
      downloadsCount: 0,
      category: data.category || 'Tài liệu',
      createdAt: 'Vừa xong'
    };
    setResources(prev => [newResource, ...prev]);
  };

  const createCoupon = (data: Partial<Coupon>) => {
    const newCoupon: Coupon = {
      id: `coup_${Date.now()}`,
      communityId: activeCommunityId,
      code: (data.code || 'SALE20').toUpperCase(),
      discountPercent: data.discountPercent || 20,
      maxUses: data.maxUses || 50,
      currentUses: 0,
      expiresAt: data.expiresAt || '2026-12-31',
      isActive: true
    };
    setCoupons(prev => [newCoupon, ...prev]);
  };

  const toggleSolvePost = (postId: string) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, isSolved: !p.isSolved } : p));
  };

  const markCommentAsSolution = (postId: string, commentId: string) => {
    setComments(prev => {
      const list = prev[postId] || [];
      const target = list.find(c => c.id === commentId);
      const willMark = target && !target.isSolution;
      return {
        ...prev,
        [postId]: list.map(c => ({ ...c, isSolution: willMark ? c.id === commentId : false }))
      };
    });
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const list = comments[postId] || [];
      const target = list.find(c => c.id === commentId);
      const willMark = target && !target.isSolution;
      return { ...p, isSolved: !!willMark };
    }));
  };

  const resolveReport = (reportId: string, action: 'RESOLVE' | 'DISMISS') => {
    setReports(prev => prev.map(r => {
      if (r.id === reportId) {
        return {
          ...r,
          status: action === 'RESOLVE' ? 'RESOLVED' : 'DISMISSED'
        };
      }
      return r;
    }));
  };

  const toggleBanUser = (userId: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, isBanned: !u.isBanned } : u));
  };

  const approveCommunity = (communityId: string) => {
    setCommunities(prev => prev.map(c => c.id === communityId ? { ...c, status: 'ACTIVE' } : c));
  };

  const suspendCommunity = (communityId: string) => {
    setCommunities(prev => prev.map(c => c.id === communityId ? { ...c, status: 'SUSPENDED' } : c));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const toggleNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: !n.isRead } : n));
  };

  const applyCouponToCheckout = (code: string) => {
    const coupon = coupons.find(c => c.code.toUpperCase() === code.toUpperCase() && c.isActive);
    if (!coupon) {
      return { valid: false, discountPercent: 0, message: 'Mã giảm giá không hợp lệ hoặc đã hết hạn.' };
    }
    if (coupon.currentUses >= coupon.maxUses) {
      return { valid: false, discountPercent: 0, message: 'Mã giảm giá đã đạt giới hạn lượt dùng.' };
    }
    return { valid: true, discountPercent: coupon.discountPercent, message: `Áp dụng thành công! Giảm ${coupon.discountPercent}%.` };
  };

  const completeCheckout = () => {
    if (checkoutCommunity) {
      setCommunities(prev => prev.map(c => c.id === checkoutCommunity.id ? { ...c, membersCount: c.membersCount + 1 } : c));
      setActiveCommunityId(checkoutCommunity.id);
      setCheckoutCommunity(null);
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#a855f7', '#10b981', '#6366f1']
      });
    }
  };

  const resetToDefaultData = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        activeRole,
        setActiveRole,
        activeCommunityId,
        setActiveCommunityId,
        activeCommunity,
        activeTab,
        setActiveTab,
        adminSubTab,
        setAdminSubTab,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        theme,
        setTheme,
        toggleTheme,
        users,
        communities,
        posts,
        comments,
        courses,
        challenges,
        events,
        resources,
        coupons,
        reports,
        notifications,
        activityDays,
        inspectedUser,
        setInspectedUser,
        checkoutCommunity,
        setCheckoutCommunity,
        isCreateCommunityOpen,
        setIsCreateCommunityOpen,
        createPost,
        toggleUpvotePost,
        toggleDownvotePost,
        toggleBookmarkPost,
        toggleSolvePost,
        markCommentAsSolution,
        votePoll,
        addComment,
        toggleUpvoteComment,
        toggleDownvoteComment,
        toggleLessonComplete,
        submitChallengeProof,
        toggleLikeSubmission,
        dailyCheckin,
        toggleRSVPEvent,
        createCommunity,
        createCourse,
        createChallenge,
        createEvent,
        createResource,
        createCoupon,
        resolveReport,
        toggleBanUser,
        approveCommunity,
        suspendCommunity,
        markNotificationRead,
        markAllNotificationsRead,
        deleteNotification,
        toggleNotificationRead,
        applyCouponToCheckout,
        completeCheckout,
        resetToDefaultData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
