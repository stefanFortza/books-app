import { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import AddABookForm from "../../components/addBookForm/addBookForm.component";

interface AddBookRouteProps {}

const AddBookRoute: FunctionComponent<AddBookRouteProps> = () => {
  return (
    <Container className="w-50">
      <h1 className="mt-4 text-center">Add a new book</h1>
      <AddABookForm />
    </Container>
  );
};

export default AddBookRoute;
