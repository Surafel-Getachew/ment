import { IProgress } from '../types/ui/IProgress';
import { IUserCompetency } from '../types/IUserCompetency';
import { IUserCompetencyCluster } from '../types/IUserCompetencyCluster';

const convertToProgress = (
  data: IUserCompetency[] | IUserCompetencyCluster[],
  label?: string | undefined,
  extraLabel?: string | undefined,
):IProgress => {
  let completedProgress = 0;

  data.forEach((d: any) => {
    if (d.completedAt) {
      completedProgress += 1;
    }
  });
  const progress: IProgress = {
    count: completedProgress,
    total: data.length,
    label,
    extraLabel,
  };
  return progress;
};

export default convertToProgress;
