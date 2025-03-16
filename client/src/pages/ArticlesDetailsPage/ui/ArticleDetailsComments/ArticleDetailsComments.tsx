import { memo, useCallback, useEffect } from 'react';
import * as cls from './ArticleDetailsComments.module.scss';
import { AddCommentForm } from '../../../../features/AddCommentForm';
import { CommentList } from '../../../../entities/Comment';
import { useSelector } from 'react-redux';
import { getArticleComments } from '../../model/slice/ArticleDetailsCommentsSlice';
import {
    getArticleCommentsError,
    getArticleCommentsIsLoading,
} from '../../model/selectors/comments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchCommentsByArticleId } from '../../model/services/featchCommentsByArticleId/featchCommentsByArticleId';
import { Text } from '@/shared/ui/Text';

interface ArticleDetailsCommentsProps {
    id: string;
}

export const ArticleDetailsComments = memo((props: ArticleDetailsCommentsProps) => {
    const { id } = props;

    const dispatch = useAppDispatch();
    const comments = useSelector(getArticleComments.selectAll);
    const isLoading = useSelector(getArticleCommentsIsLoading);
    const error = useSelector(getArticleCommentsError);

    useEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    }, [dispatch]);

    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentForArticle(text));
        },
        [dispatch],
    );

    return (
        <div>
            <div className={cls.title_comment}>
                <Text
                    bold={true}
                    size={'large'}
                >
                    Комментарии
                </Text>
            </div>
            <div className={cls.add_comment}>
                <AddCommentForm onSendComment={onSendComment} />
            </div>
            <CommentList
                isLoading={isLoading}
                comments={comments}
                error={error}
            />
        </div>
    );
});
