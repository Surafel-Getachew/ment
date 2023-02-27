/* eslint-disable react/require-default-props */
import { FC } from 'react';
import { Box, CircularProgress, Typography } from '@material-ui/core';

type LoadingProps = {
  message?: string;
};

const Loading: FC<LoadingProps> = ({ message }) => (
  <Box>
    <CircularProgress size={80} color="inherit" />
    {message ? <Typography>{message}</Typography> : null}
  </Box>
);

export default Loading;
