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
      async authorize(credentials, req) {
        let user: User | null = null;
        await signInWithEmailAndPassword(
          auth,
          credentials!.email!,
          credentials!.password!
        )
          .then((userCredential) => {
          console.log(userCredential.user.uid);
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
};

export default NextAuth(authOptions);
