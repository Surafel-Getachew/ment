import { ICompetencyCluster } from './ICompetencyCluster';

export type PathwayDetail = {
  videoDescription: string;
}

interface IPathway {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  details: PathwayDetail;
  clusters: ICompetencyCluster[];
}

export default IPathway;
