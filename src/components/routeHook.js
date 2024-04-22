import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./authProvider2";
import { ProtectedRoute } from "./protectedRoute";
import Login from "./Login";
import Logout from "./Logout";
import NewsBoard from './NewsBoard';
import Navbar from "../Navbar";

    //   <div className="container">
    //     <Routes>
    //       <Route path="/" element={<NewsBoard/>} />
    //       <Route path="/pricing" element={<Pricing />} />
    //       <Route path="/registration" element={<Registration />} />
    //       <Route path="/login" element={<Login/>} />
    //       <Route path="/about" element={<About />} />
    //     </Routes>
    //   </div>

const Routes = () => {
  const { token } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/",
      element: <NewsBoard/>,
    },
    {
      path: "/about-us",
      element: <div>About Us</div>,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "",
          element: <div>User Home Page</div>,
        },
        {
          path: "/profile",
          element: <div>User Profile</div>,
        },
        {
          path: "/logout",
          element: <Logout/>,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <NewsBoard/>,
    },
    {
      path: "/login",
      element: <Login/>,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;