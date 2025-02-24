import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Code from "./components/Code";
import DeployCodeForm from "./components/DeployCodeForm ";
import Page from "./components/Page";
import { Provider } from "react-redux";
import store from "./redux/store";
import ViewProfile from "./components/ViewProfile";
import CodeCommentPage from "./components/Comment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path:"/",
        element:<Page/>
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/docs",
        element: <Code />,
      },
      {
        path: "/deploy",
        element: <DeployCodeForm />,
      },
      {
        path:"/user/profile/:id",
        element:<ViewProfile/>
      },
      {
        path:"code/comment/:id",
        element:<CodeCommentPage/>
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
    </Provider>
  </StrictMode>
);
