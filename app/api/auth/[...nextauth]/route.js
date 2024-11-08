import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios"; 
// import FirstApi from "@/Components/APIs/MainApi";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        try {
        
          // const res = await axios.post(`${FirstApi}/login`, credentials, {
          const res = await axios.post("https://dipndipapi.mass-fluence.com/api/login", credentials, {
            headers: { "Content-Type": "application/json" }
          });

          const user = res.data;

          if (res.status === 200 && user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    }
  }
});

export { handler as GET, handler as POST };
