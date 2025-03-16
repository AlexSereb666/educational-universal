import './ArticleDetails.module.scss';
import { memo, useCallback, useEffect } from 'react';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { useSelector } from 'react-redux';
import {
    getArticleDeatilsData,
    getArticleDeatilsError,
    getArticleDeatilsIsLoading,
} from '../../model/selectors/articleDetails';
import * as cls from './ArticleDetails.module.scss';
import { Skeleton } from '@/shared/ui/Skeleton';
import defaultImg from '@/shared/assets/defaultAvatar.png';
import viewImg from '@/shared/assets/icons/Eye.svg';
import calendarImg from '@/shared/assets/icons/Calendar.svg';
import { formatDate } from '@/shared/lib/date/formatDate';
import { ArticlesBlock } from '../../../Articles/model/type/articles';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTypeBlockList } from '../../model/const/articles';
import { Text } from '@/shared/ui/Text';
import { Icon } from '@/shared/ui/Icon';

interface ArticleDetailsProps {
    id: string;
}

const reducer: ReducersList = {
    articleDetails: articleDetailsReducer,
};

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
                <Skeleton
                    width={'200px'}
                    height={'200px'}
                    border={'50%'}
                />
                <Skeleton
                    width={'500px'}
                    height={'30px'}
                />
                <Skeleton
                    width={'100%'}
                    height={'20px'}
                />
                <Skeleton
                    width={'100%'}
                    height={'210px'}
                />
                <Skeleton
                    width={'100%'}
                    height={'210px'}
                />
            </div>
        );
    } else if (error) {
        content = (
            <div className={cls.error}>
                <Text>Произошла ошибка при загрузке статьи</Text>
            </div>
        );
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
                    <div>
                        <Text
                            bold={true}
                            size={'large'}
                        >
                            {article.title}
                        </Text>
                    </div>
                    <div>
                        <Text size={'medium'}>{article.subtitle}</Text>
                    </div>
                    <div className={cls.article_info}>
                        <div className={cls.article_info_item}>
                            <Icon
                                Svg={calendarImg}
                                width={22}
                                height={22}
                                className={cls.article_image_calendar}
                            />
                            <Text>{formatDate(article.createdAt)}</Text>
                        </div>
                        <div className={cls.article_info_item}>
                            <Icon
                                Svg={viewImg}
                                width={25}
                                height={25}
                                className={cls.article_image_view}
                            />
                            <Text>{String(article.view)}</Text>
                        </div>
                    </div>
                </div>
                {article.blocks.map((block: ArticlesBlock) => (
                    <div key={block.id}>{renderBlock(block)}</div>
                ))}
            </>
        );
    }

    return (
        <DynamicModuleLoader
            reducers={reducer}
            removeAfterUnmount={true}
        >
            <div className={cls.article_details}>{content}</div>
        </DynamicModuleLoader>
    );
});
