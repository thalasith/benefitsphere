import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
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
      const normalized = input.clientName
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const sanitized = normalized
        .replace(/\s+/g, "_")
        .replace(/[^a-zA-Z0-9_]/g, "");
      const urlReady = sanitized.toLowerCase();
      await ctx.db.insert(clients).values({
        clientName: input.clientName,
        industry: input.industry,
        baseCurrency: input.baseCurrency,
        url: urlReady,
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

  getClientDetailsById: protectedProcedure
    .input(
      z.object({
        clientId: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const clientDetails = await ctx.db
        .select()
        .from(clients)
        .where(eq(clients.id, input.clientId));
      return clientDetails;
    }),
});
