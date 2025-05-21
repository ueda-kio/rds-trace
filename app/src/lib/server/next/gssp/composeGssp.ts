import { GetServerSidePropsContext, Redirect } from "next";
import { GsspError } from "./error";
import { StrictCtx } from "./type";

type Ctx = StrictCtx;
type R<T> = { props: T } | { redirect: Redirect };
type MaybePromise<T extends Ctx> = Promise<T> | T;

export function composeGssp<T>(
	f1: (ctx: Ctx) => Promise<R<T>> | R<T>,
): (ctx: Ctx) => Promise<R<T>>;

export function composeGssp<A extends Ctx, T>(
	f1: (ctx: Ctx) => MaybePromise<A>,
	f2: (ctx: A) => Promise<R<T>> | R<T>,
): (ctx: A) => Promise<R<T>>;

export function composeGssp<A extends Ctx, B extends A, T>(
	f1: (ctx: Ctx) => MaybePromise<A>,
	f2: (ctx: A) => MaybePromise<B>,
	f3: (ctx: B) => Promise<R<T>> | R<T>,
): (ctx: B) => Promise<R<T>>;

export function composeGssp<A extends Ctx, B extends A, C extends B, T>(
	f1: (ctx: Ctx) => MaybePromise<A>,
	f2: (ctx: A) => MaybePromise<B>,
	f3: (ctx: B) => MaybePromise<C>,
	f4: (ctx: C) => Promise<R<T>> | R<T>,
): (ctx: C) => Promise<R<T>>;

export function composeGssp<
	A extends Ctx,
	B extends A,
	C extends B,
	D extends C,
	T,
>(
	f1: (ctx: Ctx) => MaybePromise<A>,
	f2: (ctx: A) => MaybePromise<B>,
	f3: (ctx: B) => MaybePromise<C>,
	f4: (ctx: C) => MaybePromise<D>,
	f5: (ctx: D) => Promise<R<T>> | R<T>,
): (ctx: D) => Promise<R<T>>;

export function composeGssp<
	A extends Ctx,
	B extends A,
	C extends B,
	D extends C,
	E extends D,
	T,
>(
	f1: (ctx: Ctx) => MaybePromise<A>,
	f2: (ctx: A) => MaybePromise<B>,
	f3: (ctx: B) => MaybePromise<C>,
	f4: (ctx: C) => MaybePromise<D>,
	f5: (ctx: D) => MaybePromise<E>,
	f6: (ctx: E) => Promise<R<T>> | R<T>,
): (ctx: E) => Promise<R<T>>;

export function composeGssp(...fns: Array<any>) {
	return async function (ctx: GetServerSidePropsContext) {
		try {
			const gsspResult = await fns.reduce(
				(current, next) => current.then((c: unknown) => next(c)),
				Promise.resolve({ ...ctx }),
			);
			if (!gsspResult.props) {
				return gsspResult;
			}
			return {
				...gsspResult,
				props: {
					...gsspResult.props,
				},
			};
		} catch (err) {
			if (err instanceof GsspError) {
				const gsspResult = err.toGsspResult();
				if ("props" in gsspResult && typeof gsspResult.props === "object") {
					return {
						...gsspResult,
						props: {
							...gsspResult.props,
						},
					};
				}

				return gsspResult;
			}

			throw err;
		}
	};
}
