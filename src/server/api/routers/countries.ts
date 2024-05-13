import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { countries, clients, countriesToClients } from "~/server/db/schema";

export const countryRouter = createTRPCRouter({
  getCountries: protectedProcedure.query(async ({ ctx }) => {
    const listOfCountries = await ctx.db.select().from(countries);
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
