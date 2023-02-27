import { ICompetency } from './ICompetency';

export interface ICompetencyCluster {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  createdAt: Date;
  competencies: ICompetency[];
}
