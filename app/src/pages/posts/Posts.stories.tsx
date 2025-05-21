import { Meta, StoryObj } from "@storybook/react";
import { Posts } from "./Posts";

const config: Meta<typeof Posts> = {
	parameters: {
		layout: "fullscreen",
		localStorage: {},
		nextjs: { router: { asPath: `/posts` } },
	},
	component: Posts,
	args: {},
};
export default config;

type Story = StoryObj<typeof Posts>;

export const PostsTab: Story = {
	name: "おすすめ",
};
