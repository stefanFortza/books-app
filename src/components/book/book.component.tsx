import { FunctionComponent } from "react";
import { Card, Col } from "react-bootstrap";
import { BookModel } from "../../models/book.model";

interface BookProps {
  book: BookModel;
}

const Book: FunctionComponent<BookProps> = ({ book }) => {
  const { title, description, price } = book;

  return (
    <Col>
      <Card>
        <Card.Img
          variant="top"
          src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Text>{price}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Book;
