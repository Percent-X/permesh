import { Community, User, Post, Course, Challenge, CommunityEvent, ResourceItem, QAThread, Coupon, ReportItem, NotificationItem } from '../types';

export const CURRENT_USER: User = {
  id: 'usr_me',
  name: 'Elior Nguyen',
  username: 'elior.dev',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  bio: 'Fullstack Developer & AI Enthusiast. Building next-gen micro-SaaS products 🚀',
  role: 'CREATOR', // Initial view can be changed via Role Switcher
  isOnline: true,
  streakDays: 14,
  lastCheckinDate: new Date().toISOString().split('T')[0],
  totalPoints: 1850,
  joinedDate: 'Tháng 1, 2026',
  badges: ['Top Contributor', 'Prompt Master', 'Early Adopter', 'Bug Hunter'],
  bookmarkedPostIds: ['post_1', 'post_3'],
  isBanned: false,
};

export const MOCK_USERS: User[] = [
  CURRENT_USER,
  {
    id: 'usr_admin',
    name: 'Alex Vance (Platform Admin)',
    username: 'alex.admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    bio: 'Platform Trust & Safety Administrator. Managing ecosystems.',
    role: 'ADMIN',
    isOnline: true,
    streakDays: 45,
    totalPoints: 5200,
    joinedDate: 'Tháng 12, 2025',
    badges: ['Admin', 'Platform Core'],
    bookmarkedPostIds: [],
  },
  {
    id: 'usr_creator_2',
    name: 'Sarah Tran',
    username: 'sarahtech',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
    bio: 'Founder @ IndieTech. Shipped 5 SaaS products to $10k MRR.',
    role: 'CREATOR',
    isOnline: true,
    streakDays: 28,
    totalPoints: 3400,
    joinedDate: 'Tháng 1, 2026',
    badges: ['10k MRR Club', 'Course Mentor'],
    bookmarkedPostIds: [],
  },
  {
    id: 'usr_member_1',
    name: 'Minh Quang',
    username: 'minh_q',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    bio: 'Frontend Engineer learning LLM Agents and LangChain.',
    role: 'MEMBER',
    isOnline: false,
    streakDays: 7,
    totalPoints: 620,
    joinedDate: 'Tháng 2, 2026',
    badges: ['Streak 7', 'Fast Learner'],
    bookmarkedPostIds: [],
  },
  {
    id: 'usr_member_2',
    name: 'Lan Anh Hoang',
    username: 'lananh.design',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    bio: 'Product Designer | Design Systems Specialist | Figma Lover 🎨',
    role: 'MEMBER',
    isOnline: true,
    streakDays: 19,
    totalPoints: 1240,
    joinedDate: 'Tháng 1, 2026',
    badges: ['UI Maestro', 'Helpful Member'],
    bookmarkedPostIds: [],
  }
];

