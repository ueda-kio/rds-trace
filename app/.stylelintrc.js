module.exports = {
	rules: {
		"color-function-notation": "modern",
		"at-rule-empty-line-before": [
			"always",
			{
				except: ["blockless-after-blockless", "first-nested"],
				ignore: ["after-comment"],
				ignoreAtRules: ["else"],
			},
		],
	},
	ignoreFiles: ["**/node_modules/**"],
};
