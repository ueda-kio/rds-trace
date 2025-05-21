import { QueryClientConfig } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { type AppRouter } from "../../server/routers/_app";

function getBaseUrl() {
	return "";
}

/**
 * TanStack Query の初期設定
 * テストで異なる指定が必要な場合、src/jest/trpc.tsx で調整すること
 */
export const defaultQueryClientConfig: QueryClientConfig = {
	defaultOptions: {
		// https://tanstack.com/query/v4/docs/react/reference/useQuery
		queries: { retry: false, refetchOnWindowFocus: false },
		mutations: { retry: false },
	},
};

export const trpc = createTRPCNext<AppRouter>({
	config() {
		return {
			queryClientConfig: defaultQueryClientConfig,
			links: [
				loggerLink({
					enabled: (opts) =>
						process.env.NODE_ENV === "development" ||
						(opts.direction === "down" && opts.result instanceof Error),
				}),
				httpBatchLink({
					url: `${getBaseUrl()}/api/trpc`,
				}),
			],
		};
	},
});
