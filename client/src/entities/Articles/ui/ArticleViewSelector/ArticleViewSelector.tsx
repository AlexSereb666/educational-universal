import {memo, useEffect} from "react";
import {ArticleView} from "../../model/type/articles";
import listIcon from 'shared/assets/list.png';
import tileIcon from 'shared/assets/tile.png';
import * as cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
    {
        view: ArticleView.BIG,
        icon: listIcon
    },
    {
        view: ArticleView.SMALL,
        icon: tileIcon
    }
]

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const {
        view,
        onViewClick,
    } = props;

    const onClick = (newView: ArticleView) => {
        onViewClick?.(newView);
    }

    return (
        <div className={cls.container}>
            {viewTypes.map((item) => (
                <button
                    onClick={() => onClick(item.view)}
                    key={item.view}
                    className={`${cls.btn} ${view === item.view ? cls.selected : ''}`}
                >
                    <img src={item.icon} alt={'Иконка'} className={cls.icon} />
                </button>
            ))}
        </div>
    )
});
