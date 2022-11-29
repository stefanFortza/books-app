import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import localforage from "localforage";
import UserContextProvider from "./contexts/user/user.context";

localforage.config({
  driver: localforage.INDEXEDDB,
  description: "store for local data",
  name: "user cache",
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>
);
