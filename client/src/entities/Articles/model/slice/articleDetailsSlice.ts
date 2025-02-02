import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ArticleDetailsSchema} from "../type/articleDetailsSchema";
import {fetchArticleById} from "../services/fetchArticleById/fetchArticleById";
import {Article} from "../type/articles";

const initialState: ArticleDetailsSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
}

export const articleDetailsSlice = createSlice({
    name: 'articleDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleById.pending, (state: ArticleDetailsSchema) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticleById.fulfilled, (state: ArticleDetailsSchema, action: PayloadAction<Article>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchArticleById.rejected, (state: ArticleDetailsSchema, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export const { actions: articleDetailsActions } = articleDetailsSlice;
export const { reducer: articleDetailsReducer } = articleDetailsSlice;
