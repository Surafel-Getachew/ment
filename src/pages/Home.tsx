import {
  useEffect, ReactNode,
} from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box, Typography, Grid,
} from '@material-ui/core';

import { isNil } from 'lodash';
import moment from 'moment';

import Loading from '../components/common/Loading';
import PathwaysHero from '../components/common/PathwaysHero';
import PathwayCard from '../components/common/PathwayCard';
import CompletedPathwayCard from '../components/common/CompletedPathwayCard';

import { usePathway, PathwayContextValue } from '../stores/PathwayStore';

import convertToProgress from '../util/convertToIProgress';
import IPathway from '../types/IPathway';
import {
  UserActivityContextValue,
  useUserActivity,
} from '../stores/UserActivityStore';
import Tabs from '../components/common/Tabs';

const Home = () => {
  const history = useHistory();
  const {
    isFetchingPathwayContent,
    pathways,
    fetchPathways,
  } = usePathway() as PathwayContextValue;

  const {
    isFetchingUserActivity,
    userPathways,
    fetchUserPathways,
  } = useUserActivity() as UserActivityContextValue;

  useEffect(() => {
    fetchPathways();
    fetchUserPathways();
    // eslint-disable-next-line
  }, []);

  const renderPathwaysHelper = (pathways: IPathway[]) => {
    if (pathways.length === 0) {
      return <Typography>No Pathways Available</Typography>;
    }

    return pathways.map((pathway: IPathway) => {
      const onClick = () => history.push(`/pathway/${pathway.id}`);

      const userPathway = userPathways ? userPathways.find(
        (up) => up.pathwayId === pathway.id,
      ) : undefined;

      let progress;

      if (userPathway) {
        progress = convertToProgress(
          userPathway.userCompetencyClusters,
          'Competency Clusters Attained',
        );
      }
      return (
        <Box mb={3}>
          <PathwayCard
            title={pathway.title}
            description={pathway.description}
            clusterCount={pathway.clusters.length}
            imageUrl={pathway.imageUrl}
            progress={progress}
            onClick={onClick}
          />
        </Box>
      );
    });
  };

  const renderPathways = () => {
    if (isFetchingPathwayContent && isFetchingUserActivity) {
      return <Loading message="Loading Pathways" />;
    }

    if (isNil(userPathways) || isNil(pathways)) {
      return null;
    }

    let inProgressPathways: IPathway[];
    let notStartedPathways: IPathway[];

    if (userPathways && userPathways.length > 0) {
      inProgressPathways = pathways.filter((p) => {
        const userPathway = userPathways.find((up) => up.pathwayId === p.id);
        return userPathway !== undefined && userPathway.completedAt === null;
      });
      notStartedPathways = pathways.filter((p) => (
        userPathways.find((up) => up.pathwayId === p.id) === undefined
      ));
    } else {
      inProgressPathways = [];
      notStartedPathways = pathways;
    }

    return (
      <>
        { inProgressPathways.length > 0 && (
          <>
            <Box mb={2} fontWeight={700}><Typography variant="h6">In Progress</Typography></Box>
            {renderPathwaysHelper(inProgressPathways)}
          </>
        )}
        <Box mb={2} fontWeight={700}><Typography variant="h6">Not Started</Typography></Box>
        {renderPathwaysHelper(notStartedPathways)}
      </>
    );
  };

  const renderCompletedPathways = (): ReactNode => {
    if (isFetchingPathwayContent && isFetchingUserActivity) {
      return <Loading message="Loading Pathways" />;
    }

    if (isNil(userPathways) || isNil(pathways)) {
      return null;
    }

    const completedPw: IPathway[] = pathways.filter((p) => {
      const userPathway = userPathways.find((up) => up.pathwayId === p.id);
      return userPathway !== undefined && userPathway.completedAt !== null;
    });

    return (
      <Grid container spacing={2}>
        {completedPw.length === 0 && (
          <Typography>No Completed Pathways</Typography>
        )}
        {completedPw.map((completed) => {
          const userPathway = userPathways.find((up) => up.pathwayId === completed.id);
          return (
            <Grid item xs={12} sm={6} md={4} xl={3}>
              <CompletedPathwayCard
                onClick={() => history.push(`/pathway/${completed.id}`)}
                title={completed.title}
                date={moment(userPathway?.completedAt).format('MMMM D, YYYY')}
              />
            </Grid>
          );
        })}
      </Grid>
    );
  };

  const renderTabs = () => {
    const navItems = [
      'Active',
      'Completed',
    ];
    const selectedTab = navItems[0];
    const contentItems: ReactNode[] = [
      renderPathways(),
      renderCompletedPathways(),
    ];

    return (
      <Tabs
        navItems={navItems}
        contentItems={contentItems}
        selected={selectedTab}
        size="xl"
      />
    );
  };

  return (
    <Box height="100%">
      <PathwaysHero />
      <Box
        height="100%"
        py={3}
        px={{ xs: 2, sm: 3, md: 7 }}
      >
        {renderTabs()}
      </Box>
    </Box>
  );
};

export default Home;
