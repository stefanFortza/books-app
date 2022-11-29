import Navigation from "./routes/navigation/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  createBrowserRouter,
  json,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Home from "./routes/home/home";
import AddBookPage from "./routes/addBookPage/addBookPage";
import AuthentificationPage from "./routes/authentificationPage/authentificationPage";
import { getCurrentUser, withAuth } from "./utils/utils";
import BookPage from "./routes/bookPage/bookPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    children: [
      {
        index: true,
        element: <div>Home Page</div>,
      },
      {
        path: "books",
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "addBook",
            loader: withAuth(({ request }) => {
              console.log(request.url);
            }),
            element: <AddBookPage />,
          },
        ],
      },
      {
        path: "book/:bookId",
        element: <BookPage />,
      },
      {
        path: "/auth",
        element: <AuthentificationPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
