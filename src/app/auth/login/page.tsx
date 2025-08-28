"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Login</h1>

      {/* Google Provider */}
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Sign in with Google
      </button>

      {/* GitHub Provider */}
      <button
        onClick={() => signIn("github", { callbackUrl: "/" })}
        className="px-4 py-2 bg-gray-800 text-white rounded mt-2"
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
