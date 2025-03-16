import React, { memo } from 'react';
import { Article } from '../../model/type/articles';
import * as cls from './ArticleListItem.module.scss';
import imageDefault from 'shared/assets/defaultAvatar.png';
import { formatDate } from 'shared/lib/date/formatDate';
import viewIcon from 'shared/assets/icons/Eye.svg';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { ArticleView } from '../../model/const/articles';
import { getRouteArticleDetails } from '@/shared/const/router';
import { Text } from '@/shared/ui/Text';
import { Icon } from '@/shared/ui/Icon';

interface ArticleListItemProps {
    article: Article;
    view: ArticleView;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const { article, view } = props;
    const navigate = useNavigate();

    const onClick = () => {
        navigate(getRouteArticleDetails(String(article.id)));
    };

    const renderArticleItem = () => {
        if (view === ArticleView.BIG) {
            return (
                <div className={cls.container}>
                    <img
                        className={cls.image}
                        src={imageDefault}
                        alt={'Изображение'}
                    />
                    <div className={cls.title}>
                        <Text size={'medium'}>{article.title}</Text>
                    </div>
                    <div className={cls.date_view}>
                        <div>
                            <Text>{formatDate(article.createdAt)}</Text>
                        </div>
                        <div className={cls.view}>
                            <Icon
                                Svg={viewIcon}
                                width={20}
                                height={20}
                                className={cls.viewImage}
                            />
                            <Text>{String(article?.view ?? '')}</Text>
                        </div>
                    </div>
                    <div className={cls.types}>
                        <Text>{article.types.map((item) => item.name).join(', ')}</Text>
                    </div>
                    <div className={cls.desc}>
                        <Text>
                            {article.blocks.length > 0 && article.blocks[0].content}
                        </Text>
                    </div>
                    <br />
                    <Button
                        size={'medium'}
                        onClick={onClick}
                    >
                        Читать дальше...
                    </Button>
                </div>
            );
        }

        if (view === ArticleView.SMALL) {
            return (
                <Card
                    image={imageDefault}
                    title={article.title}
                    date={formatDate(article.createdAt)}
                    views={article.view}
                    types={article.types.map((item) => item.name).join(', ')}
                    onClick={onClick}
                />
            );
        }

        return <div>Ошибка</div>;
    };

    return (
        <div
            className={cls[view]}
            data-testid="ArticleListItem"
        >
            {renderArticleItem()}
        </div>
    );
});
