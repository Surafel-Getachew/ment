import { createContext, useContext, useState } from 'react';
import { aspireApi } from '../api';
import Cluster from '../pages/Cluster';
import { IAssessment } from '../types/IAssessment';
import { ICompetency } from '../types/ICompetency';
import { ICompetencyCluster } from '../types/ICompetencyCluster';
import IPathway from '../types/IPathway';

export type PathwayContextValue = {
  isFetchingPathwayContent: boolean;

  pathways: IPathway[];
  fetchPathways: () => void;

  singlePathway: IPathway | undefined;
  fetchSinglePathway: (pathwayId: string) => void;

  singleCompetencyCluster: ICompetencyCluster | undefined;
  fetchSingleCompetencyCluster: (pathwayId: string, clusterId: string) => void;

  singleCompetency: ICompetency | undefined;
  fetchSingleCompetency: (pathwayId: string, clusterId: string, competencyId: string) => void;

  singleAssessment: IAssessment | undefined;
  fetchSingleAssessment: (pathwayId: string, clusterId: string, competencyId: string) => void;
};

const PathwayContext = createContext<undefined | PathwayContextValue>(
  undefined,
);

export const usePathway = () => useContext(PathwayContext);

const PathwayProvider = ({ children }: any) => {
  const [isFetchingPathwayContent, setIsFetchingPathwayContent] = useState<boolean>(true);

  const [pathways, setPathways] = useState<IPathway[]>([]);
  const [singlePathway, setSinglePathway] = useState<IPathway>();
  const [singleCompetencyCluster, setSingleCompetencyCluster] = useState<ICompetencyCluster>();
  const [singleCompetency, setSingleCompetency] = useState<ICompetency>();
  const [singleAssessment, setSingleAssessment] = useState<IAssessment>();

  const fetchPathways = async () => {
    try {
      setIsFetchingPathwayContent(true);
      const { data } = await aspireApi.get('/pathways');
      setPathways(data);
      setIsFetchingPathwayContent(false);
    } catch (e) {
      setIsFetchingPathwayContent(false);
    }
  };

  const fetchSinglePathway = async (
    pathWayId: string,
    onFetch?: (pathway: IPathway | undefined) => void,
  ) => {
    // Only fetch if not already fetched
    if (singlePathway && singlePathway.id === pathWayId) {
      if (onFetch) {
        onFetch(singlePathway);
      }
      return;
    }

    try {
      setIsFetchingPathwayContent(true);
      const res = await aspireApi.get(`/pathways/${pathWayId}`);
      setSinglePathway(res.data);
      if (onFetch) {
        onFetch(res.data);
      }
      setIsFetchingPathwayContent(false);
    // eslint-disable-next-line no-empty
    } catch (error) {
      setIsFetchingPathwayContent(false);
    }
  };

  const fetchSingleCompetencyCluster = async (
    pathwayId:string,
    clusterId: string,
    onFetch?: (cluster: ICompetencyCluster | undefined) => void,
  ) => {
    await fetchSinglePathway(pathwayId, (pathway: IPathway | undefined) => {
      if (pathway) {
        const competencyCluster = pathway.clusters.find((c) => c.id === clusterId);
        setSingleCompetencyCluster(competencyCluster);
        if (onFetch) {
          onFetch(competencyCluster);
        }
      }
    });
  };

  const fetchSingleCompetency = async (
    pathwayId:string,
    clusterId: string,
    competencyId: string,
    onFetch?: (competency: ICompetency | undefined) => void,
  ) => {
    await fetchSingleCompetencyCluster(
      pathwayId,
      clusterId,
      (cluster: ICompetencyCluster | undefined) => {
        if (cluster) {
          const competency = cluster.competencies.find((c) => c.id === competencyId);
          setSingleCompetency(competency);
          if (onFetch) {
            onFetch(competency);
          }
        }
      },
    );
  };

  const fetchSingleAssessment = async (
    pathwayId:string,
    clusterId: string,
    competencyId: string,
  ) => {
    await fetchSingleCompetency(
      pathwayId,
      clusterId,
      competencyId,
      (competency: ICompetency | undefined) => {
        if (competency) {
          const assessment = competency.assessments[0];
          setSingleAssessment(assessment);
        }
      },
    );
  };

  return (
    <PathwayContext.Provider
      value={{
        isFetchingPathwayContent,
        pathways,
        fetchPathways,
        singlePathway,
        fetchSinglePathway,
        singleCompetencyCluster,
        fetchSingleCompetencyCluster,
        singleCompetency,
        fetchSingleCompetency,
        singleAssessment,
        fetchSingleAssessment,
      }}
    >
      {children}
    </PathwayContext.Provider>
  );
};

export default PathwayProvider;
