import React, { FC, ReactElement } from 'react';
import {
  makeStyles,
  Breadcrumbs,
  Typography,
  Link,
  Theme,
  Box,
  Button,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useHistory } from 'react-router-dom';
import { Home } from '@material-ui/icons';
import { ITopLevelNav, Level } from '../../types/ui/ITopLevelNav';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.primary.main, // '#402383',
    width: '100%',
    height: '76px',
    display: 'flex',
    justifyContent: 'center',
    position: 'fixed',
    top: '76px',
    left: '0px',
    zIndex: 10,
  },
  link: {
    cursor: 'pointer',
  },
}));

interface BreadcrumbData {
  level: Level
  display: string | ReactElement
  href: string,
  nonDefaultPath?: boolean
}

const TopLevelNav: FC<ITopLevelNav> = ({
  level,
  pathwayId,
  clusterId,
  competencyId,
}) => {
  const history = useHistory();
  const classes = useStyles();

  const navItems: BreadcrumbData[] = [
    {
      level: Level.Home,
      display: <Home />,
      href: '/',
    },
    {
      level: Level.Pathway,
      display: Level.Pathway,
      href: `/pathway/${pathwayId}`,
    },
    {
      level: Level.Cluster,
      display: Level.Cluster,
      href: `/pathway/${pathwayId}/cluster/${clusterId}`,
    },
    {
      level: Level.Competency,
      display: Level.Competency,
      href: `/pathway/${pathwayId}/cluster/${clusterId}/competency/${competencyId}`,
    },
    {
      level: Level.Assessment,
      display: 'Assess',
      href: '',
      nonDefaultPath: true,
    },
    {
      level: Level.CompetencyLevel,
      display: 'Level',
      href: '',
      nonDefaultPath: true,
    },
  ];

  const currentNav: BreadcrumbData[] = [];
  for (let i = 0; i < navItems.length; i++) {
    const navItem = navItems[i];
    if (navItem.level === level || !navItem.nonDefaultPath) {
      currentNav.push(navItem);
    }
    if (navItem.level === level) {
      break;
    }
  }

  // eslint-disable-next-line max-len
  // const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => <Redirect to={event.currentTarget.href} />;

  const renderBreadcrumbs = (): ReactElement => (
    <Breadcrumbs
      className={classes.root}
      color="secondary"
      aria-label="breadcrumb"
      separator={
        <NavigateNextIcon style={{ color: '#ffffff' }} fontSize="small" />
        }
    >
      {currentNav.map((item, index) => {
        if (index === currentNav.length - 1) {
          return <Typography style={{ color: '#ffffff' }}>{item.display}</Typography>;
        }

        const onClick = () => {
          history.push(item.href);
        };

        /* eslint-disable jsx-a11y/anchor-is-valid */
        return (
          <Link color="inherit" onClick={onClick} className={classes.link}>
            {item.display}
          </Link>
        );
        /* eslint-disable jsx-a11y/anchor-is-valid */
      })}
    </Breadcrumbs>
  );

  return (
    <Box px={{ xs: 2, sm: 3, md: 7 }} fontSize={9}>
      {renderBreadcrumbs()}
    </Box>
  );
};

export default TopLevelNav;
