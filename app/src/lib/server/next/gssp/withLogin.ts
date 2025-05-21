import { getSession } from "@/lib/server/next/getSession";
import { StrictCtx } from "./type";

// セッション情報のスキーマ
// export const userSchema = z.object({
// });
export async function withLogin<Ctx extends StrictCtx>(ctx: Ctx) {
	const session = await getSession(ctx.req, ctx.res);

	// セッション情報のスキーマチェック
	// const parsed = userSchema.safeParse(session);
	// if (!parsed.success) {
	// 	throw new UnauthorizedGsspError();
	// }

	// ZodでParseした結果を返すと、getSessionが返す戻り値と別のオブジェクトになるため、Zodはスキーマチェックだけとする
	return {
		...ctx,
		...session,
	};
}
