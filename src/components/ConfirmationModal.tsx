import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
      PaperProps={{
        sx: {
          borderRadius: { xs: 2, sm: 3 },
          width: { xs: "95%", sm: "450px", md: "500px" },
          maxWidth: "95%",
          m: { xs: 1, sm: 2 },
          p: { xs: 1, sm: 1 },
        },
      }}
    >
      <DialogTitle 
        id="confirmation-dialog-title"
        sx={{ 
          pb: 1, 
          pt: { xs: 2, sm: 2 },
          pl: { xs: 2, sm: 3 },
          pr: { xs: 6, sm: 6 } 
        }}
      >
        <Typography 
          variant={isMobile ? "h6" : "h5"} 
          component="div" 
          sx={{ fontWeight: "bold" }}
        >
          {title}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onCancel}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ px: { xs: 2, sm: 3 }, py: { xs: 1, sm: 1.5 } }}>
        <DialogContentText 
          id="confirmation-dialog-description"
          sx={{ 
            fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
            lineHeight: 1.5,
            color: "text.primary"
          }}
        >
          {message}
        </DialogContentText>
      </DialogContent>
      
      <DialogActions sx={{ 
        p: { xs: 2, sm: 3 },
        pt: { xs: 1, sm: 2 },
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "flex-end",
        gap: 1
      }}>
        <Button 
          onClick={onCancel} 
          variant="outlined"
          color="inherit"
          sx={{ 
            width: isMobile ? "100%" : "auto",
            order: isMobile ? 1 : 0,
            py: { xs: 1, sm: 1 },
            textTransform: "none",
            fontSize: { xs: "0.9rem", sm: "0.95rem" }
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={onConfirm} 
          variant="contained" 
          color="primary"
          autoFocus
          sx={{ 
            width: isMobile ? "100%" : "auto", 
            py: { xs: 1, sm: 1 },
            textTransform: "none",
            fontSize: { xs: "0.9rem", sm: "0.95rem" }
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
