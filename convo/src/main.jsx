import "./index.css";

import React from "react";
import routes from "./Routes";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import { Provider } from "react-redux";

import { store } from "./store/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster position="top-right" reverseOrder={false} />
    </Provider>
  </React.StrictMode>
);
