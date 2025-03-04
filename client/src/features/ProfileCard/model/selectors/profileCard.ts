import {StateSchema} from "@/app/providers/StoreProvider";

export const getProfileCardDataUser = (state: StateSchema) => state?.profileCard?.data;
export const getProfileCardIsLoading = (state: StateSchema) => state?.profileCard?.isLoading;
export const getProfileCardError = (state: StateSchema) => state?.profileCard?.error;
