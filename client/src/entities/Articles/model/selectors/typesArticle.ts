import {StateSchema} from "@/app/providers/StoreProvider";

export const getTypesArticleData = (state: StateSchema) => state?.typesArticle?.data;
