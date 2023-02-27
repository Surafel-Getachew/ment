import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Section from './Section';

export default {
  title: 'Common/Section',
  component: Section,
} as ComponentMeta<typeof Section>;

const Template: ComponentStory<typeof Section> = (args) => <Section {...args} />;

export const Full = Template.bind({});
Full.args = {
  title: 'Software Engineer',
  meta: [{ value: 'Competency Cluster' }],
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
};

export const TitleOnly = Template.bind({});
TitleOnly.args = {
  title: 'Software Engineer',
};

export const TitleAndMeta = Template.bind({});
TitleAndMeta.args = {
  title: 'Software Engineer',
  meta: [{ value: 'Competency Cluster' }],
};

export const TitleAndMultipleMeta = Template.bind({});
TitleAndMultipleMeta.args = {
  title: 'Software Engineer',
  meta: [{ value: 'Competency Cluster' }, { value: '12 Competencies' }],
};

export const TitleAndDescription = Template.bind({});
TitleAndDescription.args = {
  title: 'Software Engineer',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
};
