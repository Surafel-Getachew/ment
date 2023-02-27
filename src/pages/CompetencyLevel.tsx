// react related
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import _ from 'lodash';

// components
import Page from '../components/common/Page';
import Loading from '../components/common/Loading';
import TopLevelNav from '../components/common/TopLevelNav';

// stores
import { usePathway, PathwayContextValue } from '../stores/PathwayStore';

// types
import { ICompetencyLevel } from '../types/ICompetencyLevel';
import { Level } from '../types/ui/ITopLevelNav';

type KSAParams = {
  pathwayId: string;
  clusterId: string;
  competencyId: string;
  competencyLevelId: string;
};

const CompetencyLevel = () => {
  const {
    pathwayId,
    clusterId,
    competencyId,
    competencyLevelId,
  } = useParams<KSAParams>();

  const {
    isFetchingPathwayContent,
    singleCompetency,
    fetchSingleCompetency,
  } = usePathway() as PathwayContextValue;

  useEffect(() => {
    fetchSingleCompetency(pathwayId, clusterId, competencyId);
  }, []);

  if (isFetchingPathwayContent) {
    return <Loading message="Loading competency level" />;
  }
  if (!singleCompetency) {
    return null;
  }

  const renderKSAPage = () => {
    const level = singleCompetency.levels.find((l) => l.id === competencyLevelId);
    if (!level) {
      return null;
    }

    /* eslint-disable react/no-danger */
    return (
      <Page
        title={level.title}
        description={level.description}
        meta={[{ value: level.type }]}
      >
        <div dangerouslySetInnerHTML={{ __html: `${level.content}` }} />
      </Page>
    );
    /* eslint-enable react/no-danger */
  };

  return (
    <>
      <TopLevelNav
        level={Level.CompetencyLevel}
        pathwayId={pathwayId}
        clusterId={clusterId}
        competencyId={competencyId}
      />
      {renderKSAPage()}
    </>
  );
};

export default CompetencyLevel;
