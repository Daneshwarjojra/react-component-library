import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import theme from '../../theme';
import Tag from './index';
import BasicLayout from '../Layout';
import Flex from '../Flex';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Tag',
  component: Tag,
  argTypes: {
    // any arg that you don't want to change from storybook table should come below.
    options: { table: { disable: true } },
    value: { table: { disable: true } },
    onChange: { table: { disable: true } }
  }
} as ComponentMeta<typeof Tag>;

// call story as a normal react component.
export const BasicTag: ComponentStory<typeof Tag> = args => {
  const [value, setValue] = useState(false);
  const [secondValue, setSecondValue] = useState(false);

  return (
    <BasicLayout>
      <Flex columnGap='12px'>
        <Tag
          {...args}
          isCurrentTag={value}
          onClick={() => setValue(!value)}
        >
          Basic Tag
        </Tag>
        <Tag
          {...args}
          currentTagColor={theme.color.primary01}
          isCurrentTag={secondValue}
          onClick={() => setSecondValue(!secondValue)}
          kind="flat"
        >
          Flat Tag
        </Tag>
      </Flex>
    </BasicLayout>
  );
};
