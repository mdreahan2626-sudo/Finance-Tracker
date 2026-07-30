import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "./prisma";

export const checkUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return null;
    }

    const email = session.user.email;
    if (!email) return null;

    let user = await db.user.findUnique({
      where: { email },
    });

    if (user) {
      return user;
    }

    // Auto-create user record in Prisma Supabase DB if not present
    user = await db.user.create({
      data: {
        email,
        name: session.user.name || "User",
        imageUrl: session.user.image || "",
        image: session.user.image || "",
      },
    });

    return user;
  } catch (error) {
    console.error("Error in checkUser:", error.message);
    return null;
  }
};