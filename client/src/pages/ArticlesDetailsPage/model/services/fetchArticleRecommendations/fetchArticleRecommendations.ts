import {createAsyncThunk} from "@reduxjs/toolkit";
import {Article} from "@/entities/Articles";
import {ThunkConfig} from "@/app/providers/StoreProvider";

export const fetchArticleRecommendations = createAsyncThunk<
    Article[],
    void,
    ThunkConfig<string>
>(
    'articlesDetailsPage/fetchArticleRecommendations',
    async (props, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;

        try {
            const response = await extra.api.get<Article[]>(
                `/articles`,
                { params: { limit: 3 }, }
            );

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
