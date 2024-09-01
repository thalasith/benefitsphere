import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { clientRouter } from "./routers/clients";
import { userRouter } from "./routers/users";
import { riskPlanRouter } from "./routers/riskPlans";
import { uploadRouter } from "./routers/upload";
import { countryRouter } from "./routers/countries";
import { rewardsRouter } from "./routers/rewards";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  client: clientRouter,
  country: countryRouter,
  user: userRouter,
  riskPlan: riskPlanRouter,
  upload: uploadRouter,
  reward: rewardsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
