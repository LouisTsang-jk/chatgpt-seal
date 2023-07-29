import React, { createContext, ReactNode, useState } from 'react'
import { Snackbar } from '@mui/material';

// Context类型
interface SnackbarContextType {
  openSnackbar: (message: string) => void;
}

// 默认值
const defaultContext: SnackbarContextType = {
  openSnackbar: () => {},
}

// 创建上下文
export const SnackbarContext = createContext<SnackbarContextType>(defaultContext)

// 提供者组件类型
interface SnackbarProviderProps {
  children: ReactNode;
}

// 提供者组件
export function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarMessage, setSnackbarMessage] = useState<string>("")

  const openSnackbar = (message: string) => {
    setSnackbarOpen(true)
    setSnackbarMessage(message)
  }

  const closeSnackbar = () => {
    setSnackbarOpen(false)
  }

  return (
    <SnackbarContext.Provider value={{openSnackbar}}>
      {children}
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        message={snackbarMessage}
      />
    </SnackbarContext.Provider>
  )
}

// 这样其他组件可以使用此上下文
export const useSnackbar = () => React.useContext(SnackbarContext)
