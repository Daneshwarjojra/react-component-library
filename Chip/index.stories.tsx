import { ComponentStory, ComponentMeta } from '@storybook/react';
import Chip from './index';
import BasicLayout from '../Layout';

export default {
  title: 'Chip',
  component: Chip,
  argTypes: {
    // any arg that you don't want to change from storybook table should come below.
    removeChip: { table: { disable: true } },
    theme: { table: { disable: true } }
  }
} as ComponentMeta<typeof Chip>;

// call story as a normal react component.
export const Default: ComponentStory<typeof Chip> = (args) => {
  // wrap all stories with <BasicLayout></BasicLayout> to get default line-haul styles
  return (
    <BasicLayout>
      <Chip {...args}>Chip text</Chip>
    </BasicLayout>
  );
};
