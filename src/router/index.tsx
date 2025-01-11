import RootLayout from '@/pages/layout'
import NotFound from '@/pages/not-found'
import {createHashRouter} from 'react-router-dom';
import ProductList from "@/pages/products/list";
import ProductDetail from "@/pages/products/detail";
import Login from "@/pages/login";
import Cart from "@/pages/cart";

export const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <ProductList />
      },
      {
        path: '/products',
        element: <ProductList />
      },
      {
        path: '/products/:id',
        element: <ProductDetail />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />,
  }
])