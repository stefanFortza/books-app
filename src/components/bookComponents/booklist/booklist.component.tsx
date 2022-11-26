import { useLiveQuery } from "dexie-react-hooks";
import { FunctionComponent, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { db } from "../../../database/db";
import Book from "../book/book.component";
import Filters from "../filters/filters.component";

interface BooksProps {}

const BookList: FunctionComponent<BooksProps> = () => {
  const books = useLiveQuery(() => db.books.toArray()) || [];
  const [filters, setFilters] = useState("all");

  return (
    <Row xs={1} md={2} className="g-4 mt-4">
      <Col md={2}>
        <Filters setFilters={setFilters} />
      </Col>
      <Col md={10}>
        <Row xs={1} md={3} className="g-4">
          {books &&
            books
              .filter(
                (book) =>
                  book.author.toLowerCase() === filters || filters === "all"
              )
              .map((book) => (
                <Col key={book.id} md={4}>
                  <Book book={book} />
                </Col>
              ))}
        </Row>
      </Col>
    </Row>
  );
};

export default BookList;
