import { ComponentStory, ComponentMeta } from '@storybook/react';
import MultitagsDropdown from './index';
import BasicLayout from '../Layout';
import { useState } from 'react';

const getOptions = (count) =>
  new Array(count)
    .fill('')
    .map((_, i) => ({ value: i + 1, label: `Option ${i + 1}` }));

export default {
  title: 'MultitagsDropdown',
  component: MultitagsDropdown,
} as ComponentMeta<typeof MultitagsDropdown>;

// call story as a normal react component.
export const Default: ComponentStory<typeof MultitagsDropdown> = (args) => {
  // wrap all stories with <BasicLayout></BasicLayout> to get default line-haul styles
  const [selected, setSelected] = useState([]);
  
  return (
    <BasicLayout>
      <MultitagsDropdown setOptionObject={value => {
            setSelected(value);
        }} value={selected} {...args} />
    </BasicLayout>
  );
};

Default.args = {
  options: getOptions(5),
};
