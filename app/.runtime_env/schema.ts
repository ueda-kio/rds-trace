import { z } from "zod";

export const serverRuntimeConfigSchema = z.object({
  // INTERNAL BE
  BACKEND_URL: z.string(),
  REDIS_HOST: z.string().optional(),
  REDIS_PORT: z.string().optional(),
});

export const publicRuntimeConfigSchema = z.object({
  APP_RUNTIME_ENV: z.string(),
  API_MOCKING: z.enum(['external', 'rid-only', 'dev', 'enabled']).optional(),
});

export type ServerRuntimeConfig = z.infer<typeof serverRuntimeConfigSchema>;
export type PublicRuntimeConfig = z.infer<typeof publicRuntimeConfigSchema>;
