import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ImageSelect from "./index";
import BasicLayout from "../../components/Layout";

export default {
  title: "ImageSelect",
  component: ImageSelect,
  argTypes: {
    // any arg that you don't want to change from storybook table should come below.
    onButtonClick: { table: { disable: true } },
  },
} as ComponentMeta<typeof ImageSelect>;

// call story as a normal react component.
export const Default: ComponentStory<typeof ImageSelect> = (args) => {
    const [selectedImage, setSelectedImage] = useState('value2')
  // wrap all stories with <BasicLayout></BasicLayout> to get default line-haul styles
  return (
      <BasicLayout>
        <ImageSelect {...args} selectedImage={selectedImage} onSelectImage={(imageOption) => {setSelectedImage(imageOption.value)}} />
      </BasicLayout>
  );
};

Default.args = {
  options: [{
    label: 'Image1',
    value: 'value1',
    url: 'https://placehold.jp/3d4070/96EAB9/150x150.png'
  },
  {
    label: 'Image2',
    value: 'value2',
    url: 'https://placehold.jp/ff4070/96EAB9/150x150.png'
  },
  {
    label: 'Image3',
    value: 'value3',
    url: 'https://placehold.jp/aa4c70/96EAB9/150x150.png'
  }],
  imageStyleProps: {
    width: '20px',
    height: '50px'
  }
};
