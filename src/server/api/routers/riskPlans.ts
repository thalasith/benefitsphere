import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { riskPlans } from "~/server/db/schema";

const riskPlanModel = {
  id: z.number(),
  clientId: z.number(),
  planName: z.string(),
  country: z.string(),
  currency: z.string(),
  groupPlanOffered: z.boolean(),
  eligibility: z.string(),
  coverageType: z.string(),
  coverageForm: z.string(),
  coverageMultipleDuration: z.string(),
  coverageMultiple: z.number(),
  coverageFixedAmount: z.number(),
  nonEvidenceLimit: z.number(),
  coverageMaximum: z.number(),
  employeeContribution: z.string(),
  employeeContributionOther: z.string(),
  employerContribution: z.string(),
  employerContributionOther: z.string(),
  funding: z.boolean(),
  provider: z.string(),
  policyNumber: z.string(),
  policyStartDate: z.date(),
  policyEndDate: z.date(),
  cancellationDuration: z.string(),
  cancellationAmount: z.number(),
  headcount: z.number(),
  totalSumInsured: z.number(),
  totalPremium: z.number(),
  invoicingDescription: z.string(),
  employeeEnrollmentDescription: z.string(),
  employeeTerminationDescription: z.string(),
  intermediaryType: z.string(),
  intermediaryName: z.string(),
  intermediaryRemunerationMethod: z.string(),
  intermediaryRemunerationCommission: z.number(),
  intermediaryRemunerationFee: z.number(),
  intermediaryRemunerationOther: z.string(),
};

export const riskPlanRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        clientId: z.number(),
        planName: z.string().min(1),
        country: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(riskPlans).values({
        clientId: input.clientId,
        planName: input.planName,
        country: input.country,
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
          field3: riskPlans.coverageType,
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

  updateRiskPlanDetailsById: protectedProcedure
    .input(z.object(riskPlanModel))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(riskPlans)
        .set(input)
        .where(eq(riskPlans.id, input.id));
    }),

  getRiskPlanDetailsByCountry: protectedProcedure
    .input(
      z.object({
        country: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      const riskPlansSummary = await ctx.db
        .select({
          id: riskPlans.id,
          country: riskPlans.country,
          coverageType: riskPlans.coverageType,
          planName: riskPlans.planName,
        })
        .from(riskPlans)
        .where(eq(riskPlans.country, input.country));

      return riskPlansSummary;
    }),
});