export const MOCK_COMMUNITIES: Community[] = [
  {
    id: 'comm_ai_builders',
    name: 'AI Builders & Agents Hub',
    slug: 'ai-builders-hub',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=250&q=80',
    coverImage: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1200&q=80',
    description: 'Cộng đồng kỹ sư và lập trình viên chuyên sâu xây dựng AI Agents, RAG Pipelines, Local LLMs và Micro-SaaS ứng dụng AI thế hệ mới.',
    tagline: 'Xây dựng tương lai cùng Autonomous Agents & GenAI',
    creatorId: 'usr_me',
    membersCount: 1420,
    isPrivate: false,
    priceMonthly: 0, // Free
    isVerified: true,
    status: 'ACTIVE',
    categories: ['Thông báo', 'Hỏi đáp Kỹ thuật', 'Showcase Dự án', 'Prompt & Workflows', 'Tuyển dụng & Hợp tác'],
    rules: [
      'Tôn trọng đồng nghiệp và trao đổi mang tính xây dựng',
      'Không spam link tiếp thị liên kết (affiliate) thiếu ngữ cảnh',
      'Đính kèm repo/demo khi chia sẻ showcase dự án',
      'Giữ thảo luận bảo mật và tuân thủ đạo đức AI'
    ]
  },
  {
    id: 'comm_indie_hackers',
    name: 'Indie Hackers Vietnam ($1K MRR Club)',
    slug: 'indie-hackers-vn',
    avatar: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=250&q=80',
    coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    description: 'Nơi quy tụ các Solo Founders, Bootstrappers cùng nhau xây dựng sản phẩm từ 0 đến $1,000 MRR đầu tiên. Chia sẻ case study thật, doanh thu thật.',
    tagline: 'Build in Public & Monetize Fast',
    creatorId: 'usr_creator_2',
    membersCount: 890,
    isPrivate: true,
    priceMonthly: 29, // $29/mo
    isVerified: true,
    status: 'ACTIVE',
    categories: ['Build in Public', 'Marketing & SEO', 'Doanh thu & Growth', 'Feedback Sản phẩm'],
    rules: [
      'Chia sẻ số liệu minh bạch, nói không với fake revenue',
      'Hỗ trợ và review sản phẩm cho nhau chân thành'
    ]
  },
  {
    id: 'comm_design_systems',
    name: 'Design Systems & Vercel UI Mastery',
    slug: 'design-systems-pro',
    avatar: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=250&q=80',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    description: 'Chuyên trang kiến trúc giao diện cao cấp phong cách Dark Luxury, Micro-interactions, Tailwind Tokens & Radix Primitives.',
    tagline: 'Nâng tầm UI/UX chuẩn Enterprise Design',
    creatorId: 'usr_me',
    membersCount: 650,
    isPrivate: false,
    priceMonthly: 0,
    isVerified: true,
    status: 'ACTIVE',
    categories: ['Tokens & Tokens', 'Animation Labs', 'Code Review UI', 'Showcase'],
    rules: ['Chỉ chia sẻ các component có source code hoặc Figma public']
  }
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'post_1',
    communityId: 'comm_ai_builders',
    author: CURRENT_USER,
    title: '📢 Chào mừng đến với AI Agents Studio 2026: Lộ trình & Tài nguyên độc quyền!',
    content: `Chào tất cả các anh em lập trình viên! 

Cộng đồng này được lập ra nhằm mục tiêu kết nối những người đam mê xây dựng **Autonomous Agents**, **Local LLM Fine-tuning** và các hệ thống **Multi-Agent Orchestration (LangGraph, CrewAI, AutoGen)**.

📌 **Các việc bạn nên làm ngay:**
1. Giới thiệu bản thân bên dưới phần bình luận (Tech stack + Project bạn đang làm).
2. Nhận ngay bộ tài liệu trong tab **Resources** (Bộ Template LangGraph + Fastify).
3. Đừng quên bấm nút **Check-in hàng ngày** góc phải để duy trì chuỗi Streak và mở các huy hiệu độc quyền nhé! 🔥`,
    category: 'Thông báo',
    tags: ['Announcement', 'Agents', 'Roadmap'],
    upvotesCount: 48,
    upvotedByUserIds: ['usr_me', 'usr_member_1', 'usr_member_2', 'usr_creator_2'],
    commentsCount: 12,
    isPinned: true,
    isAnnouncement: true,
    createdAt: '2 giờ trước',
  },
  {
    id: 'post_2',
    communityId: 'comm_ai_builders',
    author: MOCK_USERS[3], // Minh Quang
    title: 'Cách tối ưu latency cho DeepSeek R1 & Claude 3.7 khi làm Chatbot streaming?',
    content: `Mình đang xây dựng tính năng streaming hội thoại cho khách hàng doanh nghiệp. Khi dùng SSE (Server-Sent Events) kết hợp Vercel AI SDK, latency first-token đo được khoảng ~650ms. 

Anh em có kinh nghiệm tối ưu xuống mức dưới 250ms không? Mình đang cân nhắc chuyển inference sang edge gateway hoặc dùng vLLM local caching.

Mọi người vote thử phương án nào hiệu quả nhất nhé! 👇`,
    category: 'Hỏi đáp Kỹ thuật',
    tags: ['DeepSeek', 'Streaming', 'Latency', 'AI-SDK'],
    upvotesCount: 23,
    upvotedByUserIds: ['usr_me', 'usr_member_2'],
    commentsCount: 6,
    poll: {
      question: 'Bạn ưu tiên giải pháp tối ưu latency nào nhất?',
      options: [
        { id: 'opt_1', text: 'Chuyển sang Cloudflare Workers Edge Gateway', votes: 15, votedUserIds: ['usr_me', 'usr_member_1'] },
        { id: 'opt_2', text: 'Prompt Caching + Speculative Decoding', votes: 24, votedUserIds: ['usr_member_2'] },
        { id: 'opt_3', text: 'Tự host vLLM với Tensor Parallelism trên GPU', votes: 9, votedUserIds: [] },
      ],
      totalVotes: 48
    },
    createdAt: '4 giờ trước',
  },
  {
    id: 'post_3',
    communityId: 'comm_ai_builders',
    author: MOCK_USERS[4], // Lan Anh
    title: 'Showcase: Giao diện AI Workflow Canvas với Smooth Curves & Glassmorphism ✨',
    content: `Vừa hoàn thiện bản demo Figma to Code cho canvas kéo thả node Multi-Agent. 
- Phong cách Dark Slate + Neon Violet
- Tối ưu 60fps khi render > 500 nodes
- Hỗ trợ Mini-map và Undo/Redo

Source code và Figma Tokens đã được upload trong tab **Resources** cho anh em tham khảo nhé!`,
    category: 'Showcase Dự án',
    tags: ['Design', 'Canvas', 'ReactFlow', 'Tailwind'],
    upvotesCount: 67,
    upvotedByUserIds: ['usr_me', 'usr_member_1', 'usr_creator_2'],
    commentsCount: 14,
    attachments: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        name: 'ai-workflow-canvas-preview.png'
      }
    ],
    createdAt: '1 ngày trước',
  }
];

