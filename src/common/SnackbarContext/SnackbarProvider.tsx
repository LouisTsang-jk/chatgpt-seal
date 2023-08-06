import React, { createContext, ReactNode, useState } from 'react'
import { Snackbar, useTheme } from '@mui/material';

interface SnackbarContextType {
  openSnackbar: (message: string) => void;
}

const defaultContext: SnackbarContextType = {
  openSnackbar: () => {},
}

export const SnackbarContext = createContext<SnackbarContextType>(defaultContext)

interface SnackbarProviderProps {
  children: ReactNode;
}

export function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarMessage, setSnackbarMessage] = useState<string>("")
  const theme = useTheme()

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
        ContentProps={{
          style: {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary
          }
        }}
      />
    </SnackbarContext.Provider>
  )
}

export const useSnackbar = () => React.useContext(SnackbarContext)
