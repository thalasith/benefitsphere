import { eq } from "drizzle-orm";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { clients, usersToClients, users } from "~/server/db/schema";
import { generateText, generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
const model = openai("gpt-3.5-turbo");

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
      const prompt = `Create a welcome paragraph for a company named ${input.clientName} in the ${input.industry} industry. The paragraph should be less than 2000 characters and should be written in a friendly and professional tone.`;
      const title = `Welcome to the ${input.clientName} Rewards Page`;
      const { text } = await generateText({
        model,
        prompt,
      });

      await ctx.db.insert(clients).values({
        clientName: input.clientName,
        industry: input.industry,
        baseCurrency: input.baseCurrency,
        url: urlReady,
        rewardsTitle: title,
        rewardsWelcomeMessage: text,
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
      return clientDetails[0];
    }),
  getClientNameByUrl: publicProcedure
    .input(z.object({ url: z.string() }))
    .query(async ({ ctx, input }) => {
      const clientDetails = await ctx.db
        .select()
        .from(clients)
        .where(eq(clients.url, input.url));
      return clientDetails[0];
    }),

  updateClientRewardsDetailsById: protectedProcedure
    .input(
      z.object({
        clientId: z.number(),
        rewardsTitle: z.string().min(1),
        rewardsWelcomeMessage: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(clients)
        .set({
          rewardsTitle: input.rewardsTitle,
          rewardsWelcomeMessage: input.rewardsWelcomeMessage,
        })
        .where(eq(clients.id, input.clientId));
    }),
});
