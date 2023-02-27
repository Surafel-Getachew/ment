import { FC, useState } from 'react';
import {
  Grid,
  Box,
  Typography,
  Button,
  Theme,
  makeStyles,
  createStyles,
} from '@material-ui/core';

import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import ArrowLeft from '../../asset/arrow-left.png';

import { IProgress } from '../../types/ui/IProgress';

import PathwayDetail from './PathwayDetail';

import PlayIcon from '../../asset/play-white.jpeg';
import { VideoModal } from './VideoModal';

const breakpoints = createBreakpoints({});

const useStyles = makeStyles((theme: Theme) => createStyles({
  hero: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  video: {
    width: '100%',
    cursor: 'pointer',
    background: (props: any) => `url(${PlayIcon}) no-repeat center/25%, url(${props.imageUrl}) no-repeat center/107%`,
    [breakpoints.up('md')]: {
      height: '100%',
    },
    [breakpoints.down('sm')]: {
      height: '400px',
    },
  },
  image: {
    width: '100%',
    background: (props: any) => `url(${props.imageUrl}) no-repeat center/107%`,
    [breakpoints.up('md')]: {
      height: '100%',
    },
    [breakpoints.down('sm')]: {
      height: '400px',
    },
  },
}));

type PathwayProps = {
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  videoDescription: string;
  progress?: IProgress;
  onBackArrowClick:() => void;
  onPathwayEnroll: () => void;
};

const Pathway: FC<PathwayProps> = ({
  title,
  description,
  imageUrl,
  videoUrl,
  videoDescription,
  progress,
  onBackArrowClick,
  onPathwayEnroll,
}) => {
  const classes = useStyles({ imageUrl });

  const [openVideo, setOpenVideo] = useState(false);

  const renderPathwayDetails = () => (
    <Box
      py={{ xs: 3, md: 5 }}
      px={{ xs: 3, md: 6 }}
    >
      <Box
        display="flex"
        onClick={onBackArrowClick}
        style={{ cursor: 'pointer' }}
        mb={3}
      >
        <img src={ArrowLeft} alt="arrow-left-icon" />
        <Box pl={2}>
          <Typography variant="body1">Back to My Pathways</Typography>
        </Box>
      </Box>
      <PathwayDetail
        title={title}
        description={description}
        videoDescription={videoDescription}
        progress={progress}
      />
      {
        progress === undefined && (
          <Box mt={3}>
            <Button variant="contained" color="secondary" onClick={onPathwayEnroll}>
              Start Pathway
            </Button>
          </Box>
        )
      }
    </Box>
  );

  const renderVideo = () => {
    if (!videoUrl) {
      return null;
    }

    return (
      <VideoModal
        videoUrl={videoUrl}
        open={openVideo}
        onClose={() => setOpenVideo(false)}
      />
    );
  };

  const renderMedia = () => {
    if (!videoUrl) {
      return (
        <Box className={classes.image} />
      );
    }

    return (
      <Box
        onClick={() => setOpenVideo(true)}
        className={classes.video}
      />
    );
  };

  return (
    <Box className={classes.hero}>
      <Grid container>
        <Grid item md={8} sm={12} xs={12}>
          {renderPathwayDetails()}
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          {renderVideo()}
          {renderMedia()}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Pathway;
