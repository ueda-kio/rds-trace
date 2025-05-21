import { getSession } from "@/lib/server/next/getSession";
import { type inferAsyncReturnType } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";

const sessionSchema = z.object({
	ridCapMemberId: z.string().optional(),
	ridAccessToken: z.string().optional(),
	jobSeeker: z
		.object({
			id: z.string(),
		})
		.optional(),
	chatMessage: z.record(z.string()).optional(),
	destroy: z.function().returns(z.promise(z.void())),
});

export const createContext = async ({
	req,
	res,
}: trpcNext.CreateNextContextOptions) => {
	const session = await getSession(req, res);
	const parsedSession = sessionSchema.safeParse(session);
	if (!parsedSession.success) {
		throw new CreateContextError("sessionのvalidationに失敗しました");
	}

	// ZodでParseした結果を返すと、getSessionが返す戻り値と別のオブジェクトになるため、Zodはスキーマチェックだけとする
	return {
		req,
		res,
		session,
	};
};

export type Context = inferAsyncReturnType<typeof createContext>;

class CreateContextError extends Error {
	name = "CreateContextError";

	constructor(message = "不明なエラーです") {
		super(message);
	}
}
