import { getSession } from "@/lib/server/next/getSession";
import { composeGssp, withLogin } from "@/lib/server/next/gssp";
import { InferGSSP, NextPage } from "@/lib/server/next/next";
import { Posts } from "./Posts";
import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import { internalApi } from "@/lib/server/api/internal";

/** @package */
export type PostsProps = NonNullable<InferGSSP<typeof getServerSideProps>>;

export const getServerSideProps = composeGssp(
	withLogin,
	async ({ req, res }) => {
		const session = await getSession(req, res);
		const postsApi = await internalApi.get("/api/posts");

		return {
			props: {
				postsApi,
			},
		};
	},
);

const PostsPage: NextPage<PostsProps> = Posts;
PostsPage.getLayout = DefaultLayout({
	bgColor: "primary-50",
	indexing: false,
});
PostsPage.getTitle = () => "Posts";

export default PostsPage;
