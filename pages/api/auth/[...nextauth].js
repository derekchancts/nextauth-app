import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
import connectDB from "../../../lib/connectDB"


connectDB();

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  // secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/src/user/login"
  },
  // callbacks: {
  //   // async signIn(user, account, profile) { return true },

  //   // The redirect callback is called anytime the user is redirected to a callback URL (e.g. on signin or signout).
  //   // async redirect(url, baseUrl) { return baseUrl }, 
  //   async redirect(url, baseUrl) { 
  //     // return "/src/user/author" 
  //     return "https://google.com" 
  //   },
  // },
})
