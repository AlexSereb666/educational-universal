import {combineReducers, Reducer} from "@reduxjs/toolkit";
import {articleDetailsCommentsSliceReducer} from "@/pages/ArticlesDetailsPage/model/slice/ArticleDetailsCommentsSlice";
import {
    articleDetailsPageRecommendationsReducer
} from "@/pages/ArticlesDetailsPage/model/slice/articleDetailsPageRecommendationsSlice";
import {ArticleDetailsCommentSchema, ArticleDetailsPageRecommendationsSchema} from "@/pages/ArticlesDetailsPage";

export const articleDetailsPageReducer = combineReducers({
    comments: articleDetailsCommentsSliceReducer as Reducer<ArticleDetailsCommentSchema>,
    recommendations: articleDetailsPageRecommendationsReducer as Reducer<ArticleDetailsPageRecommendationsSchema>,
});
