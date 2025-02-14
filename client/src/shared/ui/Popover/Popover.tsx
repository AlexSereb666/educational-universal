import { Popover as HPopover } from '@headlessui/react'
import {memo, ReactNode} from "react";
import * as cls from './Popover.module.scss';

interface PopoverProps {
    trigger: ReactNode;
    children: ReactNode;
}

export const Popover = memo((props: PopoverProps) => {
    const {
        trigger,
        children,
    } = props;

    return (
        <HPopover className={cls.popover}>
            <HPopover.Button className={cls.trigger}>
                {trigger}
            </HPopover.Button>
            <HPopover.Panel className={cls.panel}>
                {children}
            </HPopover.Panel>
        </HPopover>
    )
});
