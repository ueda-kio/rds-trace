const localConfig = require("./env.local.js");

module.exports = {
	serverRuntimeConfig: {
		...localConfig.serverRuntimeConfig,
		RID_LOGIN_URL: "/debug/rikupon/login",
		RID_LOGOUT_URL: "/debug/rikupon/logout",
		RID_API_ROOT_URL:
			"https://dev277-api-gate.apf.e.recruit.co.jp/api/gate/oidc",
	},
	publicRuntimeConfig: {
		...localConfig.publicRuntimeConfig,
		APP_RUNTIME_ENV: "test",
	},
};
