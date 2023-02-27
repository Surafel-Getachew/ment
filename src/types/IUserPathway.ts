import { IUserCompetency } from './IUserCompetency';
import { IUserCompetencyCluster } from './IUserCompetencyCluster';

export interface IUserPathway {
  id: string,
  userId: string | number;
  pathwayId: string;
  userCompetencyClusters: IUserCompetencyCluster[]
  userCompetencies: IUserCompetency[];
  completedAt?: Date;
}
