import {ArticlesType} from "../type/articles";

export interface TypesArticleSchema {
    isLoading: boolean;
    error?: string;
    data?: ArticlesType[]
}
