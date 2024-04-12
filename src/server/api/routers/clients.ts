import { eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { clients, usersToClients } from "~/server/db/schema";

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
      .innerJoin(usersToClients, eq(usersToClients.clientId, clients.id));
    return listOfClients;
  }),
});
