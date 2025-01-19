import {memo} from "react";
import {Article, ArticleView} from "../../model/type/articles";
import {ArticleListItem} from "@/entities/Articles/ui/ArticleListItem/ArticleListItem";
import * as cls from './ArticleList.module.scss';
import {ArticleListItemSkeleton} from "@/entities/Articles/ui/ArticleListItemSkeleton/ArticleListItemSkeleton";

interface ArticleListProps {
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
}

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        articles,
        isLoading,
        view = ArticleView.SMALL
    } = props;

    if (isLoading) {
        return (
            <ArticleListItemSkeleton view={view} />
        )
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
        <div className={cls.articles_list}>
            {articles.length > 0
            ? articles.map(renderArticle)
            : null}
        </div>
    )
});
