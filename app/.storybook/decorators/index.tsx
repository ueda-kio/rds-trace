import type { StoryFn } from "@storybook/react";
import { Provider as TrpcProVider } from "../../src/jest/trpc";

export const TrpcDecorator = (Story: StoryFn) => (
	<TrpcProVider>
		<Story />
	</TrpcProVider>
);
