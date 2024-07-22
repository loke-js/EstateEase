import HomePage from "./routes/homePage/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListPage from "./routes/listPage/ListPage";
import Layout from "./routes/layout/Layout";
import SinglePage from "./routes/singlePage/SinglePage";
import Profile from "./routes/profile/Profile";
import Register from "./routes/register/Register";
import Login from "./routes/login/Login";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children:[
        {
          path:"/",
          element: <HomePage />
        },
        {
          path:"/list",
          element:<ListPage />
        },
        {
          path:"/:id",
          element:<SinglePage />
        },
        {
          path:"/profile",
          element:<Profile/>
        },
        {
          path:"/register",
          element:<Register/>
        },
        {
          path:"/login",
          element:<Login/>
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
