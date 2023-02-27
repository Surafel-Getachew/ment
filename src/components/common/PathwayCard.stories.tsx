import { ComponentStory, ComponentMeta } from '@storybook/react';
import PathwayCard from './PathwayCard';

export default {
  title: 'Common/Pathway',
  component: PathwayCard,
} as ComponentMeta<typeof PathwayCard>;

const Template: ComponentStory<typeof PathwayCard> = (args) => (
  <PathwayCard {...args} />
);

export const InProgress = Template.bind({});

InProgress.args = {
  title: 'Unaplogitically Ambitious',
  description:
    'Unapologetically Ambitious by Shellye Archambeau "lays out key takeaways and actions to increase the odds of achieving your personal and professional goals."',
  clusterCount: 8,
  progress: {
    count: 2,
    total: 5,
    label: 'Pathways Attained',
  },
};

export const NotStarted = Template.bind({});

NotStarted.args = {
  title: 'Unaplogitically Ambitious',
  description:
    'Unapologetically Ambitious by Shellye Archambeau "lays out key takeaways and actions to increase the odds of achieving your personal and professional goals."',
  clusterCount: 5,
};
