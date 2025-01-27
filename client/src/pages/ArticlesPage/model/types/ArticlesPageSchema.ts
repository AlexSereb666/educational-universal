import {EntityState} from "@reduxjs/toolkit";
import {Article, ArticleView} from '@/entities/Articles';
import {SortOrder} from "@/shared/types/order";
import {ArticleSortField} from "@/entities/Articles/model/type/articles";

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

    _inited?: boolean;
}
