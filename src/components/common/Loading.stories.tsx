import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Loading from './Loading';

export default {
  title: 'Common/Loading',
  component: Loading,
} as ComponentMeta<typeof Loading>;

const Template: ComponentStory<typeof Loading> = (args) => <Loading {...args} />;

export const Simple = Template.bind({});
Simple.args = {};

export const Message = Template.bind({});
Message.args = {
  message: 'Loading',
};
