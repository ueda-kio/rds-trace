import { ZodiosOptions } from "@zodios/core";
import axios from "axios";

type Args = {
	axiosConfig?: ZodiosOptions["axiosConfig"];
	transformError?: (error: unknown) => unknown;
};
export const createAxiosInstance = ({ axiosConfig, transformError }: Args) => {
	const axiosInstance = axios.create(axiosConfig);
	axiosInstance.interceptors.response.use(
		(response) => response,
		(rawError: unknown) => {
			const error = transformError?.(rawError) ?? rawError;
			return Promise.reject(error);
		},
	);
	return axiosInstance;
};
