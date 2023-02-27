import { FC, useEffect, useState } from 'react';

import {
  LinearProgress, Box, Typography, makeStyles,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';

import { IProgress } from '../../types/ui/IProgress';
import { convertToPercent } from '../../util/convertToPercent';

const Progress: FC<IProgress> = ({
  label, count, total, extraLabel,
}) => {
  const [calculatedPercent, setCalculatedPercent] = useState(0);

  useEffect(() => {
    setCalculatedPercent(convertToPercent(total, count));
  }, [total, count]);

  const useStyles = makeStyles((theme) => ({
    complete: {
      '& .MuiLinearProgress-barColorPrimary': {
        backgroundColor: theme.palette.success.main,
      },
    },
    incomplete: {
      '& .MuiLinearProgress-barColorPrimary': {
        backgroundColor: theme.palette.info.main,
      },
    },
  }));

  const classes = useStyles();

  const progressColor = calculatedPercent === 100 ? classes.complete : undefined;

  return (
    <Box width="100%">
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1} className={progressColor}>
          <LinearProgress variant="determinate" value={calculatedPercent} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">
            {`${Math.round(
              calculatedPercent,
            )}%`}
          </Typography>
        </Box>
      </Box>

      {label && (
        <Typography>
          {count}
          {' '}
          of
          {' '}
          {total}
          {' '}
          {label}
        </Typography>
      )}
      {extraLabel && <Typography>{extraLabel}</Typography>}
    </Box>
  );
};

export default Progress;
