import { FC } from 'react';
import Home from './Home';
import { Pathway } from './Pathway';
import Cluster from './Cluster';
import Competency from './Competency';
import CompetencyLevel from './CompetencyLevel';
import Assessment from './Assessment';
import Login from './Login';
import Help from './Help';
import { LoginSSO } from './LoginSSO';
import ErrorPage from './ErrorPage';

export interface RouteDescriptor {
  path: string;
  exact: boolean;
  component: FC;
}

export const routes: RouteDescriptor[] = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/error',
    exact: true,
    component: ErrorPage,
  },
  {
    path: '/help',
    exact: true,
    component: Help,
  },
  {
    path: '/login',
    exact: true,
    component: Login,
  },
  {
    path: '/loginSso',
    exact: true,
    component: LoginSSO,
  },
  {
    path: '/pathway/:pathwayId',
    exact: true,
    component: Pathway,
  },
  {
    path: '/pathway/:pathwayId/cluster/:clusterId',
    exact: true,
    component: Cluster,
  },
  {
    path: '/pathway/:pathwayId/cluster/:clusterId/competency/:competencyId',
    exact: true,
    component: Competency,
  },
  {
    path: '/pathway/:pathwayId/cluster/:clusterId/competency/:competencyId/level/:competencyLevelId',
    exact: true,
    component: CompetencyLevel,
  },
  {
    path: '/pathway/:pathwayId/cluster/:clusterId/competency/:competencyId/assessments',
    exact: true,
    component: Assessment,
  },
];
