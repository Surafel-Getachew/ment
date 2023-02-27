import csv from 'csv-parser';
import fs from 'fs';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import faker from 'faker';

// const filePath = 'software-engineering.csv'
const filePath = 'asu-ua.csv'
const results = []

const writeFile = (fileName, content) => {
  fs.writeFileSync(fileName, content);
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};

const getTrueOnPercentage = (percentage) => Math.random() <= percentage;

const newPathway = (title, description) => ({
  id: uuidv4(),
  title: title.trim(),
  description: description.trim(),
  clusters: [],
});

const newCluster = (title, description) => ({
  id: uuidv4(),
  title: title.trim(),
  description: title.trim(),
  competencies: [],
});

const newCompetency = (title, description, level) => ({
  id: uuidv4(),
  title: title.trim(),
  description: description.trim(),
  requiredLevel: level,
  levels: [],
});

const newCompetencyLevel = (title, description, level, content) => ({
  id: uuidv4(),
  title: title.trim(),
  description: description.trim(),
  type: level,
  content: content.trim(),
});

const newUser = (title) => ({
  id: uuidv4(),
  title,
});

const generateUserProgress = (pathways) => {
  const progressData = [];
  const users = [];

  for (const i of Array(2).keys()) {
    const user = newUser(`Jane Smith${i}`);
    users.push(user);

    let completionPercentage = 0.3
    const userId = user.id

    for (let i = 0; i < pathways.length; i++) {
      const pathway = pathways[i];
      if (i != 0 && !getTrueOnPercentage(1.0)) {
        continue;
      }

      const competencyProgresses = [];
      const pathwayCompletionPercentage = getTrueOnPercentage(completionPercentage) ? 1.0 : 0.5;

      console.log('completionPercentage', completionPercentage);

      pathway.clusters.map((cluster) => {
        cluster.competencies.forEach((c) => {
          const isComplete = getTrueOnPercentage(pathwayCompletionPercentage);
          competencyProgresses.push({
            userId,
            competencyId: c.id,
            completedAt: isComplete ? new Date() : undefined,
          });
        });
      });

      const userProgress = {
        userId,
        pathwayId: pathway.id,
        userCompetencies: competencyProgresses,
      };
      progressData.push(userProgress);

      completionPercentage -= 0.2;
    }
  }

  writeFile('users.json', JSON.stringify(users, null, 2));
  writeFile('userProgress.json', JSON.stringify(progressData, null, 2));
};

const processPathway = () => {
  let currentPathway = null;
  let currentCluster = null;
  let currentCompetency = null;

  const pathways = [];

  for (const row of results) {
    const pathwayName = row.Pathway;
    const pathwayDescription = row['Pathway Description'];

    if (_.isEmpty(pathwayName) && !currentPathway) {
      throw Error('First row has no cluster title');
    }

    if (currentPathway == null || (!_.isEmpty(pathwayName) && currentPathway.title != pathwayName.trim())) {
      if (currentPathway != null) {
        if (currentCluster != null) {
          if (currentCompetency != null) {
            currentCluster.competencies.push(_.cloneDeep(currentCompetency));
            currentCompetency = null;
          }

          currentPathway.clusters.push(_.cloneDeep(currentCluster));
        }

        pathways.push(_.cloneDeep(currentPathway));

        currentCluster = null;
      }

      currentPathway = newPathway(pathwayName, pathwayDescription);
    }

    const clusterName = row['Competency Cluster'];
    const clusterDescription = row['Competency Cluster Description']

    if (_.isEmpty(clusterName) && !currentCluster) {
      throw Error('First row has no cluster title');
    }

    if (currentCluster == null || (!_.isEmpty(clusterName) && currentCluster.title != clusterName.trim())) {
      if (currentCluster != null) {
        if (currentCompetency != null) {
          currentCluster.competencies.push(_.cloneDeep(currentCompetency));
        }

        currentPathway.clusters.push(_.cloneDeep(currentCluster));

        currentCompetency = null;
      }

      currentCluster = newCluster(clusterName, '');
    }

    const competencyName = row.Competency;
    const competencyDescription = row['Competency Description'];
    const competencyLevel = row['Competency Required Level'];

    if (_.isEmpty(competencyName) && !currentCompetency) {
      throw Error('First row of cluster has no competency title');
    }

    if (_.isEmpty(competencyLevel)) {
      throw Error(`Competency level empty: ${competencyName}`);
    }

    if (currentCompetency == null || (!_.isEmpty(competencyName) && currentCompetency.title != competencyName.trim())) {
      if (currentCompetency != null) {
        currentCluster.competencies.push(_.cloneDeep(currentCompetency));
      }

      currentCompetency = newCompetency(competencyName, competencyDescription, competencyLevel);
    }

    const competencyLevelName = row['Competency Level'];
    const competencyLevelDescription = row['Competency Level Description'] + faker.random.words(getRandomInt(5, 10));
    const competencyLevelType = row['Competency Level Type'];
    const competencyLevelContent = row['Competency Level Content'];

    currentCompetency.levels.push(newCompetencyLevel(competencyLevelName, competencyLevelDescription, competencyLevelType, competencyLevelContent));
  }

  if (currentPathway != null) {
    if (currentCluster != null) {
      if (currentCompetency != null) {
        currentCluster.competencies.push(_.cloneDeep(currentCompetency));
      }
      currentPathway.clusters.push(_.cloneDeep(currentCluster));
    }
    pathways.push(_.cloneDeep(currentPathway));
  }

  // console.log(JSON.stringify(pathway, null, 2))
  // const pathways = []
  // for (const i of Array(5).keys()) {
  //   if (i == 0) {
  //     pathways.push(pathway)
  //   }
  //   else {
  //     const title = _.capitalize(faker.random.words(getRandomInt(3, 6)))
  //     const newPathway = {
  //       ..._.cloneDeep(pathway),
  //       id: uuidv4(),
  //       title,
  //       description: faker.random.words(getRandomInt(5, 10))
  //     }
  //     pathways.push(newPathway)
  //   }
  // }

  writeFile('pathways.json', JSON.stringify(pathways, null, 2));

  generateUserProgress(pathways);
};

const parsePathway = () => {
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      // console.log(results);
      processPathway();
    });
};

parsePathway();
