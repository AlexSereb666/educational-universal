import './ArticleDetails.module.scss';
import {memo, useEffect} from "react";
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {articleDetailsReducer} from "../../model/slice/articleDetailsSlice";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {fetchArticleById} from "@/entities/Articles/model/services/fetchArticleById/fetchArticleById";
import {useSelector} from "react-redux";
import {
    getArticleDeatilsData,
    getArticleDeatilsError,
    getArticleDeatilsIsLoading
} from "../../model/selectors/articleDetails";
import * as cls from './ArticleDetails.module.scss';
import {Skeleton} from "@/shared/ui/Skeleton/Skeleton";

interface ArticleDetailsProps {
    id: string;
}

const reducer: ReducersList = {
    articleDetails: articleDetailsReducer,
}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const dispatch = useAppDispatch();
    const { id } = props;

    const article = useSelector(getArticleDeatilsData);
    const isLoading = useSelector(getArticleDeatilsIsLoading);
    const error = useSelector(getArticleDeatilsError);

    useEffect(() => {
        dispatch(fetchArticleById(id));
    }, [dispatch, id]);

    let content;

    if (isLoading) {
        content = (
            <div className={cls.isLoading}>
                <Skeleton width={'200px'} height={'200px'} border={'50%'}/>
                <Skeleton width={'500px'} height={'30px'}/>
                <Skeleton width={'100%'} height={'20px'}/>
                <Skeleton width={'100%'} height={'210px'}/>
                <Skeleton width={'100%'} height={'210px'}/>
            </div>
        )
    } else if (error) {
        content = (
            <div className={cls.error}>
                Произошла ошибка при загрузке статьи
            </div>
        )
    } else {
        content = (
            <div>
                Статья {id}
            </div>
        )
    }

    return (
        <DynamicModuleLoader
            reducers={reducer}
            removeAfterUnmount={true}
        >
            <div className={cls.article_details}>
                {content}
            </div>
        </DynamicModuleLoader>
    )
});
