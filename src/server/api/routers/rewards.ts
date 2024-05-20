import { eq, inArray } from "drizzle-orm";
import { z } from "zod";
import { generateText, generateObject } from "ai";
import { openai } from "@ai-sdk/openai";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { clients, riskPlans } from "~/server/db/schema";
const model = openai("gpt-3.5-turbo");

export const rewardsRouter = createTRPCRouter({
  createTest: protectedProcedure
    .input(
      z.object({
        planIds: z.array(z.number()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const riskPlanData = await ctx.db
          .select()
          .from(riskPlans)
          .where(inArray(riskPlans.id, input.planIds));

        // return riskPlanData;
        console.log("Generating test...");

        const prompt = `Generate an employee facing description for all the plans selected here where the benefit is ${JSON.stringify(riskPlanData)}`;

        const { object } = await generateObject({
          model,
          schema: z.object({
            clientId: z.number(),
            employeeFacingDescription: z.string(),
          }),
          prompt: prompt,
        });
        console.log(object);
        return { object };
      } catch (error) {
        console.log(error);
      }
    }),
});
