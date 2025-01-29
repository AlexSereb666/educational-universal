import {
    ArticleDetailsCommentSchema,
    ArticleDetailsPageRecommendationsSchema
} from "@/pages/ArticlesDetailsPage";

export interface ArticleDetailsPageSchema {
    comments: ArticleDetailsCommentSchema;
    recommendations: ArticleDetailsPageRecommendationsSchema;
}
