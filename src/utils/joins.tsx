import { db } from "../database/db";
import { CommentModel } from "../models/coment.model";
import { UserModel } from "../models/user.model";

export async function joinCommentsWithUsers(comments: CommentModel[]) {
  let commentsAndUsers: { comment: CommentModel; user: UserModel }[] = [];

  for (const comment of comments) {
    const user = (await db.users
      .where("id")
      .equals(comment.userId)
      .first()) as UserModel;
    commentsAndUsers.push({ comment, user });
  }
  return commentsAndUsers;
}
