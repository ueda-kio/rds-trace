import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { router } from "../trpc";

export const appRouter = router({
	// session: sessionRouter,
});

export type AppRouter = typeof appRouter;
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
