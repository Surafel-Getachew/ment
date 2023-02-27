import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Notification } from './Notification';

export default {
  title: 'Common/Notification',
  component: Notification,
} as ComponentMeta<typeof Notification>;

const Template: ComponentStory<typeof Notification> = (args) => <Notification {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  open: true,
  message: 'This is a notification',
  // eslint-disable-next-line no-console
  onClose: () => console.log('on close'),
};
