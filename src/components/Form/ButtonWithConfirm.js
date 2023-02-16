import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from '@material-ui/core';
import React from 'react';

function ButtonWithConfirm({
  onClick,
  buttonProps = {
    size: 'small',
  },
  children,
  agreeLabel = 'Yes',
  disagreeLabel = 'No',
  warningTitle = 'Caution',
  warningMessage = 'Are you sure you want to delete',
  dialogProps = {},
  disabled = false,
  status,
}) {
  const [open, setOpen] = React.useState(false);

  const handleAgree = () => {
    onClick();
    setOpen(false);
  };

  const handleDisagree = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        size="small"
        {...buttonProps}
        onClick={() => setOpen(true)}
        disabled={disabled}
        color="primary"
      >
        {status === 'loading' ? (
          <CircularProgress size={24} />
        ) : (
          children || 'Button'
        )}
      </Button>
      <Dialog
        open={open}
        onClose={handleDisagree}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        {...dialogProps}
      >
        <DialogTitle id="alert-dialog-title">{warningTitle}</DialogTitle>
        <Divider />
        <DialogContent {...dialogProps}>
          <DialogContentText id="alert-dialog-description">
            {warningMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagree} color="primary">
            {disagreeLabel}
          </Button>
          <Button
            onClick={handleAgree}
            color="primary"
            disabled={disabled}
            autoFocus
          >
            {status === 'loading' ? <CircularProgress size={24} /> : agreeLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ButtonWithConfirm;
