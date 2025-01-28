import {createAsyncThunk} from "@reduxjs/toolkit";
import {Article} from "@/entities/Articles";
import {ThunkConfig} from "@/app/providers/StoreProvider";
import {
    getArticlesPageLimit,
    getArticlesPageOrder, getArticlesPageSearch,
    getArticlesPageSort, getArticlesPageType
} from "@/pages/ArticlesPage/model/selectors/articlesPageSelectors";
import {addQueryParams} from "@/shared/lib/url/addQueryParams/addQueryParams";

interface FetchArticlesListProps {
    page?: number;
    replace?: boolean;
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
        const sort = getArticlesPageSort(getState());
        const order = getArticlesPageOrder(getState());
        const search = getArticlesPageSearch(getState());
        const type = getArticlesPageType(getState()) as string;

        try {
            addQueryParams({
               sort, order, search, type
            });
            const response = await extra.api.get<Article[]>(
                `/articles`,
                { params: { page, limit, sort, order, search, type }, }
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
