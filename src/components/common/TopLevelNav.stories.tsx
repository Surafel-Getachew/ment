import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Level } from '../../types/ui/ITopLevelNav';

import TopLevelNav from './TopLevelNav';

export default {
  title: 'Common/TopLevelNav',
  component: TopLevelNav,
} as ComponentMeta<typeof TopLevelNav>;

const Template:ComponentStory<typeof TopLevelNav> = (args) => <TopLevelNav {...args} />;

export const Home = Template.bind({});

Home.args = {
  level: Level.Home,
};
export const Pathway = Template.bind({});

Pathway.args = {
  level: Level.Pathway,
};

export const Competency = Template.bind({});

Competency.args = {
  level: Level.Competency,
};

export const ICompetencyLevel = Template.bind({});

ICompetencyLevel.args = {
  level: Level.CompetencyLevel,
};
