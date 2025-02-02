import {StateSchema} from "app/providers/StoreProvider";

export const getSearchOffset = (state: StateSchema) => state?.search?.offset;
