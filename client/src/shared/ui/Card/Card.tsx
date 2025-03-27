import React, { memo } from 'react';
import classNames from 'classnames';
import * as cls from './Card.module.scss';
import viewIcon from 'shared/assets/icons/Eye.svg';
import { Icon } from '../Icon';
import { Text } from '../Text';

interface CardProps {
    image: string;
    title: string;
    date: string;
    views: number;
    types: string;
    onClick?: () => void;
}

export const Card = memo((props: CardProps) => {
    const { image, title, date, views, types, onClick } = props;

    return (
        <div
            className={classNames(cls.container)}
            onClick={onClick}
        >
            <img
                className={cls.image}
                src={image}
                alt="Изображение"
            />
            <div className={cls.date}>
                <Text>{date}</Text>
            </div>
            <div>
                <Text>{title}</Text>
            </div>
            <div className={cls.view}>
                <Icon
                    Svg={viewIcon}
                    width={20}
                    height={20}
                    className={cls.viewImage}
                />
                <Text>{String(views)}</Text>
            </div>
            <div className={cls.types}>
                <Text>{types}</Text>
            </div>
        </div>
    );
});
