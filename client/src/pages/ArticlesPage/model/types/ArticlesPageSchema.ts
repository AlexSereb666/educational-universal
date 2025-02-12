import {EntityState} from "@reduxjs/toolkit";
import {Article, ArticleSortField, ArticleView} from 'entities/Articles';
import {SortOrder} from "shared/types/order";

export interface ArticlesPageSchema extends EntityState<Article, number> {
    isLoading?: boolean;
    error?: string;

    page: number;
    limit?: number;
    hasMore: boolean;

    view: ArticleView;
    order: SortOrder;
    sort: ArticleSortField;
    search: string;
    type: string | number;

    _inited?: boolean;
}
