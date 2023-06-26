import React, { KeyboardEvent, MouseEvent, FocusEvent, forwardRef, Ref } from 'react';
import styled from 'styled-components';
import theme from '../../theme';
import Flex from '../Flex';
import Text, { FontSize, FontWeight } from '../Text';
import { fontSizes, fontWeights } from '../../utils/constants';

type ThemeProp = (props: any) => string;

export interface InputProp {
  label?: string;
  value?: string | number;
  id?: string;
  onChange?: (event: KeyboardEvent) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  autocomplete?: 'on' | 'off';
  autoComplete?: 'on' | 'off' | 'new-password';
  margin?: string;
  padding?: string;
  width?: string;
  border?: string | ThemeProp;
  borderRadius?: string;
  hideFocusBorder?: boolean;
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: any;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: MouseEvent) => void;
  onClick?: (event: MouseEvent) => void;
  type?: 'text' | 'number' | 'email' | 'password' | 'tel';
  max?: number;
  maxLength?: number;
  min?: number;
  name?: string;
  textColor?: ThemeProp | string;
  background?: ThemeProp | string;
  hoverBackground?: ThemeProp | string;
  boxShadow?: string | ThemeProp;
  shadowColor?: ThemeProp;
  fontSize: FontSize;
  fontWeight: FontWeight;
  ref?: Ref<HTMLInputElement>;
  error?: boolean;
  readOnly?: boolean;
  helperText?: string;
  leftIcon?: JSX.Element | React.ReactNode;
  rightIcon?: JSX.Element | React.ReactNode;
  height?: string;
  showHelperTextOnlyOnError?: boolean;
  boxSizing?: string;
  labelColorChangeOnError?: boolean;
  hideHoverBorder?: boolean;
  onMouseDown?: (event: React.KeyboardEvent<Element>) => void;
  borderLeft?: string;
}

const getFontWeight = ({ fontWeight }: InputProp) => fontWeights[fontWeight];
const getFontSize = ({ fontSize }: InputProp) => fontSizes[fontSize];

const InputContainer: React.FC<InputProp> = styled.div<InputProp>`
  height: ${props => (props.height ? props.height : 'auto')};
  overflow: hidden;
  padding: ${props => (props.padding ? props.padding : '8px 12px')};
  box-sizing: ${props => (props.boxSizing ? props.boxSizing : 'border-box')};
  margin: ${props => props.margin};
  border: ${props => {
    if (props.error) return `1px solid ${theme.color.red01}`;
    if (props.border) return props.border;
    return `1px solid ${theme.color.grey4}`;
  }};
  border-radius: ${props => (props.borderRadius ? props.borderRadius : '6px')};
  background: ${props => (props.background ? props.background : theme.color.grey5)};
  color: ${props => (props.textColor ? props.textColor : theme.color.grey2)};
  font-family: inherit;
  display: flex;
  align-items: center;
  column-gap: 10px;
  border-left: ${props => props.borderLeft};

  &:focus-within {
    border: ${props => {
      if (props.hideFocusBorder) return null;
      if (props.error) return `1px solid ${theme.color.red01}`;

      return `1px solid ${theme.color.primary01}`;
    }};
    outline: none;
    background: ${theme.color.white};
    color: ${theme.color.grey1};
  }

  &:hover:not(:focus-within) {
    border: ${props =>
      props.error
        ? `1px solid ${theme.color.red01}`
        : !props.hideHoverBorder
        ? `1px solid ${theme.color.primary01}`
        : null};
    background: ${props => props.hoverBackground ?? theme.color.grey5};
  }

  ${props =>
    props.disabled &&
    `border: 1px solid ${theme.color.grey3} !important;
    background: ${theme.color.grey5} !important;
    cursor: not-allowed !important;`}
`;

const StyledInput: React.FC<InputProp> = styled.input<InputProp>`
  flex: 1;
  border: none;
  outline: none;
  border-radius: ${props => (props.borderRadius ? props.borderRadius : '6px')};
  background: inherit;
  color: inherit;
  font-family: inherit;
  ${getFontWeight}
  ${getFontSize}
  
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  &::placeholder {
    color: ${theme.color.grey3};
  }
  &::-webkit-input-placeholder {
    color: ${theme.color.grey3};
  }
  &:-ms-input-placeholder {
    color: ${theme.color.grey3};
  }

  &:disabled {
    color: ${theme.color.grey3};
    cursor: not-allowed;
  }
  &:hover {
    background-color: ${props => props.hoverBackground ?? theme.color.grey5};
  }
  &:focus-within {
    background: ${theme.color.white};
    color: ${theme.color.grey1};
  }
`;

const Input: React.FC<InputProp> = forwardRef(function InputComponent(
  {
    label,
    helperText,
    placeholder,
    leftIcon,
    rightIcon,
    width,
    margin,
    padding,
    labelColorChangeOnError = true, // true for current usages
    ...props
  }: InputProp,
  ref?: Ref<HTMLInputElement>
) {
  return (
    <Flex
      flexDirection="column"
      rowGap="5px"
      width={width}
      margin={margin}
      padding={padding}
    >
      {label && (
        <Text
          fontSize="h6"
          fontWeight="regular"
          textColor={
            labelColorChangeOnError && props.error ? theme.color.red01 : theme.color.grey1
          }
        >
          {label}
        </Text>
      )}
      <InputContainer {...props}>
        {leftIcon}
        <StyledInput {...props} placeholder={placeholder} ref={ref} />
        {rightIcon}
      </InputContainer>
      {(!props.showHelperTextOnlyOnError || props.error) && helperText && (
        <Text
          fontSize="small"
          fontWeight="regular"
          textColor={props.error ? theme.color.red01 : theme.color.grey1}
          className="error"
        >
          {helperText}
        </Text>
      )}
    </Flex>
  );
});

export default Input;
