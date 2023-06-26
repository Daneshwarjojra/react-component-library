import React, { MouseEvent, FocusEvent, Ref, UIEvent } from 'react';
import styled from 'styled-components';
import theme from '../../theme';

export type ThemeProps = (props: any) => any;

export interface CardProps {
  id?: string;
  ref?: Ref<HTMLDivElement>;
  rounded?: 'top' | 'bottom' | 'all' | 'left' | 'right' | 'max' | 'none';
  shadow?: boolean;
  boxShadow?: ThemeProps | string;
  shadowColor?: ThemeProps | string;
  padding?: string;
  margin?: string;
  background?: ThemeProps | string;
  hover?: boolean;
  hoverBoxShadow?: any;
  hoverShadowColor?: any;
  hoverBackground?: ThemeProps | string;
  width?: string;
  maxHeight?: string;
  minHeight?: string;
  fontSize?: string;
  height?: string;
  onClick?: any;
  onMouseOver?: (event: MouseEvent) => void;
  onMouseEnter?: (event: MouseEvent) => void;
  onMouseLeave?: (event: MouseEvent) => void;
  onBlur?: (event: FocusEvent<HTMLDivElement>) => void;
  onFocus?: (event: FocusEvent<HTMLDivElement>) => void;
  onScroll?: (event?: UIEvent) => void;
  border?: ThemeProps | string;
  textColor?: ThemeProps | string;
  zIndex?: number;
  overflow?: 'inherit' | 'auto' | 'scroll' | 'visible' | 'hidden' | 'overlay';
  cursor?:
    | 'alias'
    | 'all-scroll'
    | 'auto'
    | 'cell'
    | 'context-menu'
    | 'col-resize'
    | 'copy'
    | 'crosshair'
    | 'default'
    | 'e-resize'
    | 'ew-resize'
    | 'grab'
    | 'grabbing'
    | 'help'
    | 'move'
    | 'n-resize'
    | 'ne-resize'
    | 'nesw-resize'
    | 'ns-resize'
    | 'nw-resize'
    | 'nwse-resize'
    | 'no-drop'
    | 'none'
    | 'not-allowed'
    | 'pointer'
    | 'progress'
    | 'row-resize'
    | 's-resize'
    | 'se-resize'
    | 'sw-resize'
    | 'text'
    | 'URL'
    | 'vertical-text'
    | 'w-resize'
    | 'wait'
    | 'zoom-in'
    | 'zoom-out'
    | 'initial'
    | 'inherit';
  position?:
    | 'relative'
    | 'absolute'
    | 'sticky'
    | 'fixed'
    | 'static'
    | 'initial'
    | 'inherit';
  textAlign?: 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit';
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  children?: JSX.Element | React.ReactNode;
  customStyle?: any;
  maxWidth?: string;
  minWidth?: string;
  after?: string;
  borderRadius?: string;
  transform?: string | ThemeProps;
  outline?: string;
  transition?: string;
  borderBottom?: string;
  gap?: string;
  display?: 'block' | 'flex' | 'grid' | 'inline' | 'none';
  flexDirection?: 'column';
}

const CardStyle = styled.div<CardProps>`
  padding: ${({ padding }) => (padding ? padding : '16px 20px')};
  margin: ${({ margin }) => margin};
  position: ${({ position }) => position};
  top: ${({ top }) => top};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
  left: ${({ left }) => left};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '4px')};
  text-align: ${({ textAlign }) => textAlign};
  box-sizing: border-box;
  position: ${({ position }) => position};
  z-index: ${({ zIndex }) => zIndex};
  box-shadow: ${({ boxShadow }) => boxShadow};
  background-color: ${({ background }) => (background ? background : '#fffff')};
  color: ${({ textColor }) => textColor};
  border: ${({ border }) => border};
  border-bottom: ${({ borderBottom }) => borderBottom};
  outline: ${({ outline }) => outline};
  font-size: ${({ fontSize }) => fontSize};
  max-width: ${({ maxWidth }) => maxWidth};
  min-width: ${({ minWidth }) => minWidth};
  width: ${({ width }) => width};
  max-height: ${({ maxHeight }) => maxHeight};
  min-height: ${({ minHeight }) => minHeight};
  height: ${({ height }) => height};
  text-align: ${({ textAlign }) => textAlign};
  cursor: ${({ cursor }) => cursor};
  overflow: ${({ overflow }) => overflow};
  transform: ${({ transform }) => transform};
  transition: ${({ transition }) => transition};
  gap: ${({ gap }) => gap};
  display: ${({ display }) => display};
  flex-direction: ${({ flexDirection }) => flexDirection};
  &:hover {
    background-color: ${({ hoverBackground, background }) =>
      hoverBackground ? hoverBackground : background};
    > div > p {
      color: ${({ hover }) => (hover ? theme.color.white : ``)};
    }
    box-shadow: ${({ hoverBoxShadow, boxShadow }) =>
      hoverBoxShadow ? hoverBoxShadow : boxShadow};
  }
  :after {
    ${({ after }) => after};
  }
`;

const Card: React.FC<CardProps> = React.forwardRef(function cardComponent(
  { children, ...props }: CardProps,
  ref?: Ref<HTMLDivElement>
) {
  return (
    <CardStyle {...props} ref={ref} style={props.customStyle}>
      {children}
    </CardStyle>
  );
});

export default Card;
