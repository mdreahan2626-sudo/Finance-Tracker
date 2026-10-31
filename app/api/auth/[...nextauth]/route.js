import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/prisma";
import crypto from "crypto";

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export const authOptions = {
  trustHost: true,
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
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email and password.");
        }

        const emailInput = credentials.email.trim().toLowerCase();
        const rawPassword = credentials.password;
        const hashedPassword = hashPassword(rawPassword);

        let user = await db.user.findFirst({
          where: {
            OR: [
              { email: emailInput },
              { name: { equals: credentials.email.trim(), mode: "insensitive" } },
            ],
          },
        });

        if (!user) {
          const finalEmail = emailInput.includes("@") ? emailInput : `${emailInput}@welth.local`;
          const finalName = credentials.name?.trim() || credentials.email.trim();

          user = await db.user.create({
            data: {
              email: finalEmail,
              name: finalName,
              password: hashedPassword,
            },
          });

          await db.account.create({
            data: {
              name: "Main Savings",
              type: "SAVINGS",
              balance: 1000,
              userId: user.id,
              isDefault: true,
            },
          });

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image || user.imageUrl,
          };
        }

        if (user.password && user.password !== hashedPassword) {
          throw new Error("Incorrect password. Please try again.");
        }

        if (!user.password) {
          await db.user.update({
            where: { id: user.id },
            data: { password: hashedPassword },
          });
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image || user.imageUrl,
        };
      },
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
    async signIn({ user, account }) {
      if (!user.email) return false;
      if (account?.provider === "google") {
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
        } catch (error) {
          console.error("Error in NextAuth signIn callback:", error);
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id || token.sub;
        session.user.email = token.email || session.user.email;
        session.user.name = token.name || session.user.name;
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
