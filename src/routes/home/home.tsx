import { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import BookList from "../../components/booklist/booklist.component";

interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {
    return <Container >
        <BookList />
    </Container>;
}

export default Home;