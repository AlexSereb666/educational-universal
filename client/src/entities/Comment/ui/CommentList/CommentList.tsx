import {memo} from "react";
import { Comment } from '../../model/types/comment';
import * as cls from "./CommentList.module.scss";
import {CommentCard} from "../CommentCard/CommentCard";

interface CommentListProps {
    comments?: Comment[];
    isLoading?: boolean;
    error?: string;
}

export const CommentList = memo((props: CommentListProps) => {
   const { comments, isLoading, error } = props;

    return (
       <div>
           {comments?.length
               ? comments.map(comment => (
                   <CommentCard
                       key={comment.id}
                       comment={comment}
                       isLoading={isLoading}
                       error={error}
                   />
               ))
               : <div className={cls.noComments}>Комментарии отсутствуют</div>
           }
       </div>
   )
});
