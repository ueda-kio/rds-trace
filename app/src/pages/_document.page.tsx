import Document, { Html, Head, Main, NextScript } from "next/document";

export default class AppDocument extends Document {
	render() {
		return (
			<Html lang="ja">
				<Head>
					<link rel="shortcut icon" href="/favicons/favicon.ico" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
