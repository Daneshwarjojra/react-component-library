import { ComponentStory, ComponentMeta } from '@storybook/react';
import Text from './index';
import BasicLayout from '../Layout';

const LoremIpsumText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

export default {
  title: 'Text',
  component: Text,
  argTypes: {
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
        'verysmall'
      ]
    },
    textAlign: {
      control: { type: 'select' },
      options: [
        'left',
        'right',
        'center',
        'justify',
        'initial',
        'inherit',
        'end'
      ]
    },
    textColor: {
      control: { type: 'color' }
    },
    hoverColor: {
      control: { type: 'color' }
    },
    ref: {
      table: { disable: true }
    },
    onClick: {
      table: { disable: true }
    }
  }
} as ComponentMeta<typeof Text>;

// call story as a normal react component.
export const Default: ComponentStory<typeof Text> = (args) => {
  // wrap all stories with <BasicLayout></BasicLayout> to get default line-haul styles

  return (
    <BasicLayout>
      <Text {...args}>{LoremIpsumText}</Text>
    </BasicLayout>
  );
};

Default.args = {
  fontSize: 'h5',
  fontWeight: 'regular',
  textColor: 'black'
};
