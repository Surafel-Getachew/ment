import { useState } from 'react';
import {
  Box, Typography, Grid, makeStyles, createStyles, Theme,
} from '@material-ui/core';
import ChevronRight from '../../asset/chevron-right.png';
import QuarterDesktopView from './QuarterDesktopView';

const useStyles = makeStyles((theme: Theme) => createStyles({
  selected: {
    border: `2px solid ${theme.palette.primary.light}`,
    borderRadius: '6px',
    cursor: 'pointer',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  navItem: {
    backgroundColor: theme.palette.background.paper,
    cursor: 'pointer',
    boxShadow: '0px 3px 8px 0px rgba(0, 0, 0, 0.06)',
    borderRadius: '6',
  },
}));

type NavItems = {
  id: string;
  meta: String;
  title: String;
  children: any;
};

const LeftNav = (props: { navItems: NavItems[] }) => {
  const classes = useStyles();
  const { navItems } = props;
  const [activeNav, setActiveNav] = useState<{
    id: string;
    meta: String;
    title: String;
    children: any;
  }>(navItems[0]);

  if (navItems.length === 1) {
    return (
      <Box>
        <QuarterDesktopView>
          {activeNav.children}
        </QuarterDesktopView>
      </Box>
    );
  }

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item md={3} lg={3}>
          {navItems.map((item) => {
            const navItemStyles = item.id === activeNav.id ? classes.selected : classes.navItem;

            return (
              <Box
                onClick={() => setActiveNav(item)}
                borderBottom="1px solid #CACACA"
                p={2}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                className={navItemStyles}
              >
                <Box display="flex" flexDirection="column">
                  <Box py={1}>
                    <Typography variant="caption">{item.meta}</Typography>
                  </Box>
                  <Typography variant="button">{item.title}</Typography>
                </Box>
                <Box>
                  <img src={ChevronRight} alt="chevron-right" />
                </Box>
              </Box>
            );
          })}
        </Grid>
        <Grid item md={9} lg={9}>
          {activeNav && activeNav.children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default LeftNav;
