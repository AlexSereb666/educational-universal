import { memo } from 'react';
import { ArticlesBlock } from '../../model/type/articles';
import { Code } from '@/shared/ui/Code';
import * as cls from './ArticleCodeBlockComponent.module.scss';
import { Text } from '@/shared/ui/Text';

interface ArticleCodeBlockComponentProps {
    block: ArticlesBlock;
}

export const ArticleCodeBlockComponent = memo((props: ArticleCodeBlockComponentProps) => {
    const { block } = props;

    return (
        <>
            {block.title && (
                <div className={cls.articleTitle}>
                    <Text
                        bold={true}
                        size={'medium'}
                    >
                        {block.title}
                    </Text>
                </div>
            )}
            <div className={cls.containerBlockCode}>
                <Code>{block.content}</Code>
            </div>
        </>
    );
});
