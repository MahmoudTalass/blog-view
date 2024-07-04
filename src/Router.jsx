import { createBrowserRouter } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Post from "./components/Post";
import Home from "./components/Home";
import MainPageLayout from "./components/MainPageLayout";
import AuthProvider from "./components/contexts/AuthContext";
import { NotFoundPage } from "./components/NotFoundPage";

export const router = createBrowserRouter([
   {
      path: "/",
      element: <AuthProvider />,
      children: [
         {
            element: <MainPageLayout />,
            children: [
               {
                  index: true,
                  element: <Home />,
               },
               {
                  path: "post/:postId",
                  element: <Post />,
               },
            ],
         },
         {
            path: "login",
            element: <Login />,
         },
         {
            path: "signup",
            element: <Signup />,
         },
      ],
   },
   {
      path: "*",
      element: <NotFoundPage />,
   },
]);
