export {};
declare global {
	// biome-ignore lint: lint/style/noNamespace
	namespace NodeJS {
		// 環境変数を型安全にするため上書き
		interface ProcessEnv {
			// Node.js build環境(next.jsで定義)
			// https://github.com/vercel/next.js/blob/v12.1.6/packages/next/bin/next.ts#L110
			readonly NODE_ENV: "development" | "production" | "test";
		}
	}
}
