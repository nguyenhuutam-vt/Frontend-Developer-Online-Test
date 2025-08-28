"use client";

import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  text: string;
  user: string;
}

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const postId = Number(params?.id);

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const { data: session } = useSession();

  // fake fetch post từ JSONPlaceholder
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [postId]);

  // xử lý submit comment
  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      text: newComment,
      user: session?.user?.name || "You",
    };

    setComments((prev) => [comment, ...prev]);
    setNewComment("");
  };

  if (!post) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* Post detail */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <p className="text-gray-700 leading-relaxed">{post.body}</p>
      </div>

      {/* Comment section */}
      <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>

        {/* Add comment form */}
        {!session ? (
          <div className="mt-4 flex flex-col items-center">
            <button
              onClick={() => router.push("/auth/login")}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Login to comment
            </button>
            <p className="text-gray-500 mt-2 text-sm">
              Bạn cần đăng nhập để bình luận.
            </p>
          </div>
        ) : (
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder="Write a comment..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              onClick={handleAddComment}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Post
            </button>
          </div>
        )}

        {/* Comment list */}
        <div className="space-y-4">
          {comments.length === 0 && session ? (
            <p className="text-gray-500">No comments yet. Be the first!</p>
          ) : (
            comments.map((c) => (
              <div
                key={c.id}
                className="p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <p className="text-gray-800">{c.text}</p>
                <span className="text-sm text-gray-500">— {c.user}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
