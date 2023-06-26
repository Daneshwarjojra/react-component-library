import React, { useEffect } from 'react';
import { Tab, TabProps } from './Tab';
import { Panel, PanelProps } from './Panel';
import { TabsContext } from './tabs.util';

interface TabsComposition {
  Tab: React.FC<TabProps>;
  Panel: React.FC<PanelProps>;
}

interface TabsProps {
  children: JSX.Element | React.ReactNode;
  defaultTab?: string;
  unmountOnTabSwitch?: boolean;
  getActiveTab?: (props: any) => void;
}

const Tabs: React.FC<TabsProps> & TabsComposition = ({
  children,
  defaultTab,
  unmountOnTabSwitch = true,
  getActiveTab
}: TabsProps) => {
  const [activeTab, setActiveTab] = React.useState(defaultTab);

  useEffect(() => {
    if (getActiveTab) {
      getActiveTab(activeTab);
    }
  }, [activeTab]);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, unmountOnTabSwitch }}>
      {children}
    </TabsContext.Provider>
  );
};

Tabs.Tab = Tab;
Tabs.Panel = Panel;

export default Tabs;
export { Tab, Panel };
