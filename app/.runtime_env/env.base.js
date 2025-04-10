/**
 * 環境変数
 */
module.exports = {
  serverRuntimeConfig: {
    BACKEND_URL: process.env.BACKEND_URL,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
  },
  publicRuntimeConfig: {
    APP_RUNTIME_ENV: process.env.APP_RUNTIME_ENV,
  },
};
