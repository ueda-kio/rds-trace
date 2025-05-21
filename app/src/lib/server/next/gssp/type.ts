import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

export type StrictCtx = Omit<GetServerSidePropsContext, "params">;
export type GsspResult<T> = GetServerSidePropsResult<T>;
