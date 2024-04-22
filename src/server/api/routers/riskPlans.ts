import { eq } from "drizzle-orm";
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

  getRiskPlansByClientId: protectedProcedure
    .input(
      z.object({
        clientId: z.number().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      const listOfRiskPlans = await ctx.db
        .select({
          field1: riskPlans.id,
          field2: riskPlans.country,
          field3: riskPlans.benefitType,
          field4: riskPlans.planName,
        })
        .from(riskPlans)
        .where(eq(riskPlans.clientId, input.clientId));
      return listOfRiskPlans;
    }),

  getRiskPlanDetailsById: protectedProcedure
    .input(
      z.object({
        riskPlanId: z.number().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      const riskPlanDetails = await ctx.db.query.riskPlans.findFirst({
        where: eq(riskPlans.id, input.riskPlanId),
      });

      return riskPlanDetails;
    }),
});
