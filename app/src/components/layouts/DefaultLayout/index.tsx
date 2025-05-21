import Head from "next/head";
import React from "react";
import styles from "../Layout.module.css";
import { LayoutProps } from "../types/layout";

/** 共通ヘッダー・フッターを利用する画面用 */
export const DefaultLayout = ({
	bgColor = "base-white",
	maxWidth = "580px",
	indexing,
}: LayoutProps) => {
	return function DefaultLayout({ children }: { children: React.ReactNode }) {
		return (
			<>
				{!indexing && (
					<Head>
						<meta name="robots" content="noindex" />
					</Head>
				)}
				<div
					className={styles.wrapper}
					style={{
						backgroundColor: `var(--color-${bgColor})`,
					}}
				>
					<main
						style={{
							maxWidth,
						}}
						className={styles.main}
					>
						{children}
					</main>
				</div>
			</>
		);
	};
};
