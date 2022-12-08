import { BooksAPI } from "./books.api";
import { CommentsAPI } from "./comments.api";
import { db, MySubClassedDexie } from "./database/db";
import { UsersAPI } from "./users.api";

class API {
  public BooksAPI: BooksAPI;
  public UsersAPI: UsersAPI;
  public CommentsAPI: CommentsAPI;

  constructor(db: MySubClassedDexie) {
    this.BooksAPI = new BooksAPI(db);
    this.UsersAPI = new UsersAPI(db);
    this.CommentsAPI = new CommentsAPI(db);
  }
}

const api = new API(db);

export default api;
