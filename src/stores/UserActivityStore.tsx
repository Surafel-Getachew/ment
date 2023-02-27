import { createContext, useContext, useState } from 'react';
import { aspireApi } from '../api';
import { IUserAssessment } from '../types/IUserAssessment';
import { IUserCompetency } from '../types/IUserCompetency';
import { IUserCompetencyCluster } from '../types/IUserCompetencyCluster';
import { IUserPathway } from '../types/IUserPathway';

export type UserActivityContextValue = {
  isFetchingUserActivity: boolean;

  userPathways: IUserPathway[] | undefined;
  fetchUserPathways: () => void;

  singleUserPathway: IUserPathway | undefined;
  fetchSingleUserPathway: (pathwayId: string) => void;

  singleUserCompetencyCluster: IUserCompetencyCluster | undefined;
  fetchSingleUserCompetencyCluster: (
    pathwayId: string,
    clusterId: string
  ) => void;

  singleUserCompetency: IUserCompetency | undefined;
  fetchSingleUserCompetency: (
    pathwayId: string,
    competencyId: string
  ) => void;

  singleUserAssessment: IUserAssessment | undefined;
  fetchSingleUserAssessment: (
    pathwayId: string,
    competency: string,
    assessmentId: string,
  ) => void;

  enrollInPathway: (pathwayId: string) => void;

  // Assessment

  learnosityAssessmentRequest: any,
  fetchLearnosityAssessment: (assessmentName: string, assessmentIdentifier: string) => void;

  latestAssessmentScore: number | null;
  submitAssessment: (
    userCompetencyId: string,
    assessmentId: string,
    score: number,
    maxScore: number,
    scorePercentage: number,
  ) => void;
  clearLatestAssessmentScore: () => void;

};

const UserActivityContext = createContext<undefined | UserActivityContextValue>(
  undefined,
);

export const useUserActivity = () => useContext(UserActivityContext);

