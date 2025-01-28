import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/StoreProvider";
import {ArticlesType} from "@/entities/Articles/model/type/articles";

export const fetchTypesArticle = createAsyncThunk<
    ArticlesType[],
    void,
    ThunkConfig<string>
>(
    'articles/fetchTypesArticle',
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<ArticlesType[]>(`/article-type/all`);

            if (!response.data) {
                throw new Error('Нет данных');
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('Ошибка получения типов статей');
        }
    }
);
