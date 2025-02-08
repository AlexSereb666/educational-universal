import {ArticleDetails} from "entities/Articles";
import {useParams} from "react-router-dom";
import * as cls from './ArticlesDetailsPage.module.scss';
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {articleDetailsPageReducer} from "../../model/slice";
import {
    ArticleDetailsPageHeader
} from "../ArticleDetailsPageHeader/ArticleDetailsPageHeader";
import {ArticleRecommendationsList} from "../../../../features/articleRecommendationsList";
import {ArticleDetailsComments} from "../ArticleDetailsComments/ArticleDetailsComments";

const reducerList: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
}

const ArticlesDetailsPage = () => {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return;
    }

    return (
        <DynamicModuleLoader reducers={reducerList} removeAfterUnmount>
            <div className={cls.articles_details_page}>
                <ArticleDetailsPageHeader />
                <ArticleDetails id={id} />
                <ArticleRecommendationsList />
                <ArticleDetailsComments id={id} />
            </div>
        </DynamicModuleLoader>
    )
};

export default ArticlesDetailsPage;
