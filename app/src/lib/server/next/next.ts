import type { PublicRuntimeConfig } from "@/../.runtime_env/schema";
import {
	InferGetServerSidePropsType,
	NextPage as OriginalNextPage,
} from "next";
import { NextRouter } from "next/dist/shared/lib/router/router";
import {
	NextComponentType,
	AppPropsType as OriginalAppPropsType,
} from "next/dist/shared/lib/utils";
import { Router as OriginalRouter } from "next/router";
import React from "react";
/**
 * Per-Page Layoutsを適用するため、公式型定義を拡張する
 * https://nextjs.org/docs/basic-features/layouts#per-page-layouts
 */
type GetLayout = { getLayout?: React.FC<{ children: React.ReactNode }> };
type GetTitle<P = unknown> = {
	getTitle?: (props: P) => string;
};
type GetAdobeAnalyticsPageName<P = unknown> = {
	getAdobeAnalyticsPageName?: (props: P) => string;
};
type AppPropsType<R extends NextRouter = NextRouter, P = {}> = Omit<
	OriginalAppPropsType<R, P>,
	"Component"
> & {
	Component: NextComponentType &
		GetLayout &
		GetTitle<P> &
		GetAdobeAnalyticsPageName<P>;
	publicRuntimeConfig: PublicRuntimeConfig;
};

/**
 * 各ページの実装には拡張した以下の型定義をつかう
 */
export type AppProps<P = any> = AppPropsType<OriginalRouter, P>;
export type NextPage<P = {}, IP = P> = OriginalNextPage<P, IP> &
		GetLayout &
		GetTitle<P> &
		GetAdobeAnalyticsPageName<P>;

export type InferGSSP<T extends (args: any) => any> =
	InferGetServerSidePropsType<T>;