export const MOCK_COMMENTS: Record<string, import('../types').Comment[]> = {
  post_1: [
    {
      id: 'cmt_101',
      postId: 'post_1',
      author: MOCK_USERS[3],
      content: 'Chào anh Elior và cả nhà! Em là Quang, chuyên React + Nodejs, đang tìm hiểu build agentic workflows cho e-commerce.',
      upvotesCount: 8,
      upvotedByUserIds: ['usr_me'],
      createdAt: '1 giờ trước',
      replies: [
        {
          id: 'cmt_102',
          postId: 'post_1',
          author: CURRENT_USER,
          content: 'Chào Quang nhé! Khóa học trong tab Classroom có bài thực chiến LangGraph E-commerce đấy, bạn check thử nhé! 🔥',
          upvotesCount: 4,
          upvotedByUserIds: ['usr_member_1'],
          parentId: 'cmt_101',
          createdAt: '45 phút trước',
        }
      ]
    },
    {
      id: 'cmt_103',
      postId: 'post_1',
      author: MOCK_USERS[4],
      content: 'Giao diện tím neon nhìn cuốn thật sự! Rất mong chờ các challenge sắp tới của Hub!',
      upvotesCount: 5,
      upvotedByUserIds: ['usr_me'],
      createdAt: '30 phút trước'
    }
  ],
  post_2: [
    {
      id: 'cmt_201',
      postId: 'post_2',
      author: CURRENT_USER,
      content: 'Prompt Caching là cách rẻ và nhanh nhất hiện tại nếu prompt system của bạn dài trên 1024 tokens. Tiết kiệm ~75% chi phí và first-token time giảm rõ rệt!',
      upvotesCount: 12,
      upvotedByUserIds: ['usr_member_1', 'usr_member_2'],
      createdAt: '3 giờ trước'
    }
  ]
};

