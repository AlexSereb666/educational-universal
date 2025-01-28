import {ArticlesType} from "@/entities/Articles/model/type/articles";

export interface TypesArticleSchema {
    isLoading: boolean;
    error?: string;
    data?: ArticlesType[]
}
