import { useLiveQuery } from "dexie-react-hooks";
import { FunctionComponent, useMemo } from "react";
import { db } from "../../../database/db";
import { CommentModel } from "../../../models/coment.model";

interface CommentProps {
  comment: CommentModel;
}

const CommentComponent: FunctionComponent<CommentProps> = ({ comment }) => {
  const user = useLiveQuery(() =>
    db.users.where("id").equals(comment.userId).first()
  );

  let ratingJSX: JSX.Element[] = useMemo(() => {
    let mut: JSX.Element[] = [];
    for (let i = 0; i < comment.rating; i++) {
      mut.push(<i className="bi bi-star-fill"></i>);
    }
    for (let i = 0; i < 5 - comment.rating; i++) {
      mut.push(<i className="bi bi-star"></i>);
    }
    return mut;
  }, [comment.rating]);

  return (
    <div>
      <h2>{user ? user.username : ""}</h2>
      <div>{comment.comment}</div>
      {ratingJSX}
    </div>
  );
};

export default CommentComponent;
