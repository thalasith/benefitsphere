import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { riskPlans } from "~/server/db/schema";

export const riskPlanRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        clientId: z.number(),
        planName: z.string().min(1),
        mandated: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(riskPlans).values({
        clientId: input.clientId,
        planName: input.planName,
        mandated: input.mandated,
      });
    }),
});
