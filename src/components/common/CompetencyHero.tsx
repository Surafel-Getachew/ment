/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';

import {
  Box,
  Typography,
  Button,
  Link,
  Theme,
  makeStyles,
  createStyles,
} from '@material-ui/core';

import { isNil } from 'lodash';
import moment from 'moment';
import CheckCircle from '../../asset/check-circle.png';

import { IUserCompetency } from '../../types/IUserCompetency';
import ArrowLeft from '../../asset/arrow-left.png';

const useStyles = makeStyles((theme: Theme) => createStyles({
  hero: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

type CompetencyProps = {
  meta?: string;
  title: string;
  description: string;
  competencyStatus?: IUserCompetency | undefined;
  onBackArrowClick: () => void;
  onTakeAssessmentClick: () => void;
  onPathwayEnroll: () => void;
  // completedAt?: Date;
};

const Competency: FC<CompetencyProps> = ({
  meta,
  title,
  description,
  competencyStatus,
  // completedAt,
  onBackArrowClick,
  onTakeAssessmentClick,
  onPathwayEnroll,
}) => {
  // const completed = !isNil(completedAt);
  const classes = useStyles();

  const handleBackArrowClick = () => {
    if (onBackArrowClick) {
      onBackArrowClick();
    }
  };

  const handleTakeAssessmentClick = () => {
    if (onTakeAssessmentClick) {
      onTakeAssessmentClick();
    }
  };

  const renderCompetencyButton = () => {
    if (competencyStatus) {
      const { completedAt } = competencyStatus;
      return (
        <Box height="100%">
          {completedAt ? (
            <Box>
              <Box py={2} alignItems="center">
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
                  <Typography variant="caption">
                    {moment(completedAt).format('MMMM D, YYYY')}
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleTakeAssessmentClick}
              >
                RE-TAKE ASSESSMENT
              </Button>
            </Box>
          ) : (
            <Box height="100%" py={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleTakeAssessmentClick}
              >
                TAKE ASSESSMENT
              </Button>
            </Box>
          )}
        </Box>
      );
    }
    return (
      <Box>
        <Box height="100%" py={2}>
          <Button variant="outlined" color="secondary">
            TAKE ASSESSMENT
          </Button>
        </Box>
        <Link
          component="button"
          variant="body1"
          onClick={() => {
            onPathwayEnroll();
          }}
          style={{ color: '#ffffff', textDecoration: 'underline' }}
        >
          Start Pathway to take Assessments
        </Link>
      </Box>
    );
  };

  return (
    <Box
      className={classes.hero}
      py={{ xs: 3, md: 5 }}
      px={{ xs: 3, md: 6 }}
    >
      <Box
        display="flex"
        onClick={handleBackArrowClick}
        style={{ cursor: 'pointer' }}
        mb={3}
      >
        <img src={ArrowLeft} alt="left-arrow" />
        <Box pl={2}>
          <Typography variant="body1">Back to Pathway</Typography>
        </Box>
      </Box>
      <Box mb={1}>
        <Typography variant="caption">{meta}</Typography>
      </Box>
      <Box mb={2}>
        <Typography variant="h4">{title}</Typography>
      </Box>
      <Box mb={2}>
        <Typography variant="body1">{description}</Typography>
      </Box>
      {renderCompetencyButton()}
    </Box>
  );
};

export default Competency;
