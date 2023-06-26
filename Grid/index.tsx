import React, { MouseEvent } from 'react';
import styled from 'styled-components';

interface GridProps {
  gtc?: string;
  gtr?: string;
  gridGap?: string;
  children: JSX.Element | React.ReactNode;
  justifyItems?: 'start' | 'end' | 'center' | 'stretch';
  alignItems?: 'start' | 'end' | 'center' | 'stretch';
  placeItems?: 'start' | 'end' | 'center' | 'stretch';
  justifyContent?:
    | 'start'
    | 'end'
    | 'center'
    | 'stretch'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
  alignContent?:
    | 'start'
    | 'end'
    | 'center'
    | 'stretch'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
  placeContent?:
    | 'start'
    | 'end'
    | 'center'
    | 'stretch'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
  gridAutoColumns?: string;
  id?: string;
  gridAutoRows?: string;
  margin?: string;
  padding?: string;
  height?: string;
  width?: string;
  borderRadius?: string;
  bgColor?: string;
  onClick?: (event?: MouseEvent) => void;
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
  zIndex?: number;
  transform?: string;
}

const StyledGrid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: ${props => props.gtc};
  grid-template-row: ${props => props.gtr};
  grid-gap: ${props => props.gridGap};
  justify-items: ${props => props.justifyItems};
  align-items: ${props => props.alignItems};
  place-items: ${props => props.placeItems};
  justify-content: ${props => props.justifyContent};
  align-content: ${props => props.alignContent};
  place-content: ${props => props.placeContent};
  margin: ${props => (props.margin ? props.margin : '0')};
  padding: ${props => (props.padding ? props.padding : '0')};
  height: ${props => props.height};
  width: ${props => props.width};
  border-radius: ${props => props.borderRadius};
  background-color: ${props => props.bgColor};
  position: ${props => props.position};
  top: ${props => props.top};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  left: ${props => props.left};
  z-index: ${props => props.zIndex};
  transform: ${props => props.transform};
`;
export const Grid: React.FC<GridProps> = ({ children, onClick, ...props }: GridProps) => (
  <StyledGrid {...props} onClick={onClick}>
    {children}
  </StyledGrid>
);

export default Grid;
