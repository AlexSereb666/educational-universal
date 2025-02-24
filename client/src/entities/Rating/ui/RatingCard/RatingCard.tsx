import {memo, useCallback, useState} from "react";
import classNames from "classnames";
import * as cls from './RatingCard.module.scss';
import {VStack} from "@/shared/ui/Stack";
import {StarRating} from "@/shared/ui/StarRating";
import {Modal} from "@/shared/ui/Modal";
import {Text} from "@/shared/ui/Text";
import {TextArea} from "@/shared/ui/TextArea";
import {Button} from "@/shared/ui/Button";

interface RatingCardProps {
    className?: string;
    title?: string;
    score?: number;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
}

export const RatingCard = memo((props: RatingCardProps) => {
    const {
        className,
        title,
        score = 0,
        hasFeedback,
        feedbackTitle,
        onAccept,
        onCancel,
    } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(score);
    const [feedback, setFeedback] = useState('');

    const onSelectStars = useCallback((selectedStarsCount: number) => {
        setStarsCount(selectedStarsCount);
        if (hasFeedback) {
            setIsModalOpen(true);
        } else {
            onAccept?.(selectedStarsCount);
        }
    }, [hasFeedback, onAccept]);

    const acceptHandle = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [feedback, starsCount, onAccept]);

    const cancelHandle = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    return (
        <div className={classNames(cls.RatingCard, {}, [className])}>
            <VStack align={'center'} gap={'8'} >
                <Text size={'medium'} bold>
                    {starsCount ? 'Спасибо за оценку' : title}
                </Text>
                <StarRating selectedStars={starsCount} size={40} onSelect={onSelectStars} />
            </VStack>
            <Modal
                className={cls.modal}
                isOpen={isModalOpen}
                onClose={cancelHandle}
                lazy
            >
                <VStack max gap={'32'} align={'center'}>
                    <Text size={'medium'} bold>
                        {feedbackTitle}
                    </Text>
                    <TextArea
                        value={feedback}
                        onChange={setFeedback}
                        placeholder={'Напишите отзыв...'}
                        size={'medium'}
                    />
                    <VStack max align={'end'}>
                        <Button size={'medium'} onClick={acceptHandle}>
                            Отправить
                        </Button>
                    </VStack>
                </VStack>
            </Modal>
        </div>
    )
});
