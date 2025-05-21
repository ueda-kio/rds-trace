/* istanbul ignore next */
if (process.env.NODE_ENV !== "test") {
	// Jest単体テストでは個別にhandlerをimportすること
	if (typeof window === "undefined") {
		void (async () => {
			const { createServer } = await import("./server");
			const server = createServer();
			server.listen({ onUnhandledRequest: "bypass" });
		})();
	} else {
		// tRPCの先のみをmockしているので、Client側で読み込まれることはない想定
	}
}
export {};
