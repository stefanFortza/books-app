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
import CommentForm from "../../components/commentForm/commentForm.component";
import CommentList from "../../components/commentList/commentList.component";
import { db } from "../../database/db";

interface BookProps {}

const BookPage: FunctionComponent<BookProps> = () => {
  const { bookId } = useParams();
  const currentBook = useLiveQuery(() =>
    db.books.where({ id: parseInt(bookId!) }).first()
  );

  return (
    <Container className="mb-5">
      <h1 className="text-center my-5">{currentBook?.title}</h1>
      {currentBook ? (
        <BookPageData book={currentBook} />
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      <h1 className="text-center mt-5">De la acelasi autor:</h1>
      <h1 className="text-center mt-5">Comments Section</h1>
      {currentBook?.id && <CommentForm currentBook={currentBook} />}

      {currentBook?.id && <CommentList currentBook={currentBook} />}
    </Container>
  );
};

export default BookPage;
