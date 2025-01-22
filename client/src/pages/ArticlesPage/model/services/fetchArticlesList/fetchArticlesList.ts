import {createAsyncThunk} from "@reduxjs/toolkit";
import {Article} from "@/entities/Articles";
import {ThunkConfig} from "@/app/providers/StoreProvider";
import {getArticlesPageLimit} from "@/pages/ArticlesPage/model/selectors/articlesPageSelectors";

interface FetchArticlesListProps {
    page?: number;
}

export const fetchArticlesList = createAsyncThunk<
    Article[],
    FetchArticlesListProps,
    ThunkConfig<string>
>(
    'articlesPage/fetchArticlesList',
    async (props, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const { page = 1 } = props;
        const limit = getArticlesPageLimit(getState());

        try {
            const response = await extra.api.get<Article[]>(
                `/articles`,
                { params: { page, limit } }
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