export const MOCK_COURSES: Course[] = [
  {
    id: 'course_ai_agent_mastery',
    communityId: 'comm_ai_builders',
    title: 'Xây dựng Autonomous AI Agent từ Zero đến Production',
    description: 'Chương trình đào tạo toàn diện: Tự động hóa quy trình nghiệp vụ với LangGraph, Function Calling, Memory persistence và Vector Search.',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    level: 'Mastery',
    modules: [
      {
        id: 'mod_1',
        title: 'Chương 1: Kiến trúc Nền tảng & Nguyên lý AI Agent',
        order: 1,
        lessons: [
          {
            id: 'les_1',
            title: '1.1 Tổng quan về Agentic Loops (ReAct Pattern)',
            duration: '14:20',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            content: 'Nắm vững chu trình Suy nghĩ (Thought) -> Hành động (Action) -> Quan sát (Observation) trong ReAct framework. Cách tích hợp Tool calling với Claude và OpenAI.',
            isFreePreview: true,
            isCompleted: true,
            attachments: [{ name: 'Slide_Bai_1.pdf', size: '2.4 MB', url: '#' }]
          },
          {
            id: 'les_2',
            title: '1.2 Thiết lập Environment & MCP (Model Context Protocol)',
            duration: '22:15',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            content: 'Hướng dẫn cài đặt và kết nối các MCP server để cấp quyền cho Agent tương tác trực tiếp với Database, Local File System và API bên ngoài.',
            isFreePreview: true,
            isCompleted: true
          },
          {
            id: 'les_3',
            title: '1.3 State Management & Human-in-the-loop trong LangGraph',
            duration: '28:40',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            content: 'Xây dựng StateGraph, quản lý checkpoints và tạo các điểm dừng (Breakpoints) để người dùng phê duyệt hành động quan trọng.',
            isCompleted: false
          }
        ]
      },
      {
        id: 'mod_2',
        title: 'Chương 2: RAG Pipeline & Tối ưu Vector Search',
        order: 2,
        lessons: [
          {
            id: 'les_4',
            title: '2.1 Chunking Strategies: Semantic vs Recursive Splitter',
            duration: '18:50',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            content: 'Kỹ thuật chia cắt văn bản thông minh để không làm mất ngữ cảnh văn bản gốc.',
            isCompleted: false
          },
          {
            id: 'les_5',
            title: '2.2 Hybrid Search (BM25 + Dense Vectors) & Reranking Cohere',
            duration: '31:10',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            content: 'Nâng cao độ chính xác truy xuất dữ liệu lên 94% nhờ phối hợp tìm kiếm từ khóa và ngữ nghĩa.',
            isCompleted: false
          }
        ]
      }
    ]
  }
];

