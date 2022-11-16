import Dexie, { Table } from "dexie";
import { BookModel } from "../models/book.model";

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  books!: Table<BookModel>;

  constructor() {
    super("myDatabase");
    this.version(1).stores({
      books: "++id, title, price, description", // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();
