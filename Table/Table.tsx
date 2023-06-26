import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import { TableProps, TableContainer } from './table.constants';
import Flex from '../Flex';
import EmptyState from '../EmptyState';
import EmptyContentIcon from './Icons/no_content.svg';
import { useTranslation } from 'react-i18next';

const Table: React.FC<TableProps> = ({
  tableColumns = [],
  tableData = [],
  backgroundColor,
  headBorderBottom,
  rowBorderTop,
  customRow,
  showNoDataBanner = false,
  ...props
}: TableProps) => {
  const columns = useMemo(() => tableColumns, [tableColumns]);
  const { t } = useTranslation();
  const data = useMemo(() => tableData, [tableData]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data
  });
  return (
    <>
      <TableContainer
        backgroundColor={backgroundColor}
        headBorderBottom={headBorderBottom}
        rowBorderTop={rowBorderTop}
        {...props}
      >
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps([
                      {
                        className: column.className
                      }
                    ])}
                    key={index}
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps(_row => {
                    return customRow ? customRow(row) : '';
                  })}
                  key={index}
                >
                  {row.cells.map((cell, index) => {
                    return (
                      <td
                        {...cell.getCellProps([
                          {
                            className: cell.column.className
                          }
                        ])}
                        key={index}
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </TableContainer>
      {showNoDataBanner && tableData.length === 0 && (
        <Flex margin="50px 0">
          <EmptyState emptyStateTitle={t('error.noDataFound')}>
            <EmptyContentIcon />
          </EmptyState>
        </Flex>
      )}
    </>
  );
};

export default Table;
