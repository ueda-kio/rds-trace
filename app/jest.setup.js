import "whatwg-fetch";
import {
	publicRuntimeConfig,
	serverRuntimeConfig,
} from "./.runtime_env/env.test";

jest.setTimeout(120000);

jest.mock("next/dist/client/router", () => require("next-router-mock"));
jest.mock("next/dist/shared/lib/router-context.shared-runtime", () => {
	const { createContext } = require("react");
	const router = require("next-router-mock").default;
	const RouterContext = createContext(router);
	return { RouterContext };
});

const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

jest.mock("./src/env", () => ({
	getPublicRuntimeConfig: () => publicRuntimeConfig,
	getServerRuntimeConfig: () => serverRuntimeConfig,
}));

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

global.structuredClone = jest.fn((val) => {
	return JSON.parse(JSON.stringify(val));
});

global.IntersectionObserver = class {
	constructor() {}
	observe = jest.fn().mockImplementation(() => {
		return null;
	});
	disconnect = jest.fn().mockImplementation(() => {
		return null;
	});
	unobserve = jest.fn().mockImplementation(() => {
		return null;
	});
};

global.ResizeObserver = class {
	constructor() {}
	observe = jest.fn().mockImplementation(() => {
		return null;
	});
	disconnect = jest.fn().mockImplementation(() => {
		return null;
	});
	unobserve = jest.fn().mockImplementation(() => {
		return null;
	});
};
