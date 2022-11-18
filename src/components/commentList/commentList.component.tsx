import { useLiveQuery } from "dexie-react-hooks";
import { FunctionComponent } from "react";
import { db } from "../../database/db";

interface CommentListProps {
  bookId: number;
}

const CommentList: FunctionComponent<CommentListProps> = ({ bookId }) => {
  const comments = useLiveQuery(() =>
    db.comments.where("bookId").equals(bookId).toArray()
  );
  console.log(comments);
  return (
    <div>
      {comments?.length && comments.map((com) => <div>{com.text}</div>)}
    </div>
  );
};

export default CommentList;
