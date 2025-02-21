import {rtkApi} from "@/shared/api/rtkApi";
import {Rating} from "@/entities/Rating";

interface GetArticleRatingArg {
    userId: string;
    articleId: string;
}
interface RateArticleArg extends Rating {
    userId: number;
    articleId: number;
}

const articleRatingsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRating: build.query<Rating, GetArticleRatingArg>({
            query: ({userId, articleId}) => ({
                url: '/article-ratings',
                params: {
                    userId,
                    articleId,
                }
            })
        }),
        rateArticle: build.mutation<void, RateArticleArg>({
            query: (arg) => ({
                url: '/article-ratings/add-rating',
                method: 'POST',
                body: arg,
            })
        })
    })
});

export const useGetArticleRatings = articleRatingsApi.useGetArticleRatingQuery;
export const useRateArticle = articleRatingsApi.useRateArticleMutation;
