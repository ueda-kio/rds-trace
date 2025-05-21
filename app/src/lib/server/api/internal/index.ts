import { getServerRuntimeConfig } from "@/env";
import { createApiClient } from "@/lib/server/api/dist/internalApiClient";
import { createAxiosInstance } from "@/lib/server/axios";
import qs from "query-string";

const { BACKEND_URL: BACKEND_URL } = getServerRuntimeConfig();

export const internalApi = createApiClient(BACKEND_URL, {
	axiosInstance: createAxiosInstance({
		axiosConfig: {
			paramsSerializer: (param) => qs.stringify(param),
			timeout: 10000,
		},
	}),
});
