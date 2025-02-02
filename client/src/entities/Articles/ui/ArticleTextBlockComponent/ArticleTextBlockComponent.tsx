import { memo } from "react";
import { ArticlesBlock } from "../../model/type/articles";
import * as cls from './ArticleTextBlockComponent.module.scss';

interface ArticleTextBlockComponentProps {
    block: ArticlesBlock
}

export const ArticleTextBlockComponent = memo((props: ArticleTextBlockComponentProps) => {
    const { block } = props;

    return (
        <div className={cls.articleTextBlock}>
            {block.title && (
                <div className={cls.articleTitle}>
                    {block.title}
                </div>
            )}
            <div className={cls.articleContent}>
                {block.content}
            </div>
        </div>
    )
});
