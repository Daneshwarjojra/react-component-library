import React from 'react';
import styled from 'styled-components';
import Flex from '../Flex';
import Dropdown from '../Dropdown';
import Input from '../Input';
import Button from '../Button';
import FileUpload from '../FileUpload';
import Text from '../Typography';
import AsyncSelectDropdown from '../AsyncSelect';
import theme from '../../theme';
import PlusIcon from './Icons/add-icon.svg';
import TrashIcon from './Icons/trash-icon.svg';

export type inputTypes =
  | 'number'
  | 'search'
  | 'text'
  | 'email'
  | 'password'
  | 'tel'
  | 'button'
  | 'dropdown'
  | 'fileUpload'
  | 'additionalFields'
  | 'autocomplete';

type fieldSettings = {
  disabled?: boolean;
  defaultOptions?: string[] | Record<string, any>[] | boolean;
  isMulti?: boolean;
  minWidth?: string;
};

type inputField = {
  type: inputTypes;
  disabled?: boolean;
  options?: Record<string, any>[];
  buttonText?: string;
  fieldName?: string;
  fieldLabel?: string;
  width?: string;
  accept?: string;
  styles?: Record<string, any>;
  color?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  minWidth?: string;
};

type TableInputFieldsProps = {
  inputFields: inputField[];
  rowData: Record<string, any>[];
  heading: string;
  clickHandler?: (fieldName, value, index) => void;
  setOption?: (fieldName, value, index) => void;
  changeHandler?: (fieldName, value, index) => void;
  removeFile?: (fieldName, value, index) => void;
  contentDirection?: 'horizontal' | 'vertical';
  loadAsyncOptions?: (fieldName, value, index) => void;
  fieldsSettings?: Record<string, Record<string, fieldSettings>>;
};

type TableCellProps = {
  width?: string;
  display?: string;
  flexDirection?: string;
};

const TableCell = styled.td<TableCellProps>`
  ${({ width }) => (width ? `width: ${width};` : '')}
  ${({ display }) => (display ? `display: ${display};` : '')}
  ${({ flexDirection }) => (flexDirection ? `flex-direction: ${flexDirection}` : '')}
`;

type TableRowProps = {
  width?: string;
  contentDirection?: string;
};

const TableRow = styled.tr<TableRowProps>`
  ${({ width }) => (width ? `width: ${width};` : '')}
  ${({ contentDirection }) => (contentDirection === 'vertical' ? `display: flex;` : '')}
  ${({ contentDirection }) => (contentDirection === 'vertical' ? `flex-wrap: wrap;` : '')}
  border: 1px solid ${theme.color.grey3};
  border-radius: 5px;
  margin-bottom: 20px;
`;

