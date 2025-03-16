import classNames from 'classnames';
import * as cls from './ArticleRecommendationsList.module.scss';
import { memo } from 'react';
import { ArticleList } from '../../../../entities/Articles';
import { useArticleRecommendationsList } from '../../api/ArticleRecommendationsApi';
import { Text } from '@/shared/ui/Text';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo(
    (props: ArticleRecommendationsListProps) => {
        const { className } = props;
        const { data: articles, isLoading, error } = useArticleRecommendationsList(2);

        if (isLoading || error) {
            return null;
        }

        return (
            <div
                className={classNames('', {}, [className])}
                data-testid="ArticleRecommendationsList"
            >
                <div className={cls.title_comment}>
                    <Text
                        bold={true}
                        size={'large'}
                    >
                        Рекомендуем
                    </Text>
                </div>
                <ArticleList articles={articles} />
            </div>
        );
    },
);
