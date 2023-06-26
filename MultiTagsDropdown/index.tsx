import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { components, MultiValueProps } from 'react-select';
import Button from '../Button';
import Text from '../Text';
import Svg from '../Svg';
import Dropdown, { DropdownProps } from '../Dropdown';
import theme from '../../theme';
import Add from './icons/add-icon.svg';

interface MultiTagsDropdownType extends DropdownProps {
  options: any;
  value: any;
  setOptionObject: (option: any) => void;
  minLimit?: number;
}

interface SelectComponentProps extends MultiValueProps {
  innerRef: any;
  children: any;
  selectProps: any;
  getValue: any;
  hasValue: any;
  data: any;
}

const MIN_LIMIT = 2;

const MoreItemWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  padding: 2px 8px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  row-gap: 12px;
`;

const addIcon = (
  <Text fontSize="normal" fontWeight="semiBold" textColor={theme.color.primary01}>
    <Svg height={14} width={14} svgFill={theme.color.grey2}>
      <Add />
    </Svg>
  </Text>
);

const MoreItemButton = (props: SelectComponentProps) => {
  const { t } = useTranslation();
  const { innerRef, children, getValue, hasValue } = props;
  const isMenuOpen = props.selectProps.menuIsOpen; // isFocused ~ isMenuOpen
  const minLimit = props.selectProps.minLimit;

  if (!hasValue) {
    return <components.ValueContainer {...props}>{children}</components.ValueContainer>;
  }

  const selectedCount = getValue().length - minLimit;
  return (
    <MoreItemWrapper ref={innerRef}>
      {children}
      {!isMenuOpen && (
        <Button
          size="small"
          kind="text"
          backgroundColor="transparent"
          color={theme.color.grey2}
          padding="0px"
          borderRadius="4px"
          buttonIcon={addIcon}
        >
          <Text fontSize="h6" fontWeight="semiBold" textColor={theme.color.grey2}>
            {selectedCount} {t('button.more')}
          </Text>
        </Button>
      )}
    </MoreItemWrapper>
  );
};

const MultiValue = (props: SelectComponentProps) => {
  const { getValue, data } = props;
  const values = getValue();
  const isMenuOpen = props.selectProps.menuIsOpen; // isFocused ~ isMenuOpen
  const minLimit = props.selectProps.minLimit;

  const shouldHide =
    values.length > minLimit &&
    values.findIndex(v => v.value === data.value) + 1 > minLimit;

  if (!isMenuOpen && shouldHide) {
    return null;
  }

  return <components.MultiValue {...props} />;
};

const MultiTagsDropdown: React.FC<MultiTagsDropdownType> = ({
  options,
  value,
  minLimit = MIN_LIMIT,
  ...extraProps
}: MultiTagsDropdownType) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const dropdownInputStyle = {
    flex: 'none',
    margin: '0px',
    padding: '0px'
  };

  const GetAddMoreItemComponent = useCallback(() => {
    return !isFocused && value.length > minLimit
      ? {
          ValueContainer: MoreItemButton,
          MultiValue
        }
      : {};
  }, [isFocused, minLimit, value.length]);

  return (
    <Dropdown
      minHeight="48px"
      height="fit-content"
      width="100%"
      backgroundColor={theme.color.grey5}
      isMulti={true}
      isSearchable={true}
      isClearable={false}
      placeholderTextColor={theme.color.grey3}
      onMenuOpen={() => setIsFocused(true)}
      onMenuClose={() => setIsFocused(false)}
      inputStyle={!isFocused ? dropdownInputStyle : {}}
      options={options}
      value={value}
      setOptionObject={extraProps.setOptionObject}
      {...extraProps}
      components={{ ...(extraProps?.components || {}), ...GetAddMoreItemComponent() }}
      {...{ minLimit }}
    />
  );
};

export default MultiTagsDropdown;
