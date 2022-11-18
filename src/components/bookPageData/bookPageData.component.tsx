import { FunctionComponent } from "react";
import { Button, Card, ListGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { db } from "../../database/db";
import { BookModel } from "../../models/book.model";

interface BookPageDataProps {
  book: BookModel;
}

const BookPageData: FunctionComponent<BookPageDataProps> = ({ book }) => {
  const navigate = useNavigate();
  const { title, author, description, price, id } = book;

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    const n = await db.books.where({ id }).delete();
    navigate("/");
  };
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title className="">{title}</Card.Title>
          <Card.Text className="text-center"></Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Price: {price}</ListGroup.Item>
          <ListGroup.Item>{description}</ListGroup.Item>
          <ListGroup.Item className="text-center">{author}</ListGroup.Item>
        </ListGroup>
      </Card>
      <Row>
        <Button
          variant="primary"
          className="mt-3 mx-3 ms-auto"
          style={{ width: "40%" }}
        >
          Add to cart
        </Button>
        <Button
          variant="danger"
          className="mt-3 mx-3 me-auto"
          style={{ width: "40%" }}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Row>
    </>
  );
};

export default BookPageData;
