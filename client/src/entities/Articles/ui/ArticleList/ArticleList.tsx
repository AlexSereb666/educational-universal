import {memo} from "react";
import {Article, ArticleView} from "../../model/type/articles";
import {ArticleListItem} from "@/entities/Articles/ui/ArticleListItem/ArticleListItem";
import * as cls from './ArticleList.module.scss';
import {ArticleListItemSkeleton} from "@/entities/Articles/ui/ArticleListItemSkeleton/ArticleListItemSkeleton";
import {useScrollToEnd} from "@/shared/lib/hooks/useScrollToEnd/useScrollToEnd";

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

    const handleScroll = useScrollToEnd({
        callback: onScrollToEnd
    });

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
        <div className={cls.articles_list} onScroll={handleScroll}>
            {articles.length > 0
            ? articles.map(renderArticle)
            : null}
            {isLoading && <ArticleListItemSkeleton view={view} />}
        </div>
    )
});
