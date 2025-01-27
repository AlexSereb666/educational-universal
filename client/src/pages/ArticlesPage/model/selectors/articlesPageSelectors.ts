import {StateSchema} from "@/app/providers/StoreProvider";
import {ArticleSortField} from "@/entities/Articles/model/type/articles";

export const getArticlesPageIsLoading = (state: StateSchema) => state?.articlesPage?.isLoading;
export const getArticlesPageError = (state: StateSchema) => state?.articlesPage?.error;
export const getArticlesPageView = (state: StateSchema) => state?.articlesPage?.view;
export const getArticlesPagePageNum = (state: StateSchema) => state?.articlesPage?.page || 1;
export const getArticlesPageLimit = (state: StateSchema) => state?.articlesPage?.limit || 20;
export const getArticlesPageHasMore = (state: StateSchema) => state?.articlesPage?.hasMore;
export const getArticlesPageInited = (state: StateSchema) => state?.articlesPage?._inited;
export const getArticlesPageOrder = (state: StateSchema) => state?.articlesPage?.order ?? 'asc';
export const getArticlesPageSort = (state: StateSchema) => state?.articlesPage?.sort ?? ArticleSortField.CREATED;
export const getArticlesPageSearch = (state: StateSchema) => state?.articlesPage?.search ?? '';
