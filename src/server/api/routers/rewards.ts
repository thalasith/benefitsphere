import { eq, inArray, and } from "drizzle-orm";
import { z } from "zod";
import { generateText, generateObject } from "ai";
import { openai } from "@ai-sdk/openai";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { clients, rewards, riskPlans } from "~/server/db/schema";
const model = openai("gpt-3.5-turbo");

export const rewardsRouter = createTRPCRouter({
  createCountryRewards: protectedProcedure
    .input(
      z.object({
        planIds: z.array(z.number()),
        country: z.string(),
        clientId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const riskPlanData = await ctx.db
          .select()
          .from(riskPlans)
          .where(inArray(riskPlans.id, input.planIds));

        console.log("Generating test...");

        for (const data of riskPlanData) {
          const prompt = `The plan includes the following benefits: ${JSON.stringify(data)}
      
          Please generate an employee-facing description of the benefits. Just include a description of the benefit itself, the non-evidence limit, the benefit maximum, and who the insurer is. Create something similar to: "Okta provides you with insurance coverage in the event you contract a critical illness. The plan provides a coverage limit of 36 times your basic monthly salary, up to a cap."
          
          The generated description should sound compassionate and focus on the well-being of the employees and their loved ones.`;

          const { text } = await generateText({
            model,
            prompt,
          });

          const promptedData = {
            clientId: input.clientId,
            country: input.country,
            name: data?.coverageType,
            category: "Financial Protection",
            description: text,
          };
          console.log(promptedData);
          await ctx.db.insert(rewards).values(promptedData);
        }

        return { status: "success" };
      } catch (error) {
        console.log(error);
      }
    }),

  getRewardsByClientIdAndCountry: protectedProcedure
    .input(
      z.object({
        clientId: z.number(),
        country: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const rewardsData = await ctx.db
        .select()
        .from(rewards)
        .where(
          and(
            eq(rewards.clientId, input.clientId),
            eq(rewards.country, input.country),
          ),
        );

      return rewardsData;
    }),
});
