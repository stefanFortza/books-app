import { IndexedDBProps } from "react-indexed-db";

export const DBConfig: IndexedDBProps = {
    name: 'MyDB',
    version: 1,
    objectStoresMeta: [
        {
            store: 'books',
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: [
                { name: 'BookTitle', keypath: 'title', options: { unique: false } },
                { name: 'Price', keypath: 'price', options: { unique: false } },
                { name: 'Description', keypath: 'description', options: { unique: false } },
            ]
        }
    ]
};