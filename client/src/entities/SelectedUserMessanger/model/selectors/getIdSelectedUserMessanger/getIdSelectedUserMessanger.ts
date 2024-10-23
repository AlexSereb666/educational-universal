import {StateSchema} from "@/app/providers/StoreProvider";

export const getIdSelectedUserMessanger = (state: StateSchema) => state?.selectedUserMessanger?.id;
