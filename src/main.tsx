import React from "react";
import ReactDOM from "react-dom/client";
import { ProtectedRoutes, UnprotectedRoutes } from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./error-page";
import { Note, Trash, SignUp, SignIn, Colloborative } from "./pages/index.ts";
import store from "./redux/store.ts";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={store}>
        <ProtectedRoutes />
      </Provider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Note />,
      },
      {
        path: "notes",
        element: <Note />,
      },
      {
        path: "trash",
        element: <Trash />,
      },
      {
        path: "colloborative",
        element: <Colloborative />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <Provider store={store}>
        <UnprotectedRoutes />
      </Provider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
