import { z } from "zod";

export const serverRuntimeConfigSchema = z.object({
	// INTERNAL BE
	BACKEND_URL: z.string(),
});

export const publicRuntimeConfigSchema = z.object({
	API_MOCKING: z.enum(["external", "rid-only", "dev", "enabled"]).optional(),
});

export type ServerRuntimeConfig = z.infer<typeof serverRuntimeConfigSchema>;
export type PublicRuntimeConfig = z.infer<typeof publicRuntimeConfigSchema>;
