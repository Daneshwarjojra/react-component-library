import React, { forwardRef, Ref } from 'react';
import Styled, { css } from 'styled-components';
import { fontSizes, fontWeights } from '../../utils/constants';

type ThemeProp = (props: any) => string;
export type FontSize =
  | 'h1'
  | 'h2'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'medium'
  | 'normal'
  | 'small'
  | 'verySmall'
  | 'subHeader'
  | 'body'
  | 'subText'
  | 'smallText'
  | 'tinyText';
export type FontWeight = 'regular' | 'medium' | 'semiBold' | 'bold';
export interface TextProps {
  className?: string;
  display?: 'block' | 'inline' | 'inline-block' | 'initial' | 'flex' | '-webkit-box';
  fontSize: FontSize | number;
  fontWeight: FontWeight;
  textColor: ThemeProp | string;
  hoverColor?: ThemeProp | string;
  children: JSX.Element | React.ReactNode;
  margin?: string;
  padding?: string;
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto' | 'initial' | 'inherit';
  maxHeight?: 'none' | 'length' | 'initial' | 'inherit' | string;
  lineClamp?: number;
  width?: string;
  minWidth?: 'auto' | 'max-content' | 'min-content' | 'fit-content' | string;
  textDecoration?: string;
  maxWidth?: 'auto' | 'max-content' | 'min-content' | 'fit-content' | string;
  height?: string;
  justifyContent?: string;
  textAlign?:
    | 'left'
    | 'right'
    | 'center'
    | 'justify'
    | 'initial'
    | 'inherit'
    | 'end'
    | ThemeProp;
  wordBreak?:
    | 'break-all'
    | 'break-word'
    | 'inherit'
    | 'initial'
    | 'keep-all'
    | 'normal'
    | 'unset';
  cursor?: 'pointer' | 'auto' | 'not-allowed';
  onClick?: (e: any) => void;
  position?: 'relative' | 'absolute' | 'fixed';
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  transform?: string;
  ref?: Ref<HTMLParagraphElement>;
  isEllipsis?: boolean;
  whiteSpace?:
    | 'normal'
    | 'nowrap'
    | 'pre'
    | 'pre-line'
    | 'pre-wrap'
    | 'initial'
    | 'inherit';
  allignItem?: 'center' | 'left' | 'right';
  lineHeight?: string;
  verticalAlign?: 'middle';
  fontStyle?: 'italic';
  flex?: number;
  opacity?: number;
  textOverflow?: string;
}

const getFontWeight = ({ fontWeight }: TextProps) => fontWeights[fontWeight];
const getFontSize = ({ fontSize }: TextProps) =>
  fontSizes[fontSize] ??
  css`
    font-size: ${fontSize}px;
  `;
const getLineClamp = ({ lineClamp }: TextProps) => {
  if (typeof lineClamp === 'number') {
    return css`
      display: -webkit-box;
      -webkit-line-clamp: ${lineClamp};
      -webkit-box-orient: vertical;
      overflow: hidden;
      white-space: normal;
    `;
  } else return ``;
};

export const TextStyled = Styled.p<TextProps>`
  ${getFontSize}
  ${getFontWeight}
  line-height: ${({ lineHeight }) => lineHeight};
  padding: ${({ padding }) => (padding ? padding : '0')};
  margin: ${({ margin }) => (margin ? margin : `0`)};
  position: ${({ position }) => (position ? position : 'static')};
  top: ${({ top }) => top};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
  left: ${({ left }) => left};
  transform: ${({ transform }) => transform};
  text-align: ${({ textAlign }) => textAlign};
  display: ${({ display }) => display};
  word-break: ${({ wordBreak }) => wordBreak};
  color: ${({ textColor }) => textColor};
  overflow: ${props => (props.overflow ? props.overflow : 'hidden')};
  max-height: ${({ maxHeight }) => maxHeight};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  min-width: ${({ minWidth }) => minWidth};
  max-width: ${({ maxWidth }) => maxWidth};
  white-space: ${props => (props.whiteSpace ? props.whiteSpace : 'normal')};
  justify-content: ${({ justifyContent }) => justifyContent};
  text-decoration: ${({ textDecoration }) => textDecoration};
  text-overflow: ${({ isEllipsis }) => (isEllipsis ? 'ellipsis' : 'initial')};
  cursor: ${({ cursor }) => cursor};
  align-items: ${({ allignItem }) => allignItem};
  white-space: ${({ whiteSpace }) => whiteSpace};
  flex: ${props => (props.flex ? props.flex : 'unset')};
  vertical-align: ${({ verticalAlign }) => verticalAlign};
  font-style: ${({ fontStyle }) => fontStyle};
  flex: ${props => (props.flex ? props.flex : 'unset')};
  opacity: ${({ opacity }) => opacity};
  text-overflow: ${({ textOverflow }) => textOverflow};
  
  ${getLineClamp}
  &:hover {
    color: ${({ hoverColor }) => hoverColor};
  }
`;

const Text: React.FC<TextProps> = forwardRef(
  ({ children, ...props }: TextProps, ref?: Ref<HTMLParagraphElement>) => (
    <TextStyled ref={ref} {...props}>
      {children}
    </TextStyled>
  )
);

Text.displayName = 'Text';

export default Text;
