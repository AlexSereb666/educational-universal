import {memo, useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "@/shared/ui/Button";
import * as cls from './ArticleDetailsPageHeader.module.scss';
import {useSelector} from "react-redux";
import {getArticleDeatilsData} from "entities/Articles";
import {getCanEditArticle} from "../../model/selectors/article";
import {getRouteArticleEdit, getRouteArticles} from "@/shared/const/router";

export const ArticleDetailsPageHeader = memo(() => {
    const navigate = useNavigate();
    const canEdit = useSelector(getCanEditArticle);
    const article = useSelector(getArticleDeatilsData);

    const onBackToList = useCallback(() => {
        navigate(getRouteArticles());
    }, [navigate]);

    const onEditArticle = useCallback(() => {
        navigate(getRouteArticleEdit(String(article?.id)));
    }, [article, navigate]);

    return (
        <div className={cls.container}>
            <Button onClick={onBackToList} size={'small'}>
                Вернуться к списку
            </Button>
            {canEdit && (
                <Button onClick={onEditArticle} size={'small'}>
                    Редактировать
                </Button>
            )}
        </div>
    )
});
