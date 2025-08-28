"use client";
import PostCard from "@/components/PostCard";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  // fetch posts khi load
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      setPosts(data);
      setFilteredPosts(data);
    };
    fetchPosts();
  }, []);

  // filter khi search thay đổi
  useEffect(() => {
    const newPosts = posts.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPosts(newPosts);
    setPage(1); // reset về page đầu khi search
  }, [search, posts]);

  // tính posts hiện tại cho pagination
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const currentPosts = filteredPosts.slice(start, end);
  const totalPages = Math.ceil(filteredPosts.length / perPage);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        Blog Posts
      </h1>

      {/* search box */}
      <input
        type="text"
        placeholder="Search posts..."
        className="w-full border border-gray-300 p-3 mb-6 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* danh sách posts */}
      <div className="space-y-6">
        {currentPosts.map((post: any) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* pagination */}
      <div className="flex justify-center items-center mt-8 space-x-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-1 text-lg font-semibold">
          Page {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
