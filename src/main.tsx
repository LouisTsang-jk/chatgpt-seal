import React from "react"
import ReactDOM from "react-dom/client"
import { createHashRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import Main from "./views/Main"

const router = createHashRouter([
  {
    path: "/",
    element: <Main />
  }, {
    path: 'setting',
    element: <p>Setting</p>
  }, {
    path: 'about',
    element: <p>About</p>
  }
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
