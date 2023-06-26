import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/client-api';
import Radio from './index';
import BasicLayout from '../Layout';

export default {
  title: 'Radio',
  component: Radio,
  argTypes: {
    // any arg that you don't want to change from storybook table should come below.
    onChange: {
      table: { disable: true }
    }
  }
} as ComponentMeta<typeof Radio>;

const getOptions = (count) =>
  new Array(count)
    .fill('')
    .map((_, i) => ({ value: `${i + 1}`, name: `Option ${i + 1}` }));

// call story as a normal react component.
export const Default: ComponentStory<typeof Radio> = (args) => {
  const [_, updateArgs] = useArgs();
  const [selected, setSelected] = useState(null);
  // wrap all stories with <BasicLayout></BasicLayout> to get default line-haul styles
  const handleChange = (checked) => {
    action('clicked')(checked);
    setSelected(checked);
    updateArgs({ ...args, selected: checked });
  };

  return (
    <BasicLayout>
      {getOptions(5)?.map((data) => (
        <>
          <Radio
            {...args}
            selected={selected === data?.value}
            onChange={handleChange}
            value={data?.value}
            name={data?.value}
          />
          <label>{data?.name}</label>
        </>
      ))}
    </BasicLayout>
  );
};

Default.args = {
  selected: false
};
