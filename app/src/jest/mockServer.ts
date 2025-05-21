import { StatusCodes } from "http-status-codes";
import { RequestHandler } from "msw";
import { setupServer } from "msw/node";

export function setupMockServer(...handlers: Array<RequestHandler>) {
	const server = setupServer(...handlers);
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());
	return server;
}

export type MockArgs<T> = {
	type?: "fail";
	mockFn?: (args: T) => void;
	failArgs?: { statusCode?: StatusCodes; resBody?: unknown };
};