export const MOCK_CHALLENGES: Challenge[] = [
  {
    id: 'chal_30days_agent',
    communityId: 'comm_ai_builders',
    title: 'Thử thách 30 Ngày Xây Dựng 3 AI Micro-SaaS 🚀',
    description: 'Cam kết mỗi ngày dành 1 giờ code, nộp bài báo cáo tiến độ để nhận chứng chỉ Builder cùng cơ hội được giới thiệu sản phẩm đến 1,400+ members.',
    durationDays: 30,
    currentDay: 14,
    rewardPoints: 500,
    participantsCount: 184,
    isJoined: true,
    dailyPrompts: [
      { day: 1, title: 'Ngày 1: Brainstorm ý tưởng & Validate nhu cầu', description: 'Đăng bài chia sẻ 3 pain-point trong công việc bạn muốn giải quyết bằng AI.' },
      { day: 2, title: 'Ngày 2: Thiết kế Database & Prompt Architecture', description: 'Vẽ sơ đồ luồng Agent và các Tools cần thiết.' },
      { day: 3, title: 'Ngày 3: Khởi tạo Repo & Setup Tailwind + Shadcn UI', description: 'Cài đặt template Next.js 15 App Router, TypeScript và cấu hình Theme.' },
      { day: 4, title: 'Ngày 4: Tích hợp Model Context Protocol (MCP)', description: 'Kết nối Agent với local filesystem và database tool callers.' },
      { day: 5, title: 'Ngày 5: Xây dựng ReAct Agent Loop với Claude / OpenAI', description: 'Implement chu trình Thought -> Action -> Observation.' },
      { day: 6, title: 'Ngày 6: Xây dựng RAG Document Ingestion & Chunking', description: 'Xử lý file PDF, Markdown thành vector embeddings.' },
      { day: 7, title: 'Ngày 7: Review & Demo Milestone Tuần 1 🎉', description: 'Tổng kết tuần đầu: Nộp video demo 60s và nhận feedback.' },
      { day: 8, title: 'Ngày 8: Xây dựng Memory & Session Checkpointing', description: 'Lưu session chat của user vào Postgres / Redis bằng LangGraph Saver.' },
      { day: 9, title: 'Ngày 9: Tích hợp Multi-Agent Collaboration', description: 'Tạo 2 agents: 1 Researcher Agent và 1 Writer Agent làm việc cùng nhau.' },
      { day: 10, title: 'Ngày 10: Xây dựng Human-in-the-loop Breakpoints', description: 'Thêm nút xác nhận của người dùng trước khi Agent thực hiện thao tác nhạy cảm.' },
      { day: 11, title: 'Ngày 11: Tối ưu Token Usage & Caching Prompt', description: 'Dùng Anthropic Prompt Caching để giảm 90% chi phí API.' },
      { day: 12, title: 'Ngày 12: Xây dựng Authentication với Clerk / NextAuth', description: 'Phân quyền role cho người dùng và creator.' },
      { day: 13, title: 'Ngày 13: Thiết lập Subscription Billing với Stripe', description: 'Xây dựng trang Checkout, Webhook và xử lý nâng cấp gói PRO.' },
      { day: 14, title: 'Ngày 14: Tích hợp Streaming UI & Error Fallback', description: 'Hoàn thiện trải nghiệm người dùng với loading skeleton, streaming text wave và retry logic.' },
      { day: 15, title: 'Ngày 15: Mid-term Review: Trình diễn MVP 1 🚀', description: 'Demo sản phẩm số 1 cho cộng đồng và nhận feedback.' },
      { day: 16, title: 'Ngày 16: Bắt đầu Micro-SaaS 2: AI Automation Bot', description: 'Khởi tạo ý tưởng SaaS số 2 chuyên tự động hóa workflow.' },
      { day: 17, title: 'Ngày 17: Tích hợp Telegram / Discord Bot Webhook', description: 'Cho phép người dùng tương tác với Agent qua chat app.' },
      { day: 18, title: 'Ngày 18: Xây dựng Analytics Dashboard', description: 'Hiển thị biểu đồ lượng tokens, số request và doanh thu.' },
      { day: 19, title: 'Ngày 19: Viết Rate-limiting & API Security Guard', description: 'Bảo vệ endpoint API bằng Upstash Redis Rate Limiter.' },
      { day: 20, title: 'Ngày 20: Tối ưu hóa SEO & OpenGraph Meta Images', description: 'Dynamic OG image generator giúp tăng CTR khi share lên X / Facebook.' },
      { day: 21, title: 'Ngày 21: Hoàn thành Milestone Tuần 3 🌟', description: 'Nộp báo cáo 2/3 chặng đường.' },
      { day: 22, title: 'Ngày 22: Bắt đầu Micro-SaaS 3: AI Code Reviewer', description: 'Xây dựng tool tự động review Pull Request trên GitHub.' },
      { day: 23, title: 'Ngày 23: GitHub App & Webhook Integration', description: 'Lắng nghe event pull_request và tự động post review comments.' },
      { day: 24, title: 'Ngày 24: Unit & E2E Testing với Playwright', description: 'Viết test case tự động cho toàn bộ luồng thanh toán và agent run.' },
      { day: 25, title: 'Ngày 25: Tối ưu Docker Container & CI/CD Pipeline', description: 'Tự động build và test trên GitHub Actions.' },
      { day: 26, title: 'Ngày 26: Xây dựng Landing Page chuyển đổi cao', description: 'Thiết kế Hero Section, Bento Grid Features và Social Proof.' },
      { day: 27, title: 'Ngày 27: Chuẩn bị Product Hunt & Twitter Launch', description: 'Viết copy, quay video teaser và chuẩn bị badge PH.' },
      { day: 28, title: 'Ngày 28: Launch Day: Ra mắt 3 Micro-SaaS ra thế giới!', description: 'Đăng tải lên Product Hunt, Reddit, IndieHackers.' },
      { day: 29, title: 'Ngày 29: Thu thập Feedback & Onboard khách hàng đầu tiên', description: 'Hỗ trợ khách hàng, fix hot bugs và tối ưu conversion.' },
      { day: 30, title: 'Ngày 30: Tốt nghiệp Thử Thách & Nhận Chứng Chỉ Builder 🎓', description: 'Nộp báo cáo tổng kết 30 ngày và nhận huy hiệu Top Builder.' }
    ],
    submissions: [
      {
        id: 'sub_1',
        challengeId: 'chal_30days_agent',
        day: 14,
        author: CURRENT_USER,
        content: 'Hôm nay mình đã hoàn thành xong streaming response kết hợp Framer Motion wave effect. First-token latency đạt ~180ms trên Vercel Edge!',
        linkUrl: 'https://github.com/elior/ai-agent-demo',
        submittedAt: 'Hôm nay lúc 09:30',
        likesCount: 15,
        likedByUserIds: ['usr_member_1', 'usr_member_2']
      },
      {
        id: 'sub_2',
        challengeId: 'chal_30days_agent',
        day: 14,
        author: MOCK_USERS[3],
        content: 'Đã fix xong lỗi WebSocket disconnect khi Agent chạy sub-tasks lâu hơn 30s. Dùng heartbeat ping mỗi 5s rất hiệu quả.',
        submittedAt: 'Hôm nay lúc 10:15',
        likesCount: 9,
        likedByUserIds: ['usr_me']
      }
    ]
  }
];

