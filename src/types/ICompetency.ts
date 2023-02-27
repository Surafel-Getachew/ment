import { IAssessment } from './IAssessment';
import { ICompetencyLevel } from './ICompetencyLevel';
import { ICompetencyLevelType } from './ICompetencyLevelType';

export interface ICompetency {
  id: string;
  title: string;
  description: string;
  requiredLevel: ICompetencyLevelType; // TODO move this out to IPathway metadata
  createdAt: Date;
  levels: ICompetencyLevel[];
  assessments: IAssessment[];
}
