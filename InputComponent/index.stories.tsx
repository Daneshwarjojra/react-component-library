import { ComponentStory, ComponentMeta } from '@storybook/react';
import Input from './index';
import BasicLayout from '../Layout';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Input Component 2',
  component: Input,
  argTypes: {
    // any arg that you don't want to change from storybook table should come below.
    options: { table: { disable: true } },
    fontSize: {
      control: { type: 'select' },
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'normal',
        'small',
        'verySmall'
      ],
      defaultValue: 'h6'
    },
    fontWeight: {
      control: { type: 'select' },
      options: ['regular', 'medium', 'semiBold', 'bold'],
      defaultValue: 'regular'
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'number', 'email', 'password', 'tel', 'search']
    },
    leftIcon: {
      table: { disable: true }
    },
    rightIcon: {
      table: { disable: true }
    },
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    placeholder: {
      type: 'string',
      defaultValue: 'Enter value here'
    }
  }
} as ComponentMeta<typeof Input>;

// call story as a normal react component.
export const Template: ComponentStory<typeof Input> = (args) => {
  // wrap all stories with <BasicLayout></BasicLayout> to get default line-haul styles
  return (
    <BasicLayout>
      <Input {...args} />
    </BasicLayout>
  );
};
