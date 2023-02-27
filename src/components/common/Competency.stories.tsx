/* eslint-disable */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CompetencyHero from './CompetencyHero';

export default {
  title: 'Common/CompetencyHero',
  component: CompetencyHero,
} as ComponentMeta<typeof CompetencyHero>;

const Template: ComponentStory<typeof CompetencyHero> = (args) => (
  <CompetencyHero {...args} />
);

export const Completed = Template.bind({});
// const today = new Date();
const handleClickEvents = () => {

}
Completed.args = {
  meta: 'Competency',
  title: 'Build a Life Plan',
  description:
    'Unapologetically Ambitious by Shellye Archambeau "lays out key takeaways and actions to increase the odds of achieving your personal and professional goals."',
  onPathwayEnroll :handleClickEvents,
  onBackArrowClick:handleClickEvents,
  onTakeAssessmentClick:handleClickEvents
  // completedAt: today,
};
