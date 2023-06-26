import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/client-api';
import Checkbox from './index';
import BasicLayout from '../Layout';

export default {
  title: 'Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

// call story as a normal react component.
export const Default: ComponentStory<typeof Checkbox> = (args) => {
  const [_, updateArgs] = useArgs();
  // wrap all stories with <BasicLayout></BasicLayout> to get default line-haul styles
  const handleChange = (checked) => {
    action('clicked')(checked);
    updateArgs({ ...args, checked });
  };

  return (
    <BasicLayout>
      <Checkbox {...args} onChange={handleChange} />
    </BasicLayout>
  );
};

Default.args = {
  checked: false,
};
