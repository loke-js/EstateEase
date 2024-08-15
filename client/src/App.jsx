import HomePage from "./routes/homePage/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListPage from "./routes/listPage/ListPage";
import {Layout,RequiredAuth} from "./routes/layout/Layout";
import SinglePage from "./routes/singlePage/SinglePage";
import Profile from "./routes/profile/Profile";
import Register from "./routes/register/Register";
import Login from "./routes/login/Login";
import ProfileUpdatePage from "./routes/profileUpdate/ProfileUpdatePage";
import NewPostPage from "./routes/newPostPage/NewPostPage";
import { ListPageLoader, profilePageLoader, singlePageLoader } from "./lib/loaders";
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
          element:<ListPage />,
          loader:ListPageLoader,
        },
        {
          path:"/:id",
          element:<SinglePage />,
          loader:singlePageLoader,
        },
        {
          path:"/register",
          element:<Register/>,
         
        },
        {
          path:"/login",
          element:<Login/>
        }
      ]
    },
    {
      path: "/",
      element: <RequiredAuth />,
      children:[
        {
          path:"/profile",
          element:<Profile/>,
          loader:profilePageLoader,  
        },
        {
          path:"/profile/update",
          element: <ProfileUpdatePage/>
        },
        {
          path:"/profile/createPost",
          element: <NewPostPage/>
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
