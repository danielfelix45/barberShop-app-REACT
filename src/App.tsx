import { createBrowserRouter } from "react-router-dom";

import { Layout } from "./components/Layout";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Clients from "./pages/clients";
import New from "./pages/clients/new";
import Update from "./pages/clients/update";

const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/clients',
        element: <Clients/>
      },
      {
        path: '/clients/new',
        element: <New/>
      },
      {
        path: '/update/:id',
        element: <Update/>
      }
    ]
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  }
])

export {router};
