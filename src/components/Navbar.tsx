"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg rounded-b-lg">
      <Link
        href="/"
        className="text-2xl font-bold text-white tracking-wide hover:scale-105 transition-transform duration-200"
      >
        <span className="inline-block align-middle mr-2">📝</span> BlogApp
      </Link>

      {session ? (
        <div className="flex items-center gap-4">
          <span className="text-white font-medium">{session.user?.name}</span>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow transition duration-200"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          href="/auth/login"
          className="px-4 py-2 bg-white text-blue-600 rounded-lg shadow hover:bg-blue-50 transition duration-200 font-semibold"
        >
          Login
        </Link>
      )}
    </nav>
  );
}
