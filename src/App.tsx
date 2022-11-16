import React from "react";
import Navigation from "./routes/navigation/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/home/home";
import BookPage from "./routes/book/bookpage";
import { initDB } from "react-indexed-db";
import AddBookRoute from "./routes/addBookRoute/addBookRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="book" element={<BookPage />} />
        <Route path="addBook" element={<AddBookRoute />} />
      </Route>
    </Routes>
  );
}

export default App;
