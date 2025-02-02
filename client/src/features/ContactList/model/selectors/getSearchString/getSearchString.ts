import {StateSchema} from "app/providers/StoreProvider";

export const getSearchString = (state: StateSchema) => state?.search?.search || '';