export const MOCK_EVENTS: CommunityEvent[] = [
  {
    id: 'evt_today',
    communityId: 'comm_ai_builders',
    title: 'Weekly Office Hours: Trực tiếp giải đáp thắc mắc & Review Code AI Agent',
    description: 'Phiên hỏi đáp trực tiếp 1-1 và phân tích kiến trúc code cùng Founder Elior Nguyen. Dành cho mọi thành viên đang gặp blocker trong dự án.',
    date: '2026-09-02',
    time: '20:00',
    durationMinutes: 60,
    locationType: 'ONLINE',
    meetingUrl: 'https://meet.google.com/elior-office-hours',
    speakerName: 'Elior Nguyen',
    speakerAvatar: CURRENT_USER.avatar,
    rsvpUserIds: ['usr_me', 'usr_member_1', 'usr_member_3'],
    maxAttendees: 150
  },
  {
    id: 'evt_1',
    communityId: 'comm_ai_builders',
    title: 'Live Workshop: Xây dựng AI Copilot với DeepSeek R1 & Vercel SDK',
    description: 'Thực chiến 2 tiếng cùng Founder Elior: Live coding từ trắng trang đến deploy sản phẩm production-ready. Có phần Q&A trực tiếp.',
    date: '2026-09-08',
    time: '20:00',
    durationMinutes: 120,
    locationType: 'ONLINE',
    meetingUrl: 'https://meet.google.com/abc-defg-hij',
    speakerName: 'Elior Nguyen',
    speakerAvatar: CURRENT_USER.avatar,
    rsvpUserIds: ['usr_me', 'usr_member_1', 'usr_member_2', 'usr_creator_2'],
    maxAttendees: 200
  },
  {
    id: 'evt_3',
    communityId: 'comm_ai_builders',
    title: 'Mid-Challenge Checkin: Review tiến độ 14 Ngày Code & Trao đổi giải pháp',
    description: 'Buổi gặp gỡ giữa chặng dành cho các bạn tham gia thử thách 30 ngày. Cùng chia sẻ sản phẩm demo và gỡ rối kỹ thuật.',
    date: '2026-09-14',
    time: '19:00',
    durationMinutes: 75,
    locationType: 'ONLINE',
    meetingUrl: 'https://meet.google.com/mid-challenge-checkin',
    speakerName: 'Quang Tran & Elior Nguyen',
    speakerAvatar: MOCK_USERS[3].avatar,
    rsvpUserIds: ['usr_me', 'usr_member_1'],
    maxAttendees: 100
  },
  {
    id: 'evt_2',
    communityId: 'comm_ai_builders',
    title: 'Community Townhall & Demo Day Tháng 9',
    description: 'Sân khấu để các thành viên showcase sản phẩm vừa build trong tháng, nhận feedback trực tiếp từ các Angel Investors và Senior Engineers.',
    date: '2026-09-20',
    time: '19:30',
    durationMinutes: 90,
    locationType: 'ONLINE',
    meetingUrl: 'https://zoom.us/j/123456789',
    speakerName: 'Alex Vance & Sarah Tran',
    speakerAvatar: MOCK_USERS[1].avatar,
    rsvpUserIds: ['usr_me', 'usr_member_2'],
    maxAttendees: 500
  },
  {
    id: 'evt_4',
    communityId: 'comm_ai_builders',
    title: 'Masterclass: Figma to Code & Micro-Interactions với Framer Motion',
    description: 'Chuyên đề thiết kế UI/UX đỉnh cao do Designer Lan Anh Hoang đứng lớp. Tặng bộ UI kit độc quyền sau buổi học.',
    date: '2026-09-27',
    time: '20:30',
    durationMinutes: 90,
    locationType: 'ONLINE',
    meetingUrl: 'https://meet.google.com/figma-masterclass',
    speakerName: 'Lan Anh Hoang',
    speakerAvatar: MOCK_USERS[4].avatar,
    rsvpUserIds: ['usr_me', 'usr_creator_1'],
    maxAttendees: 250
  }
];

