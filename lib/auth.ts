import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  session: {
    strategy: "jwt", 
    maxAge: 24 * 60 * 60, 
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log("jwt Start ******")
      console.log(token);
      console.log('Gap');
      console.log(user);
      console.log("jwt end");
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      console.log('session start****')
      console.log(session);
      console.log('Gap');
      console.log(token);
      console.log("session end");
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