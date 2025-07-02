import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { DefaultSession } from "next-auth";
import { LoginResponse } from "./lib/types/auth";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/",
    error: "/",
  },

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      // Authorization
      authorize: async (credentials) => {
        const response = await fetch(`${process.env.API!}/auth/signin`, {
          method: "POST",
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        ///Response
        const payload: APIResponse<LoginResponse> =await response.json();

        // Throw an error if login wasn't successfull
        if ("error" in payload) {
          throw new Error(payload.error);
        }

        return payload;
      },
    }),
  ],

  // Callbacks
  callbacks: {
    jwt: ({ token, user }) => {
        if(user){
           token.user = user.user;
           token.token = user.token;
        }
        return token;
    },

    session: ({ session, token }) => {
      session.user = token.user ?? (session.user as DefaultSession["user"]);
      
      return session;
  },
  },
};
