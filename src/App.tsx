import { createBrowserRouter } from "react-router-dom";

import { Layout } from "./components/Layout";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Clients from "./pages/clients";
import New from "./pages/clients/new";

import { Private } from "./routes/Private";

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
        element: <Private><Clients/></Private>
      },
      {
        path: '/clients/new',
        element: <Private><New/></Private>
      },
      {
        path: '/clients/new/:id',
        element: <Private><New/></Private>
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
