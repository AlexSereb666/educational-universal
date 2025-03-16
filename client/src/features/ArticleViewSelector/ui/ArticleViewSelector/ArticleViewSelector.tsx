import { memo } from 'react';
import listIcon from 'shared/assets/icons/UnorderedListOutlined.svg';
import tileIcon from 'shared/assets/icons/ViewTile.svg';
import * as cls from './ArticleViewSelector.module.scss';
import { ArticleView } from '@/entities/Articles';
import { Icon } from '@/shared/ui/Icon';

interface ArticleViewSelectorProps {
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
    {
        view: ArticleView.BIG,
        icon: listIcon,
    },
    {
        view: ArticleView.SMALL,
        icon: tileIcon,
    },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const { view, onViewClick } = props;

    const onClick = (newView: ArticleView) => {
        onViewClick?.(newView);
    };

    return (
        <div className={cls.container}>
            {viewTypes.map((item) => (
                <button
                    onClick={() => onClick(item.view)}
                    key={item.view}
                    className={`${cls.btn} ${view === item.view ? cls.selected : ''}`}
                >
                    <Icon
                        Svg={item.icon}
                        width={24}
                        height={24}
                        className={cls.icon}
                    />
                </button>
            ))}
        </div>
    );
});
