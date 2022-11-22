import Dexie, { Table } from "dexie";
import { BookModel } from "../models/book.model";
import { CommentModel } from "../models/coment.model";

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  books!: Table<BookModel>;
  comments!: Table<CommentModel>;

  constructor() {
    super("myDatabase");
    this.version(6).stores({
      books: "++id, title, price, author, description", // Primary key and indexed props
      comments: "++id, comment, bookId, rating",
    });
  }
}

export const db = new MySubClassedDexie();
