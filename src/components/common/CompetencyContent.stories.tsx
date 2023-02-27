/* eslint-disable */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CompetencyCardContent from './CompetencyCardContent';

export default {
  title: 'Common/CompetencyContent',
  component: CompetencyCardContent,
} as ComponentMeta<typeof CompetencyCardContent>;

const Template: ComponentStory<typeof CompetencyCardContent> = (args) => (
  <CompetencyCardContent {...args} />
);

export const Simple = Template.bind({});

Simple.args = {
  meta: 'Knowledge',
  title: 'Build a Life Plan',
  description:
    'Unapologetically Ambitious by Shellye Archambeau "lays out key takeaways and actions to increase the odds of achieving your personal and professional goals."',
  content:
    '<h2>Life Plan Key Concepts</h2>\n<div id="introduction-section">\n<h3>Introduction</h3>\n<p>In this section, you will learn about the foundational concepts and components of developing a life plan.</p>\n</div>\n<div id="instructions-section">\n<h3>Instructions</h3>\n<p>Watch the clip below featuring Shellye Archambeau, author of <em>Unapologetically Ambitious &nbsp;</em>and watch up to the 39 minute mark.</p>\n<iframe title="YouTube video player" src="https://www.youtube.com/embed/AfOrFUnYd7Q?start=2249" width="560" height="315" frameborder="0" allowfullscreen="allowfullscreen"></iframe>\n<p>Once you have watched the clip, read pages 45-49 of <em>Unapologetically Ambitious</em> and focus on what the author teaches about life planning.</p>\n<p>After reading through the recommended section of the book, watch the following TEDx clip featuring Shellye Archambeau about "Knowing Your Power."</p>\n<iframe title="YouTube video player" src="https://www.youtube.com/embed/1hT8-Cy74Fc" width="560" height="315" frameborder="0" allowfullscreen="allowfullscreen"></iframe>\n<h3>Review</h3>\n<p>You should now have a basic grasps of the fundamental concepts of creating a life plan as per the instruction of author Shellye Archambeau.</p>\n</div>\n<div id="call-to-action-section">\n<h3>Call to Action</h3>\n<p>Start thinking about where you want to be ten, twenty, or even thirty years from now. Think about your future from both a professional and personal perspective.</p>\n<p>Move forward with additional learning activities focused on planning and goal setting to learn how to turn your ambitions into an action plan.</p>\n</div>',
};
