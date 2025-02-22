import {EntityState} from "@reduxjs/toolkit";
import {Comment} from 'entities/Comment';

export interface ArticleDetailsCommentSchema extends EntityState<Comment, number> {
    isLoading?: boolean;
    error?: string;
}
