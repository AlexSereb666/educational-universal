import { memo } from 'react';
import { ArticlesBlock } from '../../model/type/articles';
import test from 'shared/assets/defaultAvatar.png';
import * as cls from './ArticleImageBlockComponent.module.scss';
import { Text } from '@/shared/ui/Text';

interface ArticleImageBlockComponentProps {
    block: ArticlesBlock;
}

export const ArticleImageBlockComponent = memo(
    (props: ArticleImageBlockComponentProps) => {
        const { block } = props;

        return (
            <div className={cls.articleImageBlock}>
                <div className={cls.imageContainer}>
                    <img
                        className={cls.img}
                        src={test as string}
                        alt={block.title}
                    />
                </div>
                {block.title && (
                    <div className={cls.articleImageTitle}>
                        <Text>{block.title}</Text>
                    </div>
                )}
            </div>
        );
    },
);
