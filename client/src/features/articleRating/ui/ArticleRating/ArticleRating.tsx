import {memo, useCallback} from "react";
import {RatingCard} from "@/entities/Rating";
import {useGetArticleRatings, useRateArticle} from "../../api/articleRatingsApi";
import {useAuthUser} from "@/shared/lib/hooks/useAuthUser/useAuthUser";
import {Skeleton} from "@/shared/ui/Skeleton/Skeleton";

export interface ArticleRatingProps {
    className?: string;
    articleId: string;
}

const ArticleRating = memo((props: ArticleRatingProps) => {
    const {
        className,
        articleId,
    } = props;

    const user = useAuthUser();

    const { data, isLoading } = useGetArticleRatings({
        userId: String(user.id),
        articleId
    });
    const [rateArticleMutation] = useRateArticle();

    const handleRateArticle = useCallback((starsCount: number, feedback?: string) => {
        try {
            rateArticleMutation({
                userId: user.id,
                articleId: Number(articleId),
                score: starsCount,
                feedback,
            })
        } catch (e) {
            console.log(e);
        }
    }, [user, articleId, rateArticleMutation]);

    const onCancel = useCallback((starsCount: number) => {
        handleRateArticle(starsCount);
    }, []);

    const onAccept = useCallback((starsCount: number, feedback?: string) => {
        handleRateArticle(starsCount, feedback);
    }, []);

    if (isLoading) {
        return (
            <Skeleton width={'100%'} height={100} />
        )
    }

    return (
        <RatingCard
            className={className}
            title={'Вам понравилась статья?'}
            score={data?.score}
            onCancel={onCancel}
            onAccept={onAccept}
            hasFeedback
        />
    )
});

export default ArticleRating;
