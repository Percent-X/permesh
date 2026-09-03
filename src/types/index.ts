export type UserRole = 'MEMBER' | 'CREATOR' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  role: UserRole;
  isOnline: boolean;
  streakDays: number;
  lastCheckinDate?: string;
  totalPoints: number;
  joinedDate: string;
  badges: string[];
  bookmarkedPostIds: string[];
  isBanned?: boolean;
}

export interface Community {
  id: string;
  name: string;
  slug: string;
  avatar: string;
  coverImage: string;
  description: string;
  creatorId: string;
  membersCount: number;
  isPrivate: boolean;
  priceMonthly: number; // 0 for free
  isVerified: boolean;
  status: 'ACTIVE' | 'PENDING' | 'SUSPENDED';
  categories: string[];
  rules: string[];
  tagline: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
  votedUserIds: string[];
}

export interface Post {
  id: string;
  communityId: string;
  author: User;
  title: string;
  content: string;
  category: string;
  tags: string[];
  upvotesCount: number;
  upvotedByUserIds: string[];
  downvotesCount?: number;
  downvotedByUserIds?: string[];
  commentsCount: number;
  isPinned?: boolean;
  isAnnouncement?: boolean;
  poll?: {
    question: string;
    options: PollOption[];
    totalVotes: number;
  };
  attachments?: {
    type: 'image' | 'file';
    url: string;
    name: string;
  }[];
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  author: User;
  content: string;
  upvotesCount: number;
  upvotedByUserIds: string[];
  downvotesCount?: number;
  downvotedByUserIds?: string[];
  parentId?: string;
  createdAt: string;
  replies?: Comment[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  content: string;
  isFreePreview?: boolean;
  isCompleted?: boolean;
  attachments?: {
    name: string;
    size: string;
    url: string;
  }[];
}

export interface CourseModule {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  communityId: string;
  title: string;
  description: string;
  thumbnail: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Mastery';
  modules: CourseModule[];
}

export interface ChallengePrompt {
  day: number;
  title: string;
  description: string;
}

export interface ChallengeSubmission {
  id: string;
  challengeId: string;
  day: number;
  author: User;
  content: string;
  linkUrl?: string;
  submittedAt: string;
  likesCount: number;
  likedByUserIds: string[];
}

export interface Challenge {
  id: string;
  communityId: string;
  title: string;
  description: string;
  durationDays: number;
  currentDay: number;
  rewardPoints: number;
  participantsCount: number;
  isJoined?: boolean;
  dailyPrompts: ChallengePrompt[];
  submissions: ChallengeSubmission[];
}

export interface CommunityEvent {
  id: string;
  communityId: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  durationMinutes: number;
  locationType: 'ONLINE' | 'OFFLINE';
  meetingUrl?: string;
  speakerName: string;
  speakerAvatar: string;
  rsvpUserIds: string[];
  maxAttendees?: number;
}

export interface ResourceItem {
  id: string;
  communityId: string;
  title: string;
  description: string;
  fileType: 'PDF' | 'TEMPLATE' | 'CODE' | 'VIDEO' | 'ZIP';
  fileSize: string;
  downloadUrl: string;
  downloadsCount: number;
  category: string;
  createdAt: string;
}

export interface QAAnswer {
  id: string;
  author: User;
  content: string;
  isAccepted: boolean;
  upvotesCount: number;
  upvotedByUserIds: string[];
  createdAt: string;
}

export interface QAThread {
  id: string;
  communityId: string;
  author: User;
  question: string;
  details: string;
  isSolved: boolean;
  answersCount: number;
  upvotesCount: number;
  upvotedByUserIds: string[];
  answers: QAAnswer[];
  createdAt: string;
  category: string;
}

export interface Coupon {
  id: string;
  communityId: string;
  code: string;
  discountPercent: number;
  maxUses: number;
  currentUses: number;
  expiresAt: string;
  isActive: boolean;
}

export interface ReportItem {
  id: string;
  type: 'POST' | 'COMMENT' | 'USER' | 'COMMUNITY';
  targetId: string;
  targetPreview: string;
  reportedBy: User;
  reason: string;
  status: 'PENDING' | 'RESOLVED' | 'DISMISSED';
  createdAt: string;
}

export interface ActivityHeatmapDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface NotificationItem {
  id: string;
  userId: string;
  actorName?: string;
  actorAvatar?: string;
  title: string;
  message: string;
  type: 'UPVOTE' | 'COMMENT' | 'EVENT' | 'CHALLENGE' | 'ANNOUNCEMENT' | 'CHECKIN';
  isRead: boolean;
  createdAt: string;
  linkTab?: string;
  tag?: string;
}
