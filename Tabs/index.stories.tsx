import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Tabs, { Tab, Panel } from './index';
import Line from '../Line';
import BasicLayout from '../Layout';

export default {
  title: 'Tabs',
  component: Tabs
} as ComponentMeta<typeof Tabs>;

const TABS = ['TAB1', 'TAB2', 'TAB3'];

export const Template: ComponentStory<typeof Tabs> = () => {
  return (
    <BasicLayout>
      <Tabs defaultTab="TAB2">
        <div>
          {TABS.map(value => (
            <Tab label={value} activeTabBorderBottomHeight="2px">
              {value}
            </Tab>
          ))}
        </div>
        <Line margin="0" />
        <div>
          {TABS.map(value => (
            <Panel label={value}>
              <div style={{ marginTop: '24px' }}>{`${value} Content`}</div>
            </Panel>
          ))}
        </div>
      </Tabs>
    </BasicLayout>
  );
};
