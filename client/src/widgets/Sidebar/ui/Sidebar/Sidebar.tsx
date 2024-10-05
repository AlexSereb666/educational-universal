import React, {useMemo, useState} from 'react';
import * as cls from './Sidebar.module.scss';
import {SidebarItemsList} from "@/widgets/Sidebar/model/items";
import {SidebarItem} from "@/widgets/Sidebar/ui/SidebarItem/SidebarItem";

export const Sidebar = () => {
    const [indexActiveItem, setIndexActiveItem] = useState(null);

    const itemsList = useMemo(() => SidebarItemsList.map((item, index) => (
        <SidebarItem
            item={item}
            isActive={indexActiveItem === index ? true : false}
            key={item.path}
            onClick={() => setIndexActiveItem(index)}
        />
    )), [indexActiveItem]);

    return (
        <div className={cls.container}>
            {itemsList}
        </div>
    );
};
