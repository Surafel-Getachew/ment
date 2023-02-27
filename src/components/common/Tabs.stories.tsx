import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Typography } from '@material-ui/core';
import Tabs from './Tabs';

export default {
  title: 'Common/Tabs',
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

const content = (label: string) => (
  <Typography>{label}</Typography>
);

export const Simple = Template.bind({});
Simple.args = {
  navItems: ['All (8)', 'In Progress (3)', 'Completed (5)'],
  contentItems: [content('One'), content('Two'), content('Three')],
  selected: 'In Progress (3)',
};

export const Small = Template.bind({});
Small.args = {
  navItems: ['All (8)', 'In Progress (3)', 'Completed (5)'],
  contentItems: [content('One'), content('Two'), content('Three')],
  selected: 'In Progress (3)',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  navItems: ['All (8)', 'In Progress (3)', 'Completed (5)'],
  contentItems: [content('One'), content('Two'), content('Three')],
  selected: 'In Progress (3)',
  size: 'lg',
};

export const Xlarge = Template.bind({});
Xlarge.args = {
  navItems: ['All (8)', 'In Progress (3)', 'Completed (5)'],
  contentItems: [content('One'), content('Two'), content('Three')],
  selected: 'In Progress (3)',
  size: 'xl',
};
