import {rtkApi} from "../../../shared/api/rtkApi";
import {Article} from "../../../entities/Articles";

const articleRecommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticlesRecommendstionsList: build.query<Article[], number>({
            query: (limit) => ({
                url: '/articles',
                params: {
                    limit: limit,
                }
            })
        })
    }),
});

export const useArticleRecommendationsList = articleRecommendationsApi.useGetArticlesRecommendstionsListQuery;
