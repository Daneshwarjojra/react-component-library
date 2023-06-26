import React from 'react';

interface TabsContext {
  activeTab: string;
  setActiveTab: (label: string) => void;
  resetTabs?: () => void;
  unmountOnTabSwitch?: boolean;
}

export const TabsContext = React.createContext<TabsContext | undefined>(undefined);

export const useTabs = (): TabsContext => {
  const { activeTab, setActiveTab } = React.useContext(TabsContext);
  if (!activeTab && !setActiveTab) {
    throw new Error('This component must be used within a <Tabs> component.');
  }

  return {
    activeTab,
    setActiveTab
  };
};
