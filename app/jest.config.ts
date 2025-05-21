import { Config } from "jest";
// https://nextjs.org/docs/testing#setting-up-jest-with-the-rust-compiler
import nextJest from "next/jest";
const createJestConfig = nextJest({
	dir: "./",
});

const customJestConfig: Config = {
	moduleDirectories: ["node_modules", "<rootDir>/"],
	testEnvironment: "jest-environment-jsdom",
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
	},
	setupFiles: ["./jest.setup.js"],
	setupFilesAfterEnv: ["./jest.setupAfterEnv.js"],
	testMatch: ["**/*.test.ts?(x)"],
	coveragePathIgnorePatterns: ["<rootDir>/src/lib/server/api/dist"],
	watchPathIgnorePatterns: ["__reports__"],
	maxConcurrency: 10,
};

const transformIgnorePatternsModules = [
	"nanoid",
	"jose",
	"uuid",
	"sinon@16.1.3",
	"@hookform",
	"query-string",
	"decode-uri-component",
	"split-on-first",
	"filter-obj",
];

export default async () => ({
	...(await createJestConfig(customJestConfig)()),
	transformIgnorePatterns: [
		`node_modules/.pnpm/(?!(${transformIgnorePatternsModules.join("|")}))`,
	],
});
