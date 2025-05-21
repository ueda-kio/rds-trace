import { getSession } from "@/lib/server/next/getSession";
import { composeGssp } from "@/lib/server/next/gssp";
import { NextPage } from "@/lib/server/next/next";
import { Top } from "./Top";

const Home: NextPage = () => {
	return <Top />;
};

export const getServerSideProps = composeGssp(async ({ req, res }) => {
	const session = await getSession(req, res);

	return {
		props: {},
	};
});


export default Home;