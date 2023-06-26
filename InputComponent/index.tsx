import React, { KeyboardEvent, MouseEvent, FocusEvent, forwardRef, Ref } from 'react';
import styled from 'styled-components';
import { fontSizes, fontWeights } from '../../utils/constants';
import { FontSize, FontWeight } from '../Typography';
import theme from '../../theme';

type ThemeProp = (props: any) => string;

interface InputProp {
  value?: string;
  id?: string;
  onChange?: (event: KeyboardEvent) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  autocomplete?: 'on' | 'off';
  autoComplete?: 'on' | 'off';
  margin?: string;
  padding?: string;
  width?: string;
  borderLeft?: string;
  border?: string | ThemeProp;
  borderRadius?: string;
  hideFocusBorder?: boolean;
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: any;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: MouseEvent) => void;
  onClick?: (event: MouseEvent) => void;
  type?: 'text' | 'number' | 'email' | 'password' | 'tel' | 'search';
  max?: number;
  maxLength?: number;
  min?: number;
  name?: string;
  textColor?: ThemeProp | string;
  background?: ThemeProp;
  boxShadow?: string | ThemeProp;
  shadowColor?: ThemeProp;
  fontSize: FontSize;
  fontWeight: FontWeight;
  ref?: Ref<HTMLInputElement>;
  error?: boolean;
  readOnly?: boolean;
  height?: string;
}

const getFontWeight = ({ fontWeight }: InputProp) => fontWeights[fontWeight];
const getFontSize = ({ fontSize }: InputProp) => fontSizes[fontSize];

const StyledInput: React.FC<InputProp> = styled.input<InputProp>`
  padding: ${props => (props.padding ? props.padding : '8px 12px')};
  margin: ${props => (props.margin ? props.margin : '0')};
  width: ${props => (props.width ? props.width : 'auto')};
  border-left: ${props => (props.borderLeft ? props.borderLeft : `unset`)};
  border: ${props =>
    props.border
      ? props.border
      : props.error
      ? `1px solid ${theme.color.red01}`
      : `1px solid ${theme.color.grey4}`};
  border-radius: ${props => (props.borderRadius ? props.borderRadius : '6px')};
  background: ${props => (props.background ? props.background : theme.color.white)};
  color: ${props => (props.textColor ? props.textColor : theme.color.grey1)};
  font-family: inherit;
  ${getFontWeight}
  ${getFontSize}

  ${props => (props.height ? `height: ${props.height};` : '')}

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  &:focus {
    border: ${props =>
      !props.hideFocusBorder
        ? props.error
          ? `1px solid ${theme.color.red01}`
          : `1px solid ${theme.color.primary01}`
        : 'none'};
    outline: none;
    background: ${theme.color.white};
  }

  &:hover:not(:focus) {
    border: 1px solid ${theme.color.primary01};
    background-color: ${theme.color.grey5};
  }

  &:disabled {
    color: ${theme.color.grey3};
    border: 1px solid ${theme.color.grey2};
    background-color: ${theme.color.grey2};
    cursor: not-allowed;
  }

  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${theme.color.grey2};
  }
  :-ms-input-placeholder {
    color: ${theme.color.grey2};
  }
`;

const Input: React.FC<InputProp> = forwardRef(function InputComponent(
  props: InputProp,
  ref?: Ref<HTMLInputElement>
) {
  return <StyledInput {...props} ref={ref} />;
});

export default Input;