export const MOCK_RESOURCES: ResourceItem[] = [
  {
    id: 'res_1',
    communityId: 'comm_ai_builders',
    title: 'Bộ Template LangGraph Multi-Agent Architecture (TypeScript)',
    description: 'Boilerplate chuẩn production với đầy đủ State persistence, Memory Saver, MCP tool connectors và Docker compose.',
    fileType: 'CODE',
    fileSize: '4.2 MB',
    downloadUrl: '#',
    downloadsCount: 342,
    category: 'Source Code',
    createdAt: '2 ngày trước'
  },
  {
    id: 'res_2',
    communityId: 'comm_ai_builders',
    title: 'Ebook: 50+ Advanced Prompt Engineering Patterns cho Claude & GPT-4o',
    description: 'Cẩm nang tối ưu System Prompt, Few-shot reasoning, Output JSON formatting và kỹ thuật chống hallucination.',
    fileType: 'PDF',
    fileSize: '8.7 MB',
    downloadUrl: '#',
    downloadsCount: 620,
    category: 'Ebook / Tài liệu',
    createdAt: '1 tuần trước'
  },
  {
    id: 'res_3',
    communityId: 'comm_ai_builders',
    title: 'Figma UI Kit: AI Chatbot, Canvas Workflow & Dark Dashboard',
    description: 'Bộ hơn 120+ components chuẩn Tailwind Tokens phong cách Vercel/Cloudflare tối ưu cho web apps AI.',
    fileType: 'TEMPLATE',
    fileSize: '15.4 MB',
    downloadUrl: '#',
    downloadsCount: 489,
    category: 'Design Template',
    createdAt: '2 tuần trước'
  }
];

export const MOCK_QA_THREADS: QAThread[] = [
  {
    id: 'qa_1',
    communityId: 'comm_ai_builders',
    author: MOCK_USERS[3],
    question: 'Làm thế nào để lưu trữ trạng thái hội thoại của Agent qua nhiều phiên đăng nhập?',
    details: 'Mình đang dùng `LangGraph InMemorySaver` nhưng mỗi lần restart server là mất session. Có giải pháp nào đồng bộ mượt mà với `Postgres` / `Redis` không?',
    isSolved: true,
    answersCount: 1,
    upvotesCount: 14,
    upvotedByUserIds: ['usr_me', 'usr_member_2'],
    category: 'State & Memory',
    createdAt: '1 ngày trước',
    answers: [
      {
        id: 'ans_1',
        author: CURRENT_USER,
        content: 'Bạn nên dùng `PostgresSaver` hoặc `RedisSaver` từ `@langchain/langgraph-checkpoint`. Nó tự động serialize checkpoint theo `thread_id` của user vào DB một cách bền vững.',
        isAccepted: true,
        upvotesCount: 9,
        upvotedByUserIds: ['usr_member_1'],
        createdAt: '1 ngày trước'
      }
    ]
  },
  {
    id: 'qa_2',
    communityId: 'comm_ai_builders',
    author: MOCK_USERS[1],
    question: 'Streaming response từ DeepSeek R1 bị trễ (buffer) khi qua Cloudflare CDN?',
    details: 'Khi mình gọi API streaming từ model `DeepSeek-R1` qua Cloudflare reverse proxy thì token không ra từng chữ mà bị dồn 1 cục rồi mới bắn về frontend. Ai từng gặp lỗi này chưa?',
    isSolved: false,
    answersCount: 1,
    upvotesCount: 8,
    upvotedByUserIds: ['usr_me'],
    category: 'Infra & Deploy',
    createdAt: '3 giờ trước',
    answers: [
      {
        id: 'ans_2',
        author: MOCK_USERS[0],
        content: 'Bạn cần tắt **Response Buffering** trên Cloudflare bằng cách thêm header `X-Accel-Buffering: no` ở backend response, hoặc cấu hình HTTP/2 SSE bypass caching rule nhé.',
        isAccepted: false,
        upvotesCount: 4,
        upvotedByUserIds: [],
        createdAt: '1 giờ trước'
      }
    ]
  }
];

export const MOCK_COUPONS: Coupon[] = [
  {
    id: 'coup_1',
    communityId: 'comm_ai_builders',
    code: 'VIP50',
    discountPercent: 50,
    maxUses: 100,
    currentUses: 34,
    expiresAt: '2026-10-01',
    isActive: true
  },
  {
    id: 'coup_2',
    communityId: 'comm_ai_builders',
    code: 'BUILDER100',
    discountPercent: 100,
    maxUses: 20,
    currentUses: 18,
    expiresAt: '2026-09-15',
    isActive: true
  }
];

