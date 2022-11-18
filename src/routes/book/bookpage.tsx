import { IndexableType } from "dexie";
import { useLiveQuery } from "dexie-react-hooks";
import { FunctionComponent, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Book from "../../components/book/book.component";
import BookPageData from "../../components/bookPageData/bookPageData.component";
import CommentList from "../../components/commentList/commentList.component";
import { db } from "../../database/db";

interface BookProps {}

const BookPage: FunctionComponent<BookProps> = () => {
  const { bookId } = useParams();
  const [comment, setComment] = useState("");
  const currentBook = useLiveQuery(() =>
    db.books.where({ id: parseInt(bookId!) }).first()
  );

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setComment(event.currentTarget.value);
    console.log(comment);
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    const id = await db.comments.add({
      text: comment,
      bookId: currentBook?.id,
    });
    setComment("");
  };

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
            <BookPageData book={currentBook} />
          </Col>
        </Row>
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      <Card className="my-5">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Add a comment</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Add a comment"
                name="comment"
                onChange={handleChange}
                value={comment}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {currentBook?.id && <CommentList bookId={currentBook.id} />}
    </Container>
  );
};

export default BookPage;
