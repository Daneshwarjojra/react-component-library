import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import theme from '../../theme';
import Flex from '../Flex';
import Svg from '../Svg';
import Text from '../Text';
import DownIcon from './icons/down.svg';
import OutsideClickHandler from 'react-outside-click-handler';

export interface TabProps {
  options: {
    label: string;
    icon?: JSX.Element;
  }[];
  value: string;
  onChange?: (value: string) => void;
  visibleTabCount?: number;
  moreButtonText?: string;
  closeMenuOnSelect?: boolean;
}

const TabStyled = styled.div`
  display: flex;
  padding: 4px;
  row-gap: 12px;
  width: fit-content;
  background: ${theme.color.white};
  box-shadow: 0 2px 20px rgba(90, 106, 157, 0.12);
  border-radius: 34px;
  user-select: none;
  position: relative;
  flex-wrap: wrap;
`;

const TabButton = styled.div<{ background: string }>`
  padding: 8px 28px;
  background: ${props => props.background};
  border-radius: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 13px;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  min-width: 232px;
  max-height: 284px;
  overflow: hidden;
  overflow-y: auto;
  background: ${theme.color.white};
  box-shadow: 0 2px 24px rgba(90, 106, 157, 0.16);
  border-radius: 6px;
  row-gap: 4px;

  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.color.grey4};
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.color.grey3};
  }

  position: absolute;
  right: 0;
  top: calc(100% + 4px);
`;

const MenuItem = styled(Flex)<{ selected: boolean }>`
  background: ${props =>
    props.selected ? `${theme.color.teal5} !important` : theme.color.white};
  &:hover {
    background: ${theme.color.teal5};
  }
`;

const Tab: React.FC<TabProps> = ({
  options,
  value,
  onChange,
  visibleTabCount,
  moreButtonText,
  closeMenuOnSelect
}) => {
  const [open, setOpen] = useState(false);

  const selectedIndex = useMemo(() => {
    return options.findIndex(item => item.label === value);
  }, [options, value]);

  return (
    <TabStyled>
      {options.slice(0, visibleTabCount ?? options.length).map(({ label, icon }, i) => (
        <TabButton
          key={i}
          background={selectedIndex === i ? theme.color.teal5 : theme.color.white}
          onClick={() => onChange && onChange(label)}
        >
          {icon}
          <Text
            fontSize="h6"
            fontWeight="semiBold"
            textColor={selectedIndex === i ? theme.color.primary01 : theme.color.grey2}
          >
            {label}
          </Text>
        </TabButton>
      ))}
      {visibleTabCount < options.length && (
        <>
          <TabButton
            background={
              selectedIndex >= visibleTabCount ? theme.color.teal5 : theme.color.white
            }
            onClick={() => setOpen(!open)}
          >
            <Text fontSize="h6" fontWeight="semiBold" textColor={theme.color.primary01}>
              {moreButtonText ?? 'More'}
            </Text>
            <Svg svgStroke={theme.color.primary01} width={17} height={10}>
              <DownIcon />
            </Svg>
          </TabButton>
          {open && (
            <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
              <Menu>
                {options.slice(visibleTabCount).map((option, i) => (
                  <MenuItem
                    key={i}
                    padding="12px 20px"
                    cursor="pointer"
                    selected={selectedIndex - visibleTabCount === i}
                    columnGap="13px"
                    onClick={() => {
                      onChange && onChange(option.label);
                      closeMenuOnSelect && setOpen(false);
                    }}
                  >
                    {option.icon}
                    <Text
                      fontSize="h6"
                      fontWeight="regular"
                      textColor={theme.color.grey1}
                    >
                      {option.label}
                    </Text>
                  </MenuItem>
                ))}
              </Menu>
            </OutsideClickHandler>
          )}
        </>
      )}
    </TabStyled>
  );
};

export default Tab;
