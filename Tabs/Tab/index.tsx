import React, { forwardRef, Ref } from 'react';
import styled from 'styled-components';
import theme from '../../../theme';
import { useTabs } from '../tabs.util';

export interface TabProps {
  label: string;
  onClick?: () => void;
  default?: boolean;
  disabled?: boolean;
  children?: JSX.Element | React.ReactNode;
  fontSize?: string;
  ref?: Ref<HTMLButtonElement>;
  width?: string;
  hasBorderBottom?: boolean;
  background?: string;
  activeTabBorderBottomHeight?: string;
}

interface TabButtonProps {
  isCurrentTab: boolean;
  disabled?: boolean;
  fontSize?: string;
  width?: string;
  hasBorderBottom?: boolean;
  background?: string;
  activeTabBorderBottomHeight?: string;
}

const TabButton = styled.button<TabButtonProps>`
  box-sizing: border-box;
  flex: 1;
  outline: none;
  margin: none;
  border: none;
  background-color: ${props => (props.background ? props.background : theme.color.white)};
  color: ${props => (props.isCurrentTab ? theme.color.primary01 : theme.color.grey6)};
  width: ${props => props.width};
  font-family: inherit;
  font-size: ${props => (props.fontSize ? props.fontSize : '1rem')};
  font-weight: 600;
  padding: 0.8rem 1.2rem calc(0.8rem + 4px) 1.2rem;
  cursor: pointer;
  position: relative;
  transition: border-bottom 0.3s;
  border-bottom: ${props =>
    props.hasBorderBottom ? `1px solid ${theme.color.grey4}` : 'unset'};
  &:hover {
    color: ${theme.color.primary01};
  }
  &:disabled {
    cursor: not-allowed;
  }
  &:after {
    content: '';
    position: absolute;
    height: ${({ activeTabBorderBottomHeight }) => activeTabBorderBottomHeight || '4px'};
    transition: width 0.3s;
    width: ${props => (props.isCurrentTab ? '100%' : '0%')};
    bottom: -1px;
    left: 0;
    background-color: ${props =>
      props.isCurrentTab ? theme.color.primary01 : 'transparent'};
  }
`;

export const Tab: React.FC<TabProps> = forwardRef(function Tab(
  { label, disabled, width, hasBorderBottom, background, onClick, ...props }: TabProps,
  ref?: Ref<HTMLButtonElement>
) {
  const { setActiveTab, activeTab } = useTabs();

  const handleOnClick = () => {
    setActiveTab(label);
    if (onClick) {
      onClick();
    }
  };

  return (
    <TabButton
      {...props}
      onClick={() => handleOnClick()}
      isCurrentTab={activeTab === label}
      disabled={disabled}
      ref={ref}
      width={width}
      hasBorderBottom={hasBorderBottom}
      background={background}
    >
      {props.children}
    </TabButton>
  );
});
