import {
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
  FunctionComponent,
  useState,
} from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useIndexedDB } from "react-indexed-db";
import { useNavigate } from "react-router-dom";
import { db } from "../../database/db";
import { BookModel } from "../../models/book.model";

interface AddBookRouteProps {}

const defaultFormFields = {
  title: "",
  price: 0,
  author: "",
  description: "",
};

const AddBookRoute: FunctionComponent<AddBookRouteProps> = () => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(defaultFormFields);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const id = await db.books.add({
      ...formFields,
    });
    navigate(`/books/${id}`);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.currentTarget;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <Container className="w-50">
      <h1 className="mt-4 text-center">Add a new book</h1>
      <Form className="mt-5 border p-3 rounded" onSubmit={handleSubmit}>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Book Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter book title"
            onChange={handleChange}
            name="title"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Book Price</Form.Label>
          <InputGroup>
            <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
            <Form.Control
              type="number"
              placeholder="0.00"
              onChange={handleChange}
              name="price"
            />
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Book Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter book author"
            onChange={handleChange}
            name="author"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter book description"
            name="description"
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AddBookRoute;
