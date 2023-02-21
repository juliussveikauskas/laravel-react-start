import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {RouterProvider} from "react-router-dom";
import router from "./router";
import {ContextProvider} from "./contexts/contextProvider";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <ContextProvider>
          <RouterProvider router={router} />
      </ContextProvider>
  </React.StrictMode>,
)
