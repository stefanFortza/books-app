import { useLiveQuery } from "dexie-react-hooks";
import { FunctionComponent } from "react";
import { db } from "../../database/db";
import { BookModel } from "../../models/book.model";
import CommentComponent from "../commentComponent/commentComponent.component";

interface CommentListProps {
  currentBook: BookModel;
}

const CommentList: FunctionComponent<CommentListProps> = ({ currentBook }) => {
  const { id } = currentBook;
  const comments = useLiveQuery(() =>
    db.comments.where("bookId").equals(id!).toArray()
  );
  console.log(comments);
  return (
    <div>
      {comments?.length &&
        comments.map((comment) => <CommentComponent comment={comment} />)}
    </div>
  );
};

export default CommentList;
