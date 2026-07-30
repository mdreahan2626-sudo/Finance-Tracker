import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/lib/prisma";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      try {
        const existingUser = await db.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          await db.user.create({
            data: {
              email: user.email,
              name: user.name || "User",
              imageUrl: user.image || "",
              image: user.image || "",
            },
          });
        } else {
          await db.user.update({
            where: { email: user.email },
            data: {
              name: user.name || existingUser.name,
              imageUrl: user.image || existingUser.imageUrl,
              image: user.image || existingUser.image,
            },
          });
        }
        return true;
      } catch (error) {
        console.error("Error in NextAuth signIn callback:", error);
        return true;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id || token.sub;
        session.user.email = token.email || session.user.email;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.includes("/sign-in") || url === baseUrl || url === `${baseUrl}/`) {
        return `${baseUrl}/dashboard`;
      }
      return url.startsWith(baseUrl) ? url : `${baseUrl}/dashboard`;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