const InputFieldsTable: React.FC<TableInputFieldsProps> = ({
  contentDirection,
  inputFields,
  rowData,
  heading,
  fieldsSettings = {},
  clickHandler,
  changeHandler,
  setOption,
  removeFile,
  loadAsyncOptions
}: TableInputFieldsProps) => {
  const getField = (row, field, rowIndex, colIndex, additionFieldPath) => {
    const fieldName = additionFieldPath || field.fieldName;
    const fieldSettings = fieldsSettings?.[rowIndex]?.[field?.fieldName] || {};
    switch (field.type) {
      case 'fileUpload':
        return (
          <Flex flexDirection="column" padding="5px 10px">
            {field.fieldLabel && (
              <Text
                display="block"
                fontSize="normal"
                fontWeight="regular"
                textColor={theme.color.grey1}
              >
                {field.fieldLabel}
              </Text>
            )}
            <FileUpload
              onChange={e =>
                changeHandler(fieldName, Array.from(e.target.files), rowIndex)
              }
              removeFile={index => removeFile(fieldName, index, rowIndex)}
              accept={field.accept}
              value={row[field.fieldName]}
              buttonText={field.buttonText}
              margin="5px 0 0 0"
              disabled={fieldSettings.disabled ?? field.disabled}
            />
          </Flex>
        );
      case 'dropdown':
        return (
          <Flex flexDirection="column" padding="5px 10px">
            {field.fieldLabel && (
              <Text
                display="block"
                fontSize="normal"
                fontWeight="regular"
                textColor={theme.color.grey1}
              >
                {field.fieldLabel}
              </Text>
            )}
            <Dropdown
              options={field.options}
              setOption={value => setOption(fieldName, value, rowIndex)}
              value={field.options.find(o => o.value === row[field.fieldName])}
              backgroundColor={theme.color.grey5}
              menuListMaxHeight={field?.styles?.menuListMaxHeight}
              menuPosition="fixed"
              isDisabled={fieldSettings.disabled ?? field.disabled}
              minWidth={fieldSettings.minWidth ?? field.minWidth}
            />
          </Flex>
        );
      case 'autocomplete':
        return (
          <Flex flexDirection="column" padding="5px 10px">
            {field.fieldLabel && (
              <Text
                display="block"
                fontSize="normal"
                fontWeight="regular"
                textColor={theme.color.grey1}
              >
                {field.fieldLabel}
              </Text>
            )}
            <AsyncSelectDropdown
              setSelectedOption={value => setOption(fieldName, value, rowIndex)}
              value={row[field.fieldName]}
              backgroundColor={theme.color.grey5}
              menuPosition="fixed"
              loadOptions={value => loadAsyncOptions(field.fieldName, value, rowIndex)}
              minHeight="48px"
              defaultOptions={fieldSettings.defaultOptions}
              isMulti={fieldSettings.isMulti}
              isDisabled={fieldSettings.disabled ?? field.disabled}
              minWidth={fieldSettings.minWidth ?? field.minWidth}
            />
          </Flex>
        );
      case 'button':
        const hideButton =
          (row[field.fieldName] && row[field.fieldName].hidden) ||
          (field.fieldName === 'addRow' && rowIndex < rowData.length - 1);
        return (
          <>
            {!hideButton && (
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItem={contentDirection === 'vertical' ? 'flex-start' : 'center'}
                padding={contentDirection === 'vertical' ? '10px' : '32px 0px 0px 0px'}
              >
                <Button
                  color={field.color}
                  backgroundColor={field.backgroundColor}
                  hoverBackgroundColor={field.hoverBackgroundColor}
                  kind="primary"
                  size="medium"
                  onClick={value => clickHandler(field.fieldName, value, rowIndex)}
                  disabled={fieldSettings.disabled ?? field.disabled}
                  buttonIcon={
                    field.buttonText === '+' ? (
                      <PlusIcon />
                    ) : field.buttonText === '-' ? (
                      <TrashIcon />
                    ) : null
                  }
                  iconFill={field.color || theme.color.white}
                  iconStroke={field.color || theme.color.white}
                >
                  {['+', '-'].includes(field.buttonText) ? '' : field.buttonText}
                </Button>
              </Flex>
            )}
          </>
        );
      default:
        return (
          <Flex flexDirection="column" padding="5px 10px">
            {field.fieldLabel && (
              <Text
                display="block"
                fontSize="normal"
                fontWeight="regular"
                textColor={theme.color.grey1}
              >
                {field.fieldLabel}
              </Text>
            )}
            <Input
              value={row[field.fieldName] || ''}
              type={field.type}
              onChange={e =>
                changeHandler(fieldName, (e.target as HTMLInputElement).value, rowIndex)
              }
              fontSize="normal"
              fontWeight="regular"
              background={theme.color.grey5}
              disabled={fieldSettings.disabled ?? field.disabled}
            />
          </Flex>
        );
    }
  };

  return (
    <Flex
      flexDirection="column"
      margin={rowData.length ? '0 0 20px 0' : '0 0 10px 0'}
      overflow="auto"
    >
      <Text
        display="block"
        fontSize="normal"
        fontWeight="semiBold"
        textColor={theme.color.grey1}
      >
        {heading || ''}
      </Text>
      <table>
        <tbody>
          {rowData.map((row, rowIndex) => {
            return (
              <TableRow key={rowIndex} contentDirection={contentDirection}>
                {inputFields.map((field, colIndex) => {
                  if (field.type === 'additionalFields') {
                    if (!row.additionalFields) return <TableCell></TableCell>;
                    return (
                      <TableCell
                        key="additionalFields"
                        display="flex"
                        flexDirection={contentDirection === 'vertical' ? 'column' : 'row'}
                        width={field.width}
                      >
                        {row.additionalFields.map((field, fieldIndex) =>
                          getField(
                            field,
                            field,
                            rowIndex,
                            colIndex,
                            `additionalFields[${fieldIndex}].${field.fieldName}`
                          )
                        )}
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell key={colIndex} width={field.width}>
                      {getField(row, field, rowIndex, colIndex, null)}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </tbody>
      </table>
    </Flex>
  );
};

export default InputFieldsTable;
