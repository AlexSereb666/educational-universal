import {EntityState} from "@reduxjs/toolkit";
import {Article} from "entities/Articles";

export interface ArticleDetailsPageRecommendationsSchema extends EntityState<Article, number> {
    isLoading?: boolean;
    error?: string;
}
