import {memo, useCallback, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {RoutePathMain} from "@/shared/config/routerConfig/routerConfig";
import {Button} from "@/shared/ui/Button/Button";
import * as cls from './ArticleDetailsPageHeader.module.scss';
import {useAuthUser} from "@/shared/lib/hooks/useAuthUser/useAuthUser";
import {useSelector} from "react-redux";
import {getArticleDeatilsData} from "@/entities/Articles/model/selectors/articleDetails";
import {getCanEditArticle} from "@/pages/ArticlesDetailsPage/model/selectors/article";

interface ArticleDetailsPageHeaderProps {}

export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps) => {
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
