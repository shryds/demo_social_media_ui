import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "./Pages/Home/index.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PostDetail from "./Pages/postdetail/index.jsx";
import Layout from "./Components/layout/index.jsx";
import { AuthProvider } from "./Context/Auth.jsx";
import LoginSignUpPage from "./Pages/loginsignup/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/post/:id", element: <PostDetail /> },
      { path: "/user/login", element: <LoginSignUpPage /> },
      { path: "/user/", element: <LoginSignUpPage isSignUp={true} /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
