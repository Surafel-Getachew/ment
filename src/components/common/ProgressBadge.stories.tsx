import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProgressBadge from './ProgressBadge';

export default {
  title: 'Common/ProgressBadge',
  component: ProgressBadge,
} as ComponentMeta<typeof ProgressBadge>;

const Template: ComponentStory<typeof ProgressBadge> = (args) => (
  <ProgressBadge {...args} />
);

export const Completed = Template.bind({});

Completed.args = { total: 5, count: 5 };

export const InProgress = Template.bind({});

InProgress.args = { total: 5, count: 3 };
