import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Box } from '@material-ui/core';
import AssessmentHero from '../components/common/AssessmentHero';
import Loading from '../components/common/Loading';
import { usePathway, PathwayContextValue } from '../stores/PathwayStore';
import {
  UserActivityContextValue,
  useUserActivity,
} from '../stores/UserActivityStore';

declare const LearnosityItems: any;

type CompetencyParams = {
  pathwayId: string;
  clusterId: string;
  competencyId: string;
};

const Assessment = () => {
  const history = useHistory();

  const { competencyId, clusterId, pathwayId } = useParams<CompetencyParams>();

  const {
    isFetchingPathwayContent,
    singleCompetency,
    singleAssessment,
    fetchSingleAssessment,
  } = usePathway() as PathwayContextValue;

  const {
    isFetchingUserActivity,
    singleUserCompetency,
    singleUserAssessment,
    fetchSingleUserAssessment,
    learnosityAssessmentRequest,
    fetchLearnosityAssessment,
    submitAssessment,
  } = useUserActivity() as UserActivityContextValue;

  const renderAssessmentPlayer = (): void => {
    // Init using the signed request you set up above
    let itemsApp: any;

    const getScorePercent = (): any => {
      const emptyScore = { score: 0, maxScore: 0, scorePercentage: 0 };
      if (itemsApp) {
        const rawScore = itemsApp.getScores();
        if (!rawScore) {
          return emptyScore;
        }

        let score = 0;
        let maxScore = 0;
        Object.values(rawScore).forEach((scoreInfo: any) => {
          score += scoreInfo.score || 0;
          maxScore += scoreInfo.max_score || 0;
        });

        const scorePercentage = Math.round((score / maxScore) * 100);
        return { score, maxScore, scorePercentage };
      }

      return emptyScore;
    };

    itemsApp = LearnosityItems.init(learnosityAssessmentRequest, {
      readyListener() {
        // The readyListener fires when the assessment player has been loaded
        console.log('ReadyListener fired'); // eslint-disable-line no-console

        // UNCOMMENT THE 19 LINES BELOW TO ACCESS THE ASSESS API AND VIEW SOME OF ITS EVENTS

        const assessApp = itemsApp.assessApp();
        assessApp.on('test:ready', () => {
          console.log('EVENT FIRED: test:ready'); // eslint-disable-line no-console
        });
        assessApp.on('test:start', () => {
          console.log('EVENT FIRED: test:start'); // eslint-disable-line no-console
        });
        assessApp.on('item:changing', () => {
          console.log('EVENT FIRED: item:changing'); // eslint-disable-line no-console
        });
        assessApp.on('test:save:success', () => {
          console.log('EVENT FIRED: test:save:success'); // eslint-disable-line no-console
        });
        assessApp.on('test:submit:success', async () => {
          console.log('EVENT FIRED: test:submit:success', singleAssessment, singleUserAssessment); // eslint-disable-line no-console
          if (singleAssessment && singleUserCompetency) {
            const scoreInfo = getScorePercent();
            await submitAssessment(
              singleUserCompetency.id,
              singleAssessment.id,
              scoreInfo.score,
              scoreInfo.maxScore,
              scoreInfo.scorePercentage,
            );
            history.push(`/pathway/${pathwayId}/cluster/${clusterId}/competency/${competencyId}`);
          }
        });
        assessApp.on('item:load', () => {
          console.log('EVENT FIRED: item:load'); // eslint-disable-line no-console
        });
      },
      // UNCOMMENT THE 7 LINES BELOW TO ADD THE ERRORLISTENER

      errorListener(e: any) {
        console.log('ERROR'); // eslint-disable-line no-console
        console.log(e.code); // eslint-disable-line no-console
        console.log(e.msg); // eslint-disable-line no-console
        console.log(e.detail); // eslint-disable-line no-console
      },
    });
  };

  useEffect(() => {
    fetchSingleAssessment(pathwayId, clusterId, competencyId);
  }, []);

  useEffect(() => {
    if (singleAssessment) {
      fetchSingleUserAssessment(pathwayId, competencyId, singleAssessment.id);
      fetchLearnosityAssessment(singleAssessment.title, singleAssessment.assessmentIdentifier);
    }
  }, [singleAssessment]);

  useEffect(() => {
    if (learnosityAssessmentRequest) {
      renderAssessmentPlayer();
    }
  }, [learnosityAssessmentRequest]);

  if (isFetchingPathwayContent) {
    return <Loading message="Loading Assessment" />;
  }

  if (!singleAssessment) {
    return null;
  }

  return (
    <>
      <AssessmentHero
        meta="Assessment"
        title={singleAssessment.title}
        description={singleAssessment.description}
        onBackArrowClick={() => history.push(`/pathway/${pathwayId}/cluster/${clusterId}/competency/${competencyId}`)}
      />
      <Box px={{ xs: 2, sm: 3, md: 7 }}>
        <div id="learnosity_assess" />
      </Box>
    </>
  );
};

export default Assessment;
