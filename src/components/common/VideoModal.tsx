import { FC } from 'react';
import {
  Button, Dialog, DialogActions, makeStyles, Theme, useTheme, createStyles,
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

const breakpoints = createBreakpoints({});

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
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

type VideoModalProps = {
  videoUrl: string,
  open: boolean,
  onClose: () => void,
}

export const VideoModal: FC<VideoModalProps> = ({ videoUrl, open, onClose }) => {
  const classes = useStyles();

  return (
    <Dialog fullScreen open={open}>
      <iframe
        src={videoUrl}
        title="video"
        allow="autoplay"
        allowFullScreen
        frameBorder="0"
        className={classes.root}
      />
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
