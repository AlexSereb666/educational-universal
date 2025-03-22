import React, { memo, useEffect, useRef } from 'react';
import { Article } from '../../model/type/articles';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import * as cls from './ArticleList.module.scss';
import { ArticleListItemSkeleton } from '../ArticleListItemSkeleton/ArticleListItemSkeleton';
import { useScrollToEnd } from '@/shared/lib/hooks/useScrollToEnd/useScrollToEnd';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
// eslint-disable-next-line alexsereb666-plugin/layer-imports
import { getScrollSavePath, scrollSaveSliceActions } from '@/features/ScrollSave';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StateSchema } from '@/app/providers/StoreProvider';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import { Text } from '@/shared/ui/Text';
import { View } from '@/shared/const/view';

interface ArticleListProps {
    articles: Article[];
    isLoading?: boolean;
    view?: View;
    onScrollToEnd?: () => void;
}

export const ArticleList = memo((props: ArticleListProps) => {
    const { articles, isLoading, view = View.SMALL, onScrollToEnd } = props;

    const listRef = useRef(null);
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const scrollPosition = useSelector((state: StateSchema) =>
        getScrollSavePath(state, pathname),
    );

    useEffect(() => {
        listRef.current.scrollTop = scrollPosition;
    }, [dispatch]);

    const handleScroll = useScrollToEnd({
        callback: onScrollToEnd,
    });

    const saveScroll = useThrottle((e: React.UIEvent<HTMLDivElement>) => {
        dispatch(
            scrollSaveSliceActions.setScrollPosition({
                position: e.currentTarget.scrollTop,
                path: pathname,
            }),
        );
    }, 500);

    const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (onScrollToEnd) {
            saveScroll(e);
            handleScroll(e);
        }
    };

    const renderArticle = (article: Article) => {
        return (
            <ArticleListItem
                key={article.id}
                article={article}
                view={view}
            />
        );
    };

    const notFoundArticle = () => {
        return <Text size={'large'}>Статьи не найдены</Text>;
    };

    return (
        <div
            className={cls.articles_list}
            onScroll={onScroll}
            ref={listRef}
            data-testid="ArticleList"
        >
            {articles.length > 0 ? articles.map(renderArticle) : notFoundArticle()}
            {isLoading && <ArticleListItemSkeleton view={view} />}
        </div>
    );
});
