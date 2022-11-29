import { useLiveQuery } from "dexie-react-hooks";
import { FunctionComponent, useMemo } from "react";
import { db } from "../../../database/db";
import { CommentModel } from "../../../models/coment.model";
import { UserModel } from "../../../models/user.model";

interface CommentProps {
  comment: CommentModel;
  user: UserModel;
}

const CommentComponent: FunctionComponent<CommentProps> = ({
  comment,
  user,
}) => {
  let ratingJSX: JSX.Element[] = useMemo(() => {
    let mut: JSX.Element[] = [];
    for (let i = 0; i < comment.rating; i++) {
      mut.push(<i key={i} className="bi bi-star-fill"></i>);
    }
    for (let i = comment.rating; i < 5; i++) {
      mut.push(<i key={i} className="bi bi-star"></i>);
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
