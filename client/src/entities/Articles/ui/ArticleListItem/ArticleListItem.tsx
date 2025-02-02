import React, {memo} from "react";
import {Article, ArticleView} from "../../model/type/articles";
import * as cls from './ArticleListItem.module.scss';
import imageDefault from 'shared/assets/defaultAvatar.png';
import {formatDate} from "shared/lib/date/formatDate";
import viewIcon from 'shared/assets/eas.png';
import {useNavigate} from "react-router-dom";
import {RoutePathMain} from "shared/config/routerConfig/routerConfig";
import {Button} from "shared/ui/Button/Button";
import {Card} from "shared/ui/Card/Card";

interface ArticleListItemProps {
    article: Article;
    view: ArticleView;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const { article, view } = props;
    const navigate = useNavigate();

    const onClick = () => {
        navigate(RoutePathMain.articles_details + article.id);
    }

    const renderArticleItem = () => {
        if (view === ArticleView.BIG) {
            return (
                <div className={cls.container}>
                    <img className={cls.image} src={imageDefault} alt={'Изображение'}/>
                    <div className={cls.title}>
                        {article.title}
                    </div>
                    <div className={cls.date_view}>
                        <div className={cls.date}>
                            {formatDate(article.createdAt)}
                        </div>
                        <div className={cls.view}>
                            <img className={cls.viewImage} src={viewIcon} alt={'Изображение'}/>
                            {article.view}
                        </div>
                    </div>
                    <div className={cls.types}>
                        {article.types.map(item => item.name).join(', ')}
                    </div>
                    <div className={cls.desc}>
                        {article.blocks.length > 0 && (
                            article.blocks[0].content
                        )}
                    </div>
                    <br/>
                    <Button size={'medium'} onClick={onClick}>
                        Читать дальше...
                    </Button>
                </div>
            )
        }

        if (view === ArticleView.SMALL) {
            return (
                <Card
                    image={imageDefault}
                    title={article.title}
                    date={formatDate(article.createdAt)}
                    views={article.view}
                    types={article.types.map(item => item.name).join(', ')}
                    onClick={onClick}
                />
            )
        }

        return (
            <div>
                Ошибка
            </div>
        )
    }

    return (
        <div className={cls[view]}>
            {renderArticleItem()}
        </div>
    );
});
