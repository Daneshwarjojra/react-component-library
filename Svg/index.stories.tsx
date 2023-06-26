import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Svg from './index';
import BasicLayout from '../Layout';
import InfoIcon from '../../../public/svg/warning-icon.svg';

export default {
  title: 'Svg',
  component: Svg,
  argTypes: {
    svgFill: {
      control: { type: 'color' }
    },
    bgOnHover: {
      control: { type: 'color' }
    },
    shadowColor: {
      control: { type: 'color' }
    },
    svgStroke: {
      control: { type: 'color' }
    },
    ref: {
      table: { disable: true }
    },
    onClick: {
      table: { disable: true }
    },
    icon: {
      control: {
        type: 'string'
      }
    }
  }
} as ComponentMeta<typeof Svg>;

// call story as a normal react component.
export const Default: ComponentStory<typeof Svg> = (args) => {
  // wrap all stories with <BasicLayout></BasicLayout> to get default line-haul styles
  return (
    <BasicLayout>
      <Svg {...args}>
        <InfoIcon />
      </Svg>
    </BasicLayout>
  );
};

Default.args = {
  height: 50,
  width: 50
};
