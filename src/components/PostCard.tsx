import Link from "next/link";

export default function PostCard({ post }: { post: any }) {
  return (
    <div className="border border-gray-200 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all bg-white hover:-translate-y-1">
      <h2 className="text-xl font-bold mb-2 text-gray-800 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
        {post.title}
      </h2>
      <p className="text-gray-600 line-clamp-2 mb-4">{post.body}</p>
      <Link
        href={`/posts/${post.id}`}
        className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold shadow hover:scale-105 transition-transform duration-200"
      >
        Read more →
      </Link>
    </div>
  );
}
