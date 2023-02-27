import { FC } from 'react';
import { Box, Typography } from '@material-ui/core';
import { IMetadata } from '../../types/ui/IMetadata';
import Metadata from './Metadata';

type SectionProps = {
  title: string;
  meta?: IMetadata[];
  description?: string;
  collapse?: boolean;
};
const Section: FC<SectionProps> = ({
  title,
  meta,
  description,
  collapse,
  children,
}) => (
  <Box pb={3}>
    <Box mb={1.5}>
      {meta && <Metadata meta={meta} />}
      <Typography variant="h5">{title}</Typography>
      {description && (
        <Box>
          <Typography variant="subtitle1" color="textSecondary">
            {description}
          </Typography>
        </Box>
      )}
    </Box>
    <Box>{children}</Box>
  </Box>
);
export default Section;
