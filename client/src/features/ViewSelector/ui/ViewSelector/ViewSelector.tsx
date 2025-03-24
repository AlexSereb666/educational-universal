import { memo } from 'react';
import listIcon from 'shared/assets/icons/UnorderedListOutlined.svg';
import tileIcon from 'shared/assets/icons/ViewTile.svg';
import * as cls from './ViewSelector.module.scss';
import { Icon } from '@/shared/ui/Icon';
import { View } from '@/shared/const/view';

interface ViewSelectorProps {
    view: View;
    onViewClick?: (view: View) => void;
}

const viewTypes = [
    {
        view: View.LIST,
        icon: listIcon,
    },
    {
        view: View.GRID,
        icon: tileIcon,
    },
];

export const ViewSelector = memo((props: ViewSelectorProps) => {
    const { view, onViewClick } = props;

    const onClick = (newView: View) => {
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
