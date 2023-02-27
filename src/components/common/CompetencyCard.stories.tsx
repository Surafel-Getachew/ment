import { ComponentStory, ComponentMeta } from '@storybook/react';
import CompetencyCard from './CompetencyCard';

export default {
  title: 'Common/CompetencyCard',
  component: CompetencyCard,
} as ComponentMeta<typeof CompetencyCard>;

const Template: ComponentStory<typeof CompetencyCard> = (args) => (
  <CompetencyCard {...args} />
);

export const Pending = Template.bind({});

const today = new Date();

Pending.args = {
  meta: 'Career & Life Planning',
  title: ' Life Plan Timeline',
  description: 'parse Associate Small task-force salmon Division',
  competencyNumber: 2,
};

export const Attained = Template.bind({});

Attained.args = {
  meta: 'Career & Life Planning',
  title: ' Life Plan Timeline',
  description: 'parse Associate Small task-force salmon Division',
  competencyNumber: 2,
  completedAt: today,
};
