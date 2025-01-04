import RootLayout from '@/pages/layout'
import NotFound from '@/pages/not-found'
import {createBrowserRouter} from 'react-router-dom'
import ProductList from "@/pages/products/list";
import ProductDetail from "@/pages/products/detail";
import Cart from "@/pages/cart";
import Login from "@/pages/login";

export const router = createBrowserRouter([
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