import {memo, useState} from "react";
import {Icon} from "../Icon/Icon";
import iconStar from '@/shared/assets/star.svg';
import * as cls from './StarRating.module.scss';
import classNames from 'classnames';

interface StarRatingProps {
    onSelect?: (startsConunt: number) => void;
    size?: number;
    selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps) => {
    const {
        size = 30,
        selectedStars = 0,
        onSelect
    } = props;

    const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    const onHover = (starsCount: number) => () => {
        if (!isSelected) {
            setCurrentStarsCount(starsCount);
        }
    };

    const onLeave = () => {
        if (!isSelected) {
            setCurrentStarsCount(0);
        }
    };

    const onClick = (starsCount: number) => () => {
        if (!isSelected) {
            onSelect?.(starsCount);
            setCurrentStarsCount(starsCount);
            setIsSelected(true);
        }
    };

    return (
        <div>
            {stars.map((starNumber) => (
                <Icon
                    className={classNames(
                        cls.starIcon,
                        {[cls.selected]: isSelected},
                        [currentStarsCount >= starNumber ? cls.hovered : cls.normal]
                    )}
                    Svg={iconStar}
                    key={starNumber}
                    width={size}
                    height={size}
                    onMouseLeave={onLeave}
                    onMouseEnter={onHover(starNumber)}
                    onClick={onClick(starNumber)}
                />
            ))}
        </div>
    )
});
