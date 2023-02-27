/* eslint-disable */
import { FC, useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  makeStyles,
  Grid,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons/';

import QuarterDesktopView from './QuarterDesktopView';
import Progress from './Progress';

import AchivedImg from '../../asset/Achieved.png';
import PendingImg from '../../asset/Unachieved.png';

import { IProgress } from '../../types/ui/IProgress';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

const breakpoints = createBreakpoints({})

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    cursor: 'pointer',
    boxShadow: '0px 3px 8px 0px rgba(0, 0, 0, 0.06)',
    borderRadius: '6',
  },
  badge: {
    [breakpoints.up('md')]: {
      width: '55px'
    },
    [breakpoints.down('sm')]: {
      width: '45px'
    }
  },
  videoSection: {
    borderBottom: '2px solid #DDDDDD',
  }
}));

type ClusterAccordionProps = {
  id: string;
  title: string;
  description?: string;
  videoUrl?: string;
  progress?: IProgress;
  numberOfCompetencies: number;
  open?: boolean;
};

const ClusterAccordion: FC<ClusterAccordionProps> = ({
  id,
  title,
  description,
  videoUrl,
  numberOfCompetencies,
  progress,
  open,
  children,
}) => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(open === true);

  const onToggle = () => {
    setExpanded(!expanded)
  }
  const clusterStatus = {
    label: 'Not Started',
    img: PendingImg,
  };

  if (progress) {
    // eslint-disable-next-line no-unused-expressions
    progress.count === progress.total
      ? ((clusterStatus.label = 'Achieved'), (clusterStatus.img = AchivedImg))
      : (clusterStatus.label = 'In Progress');
  }

  const renderClusterStatus = () => (
    <Grid container>
      <Grid
        item
        xs={10}
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box px={1}>
          <Box>
            <Typography variant='subtitle2'>{clusterStatus.label}</Typography>
          </Box>
          {progress && clusterStatus.label === 'In Progress' ? (
            <Progress {...progress} />
          ) : null}
        </Box>
      </Grid>
      <Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
        <Box className={classes.badge}>
          <img style={{ width:'100%'}} src={clusterStatus.img} alt='pathwayimage' />
        </Box>
      </Grid>
    </Grid>
  );
  const renderClusterHeader = () => (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        sm={7}
        lg={8}
        xl={9}
        style={{ display: 'flex' }}
      >
        <Typography variant='h5'>{title}</Typography>
      </Grid>
      <Grid xs={12} sm={5} lg={4} xl={3} item>
        {renderClusterStatus()}
      </Grid>
    </Grid>
  );

  const renderDescriptionAndVideo = () => {
    if (!description && !videoUrl) {
      return null;
    }

    return (
      <Box mb={2} pb={2} className={classes.videoSection}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="subtitle1">{description}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            {videoUrl && (
              <iframe
                src={videoUrl}
                title="video"
                allowFullScreen
                frameBorder="0"
                width="100%"
                height="250"
              />
            )}
          </Grid>
        </Grid>
      </Box>
    )
  }
  return (
    <Box my={2}>
      <QuarterDesktopView>
        <Accordion expanded={expanded} onChange={onToggle}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls='panel1a-content'
            id='panel1a-header'
            className={classes.root}
          >
            {renderClusterHeader()}
          </AccordionSummary>
          <AccordionDetails>
            <Box width='100%' px={1} py={2}>
              {renderDescriptionAndVideo()}
              <Box mb={2}>
                <Typography variant='h6'>
                  {' '}
                  Competencies ({numberOfCompetencies}){' '}
                </Typography>
              </Box>
              {children}
            </Box>
          </AccordionDetails>
        </Accordion>
      </QuarterDesktopView>
    </Box>
  );
};

export default ClusterAccordion;
