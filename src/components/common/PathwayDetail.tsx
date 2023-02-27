import { FC } from 'react';
import {
  Grid,
  Box,
  Typography,
  Chip,
  Theme,
  makeStyles,
  createStyles,
} from '@material-ui/core';

import { IProgress } from '../../types/ui/IProgress';

import ProgressBadge from './ProgressBadge';

type PathwayDetailProps = {
  title: string;
  description: string;
  videoDescription?: string;
  clusterCount?: number;
  progress?: IProgress;
};

const PathwayDetail: FC<PathwayDetailProps> = ({
  title,
  description,
  videoDescription,
  clusterCount,
  progress,
}) => (
  <Box height="100%" width="85%">
    <Box mb={2}>
      <Typography variant="h4">{title}</Typography>
    </Box>
    <Box mb={2}>
      <Typography variant="subtitle1">{description}</Typography>
    </Box>

    {videoDescription && (
      <Box mb={2}>
        <Typography dangerouslySetInnerHTML={{ __html: `${videoDescription}` }} />
      </Box>
    )}

    {clusterCount && (
      <Box mb={4}>
        <Chip label={`${clusterCount} Competency Clusters`} size="small" variant="outlined" color="primary" />
      </Box>
    )}
    {progress ? (
      <Box
        sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}
      >
        <Box pr={2} fontWeight={800}>
          <Typography variant="body2">
            {progress.count}
            {' '}
            OF
            {' '}
            {progress.total}
            {' '}
            BADGES EARNED
          </Typography>
        </Box>
        <ProgressBadge {...progress} />
      </Box>
    ) : (
      <Box fontWeight={800}>
        <Typography>NOT STARTED</Typography>
      </Box>
    )}
  </Box>
);

export default PathwayDetail;
