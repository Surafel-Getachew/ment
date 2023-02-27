import { ComponentStory, ComponentMeta } from '@storybook/react';
import Progress from './Progress';

export default {
  title: 'Common/Progress',
  component: Progress,
} as ComponentMeta<typeof Progress>;

const Template: ComponentStory<typeof Progress> = (args) => (
  <Progress {...args} />
);

export const Completed = Template.bind({});
Completed.args = {
  count: 5,
  total: 5,
  label: 'Competencies Attained',
};
export const CompletedWithoutLabel = Template.bind({});
CompletedWithoutLabel.args = {
  count: 5,
  total: 5,
};

export const InProgress = Template.bind({});
InProgress.args = {
  label: 'Pathways Attained',
  count: 3,
  total: 5,
};

export const InProgressWithOutLabel = Template.bind({});
InProgressWithOutLabel.args = {
  count: 4,
  total: 5,
};
