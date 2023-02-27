import { FC } from 'react';
import { Grid } from '@material-ui/core';

type QuarterDesktopViewProps = {};

const QuarterDesktopView: FC<QuarterDesktopViewProps> = ({ children }) => (
  <Grid container>
    <Grid item xs={12} sm={12} md={10} xl={8}>
      {children}
    </Grid>
  </Grid>
);

export default QuarterDesktopView;
