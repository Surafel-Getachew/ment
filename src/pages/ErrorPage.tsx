import { Box, Typography } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import QuarterDesktopView from '../components/common/QuarterDesktopView';

/* eslint-disable */
const Error = () => {
  const history = useHistory();
  return (
      <Box
        py={3}
        px={{ xs: 2, sm: 3, md: 6 }}
        borderRadius={6}
      >
        <Box
          display='flex'
          onClick={() => history.push('/')}
          style={{ cursor: 'pointer' }}
          width='100%'
          mb={2}
        >
          <ArrowBack color="primary" />
          <Box px={1}>
            <Typography color='primary' variant='body1'>
              Back to Home
            </Typography>
          </Box>
        </Box>
        <Box mb={2}>
          <Typography variant="h5">Error</Typography>
        </Box>
        <QuarterDesktopView>          
          <Typography component="p">We have encountered an error while processing your request. Please try again or contact your administrator if the problem persists.</Typography>
        </QuarterDesktopView>
      </Box>
  )
}

export default Error;
