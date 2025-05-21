const baseConfig = require("./env.local.js");

module.exports = {
	serverRuntimeConfig: {
		...baseConfig.serverRuntimeConfig,
		BACKEND_URL: "http://rds-api-internal:28080",
		REDIS_HOST: "redis",
		REDIS_PORT: "6379",
	},
	publicRuntimeConfig: {
		...baseConfig.publicRuntimeConfig,
		API_MOCKING: "external",
	},
};
