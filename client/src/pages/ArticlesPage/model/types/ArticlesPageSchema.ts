import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleSortField } from 'entities/Articles';
import { SortOrder } from 'shared/types/order';
import { View } from '@/shared/const/view';

export interface ArticlesPageSchema extends EntityState<Article, number> {
    isLoading?: boolean;
    error?: string;

    page: number;
    limit?: number;
    hasMore: boolean;

    view: View;
    order: SortOrder;
    sort: ArticleSortField;
    search: string;
    type: string | number;

    _inited?: boolean;
}
