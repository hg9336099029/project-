import { FaRegComment, FaRegHeart, FaRegBookmark, FaTrash } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import LoadingSpinner from "./LoadingSpinner";
import { formatPostDate } from "../../utils/date";

const Post = ({ post, authUser }) => {
  const [comment, setComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const postOwner = post.user;
  const isLiked = authUser && post.likes.includes(authUser._id);
  const isMyPost = authUser && authUser._id === post.user._id;

  const formattedDate = formatPostDate(post.createdAt);

  // Delete Post Mutation
  const { mutate: deletePost, isLoading: isDeleting } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/posts/${post._id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete the post.");
      return data;
    },
    onSuccess: () => {
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Like Post Mutation
  const { mutate: likePost, isLoading: isLiking } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/posts/like/${post._id}`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to like the post.");
      return data.likes; // Return updated likes
    },
    onSuccess: (updatedLikes) => {
      queryClient.setQueryData(["posts"], (oldPosts) =>
        oldPosts.map((p) => (p._id === post._id ? { ...p, likes: updatedLikes } : p))
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Comment Post Mutation
  const { mutate: commentPost, isLoading: isCommenting } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/posts/comment/${post._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: comment }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to post the comment.");
      return data;
    },
    onSuccess: () => {
      toast.success("Comment added successfully");
      setComment("");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDeletePost = () => deletePost();
  const handleLikePost = () => !isLiking && likePost();
  const handlePostComment = (e) => {
    e.preventDefault();
    if (!isCommenting && comment.trim()) {
      commentPost();
    }
  };

  return (
    <div className="flex gap-2 items-start p-4 border-b border-gray-700">
      {/* Avatar */}
      <div className="avatar">
        <Link to={`/profile/${postOwner.username}`} className="w-8 rounded-full overflow-hidden">
          <img
            src={postOwner.profileImg || "/avatar-placeholder.png"}
            alt={`${postOwner.fullName}'s profile`}
          />
        </Link>
      </div>

      {/* Post Content */}
      <div className="flex flex-col flex-1">
        {/* Post Header */}
        <div className="flex gap-2 items-center">
          <Link to={`/profile/${postOwner.username}`} className="font-bold">
            {postOwner.fullName}
          </Link>
          <span className="text-gray-700 flex gap-1 text-sm">
            <Link to={`/profile/${postOwner.username}`}>@{postOwner.username}</Link>
            <span>·</span>
            <span>{formattedDate}</span>
          </span>
          {isMyPost && (
            <span className="flex justify-end flex-1">
              {!isDeleting ? (
                <FaTrash
                  className="cursor-pointer hover:text-red-500"
                  onClick={handleDeletePost}
                />
              ) : (
                <LoadingSpinner size="sm" />
              )}
            </span>
          )}
        </div>

        {/* Post Text and Image */}
        <div className="flex flex-col gap-3 overflow-hidden">
          <span>{post.text}</span>
          {post.img && (
            <img
              src={post.img}
              className="h-80 object-contain rounded-lg border border-gray-700"
              alt="Post media"
            />
          )}
        </div>

        {/* Post Actions */}
        <div className="flex justify-between mt-3">
          {/* Action Buttons */}
          <div className="flex gap-4 items-center w-2/3 justify-between">
            {/* Comment */}
            <div
              className="flex gap-1 items-center cursor-pointer group"
              onClick={() => setIsModalOpen(true)}
            >
              <FaRegComment className="w-4 h-4 text-slate-500 group-hover:text-sky-400" />
              <span className="text-sm text-slate-500 group-hover:text-sky-400">
                {post.comments.length}
              </span>
            </div>

            {/* Repost */}
            <div className="flex gap-1 items-center group cursor-pointer">
              <BiRepost className="w-6 h-6 text-slate-500 group-hover:text-green-500" />
              <span className="text-sm text-slate-500 group-hover:text-green-500">0</span>
            </div>

            {/* Like */}
            <div className="flex gap-1 items-center group cursor-pointer" onClick={handleLikePost}>
              {isLiking ? (
                <LoadingSpinner size="sm" />
              ) : isLiked ? (
                <FaRegHeart className="w-4 h-4 text-pink-500" />
              ) : (
                <FaRegHeart className="w-4 h-4 text-slate-500 group-hover:text-pink-500" />
              )}
              <span className={`text-sm ${isLiked ? "text-pink-500" : "text-slate-500"}`}>
                {post.likes.length}
              </span>
            </div>
          </div>

          {/* Bookmark */}
          <div className="flex w-1/3 justify-end items-center">
            <FaRegBookmark className="w-4 h-4 text-slate-500 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
