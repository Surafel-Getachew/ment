import { FC } from 'react';
import {
  Grid,
  Box,
  Theme,
  makeStyles,
  createStyles,
} from '@material-ui/core';

import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import { IProgress } from '../../types/ui/IProgress';

import PathwayDetail from './PathwayDetail';
import QuarterDesktopView from './QuarterDesktopView';

type PathwayProps = {
  title: string;
  description: string;
  clusterCount: number;
  imageUrl: string;
  progress?: IProgress;
  onClick?:() => void;
};

const breakpoints = createBreakpoints({});

const useStyles = makeStyles((theme: Theme) => createStyles({
  card: {
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    cursor: 'pointer',
    borderRadius: '6px',
    backgroundColor: theme.palette.background.paper,
  },
  image: {
    width: '100%',
    background: (props: any) => `url(${props.imageUrl}) no-repeat center/105%`,
    [breakpoints.up('md')]: {
      height: '100%',
      borderTopLeftRadius: '6px',
      borderBottomLeftRadius: '6px',
    },
    [breakpoints.down('sm')]: {
      height: '350px',
      borderTopLeftRadius: '6px',
      borderTopRightRadius: '6px',
    },
  },
}));

const Pathway: FC<PathwayProps> = ({
  title,
  description,
  clusterCount,
  imageUrl,
  progress,
  onClick,
}) => {
  const classes = useStyles({ imageUrl });

  const renderPathwayDetails = () => (
    <Box
      py={{ xs: 3, md: 5 }}
      px={{ xs: 3, md: 6 }}
    >
      <PathwayDetail
        title={title}
        description={description}
        clusterCount={clusterCount}
        progress={progress}
      />
    </Box>
  );

  const renderCardImage = () => {
    const imageUrl = '';
    return (
      <Box className={classes.image} />
    );
  };

  return (
    <QuarterDesktopView>
      <Box onClick={onClick} className={classes.card}>
        <Grid container>
          <Grid item md={4} sm={12} xs={12}>
            {renderCardImage()}
          </Grid>
          <Grid item md={8} sm={12} xs={12}>
            {renderPathwayDetails()}
          </Grid>
        </Grid>
      </Box>
    </QuarterDesktopView>
  );
};

export default Pathway;
