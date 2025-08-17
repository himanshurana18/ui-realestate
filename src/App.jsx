import ListPage from "./routes/listPage/listPage";
import HomePage from "./routes/homePage/homePage";
import { Layout, RequireAuth } from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/singlePage";
import Register from "./routes/register/register";
import Login from "./routes/login/login";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProfilePage from "./routes/profilePage/profilePage";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import NewPostPage from "./routes/newPostPage/newPostPage";
import {
  singlePageLoader,
  listPageLoader,
  profilePageLoader,
} from "./lib/loaders";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/list",
          element: <ListPage />,
          loader: listPageLoader,
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader: singlePageLoader,
        },

        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
          // Assuming Register component handles both registration and login
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
          loader: profilePageLoader,

          // Assuming ProfilePage handles both viewing and updating profile
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />, // Assuming ProfilePage handles both viewing and updating profile
        },
        {
          path: "/add",
          element: <NewPostPage />, // Assuming SinglePage handles adding new posts
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
