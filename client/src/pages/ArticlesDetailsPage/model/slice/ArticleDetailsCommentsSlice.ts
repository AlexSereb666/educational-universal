import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Comment} from 'entities/Comment/model/types/comment';
import {StateSchema} from "app/providers/StoreProvider";
import {ArticleDetailsCommentSchema} from "../types/ArticleDetailsCommentSchema";
import {
    fetchCommentsByArticleId
} from "../../model/services/featchCommentsByArticleId/featchCommentsByArticleId";

const commentsAdapter = createEntityAdapter<Comment, number>({
    selectId: (comment) => comment.id,
});

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
    (state) => state.articleDetailsPage?.comments || commentsAdapter.getInitialState()
)

const articleDetailsCommentsSlice = createSlice({
    name: "articleDetailsCommentsSlice",
    initialState: commentsAdapter.getInitialState<ArticleDetailsCommentSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentsByArticleId.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchCommentsByArticleId.fulfilled, (
                state,
                action: PayloadAction<Comment[]>,
            ) => {
                state.isLoading = false;
                commentsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export const { reducer: articleDetailsCommentsSliceReducer } = articleDetailsCommentsSlice;
