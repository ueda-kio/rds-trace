import { Session } from "@/lib/server/next/getSession/type";
import { StatusCodes } from "http-status-codes";
import type { GetServerSidePropsContext } from "next";
import {
	RequestOptions,
	ResponseOptions,
	createRequest,
	createResponse,
} from "node-mocks-http";
import { z } from "zod";

export const gsspCtx = (
	args: {
		requestOptions?: RequestOptions;
		responseOptions?: ResponseOptions;
		ctx?: Partial<GetServerSidePropsContext>;
	} = {},
	mockCapMemberId: string | null = "CAP123456789",
	mockJSID: string | null = "abcd1234",
): any => {
	const session: Session | {} =
		mockJSID === null
			? {}
			: {
					ridCapMemberId: mockCapMemberId,
					jobSeeker: {
						id: mockJSID,
					},
				};
	return {
		req: createRequest({
			...args.requestOptions,
			// req.sessionを作成しておくとnext-session内でそのまま利用される
			// https://github.com/hoangvvo/next-session/blob/v4.0.4/src/session.ts#L56
			session,
		}),
		res: createResponse(args.responseOptions),
		params: undefined,
		query: {},
		resolvedUrl: "",
		...args.ctx,
	};
};

class AssertionError extends Error {}

const propsSchema = z.object({
	props: z.object({ __error: z.undefined() }),
});
// GSSPの戻り値の型RはTagged Unionではないため、アサーションの結果を絞り込むために`Extract<T, { props: unknown }>`が必要
export function assertHasSuccessProps<T>(
	res: T,
): asserts res is Extract<T, { props: unknown }> & z.infer<typeof propsSchema> {
	const result = propsSchema.safeParse(res);
	if (!result.success) {
		throw new AssertionError(`Invalid props: ${result.error.toString()}`);
	}
}

const errorSchema = (code: StatusCodes) =>
	z.object({
		props: z.object({ __error: z.object({ statusCode: z.literal(code) }) }),
	});
export function assertHasError(
	res: unknown,
	code: StatusCodes,
): asserts res is z.infer<ReturnType<typeof errorSchema>> {
	const result = errorSchema(code).safeParse(res);
	if (!result.success) {
		throw new AssertionError(`Invalid error: ${result.error.toString()}`);
	}
}

const redirectSchema = z.object({
	redirect: z.object({ destination: z.string() }),
});
export function assertHasRedirect(
	res: unknown,
): asserts res is z.infer<typeof redirectSchema> {
	const result = redirectSchema.safeParse(res);
	if (!result.success) {
		throw new AssertionError(`Invalid redirect: ${result.error.toString()}`);
	}
}
