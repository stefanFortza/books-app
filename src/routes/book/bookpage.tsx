import { IndexableType } from "dexie";
import { useLiveQuery } from "dexie-react-hooks";
import { FunctionComponent } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Book from "../../components/book/book.component";
import { db } from "../../database/db";

interface BookProps {}

const BookPage: FunctionComponent<BookProps> = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const currentBook = useLiveQuery(() =>
    db.books.where({ id: parseInt(bookId!) }).first()
  );

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    const n = await db.books.where({ id: parseInt(bookId!) }).delete();
    navigate("/");
  };

  console.log(currentBook);

  return (
    <Container className="mb-5">
      <h1 className="text-center my-5">{currentBook?.title}</h1>
      {currentBook ? (
        <Row xs={1} md={2} className="g-4 mt-4">
          <Col>
            <Card>
              <Card.Img
                variant="top"
                src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
                className="img-fluid"
              />
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="">{currentBook.title}</Card.Title>
                <Card.Text className="text-center"></Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>Price: {currentBook.price}</ListGroup.Item>
                <ListGroup.Item>{currentBook.description}</ListGroup.Item>
                <ListGroup.Item className="text-center">
                  {currentBook.author}
                </ListGroup.Item>
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
          </Col>
        </Row>
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </Container>
  );
};

export default BookPage;
