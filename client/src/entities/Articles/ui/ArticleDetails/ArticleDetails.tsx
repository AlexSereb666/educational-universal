import './ArticleDetails.module.scss';
import {memo} from "react";
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {articleDetailsReducer} from "../../model/slice/articleDetailsSlice";

const reducer: ReducersList = {
    articleDetails: articleDetailsReducer,
}

export const ArticleDetails = memo(() => {
    return (
        <DynamicModuleLoader
            reducers={reducer}
            removeAfterUnmount={true}
        >
            <div>
                ArticleDetails
            </div>
        </DynamicModuleLoader>
    )
});
