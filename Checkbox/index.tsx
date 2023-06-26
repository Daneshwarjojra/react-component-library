import React from 'react';
import styled, { css } from 'styled-components';
import theme from '../../theme';

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

export enum CheckboxType {
  'primary' = 'primary',
  'secondary' = 'secondary',
  'round' = 'round'
}

export interface CheckboxProps {
  checked: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  width?: string;
  height?: string;
  cursor?: string;
  borderColor?: string;
  customBackgroundColor?: string;
  borderWidth?: string;
  kind?: CheckboxType | string;
  dataQA?: string;
}

const Icon = styled.svg<Partial<CheckboxProps>>`
  fill: none;
  stroke: ${({ kind }) =>
    kind === 'primary' ? theme.color.primary01 : theme.color.white};
  stroke-width: 2px;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const disabledStyle = css<CheckboxProps>`
  cursor: not-allowed;
  border: 1.5px solid
    ${props => (props.checked ? theme.color.line_chart.total : theme.color.grey2)};
  opacity: 0.5;
`;

const getNormalCss = (props: Partial<CheckboxProps>) => {
  switch (props.kind) {
    case CheckboxType.primary:
      return css`
        border: ${props.borderWidth ? props.borderWidth : '1.5px'} solid
          ${props.borderColor
            ? props.borderColor
            : props.checked
            ? theme.color.primary01
            : theme.color.grey2};
      `;
    case CheckboxType.secondary:
      return css`
        border: ${props.borderWidth ? props.borderWidth : '1.5px'} solid
          ${props.borderColor ? props.borderColor : theme.color.primary01};
      `;
    case CheckboxType.round:
      return css`
        border: ${props.borderWidth ? props.borderWidth : '1.5px'} solid
          ${props.borderColor
            ? props.borderColor
            : props.checked
            ? theme.color.primary01
            : theme.color.grey2};
      `;
  }
};

const normalStyle = css<CheckboxProps>`
  cursor: ${props => (props.cursor ? props.cursor : 'pointer')};
  ${getNormalCss}
`;

const getTypeCss = (props: Partial<CheckboxProps>) => {
  switch (props.kind) {
    case CheckboxType.primary:
      return css`
        border: 1.5px solid ${props.checked ? theme.color.primary01 : theme.color.grey2};
        background: ${theme.color.grey5};
        &:hover {
          border: 1.5px solid ${theme.color.primary01};
          ${Icon} {
            visibility: visible;
          }
        }
      `;
    case CheckboxType.secondary:
      return css`
        background: ${props.customBackgroundColor
          ? props.customBackgroundColor
          : props.checked
          ? theme.color.primary01
          : theme.color.grey5};
        &:hover {
          border: ${props.borderWidth ? props.borderWidth : '1.5px'} solid
            ${theme.color.primary01};
          background: ${theme.color.primary01};
          ${Icon} {
            visibility: visible;
          }
        }
      `;
    case CheckboxType.round:
      return css`
        border: none;
        border-radius: 50%;
        background: ${props.checked ? theme.color.primary01 : theme.color.grey5};
        ${Icon} {
          visibility: visible;
          stroke: ${props.checked ? theme.color.white : theme.color.grey6};
        }
      `;
  }
};

const StyledCheckbox = styled.div<CheckboxProps>`
  display: inline-block;
  width: ${({ width }) => (width ? width : '24px')};
  height: ${({ height }) => (height ? height : '24px')};
  ${props => (props.disabled ? disabledStyle : normalStyle)};
  border-radius: 4px;
  transition: all 150ms;
  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')};
  }
  ${getTypeCss}
  ${HiddenCheckbox}:focus + & {
    border: 2px solid ${theme.color.teal4};
  }
`;

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  kind = CheckboxType.primary,
  dataQA,
  ...props
}: CheckboxProps) => (
  <CheckboxContainer>
    <HiddenCheckbox checked={checked} onChange={() => null} {...props} />
    <StyledCheckbox
      checked={checked}
      onClick={() => onChange && !props.disabled && onChange(!checked)}
      kind={kind}
      data-qa={dataQA}
      {...props}
    >
      <Icon viewBox="0 0 24 24" kind={kind}>
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
);

export default Checkbox;
