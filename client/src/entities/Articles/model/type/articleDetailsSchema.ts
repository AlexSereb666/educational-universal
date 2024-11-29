import {Article} from "../type/articles";

export interface ArticleDetailsSchema {
    isLoading: boolean;
    error?: string;
    data?: Article
}
