import {createAsyncThunk} from "@reduxjs/toolkit";
import {Comment} from "@/entities/Comment";
import {ThunkConfig} from "@/app/providers/StoreProvider";
import {getUserAuthData} from "@/entities/User";
import {getArticleDeatilsData} from "@/entities/Articles";
import {
    fetchCommentsByArticleId
} from "../../services/featchCommentsByArticleId/featchCommentsByArticleId";

export const addCommentForArticle = createAsyncThunk<
    Comment,
    string,
    ThunkConfig<string>
>(
    'articleDetails/addCommentForArticle',
    async (text, thunkApi) => {
        const {
            extra, dispatch, rejectWithValue, getState
        } = thunkApi;

        const userData = getUserAuthData(getState());
        const article = getArticleDeatilsData(getState());

        if (!userData || !text || !article) {
            return rejectWithValue('no data');
        }

        try {
            const response = await extra.api.post<Comment>('/article-comments/add', {
                userId: userData.id,
                articleId: article.id,
                text,
            });

            if (!response.data) {
                throw new Error('Нет данных');
            }

            dispatch(fetchCommentsByArticleId(String(article.id)));

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('Ошибка при отправке комментария');
        }
    }
)