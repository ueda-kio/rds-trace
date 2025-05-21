const baseConfig = require("./env.base.js");

module.exports = {
	serverRuntimeConfig: {
		...baseConfig.serverRuntimeConfig,
	},
	publicRuntimeConfig: {
		...baseConfig.publicRuntimeConfig,
		API_MOCKING: "dev",
	},
};
