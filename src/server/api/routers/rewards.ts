import { eq } from "drizzle-orm";
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
        question: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { object } = await generateObject({
          model,
          schema: z.object({
            recipe: z.object({
              name: z.string(),
              ingredients: z.array(
                z.object({
                  name: z.string(),
                  amount: z.string(),
                }),
              ),
              steps: z.array(z.string()),
            }),
          }),
          prompt: "Generate a lasagna recipe.",
        });
        return { object };
        // const riskPlanData = await ctx.db
        //   .select()
        //   .from(riskPlans)
        //   .where(eq(riskPlans.clientId, 1));
        // return riskPlanData;
      } catch (error) {
        console.log(error);
      }
    }),
});
