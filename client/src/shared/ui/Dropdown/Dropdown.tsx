import {Fragment, memo, ReactNode, useCallback} from "react";
import {Menu} from "@headlessui/react";
import * as cls from './Dropdown.module.scss';
import classNames from 'classnames';
import {useNavigate} from "react-router-dom";

export interface DropdownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface DropdownProps {
    items: DropdownItem[];
    trigger: ReactNode;
}

export const Dropdown = memo((props: DropdownProps) => {
    const {
        items,
        trigger,
    } = props;

    const navigate = useNavigate();

    const onHref = useCallback((href: string) => {
        navigate(href);
    }, [navigate]);

    return (
        <Menu as="div" className={cls.Dropdown}>
            <Menu.Button className={cls.btn}>
                {trigger}
            </Menu.Button>
            <Menu.Items className={cls.menu}>
                {items.map((item, index) => {
                    const content = ({ active }: {active: boolean}) => (
                        <button
                            disabled={item.disabled}
                            onClick={item.onClick}
                            className={classNames(cls.item, { [cls.active]: active})}
                        >
                            {item.content}
                        </button>
                    );

                    if (item.href) {
                        return (
                            <Menu.Item as="a" onClick={() => onHref(item.href)} disabled={item.disabled} key={index}>
                                {content}
                            </Menu.Item>
                        )
                    }

                    return (
                        <Menu.Item as={Fragment} disabled={item.disabled} key={index}>
                            {content}
                        </Menu.Item>
                    )
                })}
            </Menu.Items>
        </Menu>
    )
});
