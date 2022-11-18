import { useLiveQuery } from "dexie-react-hooks";
import { FunctionComponent, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { db } from "../../database/db";
import { BookModel } from "../../models/book.model";
import Book from "../book/book.component";

interface BooksProps {}

const BookList: FunctionComponent<BooksProps> = () => {
  // const [books, setBooks] = useState<BookModel[]>([]);
  const books = useLiveQuery(() => db.books.toArray()) || [];

  return (
    <Row xs={1} md={2} className="g-4 mt-4">
      <Col md={2}>
        <h1>Filters</h1>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Et
          sollicitudin ac orci phasellus egestas tellus rutrum. Venenatis cras
          sed felis eget velit aliquet sagittis. Id ornare arcu odio ut sem
          nulla. Ac turpis egestas integer eget aliquet nibh praesent tristique
          magna. Ac tincidunt vitae semper quis lectus nulla at volutpat.
          Aliquet eget sit amet tellus cras adipiscing enim eu turpis. Augue
          mauris augue neque gravida in fermentum et. Velit sed ullamcorper
          morbi tincidunt ornare. Urna id volutpat lacus laoreet non curabitur
          gravida arcu ac. Et netus et malesuada fames ac turpis egestas sed
          tempus. Ac tortor dignissim convallis aenean et tortor. Risus quis
          varius quam quisque id diam vel quam elementum. Et malesuada fames ac
          turpis egestas.
        </div>
      </Col>
      <Col md={10}>
        <Row xs={1} md={3} className="g-4">
          {books.length &&
            books.map((book) => (
              <Col md={4}>
                <Book key={book.id} book={book} />
              </Col>
            ))}
        </Row>
      </Col>
    </Row>
  );
};

export default BookList;
