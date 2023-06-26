import React from 'react';
import Card from '../../Card';
import { TabsContext } from '../tabs.util';

export interface PanelProps {
  label: string;
  children?: JSX.Element | React.ReactNode;
}

export const Panel: React.FC<PanelProps> = ({ label, children }: PanelProps) => {
  const { activeTab, unmountOnTabSwitch } = React.useContext(TabsContext);

  if (activeTab !== label && unmountOnTabSwitch) return null;

  return (
    <Card
      width="100%"
      padding="0"
      background="transparent"
      display={activeTab !== label && !unmountOnTabSwitch ? 'none' : 'block'}
    >
      {children}
    </Card>
  );
};
