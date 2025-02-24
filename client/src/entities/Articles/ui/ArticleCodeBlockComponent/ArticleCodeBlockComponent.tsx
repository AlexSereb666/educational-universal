import {memo} from "react";
import {ArticlesBlock} from "../../model/type/articles";
import {Code} from "@/shared/ui/Code";
import * as cls from './ArticleCodeBlockComponent.module.scss';

interface ArticleCodeBlockComponentProps {
    block: ArticlesBlock
}

export const ArticleCodeBlockComponent = memo((props: ArticleCodeBlockComponentProps) => {
    const { block } = props;

    return (
        <>
            {block.title && (
                <div className={cls.articleTitle}>
                    {block.title}
                </div>
            )}
            <div className={cls.containerBlockCode}>
                <Code>
                    {block.content}
                </Code>
            </div>
        </>
    )
});
