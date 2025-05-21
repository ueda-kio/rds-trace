import { Meta, StoryObj } from "@storybook/react";
import { Typography } from ".";

const config: Meta<typeof Typography> = {
	component: Typography,
	args: {
		size: "body-03",
		children: <>Typography</>,
	},
};
export default config;

type Story = StoryObj<typeof Typography>;

export const H1: Story = {
	args: {
		tag: "h1",
	},
};