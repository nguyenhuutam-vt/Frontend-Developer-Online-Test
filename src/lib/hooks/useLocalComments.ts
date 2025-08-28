"use client";

import { useEffect, useState } from "react";

export function useLocalComments(postId: string | number) {
  const [comments, setComments] = useState<string[]>([]);

  // load comments từ localStorage khi vào trang
  useEffect(() => {
    const saved = localStorage.getItem(`comments-${postId}`);
    if (saved) {
      setComments(JSON.parse(saved));
    }
  }, [postId]);

  // thêm comment mới
  const addComment = (text: string) => {
    const newComments = [...comments, text];
    setComments(newComments);
    localStorage.setItem(`comments-${postId}`, JSON.stringify(newComments));
  };

  return { comments, addComment };
}
