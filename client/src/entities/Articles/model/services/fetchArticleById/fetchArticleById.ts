import {createAsyncThunk} from "@reduxjs/toolkit";
import {Article} from "@/entities/Articles";
import {ThunkConfig} from "@/app/providers/StoreProvider";

export const  fetchArticleById = createAsyncThunk<
    Article,
    string,
    ThunkConfig<string>
>(
    'articles/fetchArticleById',
    async (id, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<Article>(`/articles/${id}`);

            if (!response.data) {
                throw new Error('Нет данных');
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('Ошибка открытия статьи');
        }
    }
);
