import {combineReducers, Reducer} from "@reduxjs/toolkit";
import {articleDetailsCommentsSliceReducer} from "../../model/slice/ArticleDetailsCommentsSlice";
import {
    articleDetailsPageRecommendationsReducer
} from "../../model/slice/articleDetailsPageRecommendationsSlice";
import {ArticleDetailsCommentSchema} from "../../model/types/ArticleDetailsCommentSchema";
import {ArticleDetailsPageRecommendationsSchema} from "../../model/types/ArticleDetailsPageRecommendationsSchema";

export const articleDetailsPageReducer = combineReducers({
    comments: articleDetailsCommentsSliceReducer as Reducer<ArticleDetailsCommentSchema>,
    recommendations: articleDetailsPageRecommendationsReducer as Reducer<ArticleDetailsPageRecommendationsSchema>,
});
