import { FunctionComponent, useMemo } from "react";
import { CommentModel } from "../../models/coment.model";

interface CommentProps {
  comment: CommentModel;
}

const CommentComponent: FunctionComponent<CommentProps> = ({ comment }) => {
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
      <h2>{comment.comment}</h2>
      {ratingJSX}
    </div>
  );
};

export default CommentComponent;
