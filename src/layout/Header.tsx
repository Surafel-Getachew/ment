import { Box, Typography } from '@material-ui/core';
import { FC } from 'react';

type HeaderProps = {};

const Header: FC<HeaderProps> = () => (
  <Box
    bgcolor="background.paper"
    width="100%"
    height="76px"
    position="fixed"
    top="0"
    left="0"
    zIndex="10"
  >
    <Box px={{ xs: 2, sm: 3, md: 7 }} py={2}>
      <Typography variant="h5">
        {/* <img alt="logo" src="/logo.png" width="25" height="25" />
          &nbsp;&nbsp;aspire */}
        <Typography variant="h5">
          <img alt="ASU logo" src="/asu-logo.png" width="40" height="30" />
&nbsp;&nbsp;Arizona State University
        </Typography>
      </Typography>
    </Box>
  </Box>
);

export default Header;
