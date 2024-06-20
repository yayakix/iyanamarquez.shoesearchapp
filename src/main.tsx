import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Item from './components/Item.tsx';
import Favorites from './components/Favorites.tsx';
import CreateItem from './components/CreateItem.tsx';

export const defaultTestUser = {
  id: 'clxm4hnxg0000127n543sm1js',
  email: 'alice@prisma.io',
  name: 'Alice',
  avatar_url: 'link.com'
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/products",
    element: <App />,
  },
  {
    path: "/favorites",
    element: <Favorites />,
  },
  {
    path: "/products/:id",
    element: <Item />,
  },
  {
    path: "/create",
    element: <CreateItem />,
  },


]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
