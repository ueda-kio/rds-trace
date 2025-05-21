const baseConfig = require("./env.base.js");

module.exports = {
	serverRuntimeConfig: {
		...baseConfig.serverRuntimeConfig,
		BACKEND_URL: "http://localhost:28080",
		REDIS_HOST: "127.0.0.1",
		REDIS_PORT: "26379",
		REDIS_TOKEN: "",
		JWT_SECRET: "signed_key",
	},
	publicRuntimeConfig: {
		...baseConfig.publicRuntimeConfig,
		API_MOCKING: "enabled",
	},
};
