import { Box, Typography } from '@material-ui/core';
import { FC } from 'react';
import AAIcon from '../asset/aspire-logo.png';

type FooterProps = {};

const Footer: FC<FooterProps> = () => (
  <Box textAlign="center">
    <Box mt={{ xs: 2, sm: 3, md: 5 }} p={2}>
      <Typography>
        Powered by&nbsp;
      </Typography>
      <Box my={1}>
        <a href="https://aspireability.io/" target="_blank" rel="noreferrer">
          <img alt="Aspire Ability Logo" src={AAIcon} height="15" />
        </a>
      </Box>
      <Typography>&copy; 2021</Typography>
    </Box>
  </Box>
);

export default Footer;
