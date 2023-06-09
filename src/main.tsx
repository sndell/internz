import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/reduxStore";
import New from "./features/jobs/components/New";
import Finder from "./features/jobs/components/finder/Finder";
import Profile from "./features/user/components/profile/Profile";
import Edit from "./features/user/components/edit/Edit";
import Job from "./features/jobs/components/Job";
import {
  AnimatePresence,
  AnimateSharedLayout,
  LayoutGroup,
} from "framer-motion";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Finder />,
        children: [
          {
            path: "/:jobId",
            element: <Job />,
          },
        ],
      },
      {
        path: "/company/new",
        element: <New />,
      },
      {
        path: "/profile/:userId",
        element: <Profile />,
      },
      {
        path: "/profile/edit",
        element: <Edit />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
