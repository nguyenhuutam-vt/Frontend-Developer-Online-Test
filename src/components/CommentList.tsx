// /src/components/CommentList.tsx
"use client";

export type Comment = {
  id: number;
  name: string;
  email: string;
  body: string;
};

export default function CommentList({ comments }: { comments: Comment[] }) {
  if (comments.length === 0) {
    return <p className="text-gray-500 mt-4">Chưa có bình luận nào.</p>;
  }
  return (
    <div className="space-y-4">
      {comments.map((c) => (
        <div key={c.id} className="border rounded-lg p-3 bg-gray-50">
          <p className="text-sm font-semibold">
            {c.name} ({c.email})
          </p>
          <p className="text-gray-700">{c.body}</p>
        </div>
      ))}
    </div>
  );
}
