import {ArticleDetails} from "@/entities/Articles";
import {useParams} from "react-router-dom";
import * as cls from './ArticlesDetailsPage.module.scss';
import {CommentList} from "@/entities/Comment";

const ArticlesDetailsPage = () => {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return;
    }

    return (
        <div className={cls.articles_details_page}>
            <ArticleDetails
                id={id}
            />
            <div className={cls.title_comment}>
                Комментарии
            </div>
            <CommentList

            />
        </div>
    )
};

export default ArticlesDetailsPage;
