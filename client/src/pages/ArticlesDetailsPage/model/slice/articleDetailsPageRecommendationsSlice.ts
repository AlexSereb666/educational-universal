import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {Article} from "@/entities/Articles";
import {StateSchema} from "@/app/providers/StoreProvider";
import {ArticleDetailsPageRecommendationsSchema} from "@/pages/ArticlesDetailsPage";
import {
    fetchArticleRecommendations
} from "@/pages/ArticlesDetailsPage/model/services/fetchArticleRecommendations/fetchArticleRecommendations";

const recommendationsAdapter = createEntityAdapter<Article, number>({
    selectId: (article) => article.id,
});

export const getArticleRecommendations = recommendationsAdapter.getSelectors<StateSchema>(
    (state) => state.articleDetailsPage?.recommendations || recommendationsAdapter.getInitialState(),
);

const articleDetailsPageRecommendationsSlice = createSlice({
    name: "articleDetailsPageRecommendationsSlice",
    initialState: recommendationsAdapter.getInitialState<ArticleDetailsPageRecommendationsSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleRecommendations.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticleRecommendations.fulfilled, (state, action) => {
                state.isLoading = false;
                recommendationsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchArticleRecommendations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export const {
    reducer: articleDetailsPageRecommendationsReducer
} = articleDetailsPageRecommendationsSlice;
