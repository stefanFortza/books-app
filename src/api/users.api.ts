import { MySubClassedDexie } from "./database/db";
import { CommentModel } from "./models/coment.model";
import { UserModel } from "./models/user.model";
import { RootAPI } from "./root.api";

export class UsersAPI extends RootAPI<UserModel> {
  constructor(db: MySubClassedDexie) {
    super(db, db.users);
  }
}
