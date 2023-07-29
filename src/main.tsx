import React from "react"
import ReactDOM from "react-dom/client"
import { createHashRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import Main from "./views/Main"
import styled from "styled-components"
import { DataProvider } from "./DataContext"
import Editor from "./views/Editor"
import { SnackbarProvider } from "./common/SnackbarContext/SnackbarProvider"

const router = createHashRouter([
  {
    path: "/",
    element: <Main />
  },
  {
    path: "create",
    element: <Editor />
  },
  {
    path: "edit/:id",
    element: <Editor />
  },
  {
    path: "setting",
    element: <p>Setting</p>
  },
  {
    path: "about",
    element: <p>About</p>
  }
])

const LayoutDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 340px;
  width: 400px;
  border-radius: 12px;
  border: 1px solid pink;
  padding: 8px;
`

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DataProvider>
      <LayoutDiv>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </LayoutDiv>
    </DataProvider>
  </React.StrictMode>
)
