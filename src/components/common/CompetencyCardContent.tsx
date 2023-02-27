/* eslint-disable */
import { FC } from 'react';
import { 
  Box, 
  Typography,
  Theme,
  makeStyles,
  createStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  hero: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '6px',
    boxShadow: '0px 19px 20px rgba(0, 0, 0, 0.03), 0px 3px 8px rgba(0, 0, 0, 0.06)',
  },
}));

type CompetencyContentPros = {
  meta: string;
  title: string;
  description: string;
  content?: string;
};

const CompetencyCardContent: FC<CompetencyContentPros> = ({
  meta,
  title,
  description,
  content,
}) => {
  const classes = useStyles();

  return (
    <Box px={{ xs: 1, md: 4 }} py={2} className={classes.hero}>
      <Box mb={1}>
        <Typography variant='caption'>{meta}</Typography>
      </Box>
      <Box mb={1}>
        <Typography variant='h3'>{title}</Typography>
      </Box>
      <Box>
        <Typography variant='body1'>{description}</Typography>
      </Box>
      <Box>
        {content && <Box dangerouslySetInnerHTML={{ __html: `${content}` }} />}
      </Box>
    </Box>
  );
};

export default CompetencyCardContent;
