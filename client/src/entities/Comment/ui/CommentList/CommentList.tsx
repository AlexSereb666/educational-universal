import {memo} from "react";
import { Comment } from '../../model/types/comment';
import * as cls from "./CommentList.module.scss";
import {CommentCard} from "@/entities/Comment/ui/CommentCard/CommentCard";

interface CommentListProps {
    comments?: Comment[];
    isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
   const { comments, isLoading } = props;

    return (
       <div>
           {comments?.length
               ? comments.map(comment => (
                   <CommentCard comment={comment} />
               ))
               : <div className={cls.noComments}>Комментарии отсутствуют</div>
           }
       </div>
   )
});
