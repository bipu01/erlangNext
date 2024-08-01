import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// import { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   // Add this line to disable all debug logging
//   debug: false,
//   // Or use this to only log errors
//   // debug: process.env.NODE_ENV === "development" ? "error" : false,

//   // ... rest of your configuration
// };
