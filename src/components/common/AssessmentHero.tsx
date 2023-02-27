/* eslint-disable */
import { FC } from 'react';

import { Box, Typography,  } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

type AssesmentProps = {
  meta: string;
  title: string;
  description: string;
  onBackArrowClick?: () => void;
  onTakeAssessmentClick?: () => void;
  completedAt?: Date;
};

const AssesmentHero: FC<AssesmentProps> = ({
  meta,
  title,
  description,
  onBackArrowClick,
}) => {

  const handleBackArrowClick = () => {
    if (onBackArrowClick) {
      onBackArrowClick();
    }
  };


  return (
    <Box  px={{ xs: 2, sm: 3, md: 7 }} py={4} style={{ background: '#ffffff' }}>
      <Box
        display='flex'
        onClick={handleBackArrowClick}
        style={{ cursor: 'pointer' }}
        width='100%'
      >
        <ArrowBack color="primary" />
        <Box px={1}>
          <Typography color='primary' variant='body1'>
            Back to Competency
          </Typography>
        </Box>
      </Box>
      <Box pt={5}>
        <Typography variant='caption'>{meta}</Typography>
      </Box>
      <Box my={2}>
        <Typography variant='h3'>{title}</Typography>
      </Box>
      <Box my={2}>
        <Typography variant='body1'>{description}</Typography>
      </Box>
    </Box>
  );
};

export default AssesmentHero;
