import { pagesPath } from "@/lib/$path";
import { ErrorPageStatusCodeProps } from "@/pages/_app.page";
import { StatusCodes } from "http-status-codes";
import { GetServerSidePropsResult } from "next";

export abstract class GsspError extends Error {
	abstract statusCode: number;
	abstract name: string;
	cause?: unknown;

	protected additionalLogging?(): Record<string, unknown>;

	abstract toGsspResult(): GetServerSidePropsResult<unknown>;
}

export class UnauthorizedGsspError extends GsspError {
	name = "UnauthorizedGsspError";
	statusCode = StatusCodes.UNAUTHORIZED;

	constructor(message = "未認証リクエストです") {
		super(message);
	}

	toGsspResult(): GetServerSidePropsResult<never> {
		return {
			redirect: {
				destination: pagesPath.posts.$url().pathname,
				permanent: false,
			},
		};
	}
}

export class NotFoundGsspError extends GsspError {
	name = "NotFoundGsspError";
	statusCode = StatusCodes.NOT_FOUND;

	constructor(
		message = "リソースが見つかりません",
		public cause?: Error,
	) {
		super(message);
	}

	toGsspResult(): GetServerSidePropsResult<ErrorPageStatusCodeProps> {
		return {
			props: {
				__error: { statusCode: this.statusCode },
			},
		};
	}
}

export class InternalServerGsspError extends GsspError {
	name = "InternalServerGsspError";
	statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
	meta?: unknown; // エラー原因のメタ情報を格納

	constructor(message: string, { meta }: { meta?: unknown } | undefined = {}) {
		super(message);
		this.meta = meta;
	}

	toGsspResult(): GetServerSidePropsResult<ErrorPageStatusCodeProps> {
		return {
			props: {
				__error: { statusCode: this.statusCode },
			},
		};
	}

	protected additionalLogging(): Record<string, unknown> {
		return {
			meta: this.meta,
		};
	}
}

export class BadRequestGsspError extends GsspError {
	name = "BadRequestGsspError";
	statusCode = StatusCodes.BAD_REQUEST;

	constructor(message = "不正なリクエストです") {
		super(message);
	}

	toGsspResult(): GetServerSidePropsResult<ErrorPageStatusCodeProps> {
		return {
			props: {
				__error: { statusCode: this.statusCode },
			},
		};
	}
}
