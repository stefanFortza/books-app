import { FunctionComponent, useEffect, useState } from "react";
import { Button, Row } from "react-bootstrap";
import { useIndexedDB } from "react-indexed-db";
import { BookModel } from "../../models/book.model";
import Book from "../book/book.component";

interface BooksProps {}

const BookList: FunctionComponent<BooksProps> = () => {
  const { add, getAll } = useIndexedDB("books");
  const [books, setBooks] = useState<BookModel[]>([]);

  useEffect(() => {
    getAll<BookModel>().then((booksList) => {
      console.log(booksList);
      setBooks(booksList);
    });
  }, []);

  const handleClick = () => {
    add({ title: "LOTR", price: 53, description: "written by Tolkien" }).then(
      (event) => {
        console.log("ID Generated: ", event);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  return (
    <>
      <Row xs={1} md={4} className="g-4 mt-4">
        {books.length &&
          books.map((book) => <Book key={book.id} book={book} />)}
      </Row>
      <Button variant="primary" onClick={handleClick}>
        Press
      </Button>
    </>
  );
};

export default BookList;
