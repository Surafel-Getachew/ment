import { FC } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import moment from 'moment';
import { isNil } from 'lodash';
import CheckCircle from '../../asset/check-circle.png';
import { IUserCompetency } from '../../types/IUserCompetency';

export type CompetencyProps = {
  title: String;
  description: String;
  meta?: String;
  competencyNumber?: number;
  completedAt?: Date;
  lastItem: boolean;
  competencyStatus: IUserCompetency | undefined;
  onClick?: () => void;
  onTakeAssessmentClick?: () => void;
};

const useStyles = makeStyles((theme: Theme) => createStyles({
  card: {
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    cursor: 'pointer',
    borderRadius: '6px',
    backgroundColor: theme.palette.background.paper,
  },
  lastCard: {
    padding: '32px 0',
    width: '100%',
    borderRadius: '3px',
  },
}));

const CompetencyCard: FC<CompetencyProps> = ({
  title,
  description,
  meta,
  competencyNumber,
  completedAt,
  lastItem,
  competencyStatus,
  onClick,
  onTakeAssessmentClick,
}) => {
  const classes = useStyles();
  const completed = !isNil(completedAt);
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  const handleTaksAssesmentClick = () => {
    if (onTakeAssessmentClick) {
      onTakeAssessmentClick();
    }
  };
  const renderCompetencyContent = () => (
    <Box display="flex" alignItems="center">
      <Box width="100%">
        <Typography variant="caption" color="textSecondary">
          {meta}
        </Typography>
        <Box>
          <Typography variant="h6">{title}</Typography>
        </Box>
        <Typography
          style={{ padding: '16px 0' }}
          variant="body1"
          color="textSecondary"
        >
          {description}
        </Typography>
        {/* <Typography
          style={{ cursor: 'pointer' }}
          onClick={handleClick}
          variant="button"
          color="primary"
        >
          VIEW DETAILS &gt;
        </Typography> */}
      </Box>
    </Box>
  );

  const renderCompetencyButton = () => {
    if (competencyStatus) {
      const { completedAt } = competencyStatus;
      return (
        <Box height="100%" width="100%">
          {completedAt && (
            <Box display="flex" flexDirection="column">
              <Box
                py={2}
                justifyContent="space-between"
                alignItems="center"
              >
                <Box display="flex" alignItems="center">
                  <Box height="100%">
                    <img
                      style={{ width: '100%', height: '100%' }}
                      src={CheckCircle}
                      alt="check-circle"
                    />
                  </Box>
                  <Box px={1}>
                    <Typography variant="subtitle2">
                      Competency attained
                    </Typography>
                  </Box>
                </Box>
                <Box px={4}>
                  <Typography variant="caption" color="textSecondary">
                    {moment(completedAt).format('MMMM D, YYYY')}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      );
    }

    return null;
  };
  // const cardStyle = lastItem ? classes.lastCard : classes.card;
  return (
    <Box py={{ xs: 3, md: 4 }} px={{ xs: 3, md: 5 }} className={classes.card} onClick={handleClick}>
      <Grid container>
        <Grid xs={2} sm={1} item>
          <Box
            my={1.5}
            display="flex"
            height="100%"
          >
            <Typography variant="h3">{competencyNumber}</Typography>
          </Box>
        </Grid>

        <Grid item xs={10} sm={11}>
          <Grid container>
            <Grid sm={12} md={8} xl={8} item>
              {renderCompetencyContent()}
            </Grid>
            <Grid sm={12} md={4} xl={4} item>
              {renderCompetencyButton()}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompetencyCard;
