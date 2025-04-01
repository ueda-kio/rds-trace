const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const hostname = "localhost";
const port = 23000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ hostname, port });
const handle = app.getRequestHandler();

// reset memory report
const fs = require("fs");
fs.writeFile("memory-reports.log", "", (err) => {});

app.prepare().then(() => {
	createServer(async (req, res) => {
		try {
			// Be sure to pass `true` as the second argument to `url.parse`.
			// This tells it to parse the query portion of the URL.
			const parsedUrl = parse(req.url, true);
			await handle(req, res, parsedUrl);
		} catch (err) {
			console.error("Error occurred handling", req.url, err);
			res.statusCode = 500;
			res.end("internal server error");
		}
	})
		.once("error", (err) => {
			console.error(err);
			process.exit(1);
		})
		.listen(port, () => {
			console.log(`> Ready on http://${hostname}:${port}`);
		});
});
