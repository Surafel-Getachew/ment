import { FC } from 'react';
import {
  Box, Chip, Grid, makeStyles, Typography,
} from '@material-ui/core';
import { VerifiedUser, VerifiedUserRounded, VerifiedUserTwoTone } from '@material-ui/icons';
import { IMetadata } from '../../types/ui/IMetadata';
import { IProgress } from '../../types/ui/IProgress';

import Metadata from './Metadata';
import Progress from './Progress';
import QuarterDesktopView from './QuarterDesktopView';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    cursor: 'pointer',
    boxShadow: '0px 0px 5px -2px #939393',
    '&:hover': {
      boxShadow: '0px 0px 5px 0px #939393',
    },
  },
  badgeActive: {
    color: theme.palette.success.main,
  },
}));

type CardProps = {
  title: string;
  description?: string;
  label?: string;
  status?: string;
  statusDate?: Date;
  meta?: IMetadata[];
  onClick?: () => void;
  progress?: IProgress;
  badgeType?: string;
};

const Card: FC<CardProps> = ({
  title,
  description,
  label,
  status,
  statusDate,
  progress,
  meta,
  onClick,
  badgeType,
}) => {
  const classes = useStyles();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const renderCardContent = () => (
    <Box width="100%">
      <Box mb={1}>
        <Grid container>
          <Grid item xs={6}>
            {label && (
              <Typography variant="caption" color="primary">
                {label}
              </Typography>
            )}
          </Grid>
          <Grid item xs={6}>
            {status && (
              <Box textAlign="right">
                <Chip
                  label={status}
                  size="small"
                  variant="outlined"
                  color="primary"
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
      <Typography variant="h6">{title}</Typography>
      {meta && (
        <Box mb={1}>
          <Metadata meta={meta} />
        </Box>
      )}
      {description && (
        <Typography variant="subtitle1" color="textSecondary">
          {description}
        </Typography>
      )}
      <Box my={1}>
        {progress && (
          <Progress
            count={progress.count}
            total={progress.total}
            label={progress.label}
            extraLabel={progress.extraLabel}
          />
        )}
      </Box>
    </Box>
  );

  const renderBadge = () => {
    const icon = badgeType === 'Active' ? <VerifiedUserRounded className={classes.badgeActive} style={{ fontSize: 50 }} /> : <VerifiedUserTwoTone style={{ fontSize: 50 }} />;
    return (
      <Box display="flex" height="100%" justifyContent="center" alignItems="center">
        {icon}
      </Box>
    );
  };
  const renderCardGrid = () => {
    const showBadge = badgeType !== undefined;
    if (showBadge) {
      return (
        <Grid container>
          <Grid item sm={12} md={2}>
            {renderBadge()}
          </Grid>
          <Grid item sm={12} md={10}>
            {renderCardContent()}
          </Grid>
        </Grid>
      );
    }

    return renderCardContent();
  };

  return (
    <QuarterDesktopView>
      <Box
        py={2}
        px={4}
        borderRadius={3}
        className={classes.root}
        onClick={handleClick}
      >
        {renderCardGrid()}
      </Box>
    </QuarterDesktopView>
  );
};

export default Card;
