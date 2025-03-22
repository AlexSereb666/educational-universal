export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails';

export type { Article } from './model/type/articles';

export type { ArticleDetailsSchema } from './model/type/articleDetailsSchema';

export { ArticleList } from './ui/ArticleList/ArticleList';

export type { TypesArticleSchema } from './model/type/typesArticleSchema';

export { fetchTypesArticle } from './model/services/fetchTypesArticle/fetchTypesArticle';

export {
    typesArticleActions,
    typesArticleReducer,
} from './model/slice/typesArticleSlice';

export { getTypesArticleData } from './model/selectors/typesArticle';

export { ArticleSortField, ArticleTypeBlockList } from './model/const/articles';

export { getArticleDeatilsData } from './model/selectors/articleDetails';
