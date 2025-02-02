import React, {memo, useEffect, useRef} from "react";
import {Article, ArticleView} from "../../model/type/articles";
import {ArticleListItem} from "../ArticleListItem/ArticleListItem";
import * as cls from './ArticleList.module.scss';
import {ArticleListItemSkeleton} from "../ArticleListItemSkeleton/ArticleListItemSkeleton";
import {useScrollToEnd} from "shared/lib/hooks/useScrollToEnd/useScrollToEnd";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {getScrollSavePath, scrollSaveSliceActions} from "features/ScrollSave";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {StateSchema} from "app/providers/StoreProvider";
import {useThrottle} from "shared/lib/hooks/useThrottle/useThrottle";

interface ArticleListProps {
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
    onScrollToEnd?: () => void;
}

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        articles,
        isLoading,
        view = ArticleView.SMALL,
        onScrollToEnd
    } = props;

    const listRef = useRef(null);
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const scrollPosition = useSelector(
        (state: StateSchema) => getScrollSavePath(state, pathname)
    );

    useEffect(() => {
        listRef.current.scrollTop = scrollPosition;
    }, [dispatch]);

    const handleScroll = useScrollToEnd({
        callback: onScrollToEnd
    });

    const saveScroll = useThrottle((e: React.UIEvent<HTMLDivElement>) => {
        dispatch(scrollSaveSliceActions.setScrollPosition({
            position: e.currentTarget.scrollTop,
            path: pathname
        }));
    }, 500);

    const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (onScrollToEnd) {
            saveScroll(e);
            handleScroll(e);
        }
    }

    const renderArticle = (article: Article) => {
        return (
            <ArticleListItem
                key={article.id}
                article={article}
                view={view}
            />
        )
    }

    return (
        <div className={cls.articles_list} onScroll={onScroll} ref={listRef}>
            {articles.length > 0
            ? articles.map(renderArticle)
            : null}
            {isLoading && <ArticleListItemSkeleton view={view} />}
        </div>
    )
});
