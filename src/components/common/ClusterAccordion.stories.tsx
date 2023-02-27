import { ComponentStory, ComponentMeta } from '@storybook/react';
import ClusterAccordion from './ClusterAccordion';

export default {
  title: 'Common/ClusterAccordion',
  component: ClusterAccordion,
} as ComponentMeta<typeof ClusterAccordion>;

const Template: ComponentStory<typeof ClusterAccordion> = (args) => (
  <ClusterAccordion {...args} />
);

export const Archived = Template.bind({});
Archived.args = {
  title: 'Career & Life Planning',
  description: 'Articulate the career and life planning process, and apply these principles to the development of your life plan in a way that integrates personal and professional goals.',
  videoUrl: 'https://www.youtube.com/embed/eI3Kpzr5kMg?start=40&end=90',
  numberOfCompetencies: 3,
  progress: {
    count: 5,
    total: 5,
  },
};

export const InProgress = Template.bind({});

InProgress.args = {
  title: 'Career & Life Planning',
  description: 'Articulate the career and life planning process, and apply these principles to the development of your life plan in a way that integrates personal and professional goals.',
  videoUrl: 'https://www.youtube.com/embed/eI3Kpzr5kMg?start=40&end=90',
  numberOfCompetencies: 3,
  progress: {
    count: 3,
    total: 5,
  },
};

export const NotStarted = Template.bind({});
NotStarted.args = {
  title: 'Career & Life Planning',
  description: 'Articulate the career and life planning process, and apply these principles to the development of your life plan in a way that integrates personal and professional goals.',
  numberOfCompetencies: 3,
};

export const Expanded = Template.bind({});
Expanded.args = {
  title: 'Career & Life Planning',
  description: 'Articulate the career and life planning process, and apply these principles to the development of your life plan in a way that integrates personal and professional goals.',
  numberOfCompetencies: 3,
  open: true,
};
