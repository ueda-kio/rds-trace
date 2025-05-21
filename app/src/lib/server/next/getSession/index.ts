import { getPublicRuntimeConfig } from "@/env";
import { Session } from "@/lib/server/next/getSession/type";
import nextSession from "next-session";
import { storeFactory } from "./storeFactory";

const { APP_RUNTIME_ENV } = getPublicRuntimeConfig();

const ONE_DAY = 60 * 60 * 24;
const store = storeFactory();

type NextSessionInstance = ReturnType<typeof nextSession>;
// NextSessionInstanceの引数型を取得
type GetSessionArgs = Parameters<NextSessionInstance>;
// NextSessionInstanceの戻り値Promise<T>からTを取得し、cookieとidのみ取得
export type GetSessionReturn = Pick<
	Awaited<ReturnType<NextSessionInstance>>,
	"id"
>;
const session: (
	...args: GetSessionArgs
) => Promise<GetSessionReturn & Session> = nextSession({
	store,
	cookie: {
		// httpOnly default: true
		secure: !["local", "test"].includes(APP_RUNTIME_ENV),
		sameSite: "lax",
		maxAge: ONE_DAY,
		path: "/",
	},
	touchAfter: 0,
});


export const getSession = (
	...args: GetSessionArgs
): Promise<GetSessionReturn & Session> => session(...args);
