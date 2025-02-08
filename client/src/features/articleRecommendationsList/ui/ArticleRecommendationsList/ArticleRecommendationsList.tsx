import classNames from 'classnames';
import * as cls from './ArticleRecommendationsList.module.scss';
import { memo } from 'react';
import {ArticleList} from "../../../../entities/Articles";
import {useArticleRecommendationsList} from "../../api/ArticleRecommendationsApi";

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const {
        data: articles,
        isLoading,
        error
    } = useArticleRecommendationsList(3);

    if (isLoading || error) {
        return null;
    }

    return (
        <div className={classNames('', {}, [className])}>
            <div className={cls.title_comment}>
                Рекомендуем
            </div>
            <ArticleList
                articles={articles}
            />
        </div>
    );
});
