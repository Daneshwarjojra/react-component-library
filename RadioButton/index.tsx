import React, { ReactElement } from 'react';
import styled from 'styled-components';
import theme from '../../theme';

type RadioButtonProps = {
  selected: boolean;
  onChange: (event: any) => void;
  value: string;
  name?: string;
  disabled?: boolean;
};

const RadioButtonWrapper = styled.div`
  display: inline;

  & label {
    background-color: ${theme.color.grey5};
    border: 1.5px solid ${theme.color.primary01};
    border-radius: 50%;
    display: inline-block;
    position: relative;
    width: 24px;
    height: 24px;
    cursor: pointer;
    box-sizing: border-box;

    &::after {
      background-color: ${theme.color.primary01};
      border-radius: 50%;
      content: '';
      display: none;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 12px;
      height: 12px;
    }
  }

  & input[type='radio'] {
    opacity: 0;
    position: fixed;
    width: 0;
  }
  & input[type='radio']:checked + label:after {
    display: block;
  }

  & input[type='radio']:not(:checked) + label:hover {
    background: ${theme.color.grey5};
    border: 1.5px solid ${theme.color.primary01};
  }
  & input[type='radio']:not(:checked) + label {
    border: 1.5px solid ${theme.color.grey2};
  }
  & input[type='radio']:disabled + label {
    opacity: 0.5;
  }
`;

const RadioButton = ({
  selected,
  onChange,
  value,
  name,
  disabled
}: RadioButtonProps): ReactElement => {
  return (
    <RadioButtonWrapper>
      <input
        type="radio"
        id={name}
        name={name}
        value={value}
        checked={selected}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
      />
      <label htmlFor={name} />
    </RadioButtonWrapper>
  );
};

export default RadioButton;
