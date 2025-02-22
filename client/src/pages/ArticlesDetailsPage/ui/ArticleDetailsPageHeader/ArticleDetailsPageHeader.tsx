import {memo, useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {RoutePathMain} from "shared/config/routerConfig";
import {Button} from "shared/ui/Button/Button";
import * as cls from './ArticleDetailsPageHeader.module.scss';
import {useSelector} from "react-redux";
import {getArticleDeatilsData} from "entities/Articles";
import {getCanEditArticle} from "../../model/selectors/article";

export const ArticleDetailsPageHeader = memo(() => {
    const navigate = useNavigate();
    const canEdit = useSelector(getCanEditArticle);
    const article = useSelector(getArticleDeatilsData);

    const onBackToList = useCallback(() => {
        navigate(RoutePathMain.articles);
    }, [navigate]);

    const onEditArticle = useCallback(() => {
        navigate(`${RoutePathMain.articles}/${article?.id}/edit`)
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
