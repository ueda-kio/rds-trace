import { csApi } from "@/lib/server/api/internal";
import { GetSessionReturn } from "@/lib/server/next/getSession";
import { sessions } from "@/lib/server/next/getSession/index.mock";
import { Session } from "@/lib/server/next/getSession/type";
import { appRouter } from "@/server/routers/_app";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * テスト用のtRPC呼び出しモック
 * @param sessionStatusOrObject sessionsモックのキー or 任意のオブジェクト（セッション検証パターンで利用）
 */
export const createMockCaller = (
	sessionStatusOrObject: keyof typeof sessions | object = "authorized",
) =>
	appRouter.createCaller({
		session: (typeof sessionStatusOrObject === "object"
			? sessionStatusOrObject
			: sessions[sessionStatusOrObject]) as GetSessionReturn & Session,
		csApi,
		// 現状のテストコードでは基本的に参照されない。型検査を抑制するため
		req: {} as NextApiRequest,
		res: {} as NextApiResponse,
	});
