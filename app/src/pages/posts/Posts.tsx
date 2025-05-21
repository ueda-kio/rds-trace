import { Typography } from "@/components/atoms/Typography";
import { useRouter } from "next/router";
import React from "react";
import NextLink from "next/link";
import { PostsProps } from "./index.page";

/** @package */
export const Posts: React.FC<PostsProps> = (props) => {
	const router = useRouter();

	return (
		<>
			<Typography tag="h2" size="title-heading-03" fontWeight="w6">
				Posts Page.
			</Typography>
			<ul>
				{props.postsApi.posts.map((post) => (
					<li key={post.id}>
						<NextLink href={`/posts/${post.id}`}>{post.title}</NextLink>
					</li>
				))}
			</ul>
		</>
	);
};
