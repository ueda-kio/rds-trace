import { pagesPath } from "@/lib/$path";

export const Top: React.FC = () => {
	return (
		<>
			<main>
				<a href={pagesPath.posts.$url().pathname}>Go to posts!</a>
			</main>
		</>
	);
};