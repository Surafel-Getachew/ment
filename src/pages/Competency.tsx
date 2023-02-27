/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Hidden,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles,
} from '@material-ui/core';

import { ExpandMore } from '@material-ui/icons';
import { usePathway, PathwayContextValue } from '../stores/PathwayStore';

import LeftNav from '../components/common/LeftNav';
import CompetencyCardContent from '../components/common/CompetencyCardContent';
import CompetencyHero from '../components/common/CompetencyHero';
import Loading from '../components/common/Loading';
import {
  UserActivityContextValue,
  useUserActivity,
} from '../stores/UserActivityStore';
import { InfoModal } from '../components/common/InfoModal';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    cursor: 'pointer',
    boxShadow: '0px 3px 8px 0px rgba(0, 0, 0, 0.06)',
    borderRadius: '6',
  },
}));

type CompetencyParams = {
  pathwayId: string;
  clusterId: string;
  competencyId: string;
};

const Competency = () => {
  const classes = useStyles();

  const { competencyId, clusterId, pathwayId } = useParams<CompetencyParams>();
  const history = useHistory();

  const [openScoreModal, setOpenScoreModal] = useState(false);
  const [scoreContent, setScoreContent] = useState('');

  const {
    isFetchingPathwayContent,
    singleCompetency,
    fetchSingleCompetency,
  } = usePathway() as PathwayContextValue;

  const {
    isFetchingUserActivity,
    singleUserCompetency,
    latestAssessmentScore,
    fetchSingleUserCompetency,
    clearLatestAssessmentScore,
  } = useUserActivity() as UserActivityContextValue;

  useEffect(() => {
    fetchSingleCompetency(pathwayId, clusterId, competencyId);
    fetchSingleUserCompetency(pathwayId, competencyId);
  }, []);

  useEffect(() => {
    if (latestAssessmentScore !== null) {
      const scoreText = `Your score is ${latestAssessmentScore}%.`;
      if (latestAssessmentScore === 100) {
        setScoreContent(`${scoreText} You have attained the competency!`);
      } else {
        const tryAgainText = 'Answer all questions correctly to attain this competency.';
        setScoreContent(`${scoreText} ${tryAgainText}`);
      }
      setOpenScoreModal(true);
    }
  }, [latestAssessmentScore]);

  if (isFetchingPathwayContent || isFetchingUserActivity) {
    return <Loading message="Loading Competency" />;
  }

  if (!singleCompetency) {
    return null;
  }

  const goToAssessment = (): void => {
    history.push(
      `/pathway/${pathwayId}/cluster/${clusterId}/competency/${competencyId}/assessments`,
    );
  };

  const renderMobileViewKSA = () => {
    if (singleCompetency.levels.length === 1) {
      const level = singleCompetency.levels[0];
      return (
        <Box width="100%">
          <CompetencyCardContent
            meta={level.type}
            title={level.title}
            description={level.description}
            content={level.content}
          />
        </Box>
      );
    }

    return (
      <>
        {singleCompetency.levels.map((level) => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className={classes.root}
            >
              <Box
                width="100%"
                display="flex"
                flexDirection="column"
                flexWrap="wrap"
              >
                <Box py={1}>
                  <Typography variant="caption">{level.type}</Typography>
                </Box>
                <Typography variant="button">{level.title}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box width="100%">
                <CompetencyCardContent
                  meta={level.type}
                  title={level.title}
                  description={level.description}
                  content={level.content}
                />
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </>
    );
  };

  const renderKSA = () => {
    const navItems: {id:string, title: string; meta: string; children: any }[] = [];
    // eslint-disable-next-line array-callback-return
    singleCompetency.levels.map((level) => {
      const ksaContent = (
        <CompetencyCardContent
          meta={level.type}
          title={level.title}
          description={level.description}
          content={level.content}
        />
      );
      navItems.push({
        id: level.id,
        title: level.title,
        meta: level.type,
        children: ksaContent,
      });
    });
    return <LeftNav navItems={navItems} />;
  };

  const handleClose = () => {
    clearLatestAssessmentScore();
    setOpenScoreModal(false);
  };

  return (
    <>
      <InfoModal
        open={openScoreModal}
        title="Your Assessment Score"
        body={scoreContent}
        agreeText="Ok"
        onAgree={() => handleClose()}
      />
      <CompetencyHero
        title={singleCompetency.title}
        description={singleCompetency.description}
        meta="Competency"
        competencyStatus={singleUserCompetency}
        onBackArrowClick={() => history.push(`/pathway/${pathwayId}`)}
        onTakeAssessmentClick={() => history.push(`/pathway/${pathwayId}/cluster/${clusterId}/competency/${competencyId}/assessments`)}
        onPathwayEnroll={() => history.push(`/pathway/${pathwayId}?noScroll=true`)}
      />
      <Box
        py={3}
        px={{ xs: 2, sm: 3, md: 6 }}
        style={{ background: '#f9f9f9' }}
      >
        <Hidden smDown>{renderKSA()}</Hidden>
        <Hidden mdUp>{renderMobileViewKSA()}</Hidden>
      </Box>
    </>
  );
};

export default Competency;
