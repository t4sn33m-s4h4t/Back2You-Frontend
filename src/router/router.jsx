import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../error/ErrorPage";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Home from "../pages/home/Home";
import AddPost from "../pages/add-posts/addPost";
import AllPosts from "../pages/all-posts/AllPosts";
import PostDetails from "../pages/post-details/PostDetails";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import MyAddedPosts from "../pages/my-added-posts/MyAddedPosts";
import ClaimItem from "../pages/ClaimItem/ClaimItem";
import ClaimDetails from "../pages/ClaimDetails/ClaimDetails";
import MyClaims from "../pages/MyClaims/MyClaims";
import AllClaims from "../pages/AllClaims/AllClaims";
import UpdatePost from "../pages/update-post/UpdatePost";
import Feedbacks from "../pages/feedbacks/Feedbacks";
import ChatApp from "../pages/ChatApp/ChatApp";
import ChatLayout from "../layout/ChatLayout";
import PrivateAdmin from "../provider/PrivateAdmin";
import MyProfile from "../pages/my-profile/MyProfile";
import PrivateRoute from "../provider/PrivateRoute";
import PublicRoute from "../provider/PublicRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/auth/register",
        element: <PublicRoute><Register></Register></PublicRoute>
      },
      {
        path: "/auth/login",
        element: <PublicRoute><Login></Login></PublicRoute>
      },
      {
        path: "/addPost",
        element: <PrivateRoute>
          <AddPost></AddPost>
        </PrivateRoute>,
      },
      {
        path: "/posts",
        element: <PrivateRoute><AllPosts></AllPosts></PrivateRoute>,
      },
      {
        path: "/posts/:id",
        element: <PrivateRoute><PostDetails></PostDetails></PrivateRoute>,
      },
      {
        path: '/myAddedPosts',
        element: <PrivateRoute><MyAddedPosts></MyAddedPosts></PrivateRoute>
      },
      {
        path: '/claim-item',
        element: <PrivateRoute><ClaimItem></ClaimItem></PrivateRoute>
      },
      {
        path: '/all-claims',
        element: <PrivateAdmin><AllClaims /></PrivateAdmin>
      },
      {
        path: '/my-claims',
        element: <PrivateRoute><MyClaims /></PrivateRoute>
      },
      {
        path: '/my-profile',
        element:<PrivateRoute> <MyProfile></MyProfile></PrivateRoute>
      },
      {
        path: '/claim-details/:id',
        element: <PrivateRoute><ClaimDetails /></PrivateRoute>
      },
      {
        path: '/posts/update/:id',
        element: <PrivateRoute><UpdatePost></UpdatePost></PrivateRoute>
      },

      {
        path: '/feedbacks',
        element: <Feedbacks></Feedbacks>
      },
    ],
  },
  {
    path: "/chats",
    element: <PrivateRoute><ChatLayout></ChatLayout></PrivateRoute>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/chats',
        element: <ChatApp></ChatApp>
      },
      {
        path: '/chats/:receieverEmail',
        element: <ChatApp></ChatApp>
      },
    ],
  },
]);

export default router;
