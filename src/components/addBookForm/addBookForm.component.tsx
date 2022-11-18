import {
  ChangeEventHandler,
  FormEventHandler,
  FunctionComponent,
  useState,
} from "react";
import { Button, Col, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { db } from "../../database/db";

interface AddABookFormProps {}

const defaultFormFields = {
  title: "",
  price: 0,
  author: "",
  description: "",
};

const AddABookForm: FunctionComponent<AddABookFormProps> = (props) => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { author, description, price, title } = formFields;

  //TODO ADD FORMIK LIBRARY
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    console.log(form.checkValidity());
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
    const id = await db.books.add({
      ...formFields,
    });

    navigate(`/books/${id}`);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.currentTarget;
    setFormFields({ ...formFields, [name]: value });
    console.log(formFields);
  };

  return (
    <Form
      noValidate
      validated={validated}
      className="mt-5 border p-3 rounded"
      onSubmit={handleSubmit}
    >
      <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Book Title</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter book title"
          onChange={handleChange}
          name="title"
          value={title}
        />
      </Form.Group>

      <Form.Group as={Col} controlId="formGridPassword">
        <Form.Label>Book Price</Form.Label>
        <InputGroup>
          <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
          <Form.Control
            required
            type="number"
            placeholder="0.00"
            onChange={handleChange}
            name="price"
            value={price}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Book Author</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter book author"
          onChange={handleChange}
          name="author"
          value={author}
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
          value={description}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddABookForm;
