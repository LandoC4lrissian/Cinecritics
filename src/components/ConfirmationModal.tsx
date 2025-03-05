import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface ConfirmationModalProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className="font-semibold">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions className="p-4">
        <Button
          onClick={onCancel}
          variant="outlined"
          className="normal-case px-4"
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          autoFocus
          className="normal-case px-4"
        >
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
