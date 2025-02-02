import {
    ArticleDetailsPageRecommendationsSchema
} from "../types/ArticleDetailsPageRecommendationsSchema";
import {
    ArticleDetailsCommentSchema,
} from "../types/ArticleDetailsCommentSchema";

export interface ArticleDetailsPageSchema {
    comments: ArticleDetailsCommentSchema;
    recommendations: ArticleDetailsPageRecommendationsSchema;
}
