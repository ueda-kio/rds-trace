const appEnv = normalizeEnvName(process.env.APP_RUNTIME_ENV || "local");
const { serverRuntimeConfig, publicRuntimeConfig } = require(
	`./.runtime_env/env.${appEnv}.js`,
);

/** @type {import('next').NextConfig} */
const config = {
	compiler: {},
	experimental: {
		scrollRestoration: true,
	},
	reactStrictMode: process.env.NODE_ENV === "production",
	pageExtensions: ["page.tsx", "api.ts"],
	serverRuntimeConfig,
	publicRuntimeConfig,
	headers() {
		return [
			{
				source: "/(.*?)",
				headers: [
					{
						key: "accept-ch",
						value:
							"Sec-CH-UA, Sec-CH-UA-Mobile, Sec-CH-UA-Platform, Sec-CH-UA-Platform-Version",
					},
				],
			},
			{
				source: "/api/:path*",
				headers: [
					{
						key: "Cache-Control",
						value: "private, no-cache, no-store, max-age=0, must-revalidate",
					},
				],
			},
		];
	},
};

module.exports = config;

/**
 * appEnvより.runtime_envの参照先を決定する
 *
 * @param appEnv {string} 環境名
 */
function normalizeEnvName(appEnv) {
	if (appEnv.slice(0, 3) === "dev") return "dev";
	return appEnv;
}
