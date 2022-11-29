import { Collection, IndexableType } from "dexie";
import { useLiveQuery } from "dexie-react-hooks";
import { FunctionComponent } from "react";
import { db } from "../../../database/db";
import { BookModel } from "../../../models/book.model";
import { CommentModel } from "../../../models/coment.model";
import { UserModel } from "../../../models/user.model";
import { joinCommentsWithUsers } from "../../../utils/joins";
import CommentComponent from "../commentComponent/commentComponent.component";

interface CommentListProps {
  currentBook: BookModel;
}

const CommentList: FunctionComponent<CommentListProps> = ({ currentBook }) => {
  const { id } = currentBook;
  const commentsAndUsers = useLiveQuery(async () => {
    const comments = await db.comments.where("bookId").equals(id!).toArray();
    if (comments) {
      return joinCommentsWithUsers(comments);
    }
    return;
  });
  console.log(commentsAndUsers);

  return (
    <div>
      {commentsAndUsers &&
        commentsAndUsers.map(({ comment, user }, i) => (
          <CommentComponent key={comment.id} comment={comment} user={user} />
        ))}
    </div>
  );
};

export default CommentList;
