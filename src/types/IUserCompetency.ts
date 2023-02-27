import { IUserAssessment } from './IUserAssessment';

export interface IUserCompetency {
  id: string
  userId: string;
  competencyId: string;
  completedAt?: Date;
  userAssessments: IUserAssessment[]
}
