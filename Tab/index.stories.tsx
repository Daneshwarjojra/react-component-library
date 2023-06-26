import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Tab from './index';
import BasicLayout from '../Layout';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Tab',
  component: Tab,
  argTypes: {
    // any arg that you don't want to change from storybook table should come below.
    options: { table: { disable: true } },
    value: { table: { disable: true } },
    onChange: { table: { disable: true } }
  }
} as ComponentMeta<typeof Tab>;

const getOptions = count =>
  new Array(count).fill('').map((_, i) => ({ label: `Option ${i + 1}` }));

// call story as a normal react component.
export const Template: ComponentStory<typeof Tab> = args => {
  const [value, setValue] = useState(null);
  // wrap all stories with <BasicLayout></BasicLayout> to get default line-haul styles
  return (
    <BasicLayout>
      <Tab
        {...args}
        value={value}
        options={getOptions(7)}
        onChange={value => setValue(value)}
      />
    </BasicLayout>
  );
};
