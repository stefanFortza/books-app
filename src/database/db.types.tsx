import { IndexableType } from "dexie";

declare module "dexie" {
  export interface Table<T = any, TKey = IndexableType> {
    with: (spec: Object) => Promise<Array<T>>;
  }
  export interface Collection<T = any, TKey = IndexableType> {
    with: (spec: Object) => Promise<Array<T>>;
  }
}