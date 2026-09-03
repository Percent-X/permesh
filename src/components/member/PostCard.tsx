import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Post } from '../../types';
import { MarkdownRenderer } from '../common/MarkdownRenderer';
import {
  Heart,
  MessageSquare,
  Bookmark,
  Pin,
  Share2,
  Check,
  CheckCircle,
  Sparkles,
  Send,
  CornerDownRight
} from 'lucide-react';

export const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const {
    currentUser,
    toggleUpvotePost,
    toggleBookmarkPost,
    votePoll,
    comments,
    addComment,
    toggleUpvoteComment,
    setInspectedUser
  } = useApp();

  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const postComments = comments[post.id] || [];
  const hasLiked = post.upvotedByUserIds.includes(currentUser.id);
  const likesCount = post.upvotesCount;
  const isBookmarked = currentUser.bookmarkedPostIds.includes(post.id);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(post.id, commentText);
    setCommentText('');
    setShowComments(true);
  };

  const handleAddReply = (parentId: string) => {
    if (!replyText.trim()) return;
    addComment(post.id, replyText, parentId);
    setReplyText('');
    setReplyingToId(null);
  };

  return (
    <article className={`v-card overflow-hidden transition-all duration-200 ${
      post.isPinned
        ? 'border-purple-300 dark:border-purple-500/40 bg-purple-50/20 dark:bg-[#14141d]'
        : 'hover:border-zinc-300 dark:hover:border-white/20'
    }`}>
      {/* Pinned & Category Header */}
      <div className="px-5 pt-4 pb-2 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          {post.isPinned && (
            <span className="badge-linear-purple">
              <Pin className="w-3 h-3 fill-purple-500 text-purple-500" />
              <span>Ghim bài viết</span>
            </span>
          )}
          <span className="badge-linear-zinc">
            {post.category}
          </span>
          {post.tags.map(tag => (
            <span key={tag} className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-300 cursor-pointer">
              #{tag}
            </span>
          ))}
        </div>

        <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono">{post.createdAt}</span>
      </div>

      {/* Author Bar */}
      <div className="px-5 py-2 flex items-center justify-between">
        <div 
          onClick={() => setInspectedUser(post.author)}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-10 h-10 rounded-xl object-cover ring-1 ring-zinc-200 dark:ring-white/10 group-hover:ring-purple-500/50 transition-all"
          />
          <div>
            <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors flex items-center gap-1.5">
              {post.author.name}
              {post.author.badges[0] && (
                <span className="text-[10px] text-purple-700 dark:text-purple-400 bg-purple-100 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-800/40 px-1.5 py-0.2 rounded font-normal">
                  {post.author.badges[0]}
                </span>
              )}
            </div>
            <div className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono">@{post.author.username}</div>
          </div>
        </div>
      </div>

      {/* Title & Content */}
      <div className="px-5 py-3">
        <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-snug mb-2.5 hover:text-purple-600 dark:hover:text-purple-300 transition-colors">
          {post.title}
        </h2>
        <MarkdownRenderer content={post.content} />

        {/* Attachments Preview */}
        {post.attachments && post.attachments.length > 0 && (
          <div className="mt-3.5 rounded-xl overflow-hidden border border-zinc-200 dark:border-white/10 max-h-80">
            {post.attachments.map((att, idx) => (
              <img
                key={idx}
                src={att.url}
                alt={att.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>
        )}

        {/* Interactive Poll */}
        {post.poll && (
          <div className="mt-4 p-4 rounded-xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-500/20 space-y-2.5">
            <div className="text-xs font-bold text-purple-900 dark:text-purple-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>{post.poll.question}</span>
            </div>
            <div className="space-y-2">
              {post.poll.options.map((opt) => {
                const isVoted = opt.votedUserIds.includes(currentUser.id);
                const percent = post.poll && post.poll.totalVotes > 0
                  ? Math.round((opt.votes / post.poll.totalVotes) * 100)
                  : 0;
                return (
                  <button
                    key={opt.id}
                    onClick={() => votePoll(post.id, opt.id)}
                    className={`w-full relative overflow-hidden rounded-xl border p-2.5 text-left text-xs font-medium transition-all duration-200 ${
                      isVoted
                        ? 'border-purple-500 bg-purple-100 dark:bg-purple-900/40 text-purple-900 dark:text-purple-100 shadow-sm'
                        : 'border-zinc-200 dark:border-white/10 hover:border-purple-400 dark:hover:border-purple-500/40 bg-white dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    {/* Progress Bar Background */}
                    <div
                      className="absolute inset-y-0 left-0 bg-purple-300/40 dark:bg-purple-600/20 transition-all duration-500 rounded-xl"
                      style={{ width: `${percent}%` }}
                    />
                    <div className="relative flex items-center justify-between z-10">
                      <div className="flex items-center gap-2">
                        {isVoted ? (
                          <CheckCircle className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border border-zinc-400 dark:border-zinc-600" />
                        )}
                        <span>{opt.text}</span>
                      </div>
                      <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400 font-semibold">{percent}% ({opt.votes})</span>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono text-right">
              Tổng số lượt bình chọn: {post.poll.totalVotes}
            </div>
          </div>
        )}
      </div>

      {/* Action Footer Bar: Chỉ icon và số, không background */}
      <div className="px-5 py-3 border-t border-zinc-100 dark:border-white/[0.04] flex items-center justify-between">
        <div className="flex items-center gap-5">
          {/* Nút Thả Tim (Heart / Like) - chỉ icon và số */}
          <button
            onClick={() => toggleUpvotePost(post.id)}
            className={`group flex items-center gap-1.5 transition-colors cursor-pointer active:scale-90 ${
              hasLiked
                ? 'text-rose-500'
                : 'text-zinc-500 hover:text-rose-500 dark:text-zinc-400 dark:hover:text-rose-400'
            }`}
            title={hasLiked ? 'Bỏ thích' : 'Thả tim'}
          >
            <Heart className={`w-4 h-4 transition-transform duration-150 group-hover:scale-110 ${hasLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span className="font-mono text-xs font-semibold">{likesCount}</span>
          </button>

          {/* Nút Bình Luận (Comment) - chỉ icon và số */}
          <button
            onClick={() => setShowComments(!showComments)}
            className={`group flex items-center gap-1.5 transition-colors cursor-pointer active:scale-90 ${
              showComments
                ? 'text-purple-600 dark:text-purple-400'
                : 'text-zinc-500 hover:text-purple-600 dark:text-zinc-400 dark:hover:text-purple-300'
            }`}
            title="Bình luận"
          >
            <MessageSquare className="w-4 h-4 transition-transform duration-150 group-hover:scale-110" />
            <span className="font-mono text-xs font-semibold">{postComments.length || post.commentsCount}</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Nút Bookmark (Lưu bài viết) - chỉ icon */}
          <button
            onClick={() => toggleBookmarkPost(post.id)}
            className={`group p-1 transition-colors cursor-pointer active:scale-90 ${
              isBookmarked
                ? 'text-purple-600 dark:text-purple-400'
                : 'text-zinc-500 hover:text-purple-600 dark:text-zinc-400 dark:hover:text-purple-300'
            }`}
            title={isBookmarked ? 'Bỏ lưu' : 'Lưu bài viết'}
          >
            <Bookmark className={`w-4 h-4 transition-transform duration-150 group-hover:scale-110 ${isBookmarked ? 'fill-purple-600 dark:fill-purple-400' : ''}`} />
          </button>

          {/* Nút Chia sẻ (Share) - chỉ icon */}
          <button
            onClick={handleShare}
            className="p-1 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors cursor-pointer active:scale-90"
            title={copied ? 'Đã sao chép link!' : 'Chia sẻ bài viết'}
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-500" />
            ) : (
              <Share2 className="w-4 h-4 transition-transform duration-150 hover:scale-110" />
            )}
          </button>
        </div>
      </div>

      {/* Nested Comments Section with Smooth Dropdown Animation */}
      <div className={`accordion-wrapper ${showComments ? 'expanded' : ''}`}>
        <div className="accordion-content">
          <div className="px-4 py-3 border-t border-zinc-200 dark:border-white/[0.08] bg-zinc-50 dark:bg-[#0f0f15] space-y-3">
          {/* Comment Input */}
          <form onSubmit={handleAddComment} className="flex gap-2 items-center">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-xl object-cover ring-1 ring-zinc-200 dark:ring-white/10 shrink-0" />
            <div className="flex-1 flex gap-2 items-center">
              <input
                type="text"
                placeholder="Viết câu trả lời hoặc thảo luận..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full bg-white dark:bg-[#120e24] border border-purple-200/50 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-purple-500"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-purple-glow shrink-0 transition-all active:scale-95"
              >
                <Send className="w-3 h-3" />
                <span>Gửi</span>
              </button>
            </div>
          </form>

          {/* Comment List */}
          <div className="space-y-3 pt-2">
            {postComments.map((cmt) => {
              const cmtHasLiked = cmt.upvotedByUserIds.includes(currentUser.id);
              return (
                <div key={cmt.id} className="space-y-2 text-xs">
                  <div className="flex items-start gap-2.5 bg-white dark:bg-white/[0.02] p-3 rounded-xl border border-zinc-200 dark:border-white/[0.04]">
                    <img
                      src={cmt.author.avatar}
                      alt={cmt.author.name}
                      onClick={() => setInspectedUser(cmt.author)}
                      className="w-7 h-7 rounded-lg object-cover cursor-pointer hover:ring-1 hover:ring-purple-400 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-zinc-900 dark:text-zinc-200 hover:text-purple-600 dark:hover:text-purple-300 cursor-pointer text-xs" onClick={() => setInspectedUser(cmt.author)}>
                          {cmt.author.name}
                        </span>
                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">{cmt.createdAt}</span>
                      </div>
                      <p className="text-zinc-700 dark:text-zinc-300 mt-1 leading-relaxed text-xs">{cmt.content}</p>

                      {/* Comment actions */}
                      <div className="flex items-center gap-3 mt-2 text-[11px]">
                        {/* Nút Thả Tim bình luận - chỉ icon và số */}
                        <button
                          onClick={() => toggleUpvoteComment(post.id, cmt.id)}
                          className={`group flex items-center gap-1 transition-colors cursor-pointer active:scale-90 ${
                            cmtHasLiked
                              ? 'text-rose-500'
                              : 'text-zinc-400 hover:text-rose-500 dark:text-zinc-500 dark:hover:text-rose-400'
                          }`}
                          title={cmtHasLiked ? 'Bỏ thích' : 'Thả tim'}
                        >
                          <Heart className={`w-3.5 h-3.5 transition-transform duration-150 group-hover:scale-110 ${cmtHasLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                          <span className="font-mono text-[11px] font-semibold">{cmt.upvotesCount}</span>
                        </button>

                        <button
                          onClick={() => setReplyingToId(replyingToId === cmt.id ? null : cmt.id)}
                          className="text-zinc-500 hover:text-purple-600 dark:hover:text-purple-300 flex items-center gap-1 font-medium"
                        >
                          <CornerDownRight className="w-3 h-3" />
                          Trả lời
                        </button>
                      </div>

                      {/* Reply Box */}
                      {replyingToId === cmt.id && (
                        <div className="flex gap-2 mt-2.5 pt-2 border-t border-zinc-200 dark:border-white/[0.06] items-center">
                          <input
                            type="text"
                            placeholder={`Trả lời ${cmt.author.name}...`}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            className="flex-1 bg-white dark:bg-[#181822] border border-zinc-200 dark:border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-purple-500"
                          />
                          <button
                            onClick={() => handleAddReply(cmt.id)}
                            className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center transition-all active:scale-95"
                          >
                            Trả lời
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Nested Replies */}
                  {cmt.replies && cmt.replies.length > 0 && (
                    <div className="pl-6 space-y-2 border-l-2 border-purple-400/40 dark:border-purple-500/20 ml-3.5">
                      {cmt.replies.map(reply => (
                        <div key={reply.id} className="flex items-start gap-2 bg-white dark:bg-white/[0.015] p-2.5 rounded-xl border border-zinc-200 dark:border-white/[0.03]">
                          <img src={reply.author.avatar} alt={reply.author.name} className="w-6 h-6 rounded-md object-cover shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-zinc-900 dark:text-zinc-200 text-xs">{reply.author.name}</span>
                              <span className="text-[9px] text-zinc-400 dark:text-zinc-500">{reply.createdAt}</span>
                            </div>
                            <p className="text-zinc-700 dark:text-zinc-300 mt-0.5 text-xs">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  </article>
);
};
