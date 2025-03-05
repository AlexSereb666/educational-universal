import {memo} from "react";
import { Comment } from '../../model/types/comment';
import avatarDeafult from 'shared/assets/defaultAvatar.png';
import {formatDate} from "shared/lib/date/formatDate";
import * as cls from './CommentCard.module.scss';

interface CommentCardProps {
    comment: Comment;
    isLoading?: boolean;
    error?: string;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { comment, isLoading, error } = props;

    return (
      <div className={cls.container} data-testid='CommentCard'>
          <div className={cls.header}>
              <div className={cls.title}>
                  <img src={avatarDeafult as string} alt={'Аватар'} className={cls.avatar} />
                  <span>
                      {comment.user.login}
                  </span>
              </div>
              <div className={cls.date}>
                  <span>
                      {formatDate(comment.date)}
                  </span>
              </div>
          </div>
          <div className={cls.body_comment}>
              <span>
                  {comment.text}
              </span>
          </div>
      </div>
    )
});
