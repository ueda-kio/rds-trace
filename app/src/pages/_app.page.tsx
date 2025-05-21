import "../styles/reset.css";
import "../styles/common.css";
import "../styles/variables.css";
import type { AppProps } from "@/lib/server/next/next";
import { trpc } from "@/lib/shared/trpc";
import { StatusCodes } from "http-status-codes";
import type { NextPageContext } from "next";
import NextApp from "next/app";
import React from "react";

// 一般のコンポーネントでは利用しないProps。命名が衝突しないために`__`を使用
// GsspErrorからエラーの情報を受け取るためのprops
export type ErrorPageStatusCodeProps = {
		__error?: { statusCode?: StatusCodes };
	};
// ComposeGsspからshouldPutFCMRegistrationTokenを受け取るためのprops
export type ShouldPutFCMRegistrationTokenProps = {
	__shouldPutFCMRegistrationToken?: boolean;
};

require("@/lib/server/api/msw");

function _App({ Component, pageProps }: AppProps) {
	const gsspErrorStatusCode = (pageProps as ErrorPageStatusCodeProps).__error
		?.statusCode;

	const Layout =
		Component.getLayout ??
		((({ children }: { children: React.ReactNode }) => children) as React.FC<{
			children: React.ReactNode;
		}>);

	return (
		<>
			{gsspErrorStatusCode ? (
				<></>
			) : (
				<Layout>
					<Component {...pageProps} />
				</Layout>
			)}
			<div id="snackbar-root" />
			<div id="loader-root" />
		</>
	);
}

const App = trpc.withTRPC(_App);

App.getInitialProps = async (ctx: NextPageContext) => ({
	...(await NextApp.getInitialProps(ctx as any)),
});

export default App;
