"use client";

import { useParams } from "next/navigation";
import CommentForm from "@/components/CommentForm";
import CommentList from "@/components/CommentList";
import { useLocalComments } from "@/lib/hooks/useLocalComments";

export default function PostDetailPage() {
  const { id } = useParams();
  const { comments, addComment } = useLocalComments(id as string);

  return (
    <div className="max-w-2xl mx-auto py-6">
      <h1 className="text-2xl font-bold">Bài viết #{id}</h1>

      {/* chỗ hiển thị content giả */}
      <p className="mt-2 text-gray-700">
        Đây là nội dung chi tiết bài viết số {id}.
      </p>

      {/* form + list comments */}
      <CommentForm onAdd={addComment} />
      {/* <CommentList comments={comments} /> */}
    </div>
  );
}
