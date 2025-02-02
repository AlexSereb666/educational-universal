import React, { memo } from "react";
import classNames from 'classnames';
import * as cls from './Card.module.scss';
import viewIcon from 'shared/assets/eas.png';

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
        <div className={classNames(cls.container)} onClick={onClick}>
            <img className={cls.image} src={image} alt="Изображение" />
            <div className={cls.date}>{date}</div>
            <div className={cls.title}>{title}</div>
            <div className={cls.view}>
                <img className={cls.viewImage} src={viewIcon} alt="Просмотры" />
                {views}
            </div>
            <div className={cls.types}>{types}</div>
        </div>
    );
});
