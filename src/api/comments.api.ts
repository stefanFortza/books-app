import { MySubClassedDexie } from "./database/db";
import { CommentModel } from "./models/coment.model";
import { UserModel } from "./models/user.model";
import { RootAPI } from "./root.api";

export class CommentsAPI extends RootAPI<CommentModel> {
  constructor(db: MySubClassedDexie) {
    super(db, db.comments);
  }

  public async joinWithUsers(comments: CommentModel[]) {
    let commentsAndUsers: { comment: CommentModel; user: UserModel }[] = [];

    for (const comment of comments) {
      const user = (await this.db.users.get({
        id: comment.userId,
      })) as UserModel;
      commentsAndUsers.push({ comment, user });
    }
    return commentsAndUsers;
  }
}
