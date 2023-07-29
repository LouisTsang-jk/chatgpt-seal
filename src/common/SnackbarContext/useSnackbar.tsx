import { useContext } from "react";
import { SnackbarContext } from "./SnackbarProvider";

export function useSnackbar() {
  const openSnackbar = useContext(SnackbarContext);

  if (openSnackbar === null) {
      throw new Error('useSnackbar must be used within a SnackbarProvider');
  }

  return openSnackbar;
}