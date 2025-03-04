import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/StoreProvider";
import {
    getArticlesPageHasMore,
    getArticlesPageIsLoading,
    getArticlesPagePageNum
} from "../../selectors/articlesPageSelectors";
import {articlePageActions} from "../../slices/ArticlePageSlice";
import {fetchArticlesList} from "../fetchArticlesList/fetchArticlesList";

export const fetchNextArticlesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    'articlesPage/fetchNextArticlesPage',
    async (_, thunkApi) => {
        const { getState, dispatch } = thunkApi;
        const hasMore = getArticlesPageHasMore(getState());
        const page = getArticlesPagePageNum(getState());
        const isLoading = getArticlesPageIsLoading(getState());

        if (hasMore && !isLoading) {
            dispatch(articlePageActions.setPage(page + 1));
            dispatch(fetchArticlesList({
                page: page + 1,
            }));
        }
    },
);
