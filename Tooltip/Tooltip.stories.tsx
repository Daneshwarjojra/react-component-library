import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Tooltip from './index';
import BasicLayout from '../../components/Layout';

export default {
  title: 'Tooltip',
  component: Tooltip,
  argTypes: {
    // any arg that you don't want to change from storybook table should come below.
    onButtonClick: { table: { disable: true } },
  },
} as ComponentMeta<typeof Tooltip>;

// call story as a normal react component.
export const Default: ComponentStory<typeof Tooltip> = (args) => {
  // wrap all stories with <BasicLayout></BasicLayout> to get default line-haul styles
  return (
    <BasicLayout>
      <Tooltip {...args}>
        <div>Hover me</div>
      </Tooltip>
    </BasicLayout>
  );
};

Default.args = { id: "default", tooltipContent: "Some tooltip content" };

export const HtmlContent = Default.bind({});
HtmlContent.args = {
  id: "htmlcontent",
  isHtmlContent: true,
  backgroundColor: 'green',
  tooltipContent: (
    <div
      style={{
        color: "blue",
        width: "20px",
        overflow: "hidden",
        wordWrap: "break-word",
      }}
    >
      Something to display
    </div>
  ),
};

export const HeadingContent = Default.bind({});
HeadingContent.args = {
  id: "headingcontent",
  place: "right",
  contentWithTitle: {
    title: "Heading11",
    description: "Some description"
  }
};
