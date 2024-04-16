import { eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { clients, usersToClients, users } from "~/server/db/schema";

export const clientRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        clientName: z.string().min(1),
        industry: z.string().min(1),
        baseCurrency: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(clients).values({
        clientName: input.clientName,
        industry: input.industry,
        baseCurrency: input.baseCurrency,
      });
    }),

  getUsersToClients: protectedProcedure.query(async ({ ctx }) => {
    const listOfClients = await ctx.db
      .select()
      .from(clients)
      .innerJoin(usersToClients, eq(usersToClients.clientId, clients.id))
      .innerJoin(users, eq(users.id, usersToClients.userId));
    return listOfClients;
  }),

  addUsersToClientsRelation: protectedProcedure
    .input(
      z.object({
        userId: z.string().min(1),
        clientId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(usersToClients).values({
        userId: input.userId,
        clientId: input.clientId,
      });
    }),

  getClients: protectedProcedure.query(async ({ ctx }) => {
    const listOfClients = await ctx.db.select().from(clients);
    return listOfClients;
  }),

  getClientsByUserId: protectedProcedure
    .input(
      z.object({
        userId: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      const listOfClients = await ctx.db
        .select()
        .from(clients)
        .innerJoin(usersToClients, eq(usersToClients.clientId, clients.id))
        .where(eq(usersToClients.userId, input.userId));
      return listOfClients;
    }),
});
