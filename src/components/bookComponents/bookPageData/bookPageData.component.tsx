import { FunctionComponent } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../../../api/API";
import { BookModel } from "../../../api/models/book.model";
import { AbsolutePageNames } from "../../../pages/navigation/pagesNames";
import { useAPI } from "../../../utils/hooks";
import { useUserContext } from "../../../utils/utils";

interface BookPageDataProps {
  book: BookModel;
}

const BookPageData: FunctionComponent<BookPageDataProps> = ({ book }) => {
  const navigate = useNavigate();
  const API = useAPI();
  const { currentUser } = useUserContext();
  const { title, author, description, price, id, userId } = book;

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    if (book.id) {
      await API.BooksAPI.delete(book.id);
    }
    navigate("/");
  };

  const handleEdit: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    navigate(`/books/edit/${id}`);
  };

  return (
    <>
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
        <Col style={{ height: "1000px" }}>
          <Card className="p-5">
            <Card.Body>
              <Card.Title className="" style={{ fontSize: "50px" }}>
                {title}
              </Card.Title>
              <Card.Text className="text-center"></Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Price: {price}</ListGroup.Item>
              <ListGroup.Item>{description}</ListGroup.Item>
              <ListGroup.Item className="text-center">{author}</ListGroup.Item>
            </ListGroup>
            <Row md={3} className="justify-content-center">
              <Button
                variant="primary"
                className="mt-3 mx-3"
                style={{ width: "80%" }}
              >
                Add to cart
              </Button>
              {currentUser?.id === book.userId ? (
                <Col>
                  <Button
                    variant="danger"
                    className="mt-3 mx-3"
                    onClick={handleDelete}
                    style={{ width: "100%" }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="warning"
                    className="mt-3 mx-3"
                    style={{ width: "100%" }}
                    onClick={handleEdit}
                  >
                    Edit
                  </Button>
                </Col>
              ) : (
                ""
              )}
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default BookPageData;
