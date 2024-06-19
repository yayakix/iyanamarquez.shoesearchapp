import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Products from './components/Products.tsx';
import Item from './components/Item.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/products",
    element: <App />,
    // children: [
    //   {
    //     path: "/products/:productId",
    //     element: <Item />,
    //   },
    // ],
  },
  {
    path: "/products/:productId",
    element: <Item />,
  },


]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
