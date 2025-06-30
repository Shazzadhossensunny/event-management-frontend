import { createBrowserRouter } from "react-router-dom";
import Root from "../root/Root";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Events from "../pages/Events";
import AddEvents from "../pages/AddEvents";
import MyEvents from "../pages/MyEvents";
import Login from "../pages/Login";
import Register from "../pages/Register";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/addEvent",
        element: <AddEvents />,
      },
      {
        path: "/myEvents",
        element: <MyEvents />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);

export default router;
