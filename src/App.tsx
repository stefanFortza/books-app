import React from "react";
import Navigation from "./routes/navigation/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/home/home";
import BookPage from "./routes/book/bookpage";
import AddBookRoute from "./routes/addBookRoute/addBookRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="addBook" element={<AddBookRoute />} />
        <Route path="books/:bookId" element={<BookPage />} />
      </Route>
    </Routes>
  );
}

export default App;
