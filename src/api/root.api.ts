import { IndexableType, Table } from "dexie";
import { MySubClassedDexie } from "./database/db";

export abstract class RootAPI<T> {
  protected db: MySubClassedDexie;
  public table: Table<T, IndexableType>;

  constructor(db: MySubClassedDexie, table: Table<T, IndexableType>) {
    this.db = db;
    this.table = table;
  }

  async get(equalityCriterias: {
    [key in keyof T]?: T[key];
  }) {
    return this.table.where(equalityCriterias).first();
  }

  async getAll(): Promise<T[]>;
  async getAll(equalityCriterias?: {
    [key in keyof T]?: T[key];
  }): Promise<T[]>;

  async getAll(equalityCriterias?: {
    [key in keyof T]?: T[key];
  }) {
    if (equalityCriterias) {
      return this.table.where(equalityCriterias).toArray();
    }

    return this.table.toArray();
  }

  async add(model: T) {
    return this.table.add(model);
  }

  async update(
    id: number,
    changes: {
      [key in keyof T]?: T[key];
    }
  ) {
    return this.table.update(id, changes);
  }

  async delete(id: number) {
    return this.table.delete(id);
  }
}
