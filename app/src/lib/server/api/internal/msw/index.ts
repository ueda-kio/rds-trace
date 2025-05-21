import { rest } from "msw";
import { getServerRuntimeConfig } from "@/env";
import { postsFixture } from "./fixture";

const { BACKEND_URL } = getServerRuntimeConfig();
const URL = `${BACKEND_URL}/api/posts`;

export const mockGetPosts = (mockFn?: (args: {}) => void) => {
	return rest.get(URL, (_, res, ctx) => {
		mockFn?.({});
		return res(ctx.json({ ...postsFixture }));
	});
};

// CSのモック関数。BFF用ハンドラー
export const internalHandlers = [mockGetPosts()];
