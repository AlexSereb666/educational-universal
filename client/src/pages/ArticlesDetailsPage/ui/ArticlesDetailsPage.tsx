import {ArticleDetails} from "@/entities/Articles";
import {useParams} from "react-router-dom";

const ArticlesDetailsPage = () => {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return;
    }

    return (
        <div>
            <ArticleDetails
                id={id}
            />
        </div>
    )
};

export default ArticlesDetailsPage;
