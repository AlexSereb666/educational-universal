import {memo} from "react";
import * as cls from "./ArticleListItemSkeleton.module.scss";
import {Skeleton} from "shared/ui/Skeleton/Skeleton";
import {ArticleView} from "../../model/const/articles";

interface ArticleListItemSkeletonProps {
    view: ArticleView;
}

export const ArticleListItemSkeleton = memo((props: ArticleListItemSkeletonProps) => {
    const { view } = props;

    if (view === ArticleView.BIG) {
        return (
            <div className={cls.container}>
                <Skeleton width={'100%'} height={200} />
                <Skeleton width={'100%'} height={200} />
                <Skeleton width={'100%'} height={200} />
            </div>
        )
    } else if (view === ArticleView.SMALL) {
        return (
            <div className={cls.container_2}>
                <Skeleton width={280} height={320}/>
                <Skeleton width={280} height={320}/>
                <Skeleton width={280} height={320}/>
                <Skeleton width={280} height={320}/>
                <Skeleton width={280} height={320}/>
                <Skeleton width={280} height={320}/>
                <Skeleton width={280} height={320}/>
                <Skeleton width={280} height={320}/>
            </div>
        )
    } else {
        return (
            <div className={cls.articles_list}>
                Ошибка отображения загрузки...
            </div>
        )
    }
});
