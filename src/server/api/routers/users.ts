import { eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { users } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(async ({ ctx }) => {
    const listOfUsers = await ctx.db.select().from(users);
    return listOfUsers;
  }),
  updateUserActiveClient: protectedProcedure
    .input(
      z.object({
        userId: z.string().min(1),
        activeClient: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(users)
        .set({ activeClient: input.activeClient })
        .where(eq(users.id, input.userId));
    }),
});
