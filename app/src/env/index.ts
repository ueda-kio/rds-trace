import {
	PublicRuntimeConfig,
	ServerRuntimeConfig,
	publicRuntimeConfigSchema,
	serverRuntimeConfigSchema,
} from "@/../.runtime_env/schema";
import getConfig from "next/config";

let publicRuntimeConfigStore: PublicRuntimeConfig | undefined;
export function getPublicRuntimeConfig() {
	if (publicRuntimeConfigStore) return publicRuntimeConfigStore;
	const { publicRuntimeConfig } = getConfig() as {
		publicRuntimeConfig: unknown;
	};
	publicRuntimeConfigStore =
		publicRuntimeConfigSchema.parse(publicRuntimeConfig);
	return publicRuntimeConfigStore;
}

let serverRuntimeConfigStore: ServerRuntimeConfig | undefined;
export function getServerRuntimeConfig() {
	if (process.env.NODE_ENV !== "test" && typeof window !== "undefined") {
		throw new Error("getServerRuntimeConfig is server only");
	}
	if (serverRuntimeConfigStore) return serverRuntimeConfigStore;
	const { serverRuntimeConfig } = getConfig() as {
		serverRuntimeConfig: unknown;
	};
	serverRuntimeConfigStore =
		serverRuntimeConfigSchema.parse(serverRuntimeConfig);
	return serverRuntimeConfigStore;
}
