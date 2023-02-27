/* eslint-disable */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import LeftNav from './LeftNav';

export default {
  title: 'Common/Card',
  component: LeftNav,
} as ComponentMeta<typeof LeftNav>;

const Template: ComponentStory<typeof LeftNav> = (args) => (
  <LeftNav {...args} />
);

export const Simple = Template.bind({});

const Left = () => {
  return (
    <div>
      <h1>CHILDREN OF NAV ITEM</h1>
    </div>
  );
};
const Right = () => {
  return (
    <div>
      <h1>CHILDREN OF NAV ITEM RIGHT</h1>
    </div>
  );
};

const items = [
  {
    id:"1",
    title: 'Life plan key concepts',
    meta: 'Knowledge',
    children: Left,
  },
  {
    id:"2",
    title: 'plan key concepts',
    meta: 'Skill',
    children: Right,
  },
];

Simple.args = {
    navItems:items
}
