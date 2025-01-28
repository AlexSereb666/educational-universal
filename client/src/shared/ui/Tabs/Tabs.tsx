import { memo, ReactNode, FC } from "react";
import classNames from "classnames";
import * as cls from "./Tabs.module.scss";

export interface TabItem {
    value: string | number;
    content: ReactNode;
}

interface TabsProps {
    tabs: TabItem[];
    value: string | number;
    onTabClick: (tab: TabItem) => void;
    maxElements?: number;
    size?: 'small' | 'medium' | 'large';
}

export const Tabs: FC<TabsProps> = memo((props: TabsProps) => {
    const {
        tabs,
        value,
        onTabClick,
        maxElements = 10,
        size = 'medium',
    } = props;

    const visibleTabs = tabs.slice(0, maxElements);

    return (
        <div className={classNames(cls.container)}>
            {visibleTabs.map((tab) => (
                <div
                    key={tab.value}
                    className={classNames(cls.tab, cls[size], {
                        [cls.active]: tab.value == value,
                    })}
                    onClick={() => onTabClick(tab)}
                >
                    {tab.content}
                </div>
            ))}
        </div>
    );
});
