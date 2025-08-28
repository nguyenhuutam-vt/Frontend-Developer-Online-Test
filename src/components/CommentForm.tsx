"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CommentForm({
  onAdd,
}: {
  onAdd: (text: string) => void;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [text, setText] = useState("");

  if (!session) {
    return (
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
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    onAdd(text);
    console.log(`Add comment for post :`, text);
    setText(""); // clear input after submit
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        className="w-full border p-2 rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
}
