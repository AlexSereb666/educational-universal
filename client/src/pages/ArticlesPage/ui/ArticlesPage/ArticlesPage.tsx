import { typesArticleReducer } from '@/entities/Articles';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articlePageReducer } from '../../model/slices/ArticlePageSlice';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { Split } from '@/shared/ui/Stack';

const reducers: ReducersList = {
    articlesPage: articlePageReducer,
    typesArticle: typesArticleReducer,
};

const ArticlesPage = () => {
    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount={false}
        >
            <div data-testid="ArticlesPage">
                <Split ratio={'3:1'}>
                    <ArticleInfiniteList />
                    <ArticlesPageFilters />
                </Split>
            </div>
        </DynamicModuleLoader>
    );
};

export default ArticlesPage;
