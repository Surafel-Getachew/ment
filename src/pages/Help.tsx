import { Box, Typography } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import QuarterDesktopView from '../components/common/QuarterDesktopView';

/* eslint-disable */
const Help = () => {
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
          <Typography variant="h5">Need help or seeing issues?</Typography>
        </Box>            
        <Typography>Please contact us at <a href="mailto:careerservices@asu.edu">careerservices@asu.edu</a> with the subject line 'ASU Ambitious Help'.</Typography>
      </Box>
  )
}

export default Help
