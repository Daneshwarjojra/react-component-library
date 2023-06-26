import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';
import Flex from '../Flex';
import Svg from '../Svg';
import Text from '../Text';

export interface TagProps {
  padding?: string;
  margin?: string;
  textMargin?: string;
  children: JSX.Element | React.ReactNode;
  kind?: string;
  removable?: boolean;
  removeChip?: () => void;
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
  theme?: any;
  width?: string;
  borderRadius?: string;
  textColor?: string;
}

const CloseIcon = (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 9L9 1"
      stroke="#546988"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 9L1 1"
      stroke="#546988"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChipStyled = styled.div<TagProps>`
  box-sizing: border-box;
  border-radius: ${props => (props.borderRadius ? props.borderRadius : `1000px`)};
  padding: ${props => (props.padding ? props.padding : `6px 12px`)};
  margin: ${props => props.margin};
  cursor: ${props => (props.cursor ? props.cursor : 'pointer')};
  width: ${props => (props.width ? props.width : 'fit-content')};
  background-color: ${theme.color.white};
  border-color: ${theme.color.grey3};
  color: ${props => (props.textColor ? props.textColor : theme.color.grey2)};
`;

const Chip: React.FC<TagProps> = ({
  removable,
  children,
  removeChip,
  ...props
}: TagProps) => {
  const handleRemoveChips = () => {
    removeChip && removeChip();
  };

  return (
    <div>
      <ChipStyled
        {...props}
        padding={props.padding}
        kind={props.kind}
        cursor={props.cursor}
        margin={props.margin}
      >
        <Flex alignItem="baseline" columnGap="10px">
          <Text
            fontSize="normal"
            fontWeight="semiBold"
            textColor="inherit"
            margin={props.textMargin}
            lineClamp={1}
          >
            {children}
          </Text>

          {removable ? (
            <Svg width={10} onClick={handleRemoveChips} cursor="pointer">
              {CloseIcon}
            </Svg>
          ) : null}
        </Flex>
      </ChipStyled>
    </div>
  );
};

export default Chip;
