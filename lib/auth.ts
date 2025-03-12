import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import {prisma} from "@/lib/primsa"
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  session: {
    strategy: "jwt", 
    maxAge: 24 * 60 * 60, 
  },
  callbacks: {
    async signIn({user,account}) {
      if(!user.email) return false;
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });
      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: user.email,
          },
        });
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if(token.id) {
        session.user = {
          ...session.user,
          id: token.id as string,
        };
      }
      return session;
    },
  },
  secret:process.env.NEXT_AUTH_SECRET
})