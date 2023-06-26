import React from 'react';
import styled, { FlattenSimpleInterpolation } from 'styled-components';
import { ThemeProps } from '../Card';

type ThemeProp = (prop: any) => string;

type FlexGridSelfType =
  | 'auto'
  | 'stretch'
  | 'center'
  | 'start'
  | 'end'
  | 'left'
  | 'right'
  | 'baseline';

export interface SvgProps {
  className?: string;
  width?: number;
  fontSize?: number;
  height?: number;
  margin?: string;
  padding?: string;
  children: JSX.Element | React.ReactNode;
  onClick?: any;
  svgFill?: ThemeProp | string;
  svgStroke?: ThemeProps | string;
  svgStrokeWidth?: number;
  cursor?: string;
  textAlign?: 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit';
  boxSizing?: 'content-box' | 'border-box' | 'initial' | 'inherit';
  bgOnHover?: string | ThemeProp;
  boxShadow?: string | ThemeProp;
  shadowColor?: string | ThemeProp;
  svgTransform?: string | ThemeProp;
  boxShadowOnHover?: string | ThemeProp;
  shadowColorOnHover?: string | ThemeProp;
  fillOnHover?: string | ThemeProp;
  strokeOnHover?: string | ThemeProp;
  background?: string | ThemeProp;
  justifySelf?: FlexGridSelfType;
  alignSelf?: FlexGridSelfType;
  position?:
    | 'static'
    | 'absolute'
    | 'fixed'
    | 'relative'
    | 'sticky'
    | 'initial'
    | 'inherit';
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  borderRadius?: string;
  border?: string;
  animation?: FlattenSimpleInterpolation;
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto' | 'initial' | 'unset';
  svgTransition?: string;
  display?: 'block' | 'inline' | 'inline-block' | 'initial' | 'flex' | string;
  alignItems?:
    | 'start'
    | 'end'
    | 'center'
    | 'stretch'
    | 'flex-start'
    | 'flex-end'
    | 'baseline'
    | 'initial'
    | 'inherit'
    | string;
  justifyContent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'initial'
    | 'inherit'
    | string;
}

export interface StyledSvgProps {
  width?: string;
  height?: string;
  transformOrigin?: string;
  show?: boolean;
  svgFill?: ThemeProps;
  onClick?: () => void;
  transition?: string;
}

export const StyledSvg: React.FC<StyledSvgProps> = styled.svg<StyledSvgProps>`
  fill: ${({ svgFill }) => svgFill};
  width: ${({ width }) => (width ? width : 18)};
  height: ${({ height }) => (height ? height : 18)};
  transition: ${({ transition }) => (transition ? transition : 'transform 0.4s linear')};
  transform: ${({ show }) => (show ? 'rotate(180deg)' : 'rotate(0deg)')};
  transform-origin: center center;
  cursor: pointer;
`;

export const SvgWrapper = styled.div<SvgProps>`
  padding: ${({ padding }) => padding};
  line-height: 0;
  margin: ${({ margin }) => margin};
  position: ${({ position }) => position};
  top: ${({ top }) => top};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
  left: ${({ left }) => left};
  text-align: ${({ textAlign }) => textAlign};
  border-radius: ${({ borderRadius }) => borderRadius};
  justify-self: ${({ justifySelf }) => justifySelf};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-self: ${({ alignSelf }) => alignSelf};
  box-sizing: ${({ boxSizing }) => boxSizing};
  font-size: ${({ fontSize }) => fontSize};
  width: ${({ width }) => width && `${width}px`};
  height: ${({ height }) => height && `${height}px`};
  cursor: ${({ cursor }) => cursor};
  fill: ${({ svgFill }) => svgFill};
  stroke: ${({ svgStroke }) => svgStroke};
  stroke-width: ${({ svgStrokeWidth }) => svgStrokeWidth};
  background: ${({ background }) => background};
  border: ${({ border }) => border};
  animation: ${({ animation }) => animation};
  box-shadow: ${({ boxShadow }) => boxShadow};
  overflow: ${({ overflow }) => overflow};
  display: ${({ display }) => display};
  align-items: ${({ alignItems }) => alignItems};
  > svg {
    transform: ${({ svgTransform }) => svgTransform};
    transition: ${({ svgTransition }) => svgTransition};
  }
  &:hover {
    background-color: ${({ bgOnHover }) => bgOnHover};
    box-shadow: ${({ boxShadowOnHover }) => boxShadowOnHover};
    fill: ${({ fillOnHover }) => fillOnHover};
    stroke: ${({ strokeOnHover }) => strokeOnHover};
    border-radius: ${({ borderRadius }) => borderRadius};
  }
`;

const Svg: React.FC<SvgProps> = ({ children, ...props }: SvgProps) => (
  <SvgWrapper {...props}>{children}</SvgWrapper>
);

export default Svg;
