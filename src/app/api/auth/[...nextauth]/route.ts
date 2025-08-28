import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
// Có thể thêm GoogleProvider, CredentialsProvider...

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
