import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Card from './Card';
import CardData from '../../mock/pathways.json';
import UserActivity from '../../mock/userActivity.json';

export default {
  title: 'Common/Card',
  component: Card,
  decorators: [(Story) => <MemoryRouter>{Story()}</MemoryRouter>],
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Simple = Template.bind({});

Simple.args = { ...CardData[0], meta: [{ value: 'Pathway' }] };

export const Long = Template.bind({});
Long.args = { ...CardData[1], meta: [{ value: 'Pathway' }] };

export const CardWithProgress = Template.bind({});
CardWithProgress.args = {
  ...CardData[1],
  ...UserActivity[0],
  meta: [{ value: 'Pathway' }],
};

export const CardWithCompletedProgress = Template.bind({});
CardWithCompletedProgress.args = {
  ...CardData[2],
  ...UserActivity[1],
  meta: [{ value: 'Pathway' }],
};
