import {lazy, Suspense} from "react";
import {ArticleRatingProps} from "./ArticleRating";
import {Loader} from "@/shared/ui/Loader/Loader";

const ArticleRatingsLazy = lazy(() => {
    return import('./ArticleRating');
});

export const ArticleRatingsAsync = (props: ArticleRatingProps) => {
    return (
        <Suspense fallback={<Loader />}>
            <ArticleRatingsLazy {...props} />
        </Suspense>
    );
};
