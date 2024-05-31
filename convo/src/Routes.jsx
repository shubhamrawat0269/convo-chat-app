import App from "./App";
import { MessagePage } from "./components";
import { Home, CheckEmailPage, CheckPasswordPage, RegisterForm } from "./pages";

const routes = [
  {
    path: "/",
    element: <App />,
    // errorElement: <Nopage />,
    children: [
      {
        path: "/register",
        element: <RegisterForm />,
      },
      {
        path: "/email",
        element: <CheckEmailPage />,
      },
      {
        path: "/password",
        element: <CheckPasswordPage />,
      },
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: ":userId",
            element: <MessagePage />,
          },
        ],
      },
    ],
  },
];

export default routes;
