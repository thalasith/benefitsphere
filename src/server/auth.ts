import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  DefaultUser,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import OktaProvider from "next-auth/providers/okta";

import { users } from "~/server/db/schema";

import { env } from "~/env";
import { db } from "~/server/db";
import { createTable } from "~/server/db/schema";
import { eq } from "drizzle-orm";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      userRoleType: string;
      activeClient: number;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    // ...other properties
    // role: UserRole;
    userRoleType: string;
    activeClient: number;
  }
}

interface User {
  name: string | null;
  email: string;
  image: string | null;
  id: string;
  userRoleType: string | null;
  activeClient: string | null;
}

interface Session {
  user: User;
  expires: string;
  activeClient: string;
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, user, trigger, newSession }) => {
      if (!user) {
        return session;
      }
      const id = user.id;

      const first = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, id),
      });
      if (!first) {
        return session;
      }

      session = {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          userRoleType: first.userRoleType ?? "",
          activeClient: first.activeClient ?? 0,
        },
      };

      if (trigger === "update") {
        session = {
          ...session,
          user: {
            ...session.user,
            activeClient: parseInt((newSession as Session).activeClient),
          },
        };
      }

      // if (trigger === "update") {
      //   const activeClient = (newSession as Session).activeClient;
      //   console.log("activeClient", activeClient);

      //   return newSession;
      // }

      // const id = user.id;

      // const first = await db.query.users.findFirst({
      //   where: (users, { eq }) => eq(users.id, id),
      // });
      // if (!first) {
      //   return session;
      // }
      // return {
      //   ...session,
      //   user: {
      //     ...session.user,
      //     id: user.id,
      //     userRoleType: first.userRoleType,
      //     activeClient: first.activeClient,
      //   },
      // };
      return session;
    },
    // session: ({ session, user }) => ({
    //   ...session,
    //   user: {
    //     ...session.user,
    //     id: user.id,
    //   },
    // }),
  },
  adapter: DrizzleAdapter(db, createTable) as Adapter,
  providers: [
    OktaProvider({
      clientId: env.OKTA_CLIENT_ID,
      clientSecret: env.OKTA_CLIENT_SECRET,
      issuer: env.OKTA_ISSUER,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
