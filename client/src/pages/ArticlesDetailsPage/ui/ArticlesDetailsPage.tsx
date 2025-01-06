import {ArticleDetails} from "@/entities/Articles";
import {useParams} from "react-router-dom";
import * as cls from './ArticlesDetailsPage.module.scss';
import {CommentList} from "@/entities/Comment";
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {articleDetailsCommentsSliceReducer, getArticleComments} from "../model/slice/ArticleDetailsCommentsSlice";
import {useSelector} from "react-redux";
import {
    getArticleCommentsError,
    getArticleCommentsIsLoading
} from "../../ArticlesDetailsPage/model/selectors/comments";
import {useCallback, useEffect} from "react";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
    fetchCommentsByArticleId
} from "@/pages/ArticlesDetailsPage/model/services/featchCommentsByArticleId/featchCommentsByArticleId";
import {AddCommentForm} from "@/features/AddCommentForm";
import {
    addCommentForArticle
} from "@/pages/ArticlesDetailsPage/model/services/addCommentForArticle/addCommentForArticle";

const reducerList: ReducersList = {
    articleDetailsComments: articleDetailsCommentsSliceReducer
}

const ArticlesDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const comments = useSelector(getArticleComments.selectAll);
    const isLoading = useSelector(getArticleCommentsIsLoading);
    const error = useSelector(getArticleCommentsError);

    if (!id) {
        return;
    }

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    }, [dispatch])

    return (
        <DynamicModuleLoader reducers={reducerList} removeAfterUnmount>
            <div className={cls.articles_details_page}>
                <ArticleDetails
                    id={id}
                />
                <div className={cls.title_comment}>
                    Комментарии
                </div>
                <div className={cls.add_comment}>
                    <AddCommentForm
                        onSendComment={onSendComment}
                    />
                </div>
                <CommentList
                    isLoading={isLoading}
                    comments={comments}
                    error={error}
                />
            </div>
        </DynamicModuleLoader>
    )
};

export default ArticlesDetailsPage;
