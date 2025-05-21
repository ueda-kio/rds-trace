const baseConfig = require("./env.base.js");

module.exports = {
	serverRuntimeConfig: {
		...baseConfig.serverRuntimeConfig,
		BACKEND_URL: "http://localhost:28080",
	},
	publicRuntimeConfig: {
		...baseConfig.publicRuntimeConfig,
	},
};
