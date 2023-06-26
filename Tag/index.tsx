import React from 'react';
import styled, { css } from 'styled-components';
import theme from '../../theme';
import Flex from '../Flex';
import Text, { TextStyled, TextProps } from '../Text';

enum TAG_TYPE {
  'danger' = 'danger',
  'bordered' = 'bordered',
  'flat' = 'flat'
}

export interface TagProps {
  padding?: string;
  margin?: string;
  children: JSX.Element | React.ReactNode;
  icon?: JSX.Element | React.ReactNode;
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
  onClick?: () => void;
  isCurrentTag?: boolean;
  theme?: any;
  width?: string;
  minWidth?: string;
  border?: string;
  background?: string;
  iconDirectionRight?: boolean;
  display?: string;
  float?: string;
  overflow?: string;
  columnGap?: string;
  kind?: string;
  currentTagBackground?: string;
  currentTagColor?: string;
  tagTextStyle?: Partial<TextProps>;
  borderRadius?: string;
  boxSizing?: string;
}

const getTagKind = (props: Partial<TagProps>) => {
  const { isCurrentTag, currentTagBackground, background, kind } = props;
  switch (kind) {
    case TAG_TYPE.bordered:
      return css`
        width: max-content;
        background: ${() =>
          isCurrentTag
            ? currentTagBackground ?? theme.color.white
            : background ?? theme.color.white};
        border: 1px solid;
        border-color: ${() => (isCurrentTag ? theme.color.primary01 : theme.color.grey4)};
        ${TextStyled} {
          color: ${() => (isCurrentTag ? theme.color.primary01 : theme.color.grey2)};
        }
      `;
    case TAG_TYPE.flat:
      return css`
        border-radius: 6px;
        padding: 4px 8px;
        background: ${() =>
          isCurrentTag
            ? currentTagBackground ?? theme.color.teal5
            : background ?? theme.color.grey5};
        border: none;
      `;
    case TAG_TYPE.danger:
      return css`
        padding: 4px 12px;
        border-radius: 4px;
        background: ${theme.color.red03};
      `;
    default:
      return ``;
  }
};

const TagStyled = styled.div<TagProps>`
  box-sizing: ${({ boxSizing }) => boxSizing || 'border-box'};
  border-radius: ${({ borderRadius }) => borderRadius || '1000px'};
  overflow: ${({ overflow }) => overflow || 'hidden'};
  border: ${props => (props.border ? props.border : `1px solid ${theme.color.grey4}`)};
  padding: ${props => (props.padding ? props.padding : `6px 16px`)};
  margin: ${props => props.margin};
  cursor: ${props => (props.cursor ? props.cursor : 'pointer')};
  min-width: ${props => props.minWidth};
  width: fit-content;
  background: ${props =>
    props.isCurrentTag
      ? props.currentTagBackground ?? theme.color.grey4
      : props.background ?? theme.color.white};
  display: ${({ display }) => display || 'block'};
  float: ${props => (props.float ? props.float : 'none')};
  ${getTagKind}
`;

const Tag: React.FC<TagProps> = ({
  children,
  icon,
  iconDirectionRight,
  ...props
}: TagProps) => {
  const getTagTextColor = () => {
    const { kind, isCurrentTag, currentTagColor } = props;
    if (kind === TAG_TYPE.danger) return theme.color.red01;

    if (!isCurrentTag) return theme.color.grey2;

    return currentTagColor ?? theme.color.grey1;
  };

  return (
    <TagStyled {...props}>
      <Flex
        alignItem="center"
        justifyContent="center"
        columnGap={props.columnGap ? props.columnGap : `10px`}
      >
        {!iconDirectionRight && icon}

        <Text
          fontSize="normal"
          fontWeight={props.isCurrentTag ? 'semiBold' : 'regular'}
          textColor={getTagTextColor()}
          lineClamp={1}
          {...props.tagTextStyle}
        >
          {children}
        </Text>
        {iconDirectionRight && icon}
      </Flex>
    </TagStyled>
  );
};

export default Tag;
