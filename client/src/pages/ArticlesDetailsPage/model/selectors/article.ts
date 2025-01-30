import {createSelector} from "@reduxjs/toolkit";
import {getArticleDeatilsData} from "@/entities/Articles/model/selectors/articleDetails";
import {getUserAuthData} from "@/entities/User";

export const getCanEditArticle = createSelector(
    getArticleDeatilsData,
    getUserAuthData,
    (article, user) => {
        if (!article || !user) {
            return false;
        }

        return article.user.id === user.id;
    }
)
