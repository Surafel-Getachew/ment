import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Page from './Page';

export default {
  title: 'Common/Page',
  component: Page,
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />;

export const Full = Template.bind({});
Full.args = {
  title: 'Software Engineer',
  meta: [{ value: 'Job Role' }],
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};

export const TitleOnly = Template.bind({});
TitleOnly.args = {
  title: 'Software Engineer',
};

export const TitleAndMeta = Template.bind({});
TitleAndMeta.args = {
  title: 'Software Engineer',
  meta: [{ value: 'Job Role' }],
};

export const TitleAndMultipleMeta = Template.bind({});
TitleAndMultipleMeta.args = {
  title: 'Software Engineer',
  meta: [{ value: 'Job Role' }, { value: '12 Competencies' }],
};

export const TitleAndDescription = Template.bind({});
TitleAndDescription.args = {
  title: 'Software Engineer',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};

export const TitleDescriptionAndProgress = Template.bind({});
TitleDescriptionAndProgress.args = {
  title: 'Software Enginnering',
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'",
  progress: {
    total: 5,
    count: 2,
    label: 'Competencies attained',
  },
};
