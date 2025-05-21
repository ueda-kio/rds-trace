import { mapAxiosErrorToTRPCError } from "@/server/trpc/error";
import { TRPCError } from "@trpc/server";
import axios from "axios";

export async function fetchTRPCData<T>(
	label: string,
	fetcher: () => Promise<T>,
): Promise<T> {
	return fetcher().catch((err: unknown) => {
		if (axios.isAxiosError(err)) {
			throw new TRPCError(mapAxiosErrorToTRPCError(label, err));
		}
		throw err;
	});
}
