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
      if (user &&user.email) {
        const existingUser=await prisma.user.findUnique({
          where:{email:user.email},
          select:{
            id:true
          }
        })
        token.id = existingUser?.id;
      }
      return token;
    },
    async session({ session, token, }) {
      if(token.id) {
        session.user = {
          ...session.user,
          id: token.id as string,
        };
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/`;
    },
  },
  
  secret:process.env.NEXT_AUTH_SECRET
})