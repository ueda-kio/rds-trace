import { GetSessionReturn } from "@/lib/server/next/getSession";
import { Session } from "@/lib/server/next/getSession/type";
import { TRPCError, initTRPC } from "@trpc/server";
import { type Context } from "../context";

const t = initTRPC.context<Context>().create({
	errorFormatter({ shape }) {
		return shape;
	},
});

export const router = t.router;

export const publicProcedure = t.procedure;

type _Session = GetSessionReturn & Session;
type AuthenticatedSession = GetSessionReturn &
	Required<Pick<_Session, "jobSeeker">>;
const isAuthenticated = t.middleware(({ next, ctx }) => {
	if (!ctx.session.jobSeeker?.id) {
		throw new TRPCError({ code: "UNAUTHORIZED" });
	}

	return next({
		// 認証後に存在する項目を必須にダウンキャストする
		ctx: ctx as typeof ctx & { session: AuthenticatedSession },
	});
});

export const authenticatedProcedure = t.procedure.use(isAuthenticated);
