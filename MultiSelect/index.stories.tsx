import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import MultiSelect from "./index";
import BasicLayout from "../Layout";

export default {
  title: "MultiSelect",
  component: MultiSelect,
  argTypes: {
    // any arg that you don't want to change from storybook table should come below.
    onButtonClick: { table: { disable: true } },
  },
} as ComponentMeta<typeof MultiSelect>;

// call story as a normal react component.
export const Default: ComponentStory<typeof MultiSelect> = (args) => {
  // wrap all stories with <BasicLayout></BasicLayout> to get default line-haul styles
  return (
    <BasicLayout>
      <MultiSelect {...args} />
    </BasicLayout>
  );
};

const options = [{
  value: 'Delhi',
  label: 'Delhi'
}, {
  value: 'Rajasthan',
  label: 'Rajasthan'
}, {
  value: 'Uttar Pradesh',
  label: 'Uttar Pradesh',
}, {
  value: 'Madhya Pradesh',
  label: 'Madhya Pradesh'
}, {
  value: 'Karnataka',
  label: 'Karnataka'
}, {
  value: 'Maharashtra',
  label: 'Maharashtra'
}];

Default.args = {
  options,
  handleSelectedOptions: (e) => {
    console.log(e);
  },
  optionsSelected: [options[0], options[2], options[4], options[3]],
};
