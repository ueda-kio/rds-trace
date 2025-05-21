import path from "path";
import { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
	// https://github.com/storybookjs/storybook/issues/15336#issuecomment-906809203
	typescript: {
		reactDocgen: false,
	},
	features: {},
	stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: ["@storybook/addon-essentials", "storycap"],
	staticDirs: ["../public"],
	env: (config) => ({
		...config,
		APP_RUNTIME_ENV: "story",
		BUILD_ID: "abcd1234",
	}),
	framework: {
		name: "@storybook/nextjs",
		options: {},
	},
	docs: {
		autodocs: true,
	},
	webpack: (options) => {
		return {
			...options,
			resolve: {
				...options.resolve,
				alias: {
					...options.resolve?.alias,
					"@": path.resolve(__dirname, "../src"),
					".storybook": path.resolve(__dirname),
				},
			},
		};
	},
};

export default config;
