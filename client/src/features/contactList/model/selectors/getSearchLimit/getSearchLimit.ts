import {StateSchema} from "@/app/providers/StoreProvider";

export const getSearchLimit = (state: StateSchema) => state?.search?.limit;