const PathwayProvider = ({ children }: any) => {
  const [isFetchingUserActivity, setIsFetchingUserActivity] = useState<boolean>(true);

  const [userPathways, setUserPathways] = useState<IUserPathway[]>();

  const [singleUserPathway, setSingleUserPathway] = useState<IUserPathway>();

  const [
    singleUserCompetencyCluster,
    setSingleUserCompetencyCluster,
  ] = useState<IUserCompetencyCluster>();

  const [
    singleUserCompetency,
    setSingleUserCompetency,
  ] = useState<IUserCompetency>();

  const [
    singleUserAssessment,
    setSingleUserAssessment,
  ] = useState<IUserAssessment>();

  const [learnosityAssessmentRequest, setLearnosityAssessmentRequest] = useState<any>([]);

  const [latestAssessmentScore, setLatestAssessmentScore] = useState<number | null>(null);

  const fetchUserPathways = async () => {
    try {
      setIsFetchingUserActivity(true);
      const res = await aspireApi.get('/userPathways');
      setUserPathways(res.data);
      setIsFetchingUserActivity(false);
    } catch (error) {
      setIsFetchingUserActivity(false);
    }
  };

  const clearPathwayTree = () => {
    setSingleUserPathway(undefined);
    setSingleUserCompetencyCluster(undefined);
    setSingleUserCompetency(undefined);
    setSingleUserAssessment(undefined);
  };

  const fetchSingleUserPathway = async (
    pathwayId: string,
    onFetch?: (userPathway: IUserPathway | undefined) => void,
  ) => {
    // Only fetch if not already fetched
    if (singleUserPathway && singleUserPathway.pathwayId === pathwayId) {
      setIsFetchingUserActivity(true);
      if (onFetch) {
        onFetch(singleUserPathway);
      }
      setIsFetchingUserActivity(false);
      return;
    }

    try {
      setIsFetchingUserActivity(true);
      clearPathwayTree();
      const res = await aspireApi.get(
        `/userPathways/${pathwayId}`,
      );
      setSingleUserPathway(res.data);
      if (onFetch) {
        onFetch(res.data);
      }
      setIsFetchingUserActivity(false);
    } catch (error) {
      setIsFetchingUserActivity(false);
    }
  };

  const fetchSingleUserCompetencyCluster = async (
    pathwayId:string,
    clusterId: string,
  ) => {
    await fetchSingleUserPathway(pathwayId, (userPathway: IUserPathway | undefined) => {
      if (userPathway) {
        const userCompetencyCluster = userPathway.userCompetencyClusters.find(
          (ucc) => ucc.competencyClusterId === clusterId,
        );
        setSingleUserCompetencyCluster(userCompetencyCluster);
      }
    });
  };

  const fetchSingleUserCompetency = async (
    pathwayId:string,
    competencyId: string,
    onFetch?: (userCompetency: IUserCompetency | undefined) => void,
  ) => {
    await fetchSingleUserPathway(pathwayId, (userPathway: IUserPathway | undefined) => {
      if (userPathway) {
        const userCompetency = userPathway.userCompetencies.find(
          (uc) => uc.competencyId === competencyId,
        );
        setSingleUserCompetency(userCompetency);
        if (onFetch) {
          onFetch(userCompetency);
        }
      }
    });
  };

  const fetchSingleUserAssessment = async (
    pathwayId:string,
    competencyId: string,
    assessmentId: string,
  ) => {
    await fetchSingleUserCompetency(
      pathwayId,
      competencyId,
      (userCompetency: IUserCompetency | undefined) => {
        if (userCompetency) {
          const userAssessment = userCompetency.userAssessments.find(
            (ua) => ua.assessmentId === assessmentId,
          );
          setSingleUserAssessment(userAssessment);
        }
      },
    );
  };

  const enrollInPathway = async (pathWayId: string) => {
    try {
      setIsFetchingUserActivity(true);
      const res = await aspireApi.post(`/userPathways/${pathWayId}/enroll`, {});
      setSingleUserPathway(res.data);
      setIsFetchingUserActivity(false);
    // eslint-disable-next-line no-empty
    } catch (error) {
      setIsFetchingUserActivity(false);
    }
  };

  const fetchLearnosityAssessment = async (
    assessmentName: string,
    assessmentIdentifier: string,
  ) => {
    // TODO get from data structure
    // const assessmentId = 'f8ac31c3-7fa2-4d7b-a77c-37e1d0ef76df'; // leanosity demo
    // const assessmentId = '3520077b-1729-470a-abeb-5aeb6439fe5d'; // dev
    // const assessmentName = 'Demo Assessment';

    try {
      setIsFetchingUserActivity(true);
      const { data } = await aspireApi.post('/userAssessments/fetch', { assessmentId: assessmentIdentifier, assessmentName });
      setLearnosityAssessmentRequest(data);
      setIsFetchingUserActivity(false);
    } catch (e) {
      setIsFetchingUserActivity(false);
    }
  };

  const submitAssessment = async (
    userCompetencyId: string,
    assessmentId: string,
    score: number,
    maxScore: number,
    scorePercentage: number,
  ) => {
    try {
      setIsFetchingUserActivity(true);
      const res = await aspireApi.post('/userAssessments/submit', {
        userCompetencyId,
        assessmentId,
        score,
        maxScore,
        scorePercentage,
      });
      setSingleUserPathway(res.data);
      setLatestAssessmentScore(scorePercentage);
      setLearnosityAssessmentRequest(undefined);
    } catch (e) {
      setIsFetchingUserActivity(false);
    }
  };

  const clearLatestAssessmentScore = () => {
    setLatestAssessmentScore(null);
  };

  return (
    <UserActivityContext.Provider
      value={{
        isFetchingUserActivity,
        userPathways,
        fetchUserPathways,
        singleUserPathway,
        fetchSingleUserPathway,
        singleUserCompetencyCluster,
        fetchSingleUserCompetencyCluster,
        singleUserCompetency,
        fetchSingleUserCompetency,
        singleUserAssessment,
        fetchSingleUserAssessment,
        enrollInPathway,
        learnosityAssessmentRequest,
        fetchLearnosityAssessment,
        latestAssessmentScore,
        submitAssessment,
        clearLatestAssessmentScore,
      }}
    >
      {children}
    </UserActivityContext.Provider>
  );
};

export default PathwayProvider;
