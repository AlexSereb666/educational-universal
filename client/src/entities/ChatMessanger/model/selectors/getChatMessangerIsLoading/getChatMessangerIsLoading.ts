import {StateSchema} from "@/app/providers/StoreProvider";

export const getChatMessangerIsLoading = (state: StateSchema) => state?.chatMessanger?.isLoading;
