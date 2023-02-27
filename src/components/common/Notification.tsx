import React, { FC } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

type NotificationProps = {
  open: boolean,
  message: string,
  onClose: () => void,
  durationMs?: number,
}

export const Notification: FC<NotificationProps> = ({
  open, message, onClose, durationMs,
}) => {
  const autoHideDuration = durationMs || null;

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      transitionDuration={{
        enter: 500,
        exit: 1000,
      }}
      message={<span id="message-id">{message}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
};
