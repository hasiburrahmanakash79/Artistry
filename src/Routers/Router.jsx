import { createBrowserRouter } from "react-router";
import SignIn from "../Pages/Authentication/SignIn";
import Main from "../Layouts/Main";
import ChatInbox from "../Pages/ChatInbox/ChatInbox";
import ForgotPassword from "../Pages/Authentication/ForgotPassword";
import OtpVerification from "../Pages/Authentication/OtpVerification";
import ResetPassword from "../Pages/Authentication/ResetPassword";
import SignUp from "../Pages/Authentication/Signup";
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
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/forget-password",
    element: <ForgotPassword />,
  },
  {
    path: "/otp-verification",
    element: <OtpVerification />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
]);

export default router;
