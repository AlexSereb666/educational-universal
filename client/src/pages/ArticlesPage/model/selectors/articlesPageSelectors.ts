import {State} from "history";
import {StateSchema} from "@/app/providers/StoreProvider";

export const getArticlesPageIsLoading = (state: StateSchema) => state?.articlesPage?.isLoading;
export const getArticlesPageError = (state: StateSchema) => state?.articlesPage?.error;
export const getArticlesPageView = (state: StateSchema) => state?.articlesPage?.view;
export const getArticlesPagePageNum = (state: StateSchema) => state?.articlesPage?.page || 1;
export const getArticlesPageLimit = (state: StateSchema) => state?.articlesPage?.limit || 20;
export const getArticlesPageHasMore = (state: StateSchema) => state?.articlesPage?.hasMore;
export const getArticlesPageInited = (state: StateSchema) => state?.articlesPage?._inited;
