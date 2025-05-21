import React, { ReactNode, createElement, forwardRef } from "react";

export type FontSize =
	| "title-heading-01"
	| "title-heading-02"
	| "title-heading-03"
	| "body-01"
	| "body-02"
	| "body-03"
	| "body-number-01"
	| "body-number-02"
	| "body-number-03"
	| "body-number-04"
	| "caption-01"
	| "caption-02"
	| "caption-03"
	| "caption-04";

export type Color =
	| "base-white"
	| "base-gray-01"
	| "base-50"
	| "base-75"
	| "base-100"
	| "base-150"
	| "base-200"
	| "base-300"
	| "base-400"
	| "base-500"
	| "primary-50"
	| "primary-75"
	| "primary-100"
	| "primary-200"
	| "primary-300"
	| "primary-400"
	| "primary-500"
	| "secondary-agent-gradient"
	| "secondary-agent-light"
	| "secondary-agent-medium"
	| "secondary-agent-regular"
	| "secondary-agent-semidark"
	| "secondary-agent-dark"
	| "secondary-direct-gradient"
	| "secondary-direct-light"
	| "secondary-direct-medium"
	| "secondary-direct-regular"
	| "secondary-direct-semidark"
	| "secondary-direct-dark"
	| "secondary-match-gradient"
	| "status-notification-dark"
	| "status-notification"
	| "status-notification-50"
	| "status-success-dark"
	| "status-success"
	| "status-success-50"
	| "status-yellow-dark"
	| "status-yellow"
	| "status-yellow-light"
	| "status-link-visited";

export type FontWeight = "w3" | "w4" | "w6" | "w7";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type OtherTag = "p" | "span" | "a" | "time" | "small" | "em";
type Tag = HeadingTag | OtherTag;
type Element = HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement;

// HeadingElementのProps
type HeadingProps = { tag: HeadingTag };
// その他のElementのProps
type OtherTagProps = { tag: OtherTag };

// 共通テーマ用Props
type ThemeProps = {
	size?: FontSize;
	color?: Color;
	fontWeight?: FontWeight;
};

type Props<T extends Tag> = T extends HeadingTag
	? HeadingProps & ThemeProps & React.ComponentPropsWithRef<T>
	: OtherTagProps & ThemeProps & React.ComponentPropsWithRef<T>;

export const Typography: <T extends Tag>(props: Props<T>) => ReactNode =
	forwardRef<Element, Props<Tag>>(function Typography(
		{
			size = "body-03",
			color = "base-500",
			fontWeight = "w3",
			className,
			...props
		},
		ref,
	) {
		return (
			<TypographyElement
				{...props}
				ref={ref}
				// CSS Module で定義すると冗長になるため style を利用
				style={{
					color: `var(--color-${color})`,
					fontSize: `var(--font-size-${size})`,
					fontWeight: `var(--font-weight-${fontWeight})`,
					fontStyle: "normal",
				}}
				className={className}
			/>
		);
	});

type TypographyProps<T extends Tag> = Omit<Props<T>, "size" | "color">;

const TypographyElement: <T extends Tag>(
	props: TypographyProps<T>,
) => ReactNode = forwardRef<Element, TypographyProps<Tag>>(
	function TypographyElement({ tag, ...props }, ref) {
		return createElement(tag, {
			ref,
			...props,
		});
	},
);
