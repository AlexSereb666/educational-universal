import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/StoreProvider";
import {articlePageActions} from "../../../model/slices/ArticlePageSlice";
import {fetchArticlesList} from "../fetchArticlesList/fetchArticlesList";
import {getArticlesPageInited} from "../../../model/selectors/articlesPageSelectors";
import {ArticleSortField} from "@/entities/Articles";
import {SortOrder} from "@/shared/types/order";

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>(
    'articlesPage/initArticlesPage',
    async (searchParams, thunkApi) => {
        const { getState, dispatch } = thunkApi;
        const inited = getArticlesPageInited(getState());

        if (!inited) {
            const orderFromUrl = searchParams.get('order') as SortOrder;
            const sortFromUrl = searchParams.get('sort') as ArticleSortField;
            const searchFromUrl = searchParams.get('search');
            const typeFromUrl = searchParams.get('type');

            if (orderFromUrl) {
                dispatch(articlePageActions.setOrder(orderFromUrl));
            }
            if (searchFromUrl) {
                dispatch(articlePageActions.setSearch(searchFromUrl));
            }
            if (sortFromUrl) {
                dispatch(articlePageActions.setSort(sortFromUrl));
            }
            if (typeFromUrl) {
                dispatch(articlePageActions.setType(typeFromUrl));
            }

            dispatch(articlePageActions.initState());
            dispatch(fetchArticlesList({
                page: 1,
            }));
        }
    },
);
