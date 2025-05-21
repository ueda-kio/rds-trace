import { assertHasError, gsspCtx } from "@/jest/gssp";
import { composeGssp } from "./composeGssp";
import {
	BadRequestGsspError,
	InternalServerGsspError,
	NotFoundGsspError,
} from "./error";
import { StrictCtx } from "./type";

describe("middleware 構成の検証", () => {
	test("middleware は ctx を拡張する", async () => {
		// Arrange
		expect.assertions(2);

		function middleware1<T extends StrictCtx>(ctx: T) {
			return { ...ctx, test: "test" };
		}

		function middleware2<T extends StrictCtx>(ctx: T) {
			return { ...ctx, message: "hello" };
		}

		const gssp = composeGssp(middleware1, middleware2, (ctx) => {
			// Assert
			expect(ctx.test).toBe("test");
			expect(ctx.message).toBe("hello");
			return { props: ctx };
		});
		// Act
		await gssp(gsspCtx());
	});
	test("非同期 middleware は順番に実行される", async () => {
		// Arrange
		expect.assertions(3);
		const spy1 = jest.fn();
		const spy2 = jest.fn();
		const spy3 = jest.fn();
		const duration = 10;
		let elapsedTime = 0;
		const wait = (duration: number) => {
			return new Promise((resolve) => {
				setTimeout(resolve, duration);
			});
		};

		async function middleware1(ctx: StrictCtx) {
			elapsedTime += duration;
			await wait(elapsedTime);
			spy1(elapsedTime);
			return ctx;
		}

		async function middleware2(ctx: StrictCtx) {
			elapsedTime += duration;
			await wait(elapsedTime);
			spy2(elapsedTime);
			return ctx;
		}

		const gssp = composeGssp(middleware1, middleware2, async () => {
			elapsedTime += duration;
			await wait(elapsedTime);
			spy3(elapsedTime);
			return { props: { data: {} } };
		});
		// Act
		await gssp(gsspCtx());
		// Assert
		expect(spy1).toHaveBeenCalledWith(10);
		expect(spy2).toHaveBeenCalledWith(20);
		expect(spy3).toHaveBeenCalledWith(30);
	});
});
describe("middleware で発生する例外の検証", () => {
	const flag = false;

	describe("InternalServerGsspError がスローされた場合", () => {
		function middleware1<T extends StrictCtx>(ctx: T) {
			if (!flag)
				throw new InternalServerGsspError("zodError: レスポンスが不正です");
			return { ...ctx, test: "test" };
		}

		const gssp = composeGssp(middleware1, (ctx) => {
			// この処理に到達すると Error が throw されるためテストは失敗する
			if (!flag) throw new Error();
			return { props: ctx };
		});
		test("500エラーが返る", async () => {
			// Act
			const res = await gssp(gsspCtx());
			// Assert
			assertHasError(res, 500);
		});
	});
	describe("BadRequestGsspError がスローされた場合", () => {
		function middleware1<T extends StrictCtx>(ctx: T) {
			if (!flag) throw new BadRequestGsspError();
			return { ...ctx, test: "test" };
		}

		const gssp = composeGssp(middleware1, (ctx) => {
			// この処理に到達すると Error が throw されるためテストは失敗する
			if (!flag) throw new Error();
			return { props: ctx };
		});
		test("400エラーが返る", async () => {
			// Act
			const res = await gssp(gsspCtx());
			// Assert
			assertHasError(res, 400);
		});
	});
	describe("NotFoundGsspError がスローされた場合", () => {
		function middleware1<T extends StrictCtx>(ctx: T) {
			if (!flag) throw new NotFoundGsspError();
			return { ...ctx, test: "test" };
		}

		const gssp = composeGssp(middleware1, (ctx) => {
			// この処理に到達すると Error が throw されるためテストは失敗する
			if (!flag) throw new Error();
			return { props: ctx };
		});
		test("404エラーが返る", async () => {
			// Act
			const res = await gssp(gsspCtx());
			// Assert
			assertHasError(res, 404);
		});
	});
	describe("GsspError サブクラス以外がスローされた場合", () => {
		function middleware1<T extends StrictCtx>(ctx: T) {
			if (!flag) throw new TypeError();
			return { ...ctx, test: "test" };
		}

		const gssp = composeGssp(middleware1, (ctx) => {
			return { props: ctx };
		});
		test("エラーはリスローされる", async () => {
			expect.assertions(1);
			try {
				// Act
				await gssp(gsspCtx());
			} catch (err) {
				expect(err).toBeInstanceOf(TypeError);
			}
		});
	});
});
