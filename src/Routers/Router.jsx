import { createBrowserRouter } from "react-router";
import SignIn from "../Pages/Authentication/SignIn";
import Main from "../Layouts/Main";
import ChatInbox from "../Pages/ChatInbox/ChatInbox";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <ChatInbox />,
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
]);

export default router;
