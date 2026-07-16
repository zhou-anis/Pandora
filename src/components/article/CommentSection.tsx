import React, { useState } from "react";
import { Avatar, Input, Button, Empty } from "antd";
import { LikeOutlined, MessageOutlined, UserOutlined } from "@ant-design/icons";
import classNames from "classnames";
import type { Comment } from "../../views/strategy/data";

const { TextArea } = Input;

interface Props {
  comments: Comment[];
  articleId: number;
}

/** 单条评论组件 */
const CommentItem: React.FC<{
  comment: Comment;
  onReply: (author: string) => void;
  depth?: number;
}> = ({ comment, onReply, depth = 0 }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes);

  return (
    <div className={classNames(depth > 0 && "ml-12 mt-3")}>
      <div className="flex gap-3">
        <Avatar src={comment.author.avatar} size={depth > 0 ? 32 : 40} icon={<UserOutlined />} />
        <div className="flex-1 min-w-0">
          {/* 头部 */}
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-gray-800 text-sm">{comment.author.name}</span>
            {comment.replyTo && (
              <>
                <span className="text-gray-300 text-xs">回复</span>
                <span className="text-blue-500 text-xs">@{comment.replyTo}</span>
              </>
            )}
            <span className="text-gray-400 text-xs">{comment.createdAt}</span>
          </div>
          {/* 内容 */}
          <p className="text-gray-600 text-sm leading-relaxed mb-2">{comment.content}</p>
          {/* 操作 */}
          <div className="flex items-center gap-4 text-gray-400 text-xs">
            <button
              onClick={() => {
                setLiked(!liked);
                setLikeCount((c) => (liked ? c - 1 : c + 1));
              }}
              className={classNames(
                "flex items-center gap-1 hover:text-blue-500 transition-colors",
                liked && "text-blue-500"
              )}
            >
              <LikeOutlined />
              {likeCount > 0 && likeCount}
            </button>
            <button
              onClick={() => onReply(comment.author.name)}
              className="flex items-center gap-1 hover:text-blue-500 transition-colors"
            >
              <MessageOutlined />
              回复
            </button>
          </div>
        </div>
      </div>
      {/* 嵌套回复 */}
      {comment.replies?.map((reply) => (
        <CommentItem key={reply.id} comment={reply} onReply={onReply} depth={depth + 1} />
      ))}
    </div>
  );
};

/** 评论区组件 */
const CommentSection: React.FC<Props> = ({ comments, articleId }) => {
  const [localComments, setLocalComments] = useState<Comment[]>(comments);
  const [inputValue, setInputValue] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!inputValue.trim()) return;
    setSubmitting(true);

    // 模拟提交
    setTimeout(() => {
      const newComment: Comment = {
        id: Date.now(),
        articleId,
        author: {
          name: "当前用户",
          avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=current",
          bio: "",
        },
        content: inputValue.trim(),
        createdAt: new Date().toISOString().slice(0, 10),
        likes: 0,
        ...(replyTo ? { replyTo } : {}),
      };

      if (replyTo) {
        // 作为回复添加到对应评论
        setLocalComments((prev) =>
          prev.map((c) => {
            if (c.author.name === replyTo) {
              return { ...c, replies: [...(c.replies || []), newComment] };
            }
            return c;
          })
        );
      } else {
        setLocalComments((prev) => [newComment, ...prev]);
      }

      setInputValue("");
      setReplyTo(null);
      setSubmitting(false);
    }, 500);
  };

  return (
    <div>
      {/* 评论数量 */}
      <h3 className="text-xl font-bold text-gray-800 mb-6">
        评论 <span className="text-blue-500">({localComments.length})</span>
      </h3>

      {/* 评论输入框 */}
      <div className="flex gap-3 mb-8">
        <Avatar
          size={40}
          icon={<UserOutlined />}
          src="https://api.dicebear.com/7.x/miniavs/svg?seed=current"
        />
        <div className="flex-1">
          {replyTo && (
            <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
              <span>回复 @{replyTo}</span>
              <button
                onClick={() => setReplyTo(null)}
                className="text-blue-500 hover:text-blue-700 text-xs"
              >
                取消回复
              </button>
            </div>
          )}
          <TextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={replyTo ? `回复 @${replyTo}...` : "写下你的评论..."}
            autoSize={{ minRows: 3, maxRows: 6 }}
            className="!rounded-xl !text-sm"
          />
          <div className="flex justify-end mt-3">
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={submitting}
              disabled={!inputValue.trim()}
              className="!rounded-full !px-6 !bg-gradient-to-r !from-blue-500 !to-indigo-500 !border-0"
            >
              发表评论
            </Button>
          </div>
        </div>
      </div>

      {/* 评论列表 */}
      <div className="space-y-6">
        {localComments.length > 0 ? (
          localComments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-100 pb-5 last:border-0">
              <CommentItem comment={comment} onReply={setReplyTo} />
            </div>
          ))
        ) : (
          <Empty description="暂无评论，快来抢沙发吧 🛋️" />
        )}
      </div>
    </div>
  );
};

export default CommentSection;
