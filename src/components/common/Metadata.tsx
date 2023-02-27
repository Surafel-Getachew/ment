import { FC } from 'react';
import { Box, Typography } from '@material-ui/core';
import { IMetadata } from '../../types/ui/IMetadata';

type MetadataProps = {
  meta: IMetadata[];
};
const Metadata: FC<MetadataProps> = ({ meta }) => (
  <Box>
    {meta.map((item) => {
      const label = item.label ? `${item.label}: ` : '';
      return (
        <Box key={item.value} display="inline" mr={3}>
          <Typography variant="caption">
            {label}
            {item.value}
          </Typography>
        </Box>
      );
    })}
  </Box>
);

export default Metadata;
