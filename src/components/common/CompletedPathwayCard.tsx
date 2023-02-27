/* eslint-disable */
import { FC } from 'react';
import { Box, makeStyles, Typography, Button } from '@material-ui/core';
import CertificateImg from '../../asset/certificate.png';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '460px',
    marginBottom: '32px',
    backgroundColor: theme.palette.background.paper,
    cursor: 'pointer',
    display: 'flex',
  },
  imgContainer: {
    width: '166px',
    height: '166px',
    borderRadius: '50%',
    background: '#EFEFEF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

type CardProps = {
  title: string;
  date: string;
  onClick?: () => void;
};

const CompletedPathwayCard: FC<CardProps> = ({ title, date, onClick }) => {
  const classes = useStyles();
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <Box className={classes.root} p={3} onClick={handleClick}>
      <Box width="100%" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box className={classes.imgContainer}>
          <img src={CertificateImg} alt="certificate" />
        </Box>
        <Box mt={2}>
          <Typography variant="subtitle2">{date}</Typography>
        </Box>
        <Box flexGrow="1" mt={1} minHeight="" textAlign="center">
          <Typography variant="h4">{title}</Typography>
        </Box>
        <Box mt={6}>
          <Button color='primary' variant='contained'>
            View Pathway
          </Button>
        </Box>
        <Box mt={2}>
          <Typography variant='button'>View Pathway Detail</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CompletedPathwayCard;
