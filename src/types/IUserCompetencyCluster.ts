import { IUserCompetency } from './IUserCompetency';

export interface IUserCompetencyCluster {
  id: string,
  completedAt?: Date;
  badgeInfo: any;
  userId: string | number;
  competencyClusterId: string;
  userCompetencies: IUserCompetency[];
  userPathwayId: string;
}
