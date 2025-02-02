import {createAsyncThunk} from "@reduxjs/toolkit";
import {Comment} from 'entities/Comment/model/types/comment';
import {ThunkConfig} from "app/providers/StoreProvider";

export const fetchCommentsByArticleId = createAsyncThunk<
    Comment[],
    string,
    ThunkConfig<string>
>(
    'articleDetails/featchCommentsByArticleId',
    async (articleId, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;
        try {
            const response = await extra.api.get<Comment[]>(`/article-comments/article/${articleId}`);

            if (!response.data) {
                throw new Error('Нет данных');
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('Ошибка при поиске комментариев');
        }
    }
);
