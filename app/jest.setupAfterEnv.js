import { Evidently } from "@aws-sdk/client-evidently";
import { mockClient } from "aws-sdk-client-mock";
import "@testing-library/jest-dom";

// Evidentlyで利用しているAPIから不要なリクエストを防ぎ、テストの時間が伸びないようにする
// jest.mock('@/lib/server/aws/fetchFeatureVariation', () => ({
//   fetchFeatureVariation: () => 'A',
// }))

// 参考: https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: jest.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(), // deprecated
		removeListener: jest.fn(), // deprecated
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});

const evidentlyMockClient = mockClient(Evidently);

beforeEach(() => evidentlyMockClient.reset());
