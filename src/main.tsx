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
import CreateTag from './components/CreateTag.tsx';
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

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
    path: "/createShoe",
    element: <CreateItem />,
  },
  {
    path: "/createTag",
    element: <CreateTag />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>

      <RouterProvider router={router} />
    </ClerkProvider>

  </React.StrictMode>,
)
