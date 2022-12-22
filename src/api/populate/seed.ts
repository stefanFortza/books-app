// import axios from "axios";
// import { db } from "../database/db";
// // import data from "./csvjson";

// //Some messy code to search wikipedia for book description
// async function seedDB() {
//   // const books: any =  data.map((book: any) => {
//   //   return {
//   //     author: book.authors,
//   //     averageRating: book.average_rating,
//   //     image: book.image_url,
//   //     languageCode: book.language_code,
//   //     originalTitle: String(book.original_title),
//   //     title: String(book.title),
//   //     smallImage: book.small_image_url,
//   //     //generate with faker
//   //     description: "",
//   //     userId: 1,
//   //     price: 1,
//   //   };
//   // });

//   for (let i = 0; i < 500; i++) {
//     let book = data[i];

//     const bookToAdd = {
//       author: book.authors,
//       averageRating: book.average_rating,
//       image: book.image_url,
//       languageCode: book.language_code,
//       originalTitle: String(book.original_title),
//       title: String(book.title),
//       smallImage: book.small_image_url,
//       //generate with faker
//       description: "",
//       userId: 1,
//       price: 1,
//     };

//     console.log(book);
//     try {
//       bookToAdd.description = await SearchWiki2(bookToAdd.originalTitle);
//       // c;
//       console.log(book);
//       // await db.books.add(bookToAdd);
//     } catch (error) {}
//   }
// }

// async function SearchWiki2(key: string): Promise<string> {
//   var url = "https://en.wikipedia.org/w/api.php";

//   var params = {
//     action: "opensearch",
//     search: key,
//     limit: "1",
//     namespace: "0",
//     format: "json",
//   };

//   url = url + "?origin=*";
//   Object.keys(params).forEach(function (key) {
//     url += "&" + key + "=" + params[key];
//   });
//   url += "";
//   // console.log(url);

//   const response = await fetch(url);
//   const data = await response.json();

//   console.log(data);
//   let url2 = `https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=extracts&exintro&explaintext&titles=${data[1][0]}`;

//   const { data: data2 } = await axios.get(url2);
//   console.log(data2);
//   const description =
//     data2.query.pages[Object.keys(data2.query.pages)[0]].extract;
//   console.log(data2.query.pages[Object.keys(data2.query.pages)[0]].extract);

//   return description;
// }

// export async function SearchWiki() {
//   var url = "https://en.wikipedia.org/w/api.php";

//   var params = {
//     action: "opensearch",
//     search: "The Hunger Games",
//     limit: "1",
//     namespace: "0",
//     format: "json",
//   };

//   url = url + "?origin=*";
//   Object.keys(params).forEach(function (key) {
//     url += "&" + key + "=" + params[key];
//   });
//   url += "";
//   // console.log(url);

//   const response = await fetch(url);
//   const data = await response.json();

//   console.log(data);
//   let url2 = `https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=extracts&exintro&explaintext&titles=${data[1][0]}`;

//   const { data: data2 } = await axios.get(url2);
//   console.log(data2);
//   const description =
//     data2.query.pages[Object.keys(data2.query.pages)[0]].extract;
//   console.log(data2.query.pages[Object.keys(data2.query.pages)[0]].extract);
// }
import { Transaction } from "dexie";
import { db } from "../database/db";
import { BookModel } from "../models/book.model";
import { faker } from "@faker-js/faker";
import data from "./BX-MostPopular.json";
import { UserModel } from "../models/user.model";

db.on("populate", seedDB);

export default async function seedDB(transaction: Transaction) {
  await addBooks(transaction);
  await addUsers(transaction);
}

async function addBooks(transaction: Transaction) {
  for (let i = 0; i < 25; i++) {
    const book = (data as any)[i];
    const bookToAdd: BookModel = {
      ...book,
      // isbn: book.ISBN,
      // author: book.BookAuthor,
      // imageURLS: book.ImageURLS,
      // imageURLM: book.ImageURLM,
      // imageURLL: book.ImageURLL,
      // publisher: book.Publisher,
      // title: String(book.BookTitle),
      // yearOfPublication: book.YearOfPublication,
      description: "",
      price: 1,
      userId: 1,
    };
    // if (book.description)
    await (transaction as any).books.add(bookToAdd);
  }
  console.log(transaction);
}

async function addUsers(transaction: Transaction) {
  for (let i = 0; i < 100; i++) {
    const name = faker.name.fullName();
    const [firstName, lastName] = name.split(" ");
    
    const user: UserModel = {
      email: faker.internet.email(firstName, lastName),
      username: faker.internet.userName(firstName, lastName),
      password: faker.internet.password(),
    };
    await (transaction as any).users.add(user);
  }
}
