import Dexie, { Table } from "dexie";
import { BookModel } from "../models/book.model";
import { CommentModel } from "../models/coment.model";
import { UserModel } from "../models/user.model";

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  books!: Table<BookModel>;
  comments!: Table<CommentModel>;
  users!: Table<UserModel>;

  constructor() {
    super("myDatabase");
    this.version(12).stores({
      books: "++id, title, price, author, description, userId", // Primary key and indexed props
      comments: "++id, comment, bookId, rating, userId",
      users: "++id, &email, password, username",
    });
  }
}

export const db = new MySubClassedDexie();
