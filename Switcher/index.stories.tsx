import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/client-api';
import Switch from './index';
import BasicLayout from '../Layout';

const getOptions = (count) =>
  new Array(count)
    .fill('')
    .map((_, i) => ({ value: `Option ${i + 1}`, label: `Option ${i + 1}` }));

export default {
  title: 'Switcher',
  component: Switch,
  argTypes: {
    filters: {
      defaultValue: getOptions(4)
    }
  }
} as ComponentMeta<typeof Switch>;

// call story as a normal react component.
export const Default: ComponentStory<typeof Switch> = (args) => {
  const [_, updateArgs] = useArgs();
  // wrap all stories with <BasicLayout></BasicLayout> to get default line-haul styles
  const handleToggle = (value) => {
    action('clicked')(value);
    updateArgs({ ...args, value });
  };

  return (
    <BasicLayout>
      <Switch {...args} onClick={handleToggle} />
    </BasicLayout>
  );
};

Default.args = {
  value: 'Option 1',
  filters: getOptions(4)
};
