import {StateSchema} from "@/app/providers/StoreProvider";

export const getArticleDeatilsData = (state: StateSchema) => state?.articleDetails?.data;
export const getArticleDeatilsIsLoading = (state: StateSchema) => state?.articleDetails?.isLoading;
export const getArticleDeatilsError = (state: StateSchema) => state?.articleDetails?.error;
