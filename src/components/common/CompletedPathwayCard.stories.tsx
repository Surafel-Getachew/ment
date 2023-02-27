import { ComponentStory, ComponentMeta } from '@storybook/react';
import CompletedPathwayCard from './CompletedPathwayCard';

export default {
  title: 'Common/CompletedPathwayCard',
  component: CompletedPathwayCard,
} as ComponentMeta<typeof CompletedPathwayCard>;

// eslint-disable-next-line max-len
const Template: ComponentStory<typeof CompletedPathwayCard> = (args) => <CompletedPathwayCard {...args} />;

export const Simple = Template.bind({});

Simple.args = {
  title: 'Unapologetically Ambitious',
  date: 'Sep 10, 2021',
};
