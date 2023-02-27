import {
  ReactNode, useEffect, useState, ChangeEvent,
} from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';

import { isNil, last, orderBy } from 'lodash';

import { Box, Typography } from '@material-ui/core';

import Loading from '../components/common/Loading';
import PathwayHero from '../components/common/PathwayHero';
import ClusterAccordion from '../components/common/ClusterAccordion';
import CompetencyCard from '../components/common/CompetencyCard';
import Tabs from '../components/common/Tabs';

import convertToProgress from '../util/convertToIProgress';

import { IUserCompetencyCluster } from '../types/IUserCompetencyCluster';
import { ICompetencyCluster } from '../types/ICompetencyCluster';

import { usePathway, PathwayContextValue } from '../stores/PathwayStore';
import {
  UserActivityContextValue,
  useUserActivity,
} from '../stores/UserActivityStore';

type PathwayParams = {
  pathwayId: string;
};

export const Pathway = () => {
  const history = useHistory();
  const { pathwayId } = useParams<PathwayParams>();
  const queryParams = new URLSearchParams(useLocation().search);

  const [value, setValue] = useState(0);

  const {
    isFetchingPathwayContent,
    singlePathway,
    singleCompetencyCluster,
    fetchSinglePathway,
  } = usePathway() as PathwayContextValue;

  const {
    isFetchingUserActivity,
    singleUserPathway,
    fetchSingleUserPathway,
    enrollInPathway,
  } = useUserActivity() as UserActivityContextValue;

  useEffect(() => {
    fetchSinglePathway(pathwayId);
    fetchSingleUserPathway(pathwayId);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!queryParams.get('noScroll') && singleCompetencyCluster) {
      const anchor = document.getElementById(`cluster-${singleCompetencyCluster.id}`);
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [singleCompetencyCluster]);

  if (isFetchingPathwayContent || isFetchingUserActivity) {
    return <Loading message="Loading Pathways" />;
  }

  if (!singlePathway) {
    return null;
  }

  const renderProgress = () => {
    if (!singleUserPathway) {
      return;
    }
    const progress = convertToProgress(
      singleUserPathway.userCompetencyClusters,
      'Competency Clusters Complete',
    );
    // eslint-disable-next-line consistent-return
    return progress;
  };

  const findUserCompetencyCluster = (
    clusterId: string,
  ): IUserCompetencyCluster | undefined => {
    if (singleUserPathway) {
      return singleUserPathway.userCompetencyClusters.find(
        (ucc) => ucc.competencyClusterId === clusterId,
      );
    }

    return undefined;
  };

  // Render cycle

  const clusterToProgress: any = {};
  singlePathway.clusters.forEach((cluster) => {
    const userCompetencyCluster = findUserCompetencyCluster(cluster.id);
    if (userCompetencyCluster) {
      clusterToProgress[cluster.id] = userCompetencyCluster;
    }
  });

  const inProgressClusters: ICompetencyCluster[] = [];
  const completedClusters: ICompetencyCluster[] = [];
  singlePathway.clusters.forEach((cluster) => {
    if (
      clusterToProgress[cluster.id]
      && !isNil(clusterToProgress[cluster.id].completedAt)
    ) {
      completedClusters.push(cluster);
    } else {
      inProgressClusters.push(cluster);
    }
  });

  const findUserCompetency = (competencyId: string) => {
    let competency;
    if (singleUserPathway) {
      competency = singleUserPathway.userCompetencies.find(
        (uc) => uc.competencyId === competencyId,
      );
      return competency;
    }

    return undefined;
  };
  // eslint-disable-next-line max-len
  const renderClusters = (clusters: ICompetencyCluster[]): ReactNode[] => {
    const orderedClusters = orderBy(clusters, ['createdAt'], ['asc']);
    return orderedClusters.map((cluster) => {
      const userCompetencyCluster = clusterToProgress[cluster.id];
      const clusterProgress = userCompetencyCluster
        ? convertToProgress(
          userCompetencyCluster.userCompetencies,
          'Competencies Attained',
        )
        : undefined;

      const clusterProps = {
        id: cluster.id,
        title: cluster.title,
        progress: clusterProgress,
        description: cluster.description,
        videoUrl: cluster.videoUrl,
        numberOfCompetencies: cluster.competencies.length,
        open: singleCompetencyCluster && singleCompetencyCluster.id === cluster.id,
      };

      const orderedCompetencies = orderBy(cluster.competencies, ['createdAt'], ['asc']);
      return (
        <Box id={`cluster-${cluster.id}`}>
          <ClusterAccordion {...clusterProps}>
            {orderedCompetencies.map((competency, index) => (
              <Box mb={2} key={competency.id}>
                <CompetencyCard
                  title={competency.title}
                  description={competency.description}
                  competencyNumber={index + 1}
                  competencyStatus={findUserCompetency(competency.id)}
                  onClick={() => history.push(
                    `/pathway/${pathwayId}/cluster/${cluster.id}/competency/${competency.id}`,
                  )}
                  onTakeAssessmentClick={() => history.push(
                    `/pathway/${pathwayId}/cluster/${cluster.id}/competency/${competency.id}/assessments`,
                  )}
                  lastItem={cluster.competencies.length === index + 1}
                />
              </Box>
            ))}

          </ClusterAccordion>
        </Box>
      );
    });
  };

  const renderTabs = () => {
    const navItems = [
      `All (${singlePathway.clusters.length})`,
      `In Progress (${inProgressClusters.length})`,
      `Completed (${completedClusters.length})`,
    ];
    const selectedTab = navItems[0];
    const contentItems: ReactNode[] = [
      renderClusters(singlePathway.clusters),
      renderClusters(inProgressClusters),
      renderClusters(completedClusters),
    ];

    return (
      <Tabs
        navItems={navItems}
        contentItems={contentItems}
        selected={selectedTab}
      />
    );
  };

  return (
    <>
      <PathwayHero
        title={singlePathway.title}
        description={singlePathway.description}
        videoDescription={singlePathway.details.videoDescription}
        imageUrl={singlePathway.imageUrl}
        videoUrl={singlePathway.videoUrl}
        progress={renderProgress()}
        onBackArrowClick={() => history.push('/')}
        onPathwayEnroll={() => enrollInPathway(pathwayId)}
      />
      <Box py={2} px={{ xs: 2, sm: 3, md: 7 }} style={{ backgroundColor: '#898989', color: '#ffffff' }}>
        <Box fontWeight={800}>
          <Typography variant="h5">
            TOPICS
          </Typography>
        </Box>
      </Box>
      <Box
        py={3}
        px={{ xs: 2, sm: 3, md: 7 }}
        style={{ background: '#f9f9f9' }}
      >
        {renderTabs()}
      </Box>
    </>
  );
};
