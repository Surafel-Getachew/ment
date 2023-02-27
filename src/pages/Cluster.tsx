import { useEffect, ReactElement } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { isEmpty } from 'lodash';

import { Box } from '@material-ui/core';

import { usePathway, PathwayContextValue } from '../stores/PathwayStore';

import Page from '../components/common/Page';
import Card from '../components/common/Card';
import Section from '../components/common/Section';
import Loading from '../components/common/Loading';
import TopLevelNav from '../components/common/TopLevelNav';

import { Level } from '../types/ui/ITopLevelNav';
import convertToProgress from '../util/convertToIProgress';
import { ICompetencyCluster } from '../types/ICompetencyCluster';
import { UserActivityContextValue, useUserActivity } from '../stores/UserActivityStore';

type ClusterParams = {
  pathwayId: string;
  clusterId: string;
};

const Cluster = () => {
  const { pathwayId, clusterId } = useParams<ClusterParams>();
  const history = useHistory();

  const {
    isFetchingPathwayContent,
    singleCompetencyCluster,
    fetchSingleCompetencyCluster,
  } = usePathway() as PathwayContextValue;

  const {
    isFetchingUserActivity,
    singleUserCompetencyCluster,
    fetchSingleUserCompetencyCluster,
  } = useUserActivity() as UserActivityContextValue;

  useEffect(() => {
    fetchSingleCompetencyCluster(pathwayId, clusterId);
    fetchSingleUserCompetencyCluster(pathwayId, clusterId);
  }, []);

  // eslint-disable-next-line max-len
  if (isFetchingPathwayContent || isFetchingUserActivity) {
    return <Loading message="Loading Competency Clusters" />;
  }

  if (!singleUserCompetencyCluster || !singleCompetencyCluster) {
    return null;
  }
  const renderCompetencies = (): ReactElement[] | ReactElement | null => {
    let isCompleted;
    return (
      <Box>
        <Box>
          {
          singleCompetencyCluster?.competencies.map((competency) => {
            const onClick = () => {
              history.push(
                `/pathway/${pathwayId}/cluster/${clusterId}/competency/${competency.id}`,
              );
            };

            const userCompetency = singleUserCompetencyCluster.userCompetencies.find(
              (c) => c.competencyId === competency.id,
            );

            isCompleted = userCompetency
              ? userCompetency.completedAt !== null
              : false;

            return (
              <Box mb={1.5} key={competency.id}>
                <Card
                  title={competency.title}
                  description={competency.description}
                  label="Competency"
                  status={isCompleted ? 'Complete' : 'In Progress'}
                  meta={[
                    {
                      label: 'Required Level',
                      value: competency.requiredLevel,
                    },
                  ]}
                  onClick={onClick}
                />
              </Box>
            );
          })
}
        </Box>
      </Box>
    );
  };

  const renderProgress = () => {
    if (isEmpty(singleCompetencyCluster)) {
      return;
    }
    const progress = convertToProgress(
      singleUserCompetencyCluster.userCompetencies,
      'Competencies Attained',
    );
    // eslint-disable-next-line consistent-return
    return progress;
  };
  const renderCluster = () => (
    singleCompetencyCluster ? (
      <Page
        title={singleCompetencyCluster.title}
        description={singleCompetencyCluster.description}
        meta={[{ value: 'Cluster' }]}
        progress={renderProgress()}
      >
        <Section title="Competencies">{renderCompetencies()}</Section>
      </Page>
    ) : (null)
  );
  return (
    <>
      <TopLevelNav
        level={Level.Cluster}
        pathwayId={pathwayId}
        clusterId={clusterId}
      />
      {renderCluster()}
    </>
  );
};

export default Cluster;
