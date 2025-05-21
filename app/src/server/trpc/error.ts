import { TRPC_ERROR_CODE_KEY } from "@trpc/server/rpc";
import { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";

/**
 * StatusCodes を TRPC_ERROR_CODE_KEY にマッピングする関数
 * @param statusCode StatusCodes
 */
export function mapTRPCErrorCodeKeyFromStatusCode(
	statusCode: StatusCodes,
): TRPC_ERROR_CODE_KEY {
	// https://trpc.io/docs/error-handling#error-codes
	switch (statusCode) {
		case 400:
			return "BAD_REQUEST";
		case 401:
			return "UNAUTHORIZED";
		case 403:
			return "FORBIDDEN";
		case 404:
			return "NOT_FOUND";
		case 408:
			return "TIMEOUT";
		case 409:
			return "CONFLICT";
		case 412:
			return "PRECONDITION_FAILED";
		case 413:
			return "PAYLOAD_TOO_LARGE";
		case 405:
			return "METHOD_NOT_SUPPORTED";
		case 429:
			return "TOO_MANY_REQUESTS";
		default:
			return "INTERNAL_SERVER_ERROR";
	}
}

export function mapAxiosErrorToTRPCError(
	label: string,
	err: AxiosError<unknown, unknown>,
) {
	return {
		code: mapTRPCErrorCodeKeyFromStatusCode(err.response?.status || 500),
		message: `${err.response?.statusText || "Internal Server Error"}: ${label}`,
		cause: err,
	};
}
