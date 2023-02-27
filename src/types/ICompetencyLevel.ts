import { ICompetencyLevelType } from './ICompetencyLevelType';

export interface ICompetencyLevel {
  id: string;
  title: string;
  description: string;
  type: ICompetencyLevelType;
  content: string;
}
