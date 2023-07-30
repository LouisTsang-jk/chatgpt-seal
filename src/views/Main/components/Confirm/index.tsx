import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material"
import { useEffect } from "react"
import { useToggle } from 'react-use'

interface ConfirmProps {
  visible: boolean
  text: string
  handleConfirm: (agree: boolean) => void
}

export default function Confirm(props: ConfirmProps) {
  const { visible, text, handleConfirm } = props

  const [open, openChange] = useToggle(false)

  const onConfirm = (agree: boolean) => {
    handleConfirm(agree)
    openChange(agree)
  }

  useEffect(() => {
    openChange(visible)
  }, [visible])

  return (
    <Dialog
      open={open}
      onClose={() => onConfirm(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onConfirm(false)} color="primary">
          Disagree
        </Button>
        <Button onClick={() => onConfirm(true)} color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  )
}
