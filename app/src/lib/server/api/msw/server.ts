import { getPublicRuntimeConfig } from "@/env";
import { setupServer } from "msw/node";
import { internalHandlers } from "../internal/msw";

export const createServer = () => {
	const { API_MOCKING } = getPublicRuntimeConfig();
	if (API_MOCKING === "dev") {
		return setupServer(...internalHandlers);
	}
	return setupServer(...internalHandlers);
};
