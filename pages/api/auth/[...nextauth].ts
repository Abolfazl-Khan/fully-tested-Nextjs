/* eslint-disable no-param-reassign */
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { User } from "@/lib/features/users/types";
import { getSignedInUser } from "@/lib/features/users/utils";

export default NextAuth({
  providers: [
    // reference: https://next-auth.js.org/configuration/providers/credentials#how-to
    CredentialsProvider({
      // id: 'credentials',
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "email", type: "text", placeholder: "test" },
        password: { label: "Password", type: "password", placeholder: "test" },
      },

      // async authorize(credentials) {
      async authorize(credentials): Promise<{ user: User } | null> {
        const user = await getSignedInUser(
          credentials?.email ?? "",
          credentials?.password ?? ""
        );

        if (!user) return null;
        return user ?? null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    // reference: https://next-auth.js.org/configuration/options#session
    strategy: "jwt",

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      // reference: https://next-auth.js.org/configuration/callbacks#jwt-callback
      // Persist the JWT token to the token right after signin
      // console.log(10, token, user);
      if (user) {
        token.user = user.user;
      }
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async session({ session, token, user }) {
      // reference: https://next-auth.js.org/configuration/callbacks#session-callback
      // Send properties to the client, like an access_token from a provider
      // console.log(0);

      // console.log(1, session, token);
      // console.log(1, session, token, user);

      const tokenUser = token.user as User;

      session.token = tokenUser.token;

      session.user = tokenUser;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
