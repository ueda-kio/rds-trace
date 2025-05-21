import { QueryClientConfig } from "@tanstack/react-query";
import { RenderOptions, RenderResult, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Options as UserEventOptions } from "@testing-library/user-event/dist/types/options";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { ReactElement } from "react";
import { Provider } from "./trpc";
export * from "@testing-library/react";

export function setup(
	jsx: ReactElement,
	renderOptions?: RenderOptions,
	userEventOptions?: UserEventOptions,
	queryClientConfig?: QueryClientConfig,
) {
	return {
		user: userEvent.setup(userEventOptions),
		...render(
			<Provider queryClientConfig={queryClientConfig}>{jsx}</Provider>,
			renderOptions,
		),
	} as RenderResult & { user: UserEvent };
}
