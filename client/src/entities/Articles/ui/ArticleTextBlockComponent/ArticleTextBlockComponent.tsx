import { memo } from 'react';
import { ArticlesBlock } from '../../model/type/articles';
import * as cls from './ArticleTextBlockComponent.module.scss';
import { Text } from '@/shared/ui/Text';

interface ArticleTextBlockComponentProps {
    block: ArticlesBlock;
}

export const ArticleTextBlockComponent = memo((props: ArticleTextBlockComponentProps) => {
    const { block } = props;

    return (
        <div className={cls.articleTextBlock}>
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
            <div className={cls.articleContent}>
                <Text>{block.content}</Text>
            </div>
        </div>
    );
});
