import {createAsyncThunk} from "@reduxjs/toolkit";
import {Article} from "@/entities/Articles";
import {ThunkConfig} from "@/app/providers/StoreProvider";

export const fetchArticlesList = createAsyncThunk<
    Article[],
    void,
    ThunkConfig<string>
>(
    'articlesPage/fetchArticlesList',
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;
        try {
            const response = await extra.api.get<Article[]>(`/articles`);

            if (!response.data) {
                throw new Error('Нет данных');
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('Ошибка при поиске статей');
        }
    }
);
