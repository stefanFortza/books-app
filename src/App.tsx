import Navigation from "./routes/navigation/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { redirect, Route, Routes } from "react-router-dom";
import Home from "./routes/home/home";
import BookPage from "./routes/book/bookpage";
import AddBookRoute from "./routes/addBookRoute/addBookRoute";
import AuthentificationPage from "./routes/authentificationPage/authentificationPage";
import { UserContext } from "./contexts/user/user.context";
import { useContext } from "react";
import RequireAuth from "./components/authComponents/requireAuth/requireAuth.component";

//TODO add react router v6
function App() {
  const { currentUser } = useContext(UserContext);
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route
          index
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route path="addBook" element={<AddBookRoute />} />
        <Route path="books/:bookId" element={<BookPage />} />
        <Route path="/authentification" element={<AuthentificationPage />} />
      </Route>
    </Routes>
  );
}

export default App;
