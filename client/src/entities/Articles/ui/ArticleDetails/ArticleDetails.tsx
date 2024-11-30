import './ArticleDetails.module.scss';
import {memo, useEffect} from "react";
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {articleDetailsReducer} from "../../model/slice/articleDetailsSlice";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {fetchArticleById} from "@/entities/Articles/model/services/fetchArticleById/fetchArticleById";

interface ArticleDetailsProps {
    id: string;
}

const reducer: ReducersList = {
    articleDetails: articleDetailsReducer,
}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const dispatch = useAppDispatch();
    const { id } = props;

    useEffect(() => {
        dispatch(fetchArticleById(id));
    }, [dispatch]);

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
