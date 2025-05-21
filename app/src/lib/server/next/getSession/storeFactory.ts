import { getPublicRuntimeConfig, getServerRuntimeConfig } from "@/env";
import Redis, { Cluster } from "ioredis";
import type { SessionStore } from "next-session";
import { SessionData } from "next-session/lib/types";

const config = getServerRuntimeConfig();

/** 1日 */
const ONE_DAY = 60 * 60 * 24;

type Client = Redis | Cluster;

export class RedisStore implements SessionStore {
	constructor(private client: Client) {}

	async get(sid: string): Promise<SessionData | null | undefined> {
		const redisData = await this.client.get(sid);
		if (redisData) {
			const sessionData = JSON.parse(redisData) as SessionData;
			return sessionData;
		}
		return null;
	}

	async set(sid: string, sessionData: SessionData) {
		const res = await this.client.set(sid, JSON.stringify(sessionData));
		await this.touchClient(sid, sessionData);
		if (res !== "OK") {
			throw new Error(`Redis#save failed. id: ${sid}`);
		}
	}

	async destroy(sid: string) {
		await this.client.del(sid);
	}

	async touch(sid: string, sessionData: SessionData) {
		await this.touchClient(sid, sessionData);
	}

	private async touchClient(sid: string, sessionData: SessionData) {
		const ttl = sessionData?.cookie?.maxAge ?? ONE_DAY;
		await this.client.expire(sid, ttl);
	}
}

const localRedisFactory = () =>
	new Redis({
		host: config.REDIS_HOST,
		port: parseInt(config.REDIS_PORT ?? "26379", 10),
	});

export const storeFactory = () => {
	// build時にランタイム環境変数を参照しないようにする
	const { APP_RUNTIME_ENV } = getPublicRuntimeConfig();
	if (!config.REDIS_PORT || APP_RUNTIME_ENV === "test") return undefined;
	return new RedisStore(localRedisFactory());
};
