import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import { getApps, initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./_firebaseConfig";

const app = getApps()[0] ?? initializeApp(firebaseConfig);
const auth = getAuth(app);

type User = { id: string | null; email: string | null };

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "username",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        if (!credentials) return null;
        let user: User | null = null;
        await signInWithEmailAndPassword(
          auth,
          credentials.email!,
          credentials.password!
        )
          .then((userCredential) => {
            user = {
              id: userCredential.user.uid,
              email: userCredential.user.email,
            };
          })
          .catch((error) => {
            console.log(error.code);
          });

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin, return to admin page if successful
      else if (new URL(url).origin === baseUrl) return `${baseUrl}/admin`;
      return baseUrl;
    },
  },
};

export default NextAuth(authOptions);
