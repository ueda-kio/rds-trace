import { defaultQueryClientConfig } from "@/lib/shared/trpc";
import type { AppRouter } from "@/server/routers/_app";
import {
	QueryClient,
	QueryClientConfig,
	QueryClientProvider,
} from "@tanstack/react-query";
import { httpLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import type { ReactNode } from "react";
import { useState } from "react";

function getBaseUrl() {
	return "";
}
const trpc = createTRPCReact<AppRouter>();

/**
 * jest用のtrpc.Provider
 * @param children ReactNode
 * @param queryClientConfig '@tanstack/react-query' の QueryClientProvider に渡す設定
 */
export function Provider({
	children,
	queryClientConfig = defaultQueryClientConfig,
}: {
	children: ReactNode;
	queryClientConfig?: QueryClientConfig;
}) {
	const [queryClient] = useState(() => new QueryClient(queryClientConfig));
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpLink({
					url: `${getBaseUrl()}/api/trpc`,
				}),
			],
		}),
	);
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</trpc.Provider>
	);
}
