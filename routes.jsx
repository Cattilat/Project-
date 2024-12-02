import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./src/layout/MainLayout";
import Featured from "./src/pages/Featured";
import Shop from "./src/pages/Shop";
import HomePage from "./src/pages/HomePage";
import ProductDetailsPage from "./src/pages/ProductDetailsPage";
import ContactPage from "./src/pages/ContactPage";
import Register from "./src/pages/Register";
import Login from "./src/pages/Login";
import ProfilePage from "./src/pages/ProfilePage";
import CustomerMessagePage from "./src/pages/CustomerMessagePage";
import UpdatePage from "./src/pages/UpdatePage";
import EditAccountPage from "./src/pages/EditAccountPage";
import CheckOutPage from "./src/pages/CheckOutPage";

const routes = createBrowserRouter(
  [
    {
      path: "/",
      errorElement: <div>404 Not found</div>,
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/featured",
          element: <Featured />,
        },
        {
          path: "/contact",
          element: <ContactPage />,
        },
        {
            path: "/shop",
            element: <Shop />,
        },
        {
            path: "/product/:id",
            element: <ProductDetailsPage />,
        },
        {
           path:"/signUp",
           element:<Register />
        },
        {
           path : '/login',
           element:<Login />
        },
        {
          path:"/account",
          element:<ProfilePage />,
        },
        {
          path : '/account/edit/:id',
          element:<EditAccountPage />
        },
        {
          path:'/message',
          element:<CustomerMessagePage />
        }
        ,
        {
          path:"/contact/:id",
          element:<UpdatePage />
        },
        {
          path:"/checkOut",
          element:<CheckOutPage />
        }
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default routes;
