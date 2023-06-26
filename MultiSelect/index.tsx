import React, { forwardRef, FunctionComponent, useEffect, useRef, useState } from 'react';
import ReactSelect from 'react-select';
import { TFunction, useTranslation } from 'react-i18next';
import OutsideClickHandler from 'react-outside-click-handler';
import { components } from 'react-select';
import Checkbox from '../Checkbox';
import Flex from '../Flex';
import Text from '../Text';
import Svg from '../Svg';
import {
  ButtonWrapper,
  customStyles,
  MenuWrapper,
  MultiSelectValueWrapper,
  SvgWrapper
} from './styles';
import theme from '../../theme';
import DownChevron from '../Dropdown/icons/chevronDownColor.svg';
import SearchIcon from '../../../public/svg/search.svg';
import { MultiSelectContainerProps, MultiSelectProps, optionsState } from './types';

const Option = props => {
  return (
    <div>
      <components.Option {...props}>
        <Flex alignItem="center">
          <Checkbox
            checked={props.isSelected}
            kind="secondary"
            width="18px"
            height="18px"
            borderWidth="1px"
            borderColor={theme.color.teal3}
            customBackgroundColor={
              props.isSelected ? theme.color.primary01 : theme.color.grey5
            }
            dataQA={`checkbox-${props.label}`}
          />
          <Text
            fontSize="h6"
            fontWeight="regular"
            textColor={props.isSelected ? theme.color.primary01 : theme.color.grey1}
            padding="0 0 0 10px"
          >
            {props.label}
          </Text>
        </Flex>
      </components.Option>
    </div>
  );
};

export const SearchIndicator = () => {
  return (
    <Svg width={24} height={24}>
      <SearchIcon />
    </Svg>
  );
};

const getValue = (
  values: optionsState[],
  t: TFunction,
  placeholder: string,
  itemMessageString: string
) => {
  switch (values.length) {
    case 0:
      return placeholder ?? t('input.selectVehicles');
    case 1:
      return values[0].label;
    case 2:
      return values.map(i => i.label).join(', ');
    default: {
      const selectedValues = values.map(i => i.label);
      return `${selectedValues.slice(0, 2).join(', ')} +${
        values.length - values.slice(0, 2).length
      } ${itemMessageString ?? t('input.items')}`;
    }
  }
};

const Menu = props => {
  return <MenuWrapper {...props} />;
};

const MultiSelectContainer: FunctionComponent<MultiSelectContainerProps> = forwardRef(
  ({ children, valueWrapperRef, width, isOpen, target }: MultiSelectContainerProps) => {
    return (
      <MultiSelectValueWrapper ref={valueWrapperRef}>
        {target}
        {isOpen ? <Menu style={{ width: `${width}px` }}>{children}</Menu> : null}
      </MultiSelectValueWrapper>
    );
  }
);

export const DropdownIndicator = ({ isOpen }) => {
  return (
    <SvgWrapper padding="4px" svgTransform={isOpen && 'rotate(180deg)'}>
      <DownChevron />
    </SvgWrapper>
  );
};

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  handleSelectedOptions,
  optionsSelected,
  isSearchable = true,
  isLoading = false,
  maxMenuHeight = 300,
  dataQA,
  ...props
}: MultiSelectProps) => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [width, setWidth] = useState('');
  const toggleOpen = () => {
    setMenuIsOpen(!menuIsOpen);
    setIsFocused(!isFocused);
  };

  useEffect(() => {
    if (menuIsOpen) {
      setWidth(containerRef.current.offsetWidth);
    }
  }, [menuIsOpen]);

  return (
    <Flex flexDirection="column" rowGap="5px" width={props.width}>
      <OutsideClickHandler onOutsideClick={() => setMenuIsOpen(false)}>
        <MultiSelectContainer
          valueWrapperRef={containerRef}
          width={width}
          isOpen={menuIsOpen}
          target={
            <ButtonWrapper
              kind="secondary"
              borderRadius="8px"
              border={`1px solid ${theme.color.grey3}`}
              customHeight="48px"
              onClick={toggleOpen}
              minWidth="100%"
              fontWeight={400}
              data-qa={dataQA}
            >
              {optionsSelected
                ? getValue(optionsSelected, t, props.placeholder, props.itemMessage)
                : t('input.selectVehicles')}
              <DropdownIndicator isOpen={menuIsOpen} />
            </ButtonWrapper>
          }
          onClose={toggleOpen}
        >
          <ReactSelect
            {...props}
            autoFocus
            isLoading={isLoading}
            menuIsOpen={menuIsOpen || isFocused}
            styles={customStyles}
            maxMenuHeight={maxMenuHeight}
            controlShouldRenderValue={false}
            options={options}
            onChange={handleSelectedOptions}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{
              Option,
              IndicatorSeparator: null,
              DropdownIndicator: SearchIndicator
            }}
            value={optionsSelected}
            theme={_theme => ({
              ..._theme,
              colors: {
                ..._theme.colors,
                primary25: theme.color.grey5,
                primary: theme.color.white
              }
            })}
            backspaceRemovesValue={false}
            placeholder={`${t('input.searchHere')}`}
            isClearable={false}
            tabSelectsValue={false}
            classNamePrefix={dataQA}
          />
        </MultiSelectContainer>
      </OutsideClickHandler>
      {(!props.showHelperTextOnlyOnError || props.error) && props.helperText && (
        <Text
          fontSize="small"
          fontWeight="regular"
          textColor={props.error ? theme.color.red01 : theme.color.grey1}
        >
          {props.helperText}
        </Text>
      )}
    </Flex>
  );
};

export default MultiSelect;
