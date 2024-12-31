import {memo} from "react";
import {ArticlesBlock} from "@/entities/Articles/model/type/articles";
import test from '@/shared/assets/defaultAvatar.png';
import * as cls from './ArticleImageBlockComponent.module.scss';

interface ArticleImageBlockComponentProps {
    block: ArticlesBlock
}

export const ArticleImageBlockComponent = memo((props: ArticleImageBlockComponentProps) => {
    const { block } = props;

    return (
        <div className={cls.articleImageBlock}>
            <div className={cls.imageContainer}>
                <img className={cls.img} src={test as string} alt={block.title} />
            </div>
            {block.title && (
                <div className={cls.articleImageTitle}>
                    {block.title}
                </div>
            )}
        </div>
    )
});
