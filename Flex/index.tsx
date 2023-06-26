import React, { forwardRef, Ref, MouseEvent, FocusEvent } from 'react';
import styled from 'styled-components';

type ThemeProp = (props: any) => any;

export type directionTypes = 'ltr' | 'rtl' | 'unset' | 'revert';

export interface FlexProps {
  ref?: Ref<HTMLDivElement>;
  padding?: string;
  margin?: string;
  children?: JSX.Element | React.ReactNode;
  position?: 'absolute' | 'relative' | 'sticky' | 'fixed';
  top?: string;
  left?: any;
  bottom?: string;
  right?: any;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'normal'
    | any;
  alignContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'stretch'
    | 'normal';
  alignSelf?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'stretch'
    | 'auto'
    | 'normal';
  overflow?: string;
  border?: string;
  borderBottom?: string;
  borderRight?: ThemeProp | string;
  borderLeft?: ThemeProp | string;
  borderWidth?: string;
  onClick?: (event?: MouseEvent) => void;
  onMouseEnter?: (event?: MouseEvent) => void;
  onMouseLeave?: (event?: MouseEvent) => void;
  background?: ThemeProp | string;
  cursor?: string;
  alignItem?:
    | 'stretch'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'baseline'
    | 'normal'
    | any
    | ThemeProp;
  flexDirection?: any;
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  width?: string;
  height?: string;
  maxWidth?: number | string;
  minWidth?: number | string;
  minHeight?: number;
  maxHeight?: string;
  flexWidth?: any;
  zIndex?: number;
  className?: string;
  wordBreak?: 'break-word' | 'anywhere';
  transform?: string;
  borderRadius?: string;
  transition?: string;
  boxShadow?: ThemeProp | string;
  shadowColor?: ThemeProp | string;
  tabIndex?: number;
  rowGap?: string;
  columnGap?: string;
  before?: boolean;
  flexGrow?: string;
  backgroundPosition?: string;
  backgroundSize?: string;
  backgroundRepeat?: string;
  direction?: directionTypes;
  onFocus?: (event: FocusEvent<HTMLDivElement>) => void;
  hoverBackground?: string;
}

const FlexContainer = styled.div<FlexProps>`
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  align-content: ${({ alignContent }) => alignContent};
  box-sizing: border-box;
  display: flex;
  justify-content: ${props => props.justifyContent};
  position: ${({ position }) => position};
  top: ${({ top }) => top};
  bottom: ${({ bottom }) => bottom};
  right: ${({ right }) => right};
  left: ${({ left }) => left};
  overflow: ${({ overflow }) => overflow};
  align-items: ${({ alignItem }) => alignItem};
  flex-direction: ${({ flexDirection }) => flexDirection};
  background: ${({ background }) => background};
  flex-wrap: ${({ flexWrap }) => flexWrap};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  max-width: ${({ maxWidth }) =>
    typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth};
  min-width: ${({ minWidth }) =>
    typeof minWidth === 'number' ? `${minWidth}px` : minWidth};
  min-height: ${({ minHeight }) =>
    typeof minHeight === 'number' ? `${minHeight}px` : minHeight};
  max-height: ${({ maxHeight }) => maxHeight};
  border: ${({ border }) => border};
  border-right: ${({ borderRight }) => borderRight};
  border-left: ${({ borderLeft }) => borderLeft};
  border-bottom: ${({ borderBottom }) => borderBottom};
  border-width: ${({ borderWidth }) => borderWidth};
  cursor: ${({ cursor }) => cursor};
  transform: ${({ transform }) => transform};
  flex: ${({ flexWidth }) => flexWidth};
  word-break: ${({ wordBreak }) => wordBreak};
  z-index: ${({ zIndex }) => zIndex};
  border-radius: ${({ borderRadius }) => borderRadius};
  transition: ${({ transition }) => transition};
  box-shadow: ${({ boxShadow }) => boxShadow};
  row-gap: ${({ rowGap }) => rowGap};
  column-gap: ${({ columnGap }) => columnGap};
  flex-grow: ${({ flexGrow }) => flexGrow};
  background-position: ${({ backgroundPosition }) => backgroundPosition};
  background-repeat: ${({ backgroundRepeat }) => backgroundRepeat};
  background-size: ${({ backgroundSize }) => backgroundSize};
  direction: ${({ direction }) => direction};

  :hover {
    background: ${({ hoverBackground }) => hoverBackground};
  }
`;

const Flex: React.FC<FlexProps> = forwardRef(function FluxComponent(
  { children, ...props }: FlexProps,
  ref?: Ref<HTMLDivElement>
) {
  return (
    <FlexContainer {...props} ref={ref}>
      {children}
    </FlexContainer>
  );
});

export default Flex;
