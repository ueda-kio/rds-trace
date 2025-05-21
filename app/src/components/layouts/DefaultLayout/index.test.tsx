import { setupMockServer } from "@/jest/mockServer";
import { screen, setup, waitFor } from "@/jest/testing-library";
import { noSessionFixture } from "@/server/routers/session/index.fixture";
import { mockSessionQuery } from "@/server/routers/session/index.mock";
import { composeStories } from "@storybook/react";
import * as stories from "./index.stories";

const server = setupMockServer(mockSessionQuery());

const { Login } = composeStories(stories);

test("ログイン済みの場合、ログイン済み用のコンポーネントが描画されること", async () => {
	// Act
	setup(<Login />);
	// Assert
	expect(await screen.findByRole("menubar")).toBeInTheDocument();
	expect(
		screen.queryByRole("link", { name: "ログイン" }),
	).not.toBeInTheDocument();
});

test("未ログインの場合、未ログイン用のコンポーネントが描画されること", async () => {
	// Arrange
	server.use(mockSessionQuery({ stub: noSessionFixture }));
	// Act
	setup(<Login />);
	// Assert
	expect(await screen.findAllByRole("link", { name: "ログイン" })).toHaveLength(
		2,
	); // PC/SPで2つ
	expect(screen.queryByRole("menubar")).not.toBeInTheDocument();
});

test("ログイン判定中の場合、ログインボタン、ナビゲーションが表示されないこと", async () => {
	// Arrange
	server.use(mockSessionQuery({ delay: 1000 }));
	// Act
	setup(<Login />);
	// Assert
	expect(await screen.findByRole("main")).toBeInTheDocument();
	await waitFor(() =>
		expect(screen.queryByRole("link", { name: "ログイン" })).toBeNull(),
	);
	await waitFor(() => expect(screen.queryByRole("menubar")).toBeNull());
});
