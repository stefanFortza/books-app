import { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import BookList from "../../components/bookComponents/booklist/booklist.component";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <Container className="mx-4">
      <BookList />
    </Container>
  );
};

export default Home;
