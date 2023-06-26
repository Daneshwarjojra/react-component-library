import React, { ReactElement, useMemo } from 'react';
import styled, { css } from 'styled-components';
import theme from '../../theme';
import Flex from '../Flex';

type SwitcherStyleProps = {
  width?: number;
  transform?: string;
  borderRadius?: string;
  height?: string | number;
  margin?: string;
};

const SliderLabel = styled.p`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${theme.color.grey2};
`;

const Glider = styled.div<SwitcherStyleProps>`
  position: absolute;
  display: flex;
  height: ${({ height }) => height};
  width: ${props => `${props.width}px`};
  background-color: ${theme.color.teal5};
  border-radius: ${({ borderRadius }) => borderRadius};
  transition: 0.25s ease-out;
  transform: ${props => props.transform};
  margin: ${({ margin }) => margin};
`;

const TabLabel = styled.label<{
  width: number;
  borderRadius: string;
  height?: string | number;
  margin?: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ height }) => height};
  width: ${props => `${props.width}px`};
  font-weight: 600;
  border-radius: ${({ borderRadius }) => borderRadius};
  color: ${theme.color.grey2};
  cursor: pointer;
  transition: color 0.15s ease-in;
  position: relative;
  user-select: none;
  margin: ${({ margin }) => margin};
`;

const TagIconWrapper = styled.span<{ margin?: string; padding?: string }>`
  ${props => css`
    margin: ${props.margin};
    padding: ${props.padding};
  `}
`;

const TabStyle = styled.div<{
  switcherId: string;
  margin?: string;
  border?: string;
  backgroundColor?: string;
  boxShadow?: string;
  columnGap?: string;
  checkedBackgroundColor?: string;
  borderRadius?: string;
  padding?: string;
}>`
  margin-left: 16px;
  display: flex;
  position: relative;
  background-color: ${theme.color.white};
  box-shadow: 0px 2px 20px rgba(90, 106, 157, 0.12);
  padding: ${({ padding = '4px' }) => padding};
  border-radius: ${({ borderRadius = '36px' }) => borderRadius};

  input[type='radio'] {
    display: none;
  }

  input[type='radio'] {
    &:checked {
      & + label {
        color: ${theme.color.primary01};
        background-color: ${props => props.checkedBackgroundColor};
      }
    }
  }

  ${props => css`
    margin: ${props.margin};
    border: ${props.border};
    background-color: ${props.backgroundColor};
    box-shadow: ${props.boxShadow};
    column-gap: ${props.columnGap};
  `}
`;

export type SwitcherChildType = {
  label: string;
  value: string;
  labelIcon?: JSX.Element;
  labelIconMargin?: string;
  labelIconPadding?: string;
};

export type TabWrapperStyleType = {
  padding?: string;
  margin?: string;
  border?: string;
  backgroundColor?: string;
  boxShadow?: string;
  columnGap?: string;
  borderRadius?: string;
};

export type SwitcherProps = {
  onClick: (selected: string) => void;
  filters: SwitcherChildType[];
  title?: string;
  margin?: string;
  value: string;
  width?: number;
  checkedBackgroundColor?: string;
  tabWrapperStyle?: Partial<TabWrapperStyleType>;
  name?: string;
  gliderBorderRadius?: string;
  height?: string | number;
  gliderMargin?: string;
};

export default function Switcher({
  onClick,
  filters,
  title,
  margin,
  value,
  width = 130,
  height = 40,
  checkedBackgroundColor,
  tabWrapperStyle,
  name = 'tabs',
  gliderBorderRadius = '24px',
  gliderMargin = '0'
}: SwitcherProps): ReactElement {
  const switcherId = useMemo(() => `radio-${Date.now()}`, []);
  const selectedIndex = useMemo(() => {
    return filters.findIndex(option => option.value === value);
  }, [value, filters]);

  return (
    <Flex margin={margin || '0px'} alignItem="center">
      {title && <SliderLabel>{title}</SliderLabel>}
      <TabStyle
        switcherId={switcherId}
        checkedBackgroundColor={checkedBackgroundColor}
        {...tabWrapperStyle}
      >
        <Glider
          transform={`translate(${selectedIndex * 100}%)`}
          width={width}
          borderRadius={gliderBorderRadius}
          height={height}
          margin={gliderMargin}
        />
        {filters.map((filter, index) => (
          <React.Fragment key={`radio-group-${index}`}>
            <input
              onChange={() => onClick(filter.value)}
              type="radio"
              id={`${switcherId}-${index + 1}`}
              name={name}
              checked={value ? filter.value === value : undefined}
            />
            <TabLabel
              htmlFor={`${switcherId}-${index + 1}`}
              width={width}
              borderRadius={gliderBorderRadius}
              height={height}
              margin={gliderMargin}
            >
              {filter.labelIcon ? (
                <>
                  <TagIconWrapper
                    margin={filter.labelIconMargin}
                    padding={filter.labelIconPadding}
                  >
                    {filter.labelIcon}
                  </TagIconWrapper>
                  {filter.label}
                </>
              ) : (
                filter.label
              )}
            </TabLabel>
          </React.Fragment>
        ))}
      </TabStyle>
    </Flex>
  );
}
