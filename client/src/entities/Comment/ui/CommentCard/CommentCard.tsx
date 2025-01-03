import {memo} from "react";
import { Comment } from '../../model/types/comment';

interface CommentCardProps {
    comment: Comment;
    isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { comment, isLoading } = props;

    return (
      <div>
          CommentCard
      </div>
  )
});
