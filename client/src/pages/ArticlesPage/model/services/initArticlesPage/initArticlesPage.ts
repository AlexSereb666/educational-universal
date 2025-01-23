import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "@/app/providers/StoreProvider";
import {articlePageActions} from "@/pages/ArticlesPage/model/slices/ArticlePageSlice";
import {fetchArticlesList} from "@/pages/ArticlesPage";
import {getArticlesPageInited} from "@/pages/ArticlesPage/model/selectors/articlesPageSelectors";

export const initArticlesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    'articlesPage/initArticlesPage',
    async (_, thunkApi) => {
        const { getState, dispatch } = thunkApi;
        const inited = getArticlesPageInited(getState());

        if (!inited) {
            dispatch(articlePageActions.initState());
            dispatch(fetchArticlesList({
                page: 1,
            }));
        }
    },
);
