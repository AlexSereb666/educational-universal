import {rtkApi} from "../../../shared/api/rtkApi";

const articleRecommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticlesRecommendstionsList: build.query({
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
