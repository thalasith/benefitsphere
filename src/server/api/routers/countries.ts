import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { countries, clients, countriesToClients } from "~/server/db/schema";

export const countryRouter = createTRPCRouter({
  getCountries: protectedProcedure.query(async ({ ctx }) => {
    const listOfCountries = await ctx.db.select().from(countries);
    return listOfCountries;
  }),

  getCountryRelationsByClientId: protectedProcedure
    .input(
      z.object({
        clientId: z.number().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      const listOfCountries = await ctx.db
        .select()
        .from(clients)
        .innerJoin(
          countriesToClients,
          eq(countriesToClients.clientId, clients.id),
        )
        .where(eq(countriesToClients.clientId, input.clientId));
      return listOfCountries;
    }),

  //   addCountriesToClientRelation: protectedProcedure
  //     .input(
  //       z.object({
  //         countryId: z.string().min(1),
  //         clientId: z.number().min(1),
  //       }),
  //     )
  //     .mutation(async ({ ctx, input }) => {
  //       await ctx.db.insert(countriesToClients).values({
  //         countryId: input.countryId,
  //         clientId: input.clientId,
  //       });
  //     }),
});
