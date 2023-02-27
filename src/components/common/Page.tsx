import { FC } from 'react';
import { Box, Typography } from '@material-ui/core';
import Metadata from './Metadata';
import Progress from './Progress';
import { IProgress } from '../../types/ui/IProgress';
import { IMetadata } from '../../types/ui/IMetadata';

type PageProps = {
  title: string;
  meta?: IMetadata[];
  description?: string;
  progress?: IProgress;
};
const Page: FC<PageProps> = ({
  title,
  meta,
  description,
  children,
  progress,
}) => (
  <Box height="100%" py={{ xs: 2, sm: 4, md: 4 }}>
    <Box>
      {meta && <Metadata meta={meta} />}
      <Typography variant="h3">{title}</Typography>
      {description && (
      <Box mt={1}>
        <Typography variant="h6" color="textSecondary">
          {description}
        </Typography>
      </Box>
      )}
      {progress && (
      <Box mt={1}>
        <Progress
          total={progress.total}
          count={progress.count}
          label={progress.label}
        />
      </Box>
      )}
    </Box>
    <Box py={{ xs: 3, sm: 4 }}>{children}</Box>
  </Box>
);

export default Page;
