import { db, MySubClassedDexie } from "./database/db";
import { BookModel } from "./models/book.model";
import { RootAPI } from "./root.api";

export class BooksAPI extends RootAPI<BookModel> {
  constructor(db: MySubClassedDexie) {
    super(db, db.books);
    this.db = db;
  }
}
