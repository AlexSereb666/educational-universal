import './ArticleDetails.module.scss';
import {memo, useCallback, useEffect} from "react";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {articleDetailsReducer} from "../../model/slice/articleDetailsSlice";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {fetchArticleById} from "../../model/services/fetchArticleById/fetchArticleById";
import {useSelector} from "react-redux";
import {
    getArticleDeatilsData,
    getArticleDeatilsError,
    getArticleDeatilsIsLoading
} from "../../model/selectors/articleDetails";
import * as cls from './ArticleDetails.module.scss';
import {Skeleton} from "shared/ui/Skeleton/Skeleton";
import defaultImg from 'shared/assets/defaultAvatar.png';
import viewImg from 'shared/assets/eas.png';
import calendarImg from 'shared/assets/calendar.png';
import {formatDate} from "shared/lib/date/formatDate";
import {ArticlesBlock, ArticleTypeBlockList} from "../../../Articles/model/type/articles";
import {ArticleCodeBlockComponent} from "../ArticleCodeBlockComponent/ArticleCodeBlockComponent";
import {ArticleTextBlockComponent} from "../ArticleTextBlockComponent/ArticleTextBlockComponent";
import {ArticleImageBlockComponent} from "../ArticleImageBlockComponent/ArticleImageBlockComponent";

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

    const renderBlock = useCallback((block: ArticlesBlock) => {
        switch (block.typeBlock.name) {
            case ArticleTypeBlockList.CODE:
                return <ArticleCodeBlockComponent block={block} />;
            case ArticleTypeBlockList.TEXT:
                return <ArticleTextBlockComponent block={block} />;
            case ArticleTypeBlockList.IMAGE:
                return <ArticleImageBlockComponent block={block} />;
            default:
                return null;
        }
    }, []);

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
    } else if (article) {
        content = (
            <>
                <div className={cls.article_image_wrapper}>
                    <img
                        className={cls.article_image}
                        src={defaultImg as string}
                        alt={'Нет изображения'}
                    />
                </div>
                <div className={cls.article_text}>
                    <div className={cls.article_title}>{article.title}</div>
                    <div className={cls.article_subtitle}>{article.subtitle}</div>
                    <div className={cls.article_info}>
                        <div className={cls.article_info_item}>
                            <img
                                className={cls.article_image_calendar}
                                src={calendarImg as string}
                                alt={'Нет изображения'}
                            />
                            <span>{formatDate(article.createdAt)}</span>
                        </div>
                        <div className={cls.article_info_item}>
                            <img
                                className={cls.article_image_view}
                                src={viewImg as string}
                                alt={'Нет изображения'}
                            />
                            <span>{article.view}</span>
                        </div>
                    </div>
                </div>
                {article.blocks.map((block: ArticlesBlock) => (
                    <div key={block.id}>
                        {renderBlock(block)}
                    </div>
                ))}
            </>
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
