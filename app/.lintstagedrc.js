const path = require("path");

const buildEslintCommand = () => `pnpm check --staged --write`;

const buildStylelintCommand = (fileNames) =>
	`pnpm lint:style ${fileNames.map((f) => path.relative(process.cwd(), f)).join(" ")}`;

module.exports = {
	"*.{ts,tsx}": (fileNames) => [buildEslintCommand(fileNames)],
	"*.css": (fileNames) => [buildStylelintCommand(fileNames)],
};
