/* eslint-disable */
import { FC } from 'react';

import { Box, makeStyles, createStyles, Theme } from '@material-ui/core';

import { IProgress } from '../../types/ui/IProgress';

import BadgeAchived from '../../asset/Achieved.png';
import BadgePending from '../../asset/Unachieved.png';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

const breakpoints = createBreakpoints({})

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    [breakpoints.up('md')]: {
      width: '55px'
    },
    [breakpoints.down('sm')]: {
      width: '45px'
    }
  },
}));

const ProgressBadge: FC<IProgress> = ({ total, count }) => {
  const AchivedBadge = [];
  const PendingBadge = [];
  const numberOfPendingBadges = total - count;
  const classes = useStyles();

  for (let i = 0; i < count; i++) {
    AchivedBadge.push(
      <Box className={classes.root}>
        <img
          style={{ width:'100%' }}
          src={BadgeAchived}
          alt="pathwayimage"
        />
      </Box>,
    );
  }
  for (let i = 0; i < numberOfPendingBadges; i++) {
    PendingBadge.push(
      <Box className={classes.root}>
        <img
          style={{ width:'100%'}}
          src={BadgePending}
          alt="pathwayimage"
        />
      </Box>,
    );
  }
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
      {AchivedBadge.map((badge) => badge)}
      {PendingBadge.map((badge) => badge)}
    </Box>
  );
};

export default ProgressBadge;
