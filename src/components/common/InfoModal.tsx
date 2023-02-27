import { FC, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  makeStyles,
  Theme,
  createStyles,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

const breakpoints = createBreakpoints({});

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    zIndex: 100,
    [breakpoints.up('md')]: {
      height: '100%',
      width: '100%',
    },
    [breakpoints.down('sm')]: {
      height: '350px',
      width: '100%',
    },
  },
}));

type InfoModalProps = {
  open: boolean,
  title: string,
  body: string,
  agreeText: string,
  cancelText?: string,
  onAgree: () => void,
  onCancel?: () => void,
}

export const InfoModal: FC<InfoModalProps> = ({
  open,
  title,
  body,
  agreeText,
  cancelText,
  onAgree,
  onCancel,
}) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        { onCancel && (
          <Button onClick={onCancel} color="primary">
            {cancelText}
          </Button>
        )}
        <Button onClick={onAgree} color="primary" autoFocus>
          {agreeText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
