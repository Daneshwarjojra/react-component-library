import Svg from '../Svg';
import Button from '../Button';
import styled from 'styled-components';
import theme from '../../theme';

export const SvgWrapper = styled(Svg)`
  order: 2;
`;

export const MultiSelectValueWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const ButtonWrapper = styled(Button)`
  &:hover,
  &:focus {
    color: ${theme.color.grey2};
  }
  &:hover {
    border-color: ${theme.color.primary01};
  }
  > div {
    justify-content: space-between;
  }
`;

export const MenuWrapper = styled.div`
  border-radius: 4px;
  margin-top: 4px;
  z-index: 2;
  position: fixed;
  > div {
    display: flex;
    flex-direction: column;
    padding: 20px 16px 10px 16px;
    background-color: hsl(0, 0%, 100%);
    border-radius: 6px;
    box-shadow: 0px 2px 24px var(--color-lnui-grey-03);
    margin-bottom: 8px;
    width: 100%;
  }
`;

export const customStyles = {
  option: (_, { isSelected }) => ({
    color: isSelected ? theme.color.primary01 : theme.color.grey2,
    cursor: 'pointer',
    padding: '12px 0'
  }),
  control: provided => ({
    ...provided,
    boxShadow: 'none',
    border: `1px solid ${theme.color.grey4}`,
    borderRadius: '6px',
    width: '100%',
    height: '48px',
    cursor: 'text',
    backgroundColor: theme.color.white,
    padding: '0 16px 0 8px',
    fontWeight: 400,
    '&:hover': {
      backgroundColor: theme.color.white
    }
  }),
  placeholder: defaultStyles => {
    return {
      ...defaultStyles,
      color: theme.color.grey3
    };
  },
  menu: styles => ({
    ...styles,
    top: '100%',
    marginBottom: '8px',
    marginTop: 0,
    width: `100%`,
    zIndex: 1,
    boxSizing: 'border-box',
    position: 'relative',
    boxShadow: `none`
  })
};
