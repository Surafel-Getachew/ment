import { ComponentStory, ComponentMeta } from '@storybook/react';
import PathwayHero from './PathwayHero';

export default {
  title: 'Common/Pathway',
  component: PathwayHero,
} as ComponentMeta<typeof PathwayHero>;

const Template: ComponentStory<typeof PathwayHero> = (args) => (
  <PathwayHero {...args} />
);

export const InProgress = Template.bind({});

InProgress.args = {
  title: 'Unaplogitically Ambitious',
  description: 'Unapologetically Ambitious by Shellye Archambeau "lays out key takeaways and actions to increase the odds of achieving your personal and professional goals."',
  imageUrl: 'https://lh3.googleusercontent.com/5ed0og-Wu0f-lrAPLxj2Fa-LzJgNz6FkxKCGqNtBKkoKI_7eXrsV5bKTA_Z2PZYXm5lzdimtpozKvV_ZIGGNHnARgcSvviKBJWyoPsBPcgWAXOE3Ha5nVQ6iZCyfRK7X4vnU6a2VTw=w2400',
  progress: {
    count: 2,
    total: 5,
    label: 'Pathways Attained',
  },
};

export const NotStarted = Template.bind({});
NotStarted.args = {
  title: 'Unaplogitically Ambitious',
  description: 'Unapologetically Ambitious by Shellye Archambeau "lays out key takeaways and actions to increase the odds of achieving your personal and professional goals."',
  imageUrl: 'https://lh3.googleusercontent.com/5ed0og-Wu0f-lrAPLxj2Fa-LzJgNz6FkxKCGqNtBKkoKI_7eXrsV5bKTA_Z2PZYXm5lzdimtpozKvV_ZIGGNHnARgcSvviKBJWyoPsBPcgWAXOE3Ha5nVQ6iZCyfRK7X4vnU6a2VTw=w2400',
};

export const Video = Template.bind({});
Video.args = {
  title: 'Unaplogitically Ambitious',
  description: 'Unapologetically Ambitious by Shellye Archambeau "lays out key takeaways and actions to increase the odds of achieving your personal and professional goals."',
  imageUrl: 'https://lh3.googleusercontent.com/5ed0og-Wu0f-lrAPLxj2Fa-LzJgNz6FkxKCGqNtBKkoKI_7eXrsV5bKTA_Z2PZYXm5lzdimtpozKvV_ZIGGNHnARgcSvviKBJWyoPsBPcgWAXOE3Ha5nVQ6iZCyfRK7X4vnU6a2VTw=w2400',
  videoUrl: 'https://www.youtube.com/embed/eI3Kpzr5kMg?start=40&end=90&autoplay=1',
};
