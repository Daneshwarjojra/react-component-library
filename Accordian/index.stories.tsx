import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import Accordian from './index';
import BasicLayout from '../Layout';
import DownChevron from '../../../public/svg/chevronDownColor.svg';

export default {
  title: 'Accordian',
  component: Accordian,
  argTypes: {
    // any arg that you don't want to change from storybook table should come below.
    removeAccordian: { table: { disable: true } }
    // titleComponent: { table: { disable: true } }
  }
} as ComponentMeta<typeof Accordian>;

// call story as a normal react component.
export const Default: ComponentStory<typeof Accordian> = args => {
  const [_, updateArgs] = useArgs();
  // wrap all stories with <BasicLayout></BasicLayout> to get default line-haul styles
  const titleComponent = () => {
    return (
      <>
        <div
          style={{
            cursor: 'pointer',
            padding: '10px',
            backgroundColor: 'lightgray',
            width: '25%'
          }}
          onClick={() => updateArgs({ ...args, isOpen: !args.isOpen })}
        >
          Accordian Title{' '}
          {!args?.isOpen ? (
            <span style={{ float: 'right' }}>
              <DownChevron />
            </span>
          ) : (
            ''
          )}
        </div>
      </>
    );
  };
  return (
    <BasicLayout>
      <Accordian {...args} titleComponent={titleComponent()}>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
        </ul>
      </Accordian>
    </BasicLayout>
  );
};

Default.args = {
  isOpen: true
};
