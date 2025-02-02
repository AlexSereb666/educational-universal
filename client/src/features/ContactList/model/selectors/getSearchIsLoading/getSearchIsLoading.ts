import {StateSchema} from "app/providers/StoreProvider";

export const getSearchIsLoading = (state: StateSchema) => state?.search?.isLoading;