export const MOCK_REPORTS: ReportItem[] = [
  {
    id: 'rep_1',
    type: 'POST',
    targetId: 'post_fake_spam',
    targetPreview: 'Link tải tool crack bot auto trade lợi nhuận 200%/ngày...',
    reportedBy: MOCK_USERS[3],
    reason: 'Spam lừa đảo & vi phạm tiêu chuẩn bảo mật cộng đồng',
    status: 'PENDING',
    createdAt: '35 phút trước'
  },
  {
    id: 'rep_2',
    type: 'USER',
    targetId: 'usr_bot_99',
    targetPreview: 'Tài khoản spam tin nhắn tự động hàng loạt',
    reportedBy: MOCK_USERS[4],
    reason: 'Hành vi bot gửi tin nhắn rác',
    status: 'RESOLVED',
    createdAt: '2 ngày trước'
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    userId: 'usr_me',
    actorName: 'Minh Quang',
    actorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    title: 'Thả tim bài viết mới',
    message: 'Minh Quang và 3 người khác đã thả tim bài chia sẻ kiến thức của bạn.',
    type: 'UPVOTE',
    isRead: false,
    createdAt: '10m',
    linkTab: 'feed',
    tag: 'Bảng tin'
  },
  {
    id: 'notif_2',
    userId: 'usr_me',
    actorName: 'Thử Thách AI',
    actorAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    title: 'Đề bài Ngày 14 đã mở',
    message: 'Nhiệm vụ Ngày 14 trong thử thách "30 Ngày Xây Dựng AI Micro-SaaS" đã bắt đầu.',
    type: 'CHALLENGE',
    isRead: false,
    createdAt: '2h',
    linkTab: 'challenges',
    tag: 'Thử thách'
  },
  {
    id: 'notif_3',
    userId: 'usr_me',
    actorName: 'Thanh Tùng',
    actorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    title: 'Bình luận trên bài của bạn',
    message: '"Ý tưởng Agent này rất hay, bạn dùng LLM model nào để optimize token vậy?"',
    type: 'COMMENT',
    isRead: false,
    createdAt: '5h',
    linkTab: 'feed',
    tag: 'Thảo luận'
  },
  {
    id: 'notif_4',
    userId: 'usr_me',
    actorName: 'Sự Kiện Live',
    actorAvatar: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=150&auto=format&fit=crop&q=80',
    title: 'Workshop diễn ra tối nay',
    message: 'Workshop "Xây dựng AI Copilot với DeepSeek R1" sẽ bắt đầu vào lúc 20:00.',
    type: 'EVENT',
    isRead: true,
    createdAt: '1d',
    linkTab: 'events',
    tag: 'Sự kiện'
  },
  {
    id: 'notif_5',
    userId: 'usr_me',
    actorName: 'Permesh System',
    actorAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    title: 'Duy trì chuỗi Streak 14 ngày',
    message: 'Tuyệt vời! Bạn đã duy trì chuỗi học tập 14 ngày liên tiếp. +50 EXP đã được cộng.',
    type: 'CHECKIN',
    isRead: true,
    createdAt: '2d',
    linkTab: 'profile',
    tag: 'Thành tựu'
  }
];

// Generate full 52-week (365 days) mock activity heatmap like GitHub
export const generateMockHeatmap = () => {
  const days = [];
  const today = new Date();
  // Generate 52 weeks = 364 days + pad to end of week
  const dayOfWeek = today.getDay(); // 0 = Sun, 6 = Sat
  const totalDays = 52 * 7 + dayOfWeek;
  
  for (let i = totalDays; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    // Simulate realistic contribution patterns
    let count = 0;
    const dDay = d.getDay();
    const isWeekend = dDay === 0 || dDay === 6;
    const rand = Math.random();

    if (rand > (isWeekend ? 0.6 : 0.25)) {
      count = Math.floor(Math.random() * (isWeekend ? 4 : 9)) + 1;
    }
    
    // Make recent 14 days active for current streak
    if (i <= 14) {
      count = Math.max(count, Math.floor(Math.random() * 6) + 2);
    }
    
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count >= 7) level = 4;
    else if (count >= 4) level = 3;
    else if (count >= 2) level = 2;
    else if (count > 0) level = 1;

    days.push({
      date: dateStr,
      count,
      level
    });
  }
  return days;
};
