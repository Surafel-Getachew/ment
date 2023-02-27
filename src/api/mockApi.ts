/* eslint-disable max-len */
/* eslint-disable no-plusplus */
import { AxiosInstance } from 'axios';
import _ from 'lodash';
// import MockAdapter from "axios-mock-adapter";
import MockAdapter from 'axios-mock-adapter-path-params';
import pathwaysData from '../mock/pathways.json';
import userProgress from '../mock/userProgress.json';
import users from '../mock/users.json';
import { ICompetency } from '../types/ICompetency';
import { ICompetencyCluster } from '../types/ICompetencyCluster';
import IPathway from '../types/IPathway';
import { IUserPathway } from '../types/IUserPathway';

const currentUser = users[0];
const pathways: IPathway[] = JSON.parse(JSON.stringify(pathwaysData));
const allUserPathways: IUserPathway[] = JSON.parse(JSON.stringify(userProgress));

const findPathway = (pathwayId: string): IPathway | undefined => pathways.find((p) => p.id === pathwayId);

const findCluster = (clusterId:string): ICompetencyCluster | undefined => {
  let searchedCluster;
  _.each(pathways, (pathway) => {
    const cluster = _.find(pathway.clusters, { id: clusterId });
    if (cluster) {
      searchedCluster = cluster;
    }
  });
  return searchedCluster;
};

// eslint-disable-next-line consistent-return
const findCompetency = (pathway: IPathway, competencyId: string): ICompetency | undefined => {
  if (pathway) {
    for (let i = 0; i < pathway.clusters.length; i++) {
      const cluster = pathway.clusters[i];
      for (let j = 0; j < cluster.competencies.length; j++) {
        const competency = cluster.competencies[j];
        if (competency.id === competencyId) {
          return competency;
        }
      }
    }
  }
};

const uuidFormat = '[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}';
const routeParams = {
  ':userId': uuidFormat,
  ':pathwayId': uuidFormat,
  ':clusterId': uuidFormat,
  ':competencyId': uuidFormat,
  ':competencyLevelId': uuidFormat,
};

// Define your mocks here
const initMock = (mock: MockAdapter) => {
  // == Learnosity ==
  mock.onGet('/assessments').reply(async (config: any) => {
    console.log('mock api:', config.url); // eslint-disable-line no-console
    // assessmentId: 'aspire-simple-demo-trivia'
    // leanosity demo
    // const assessmentId = 'f8ac31c3-7fa2-4d7b-a77c-37e1d0ef76df';

    // # dev
    const assessmentId = '3520077b-1729-470a-abeb-5aeb6439fe5d';

    const body = {
      assessmentName: 'Aspire Demo Assessment',
      assessmentId,
    };

    const rawResponse = await fetch('http://local.aspire.com:5200/api/learnosity/assessment', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const response = await rawResponse.json();

    return [200, response];
  });

  mock.onPost('/assessments/pathway/:pathwayId/competency/:competencyId/submit').reply((config: any) => {
    console.log('mock api:', config.url); // eslint-disable-line no-console

    const userPathway = allUserPathways.filter((up) => up.userId === currentUser.id).find((up) => up.pathwayId === config.routeParams.pathwayId);

    let competency;

    if (userPathway) {
      for (let j = 0; j < userPathway.userCompetencies.length; j++) {
        const comp = userPathway.userCompetencies[j];
        if (comp.competencyId === config.routeParams.competencyId) {
          competency = comp;
          break;
        }
      }
    }

    if (competency) {
      competency.completedAt = new Date();
    }

    return [200, {}];
  });

  // == Users ==
  mock.onGet('/users/me').reply((config: any) => {
    console.log('/user/me'); // eslint-disable-line no-console
    return [200, currentUser];
    // return [401, {}];
  });

  mock.onPost('/signIn').reply((config: any) => {
    console.log('signIn'); // eslint-disable-line no-console
    return [200, currentUser];
  });

  // == Pathway, Competencies and Levels
  mock.onGet('/pathways').reply(200, pathways);

  mock.onGet('/pathways/:pathwayId').reply((config: any) => {
    const pathway = findPathway(config.routeParams.pathwayId);
    return [200, pathway];
  });

  mock.onGet('/clusters/:clusterId').reply((config: any) => {
    const cluster = findCluster(config.routeParams.clusterId);
    return [200, cluster];
  });

  // before /pathways/:pathwayId/competency/:competencyId
  mock.onGet('/competencies/:competencyId').reply((config: any) => {
    const pathway = findPathway(config.routeParams.pathwayId);
    if (!pathway) {
      return [200, undefined];
    }

    const competency = findCompetency(pathway, config.routeParams.competencyId);
    return [200, competency];
  });

  // == User progress
  // before /userPathways/:userId
  mock.onGet('/userPathways').reply((config: any) => {
    // const userPathways = allUserPathways.filter((up) => up.userId === config.routeParams.userId);
    const userPathways = allUserPathways.filter((up) => up.userId === currentUser.id);
    return [200, userPathways];
  });
  // before/userPathways/:userId/pathway/:pathwayId
  mock.onGet('/userPathways/:pathwayId').reply((config: any) => {
    const userPathway = allUserPathways.filter((up) => up.userId === currentUser.id).find((up) => up.pathwayId === config.routeParams.pathwayId);
    return [200, userPathway];
  });

  // mock.onGet('/userPathways/:userId/pathway/:pathwayId/competency/:competencyId').reply((config: any) => {
  mock.onGet('/userPathways/:pathwayId/competencies/:competencyId').reply((config: any) => {
    const userPathway = allUserPathways.filter((up) => up.userId === currentUser.id).find((up) => up.pathwayId === config.routeParams.pathwayId);

    let competency;

    if (userPathway) {
      for (let j = 0; j < userPathway.userCompetencies.length; j++) {
        const comp = userPathway.userCompetencies[j];
        if (comp.competencyId === config.routeParams.competencyId) {
          competency = comp;
        }
      }
    }

    return [200, competency];
  });
};

const wrapWithMock = (axios: AxiosInstance) => {
  const mock = new MockAdapter(axios, {}, routeParams);
  initMock(mock);
  return mock;
};

export default wrapWithMock;
