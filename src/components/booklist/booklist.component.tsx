import { useLiveQuery } from "dexie-react-hooks";
import { FunctionComponent, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useIndexedDB } from "react-indexed-db";
import { db } from "../../database/db";
import { BookModel } from "../../models/book.model";
import Book from "../book/book.component";

interface BooksProps {}

const BookList: FunctionComponent<BooksProps> = () => {
  // const [books, setBooks] = useState<BookModel[]>([]);
  const books = useLiveQuery(() => db.books.toArray()) || [];

  return (
    <Row xs={1} md={4} className="g-4 mt-4">
      {books.length &&
        books.map((book) => (
          <Col>
            <Book key={book.id} book={book} />
          </Col>
        ))}
    </Row>
  );
};

export default BookList;
