/* eslint-disable */
import {
  Box,
  Typography,
  makeStyles,
  createStyles,
  Theme,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';

const heroImagePath = 'https://aspire-client-assets.s3.amazonaws.com/asu-8375f8d98a5f/asu-banner-image-3.jpeg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heroCard: {
      backgroundColor: theme.palette.primary.main,
      width: '490px',
      position: 'absolute',
      top: '300px',
      height: '115px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    heroCardResponsive: {
      backgroundColor: theme.palette.primary.main,
      height: '115px',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    heroImage: {
      width: '100%',
      height: 460,
      background: `url(${heroImagePath}) no-repeat center center fixed`,
      backgroundSize: 'cover',      
    },
    heroImageResponsive: {
      width: '100%',
      height: 300,
      background: `url(${heroImagePath}) no-repeat center/70%`,
      backgroundSize: 'cover',      
    }
  })
);

const PathwayHero = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const heroCardStyle = isSmallScreen
    ? classes.heroCardResponsive
    : classes.heroCard;
  const heroImageStyle = isSmallScreen
    ? classes.heroImageResponsive
    : classes.heroImage;
  return (
    <Box>
      <Box className={heroImageStyle}>
        {/* <img src={PathwayCover} alt='Hero Image'  /> */}
      </Box>
      <Box px={2} className={heroCardStyle} >
        <Typography style={{ color: '#FFFFFF' }} variant='h3'>
          My Pathways
        </Typography>
      </Box>
    </Box>
  );
};

export default PathwayHero;
