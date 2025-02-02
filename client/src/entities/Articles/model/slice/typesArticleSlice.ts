import {ArticlesType} from "../type/articles";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TypesArticleSchema} from "../type/typesArticleSchema";
import {fetchTypesArticle} from "../../model/services/fetchTypesArticle/fetchTypesArticle";

const initialState: TypesArticleSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
}

export const typesArticleSlice = createSlice({
    name: 'typesArticle',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTypesArticle.pending, (state: TypesArticleSchema) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchTypesArticle.fulfilled, (state: TypesArticleSchema, action: PayloadAction<ArticlesType[]>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchTypesArticle.rejected, (state: TypesArticleSchema, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export const { actions: typesArticleActions } = typesArticleSlice;
export const { reducer: typesArticleReducer } = typesArticleSlice;
