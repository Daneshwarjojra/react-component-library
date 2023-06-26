import React, { useMemo, useEffect, useRef, useState } from 'react';
import { useTable, usePagination, useSortBy, useBlockLayout } from 'react-table';
import { useSticky } from 'react-table-sticky';
import { useTranslation } from 'react-i18next';
import { SvgStyled } from '../Pagination/pagination.constants';
import Flex from '../Flex';
import Svg from '../Svg';
import Tooltip from '../Tooltip';
import Text from '../Typography';
import EmptyState from '../EmptyState';
import { TableProps, TableContainer, SORT_ORDER } from './table.constants';
import theme from '../../theme';
import EmptyContentIcon from './Icons/no_content.svg';
import SortableIcon from './Icons/sortable-icon.svg';
import ArrowUpIcon from './Icons/arrow-up-icon.svg';
import TableCellLoader from './TableCellLoader';

const ChevronRight = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="7"
      height="12"
      fill="none"
      viewBox="0 0 7 12"
    >
      <path
        stroke="#0A0C10"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
        d="M1 1l5 5-5 5"
      ></path>
    </svg>
  );
};

const ChevronLeft = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="7"
      height="12"
      fill="none"
      viewBox="0 0 7 12"
    >
      <path
        stroke="#0A0C10"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
        d="M6 11L1 6l5-5"
      ></path>
    </svg>
  );
};

const SortableIconWrapper = ({ margin }: { margin: string }) => (
  <Svg
    display="inline-flex"
    background={theme.color.white}
    margin={margin}
    width={24}
    height={24}
    justifyContent="center"
    alignItems="center"
    borderRadius="4px"
  >
    <SortableIcon />
  </Svg>
);
const ArrowUpIconWrapper = ({ rotate, margin }: { margin: string; rotate?: boolean }) => (
  <Svg
    display="inline-flex"
    width={24}
    height={24}
    background={theme.color.white}
    margin={margin}
    justifyContent="center"
    alignItems="center"
    svgStroke={theme.color.grey2}
    svgTransform={rotate ? 'rotate(180deg)' : ''}
    borderRadius="4px"
  >
    <ArrowUpIcon />
  </Svg>
);

const getSortIcon = (column, reverseDirection, manualSortBy) => {
  const margin = reverseDirection ? '0 10px 0' : '0 0 0 10px';
  if (manualSortBy && column.sortBy && !column.disableSortBy) {
    return (
      <span>
        {column.sortBy === SORT_ORDER.DESC ? (
          <ArrowUpIconWrapper margin={margin} rotate />
        ) : (
          <ArrowUpIconWrapper margin={margin} />
        )}
      </span>
    );
  } else {
    return (
      <span>
        {column.isSorted ? (
          column.isSortedDesc ? (
            <ArrowUpIconWrapper margin={margin} rotate />
          ) : (
            <ArrowUpIconWrapper margin={margin} />
          )
        ) : !column.disableSortBy ? (
          <SortableIconWrapper margin={margin} />
        ) : null}
      </span>
    );
  }
};

const EmptyPlaceHolder = () => null;

EmptyPlaceHolder.pluginName = 'none';

const PaginatedStickyTable: React.FC<TableProps> = ({
  tableData,
  tableColumns,
  rows = 8, // pageSize
  showNoDataBanner = false,
  manualPagination = false,
  totalCount = 0,
  pageNumber,
  fetchData,
  totalPageCount,
  paginationInfo,
  isLoading = false,
  controlled,
  hidePaginationCountForOnePage,
  rtl,
  emptyStateTitle,
  emptyStateText = '',
  pageCountBackground = theme.color.grey5,
  hiddenColumns = [],
  hideTable = false,
  manualSortBy = false,
  onSort = () => null,
  emptyStateIcon = <EmptyContentIcon />,
  emptyStateBtn,
  chevronColor,
  scrollToRight = false,
  paginatedInfoDirection,
  reverseColumnsDirection = false,
  paginatedInfoMargin,
  isSticky = false,
  showInlineLoader = false,
  dataQaAttributes = {},
  disableSortBy = false,
  emptyStateTextMaxWidth,
  manualWidths = false,
  ...props
}: TableProps) => {
  const [pageNoState, setPageNoState] = useState(pageNumber);
  const [shadowStates, setShadowStates] = useState({
    hideLeftShadow: true,
    hideRightShadow: false
  });
  const { t } = useTranslation();
  const tableRef = useRef(null);
  const columns = useMemo(() => tableColumns, [tableColumns]);
  const data = useMemo(() => {
    if (!tableData?.length && isLoading && showInlineLoader) {
      return new Array(rows).fill({});
    }
    return tableData;
  }, [tableData, isLoading]);
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 150,
      width: 200,
      maxWidth: 400
    }),
    []
  );
  const uniqueId = useMemo(
    () => `${new Date().getTime()}` + Math.random().toString(36).substr(2, 9),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex, sortBy },
    prepareRow,
    pageCount,
    gotoPage
  } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns,
        pageSize: rows,
        // if page is controlled then set this as default
        pageIndex: controlled?.pageNumber ? controlled.pageNumber : pageNumber
      },
      disableSortBy,
      autoResetPage: false,
      manualPagination,
      ...(isSticky && { defaultColumn }),
      manualSortBy,
      stateReducer: (newState, action, prevState) => {
        // dont do any change if table is not controlled
        if (!controlled) return newState;

        const { pageNumber, onPrev, onNext } = controlled;

        const newPage = newState.pageIndex;
        const prevPage = prevState.pageIndex;

        if (action.type === 'gotoPage' && newPage !== prevPage) {
          newPage < prevPage ? onPrev(newPage) : onNext(newPage);
        }

        return {
          ...newState,
          pageIndex: pageNumber
        };
      },
      ...(manualPagination
        ? {
            pageCount: totalPageCount ? totalPageCount : Math.ceil(totalCount / rows)
          }
        : {})
    },
    useSortBy,
    usePagination,
    isSticky ? useBlockLayout : EmptyPlaceHolder,
    isSticky ? useSticky : EmptyPlaceHolder
  );
  // Memoize the paginations
  const memoizedPaginations = useMemo(() => {
    return {
      min: pageIndex * rows + 1,
      max:
        pageIndex + 1 < pageCount
          ? (pageIndex + 1) * rows
          : manualPagination
          ? totalCount ?? pageCount * rows
          : tableData.length,
      total: manualPagination ? totalCount ?? pageCount * rows : tableData.length
    };
  }, [manualPagination, totalCount, pageCount, tableData.length, pageIndex, rows]);

  /** call server api to get data when page number changes */
  useEffect(() => {
    if (manualPagination && fetchData) fetchData({ pageIndex });
  }, [fetchData, pageIndex, manualPagination]);

  // for manual pagination, if pageNumber prop value changes than it will paginate to that page
  useEffect(() => {
    if (manualPagination && pageNoState !== pageNumber) {
      setPageNoState(pageNumber);
      if (pageIndex !== pageNumber) gotoPage(pageNumber);
    }
  }, [pageNoState, pageNumber, manualPagination, gotoPage, pageIndex]);

  useEffect(() => {
    onSort({ sortBy });
  }, [sortBy, onSort]);

  // to scroll the table to right on load
  useEffect(() => {
    let intervalId = null;
    if (scrollToRight) {
      intervalId = setInterval(() => {
        if (tableRef?.current) {
          const { offsetWidth, scrollWidth } = tableRef.current;
          tableRef.current.scrollLeft = scrollWidth - offsetWidth;
          clearInterval(intervalId);
        }
      }, 200);
    }
    return () => intervalId && clearInterval(intervalId);
  }, [scrollToRight]);

  // to hide and show the sticky columns shadow based on their scroll
  const handleScroll = () => {
    if (tableRef?.current) {
      const { scrollWidth = 0, scrollLeft = 0, offsetWidth = 0 } = tableRef.current;
      const hideLeftShadow = scrollLeft === 0;
      const hideRightShadow = scrollLeft + offsetWidth >= scrollWidth;
      if (
        shadowStates.hideLeftShadow !== hideLeftShadow ||
        shadowStates.hideRightShadow !== hideRightShadow
      ) {
        setShadowStates({
          hideLeftShadow,
          hideRightShadow
        });
      }
    }
  };

  const paginationInfoMargin = paginatedInfoMargin ?? '20px 16px 0px 0px';

  const isNoDataBannerShown = !isLoading && showNoDataBanner;

  return (
    <Flex flexDirection="column">
      {hideTable === false && (
        <TableContainer
          {...props}
          rtl={rtl}
          hideLeftShadow={shadowStates.hideLeftShadow}
          hideRightShadow={shadowStates.hideRightShadow}
        >
          <table
            {...getTableProps()}
            pageSize={8}
            ref={tableRef}
            {...(isSticky && {
              className: 'table sticky',
              onScroll: handleScroll
            })}
          >
            <thead className={isSticky && props.stickyHeader ? 'header' : ''}>
              {headerGroups.map((headerGroup, index) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={index} className="tr">
                  {headerGroup.headers.map((column, index) => (
                    <th
                      className={`th${
                        reverseColumnsDirection ? ' reverse_direction' : ''
                      }`}
                      {...column.getHeaderProps([
                        column.getSortByToggleProps(),
                        {
                          className: column.className,
                          ...(manualWidths
                            ? {
                                minWidth: column.minWidth,
                                width: column.width,
                                maxWidth: column.maxWidth
                              }
                            : {})
                        }
                      ])}
                      key={index}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent:
                            column.className?.includes('number-right-align') && !rtl
                              ? 'flex-end'
                              : 'flex-start'
                        }}
                      >
                        {isSticky ? (
                          column.render('Header')
                        ) : (
                          <div style={{ display: 'inline-block' }}>
                            {column.render('Header')}
                          </div>
                        )}
                        <span>
                          {!disableSortBy ? getSortIcon(column, rtl, manualSortBy) : null}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className="body">
              {page.map((row, index) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={index} className="tr">
                    {row.cells.map((cell, index) => {
                      return (
                        <td
                          {...cell.getCellProps([
                            {
                              className: cell.column.className,
                              ...(manualWidths
                                ? {
                                    minWidth: cell.column.minWidth,
                                    width: cell.column.width,
                                    maxWidth: cell.column.maxWidth
                                  }
                                : {})
                            }
                          ])}
                          className={`td${
                            reverseColumnsDirection ? ' reverse_direction' : ''
                          }`}
                          key={index}
                        >
                          {isLoading && showInlineLoader ? (
                            <TableCellLoader />
                          ) : (
                            cell.render('Cell')
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableContainer>
      )}
      {isNoDataBannerShown && tableData?.length === 0 && (
        <Flex margin="50px 0">
          <EmptyState
            emptyStateTitle={emptyStateTitle ?? t('error.noDataFound')}
            emptyStateText={emptyStateText}
            linkComponent={emptyStateBtn}
            emptyStateTextMaxWidth={emptyStateTextMaxWidth}
          >
            {emptyStateIcon}
          </EmptyState>
        </Flex>
      )}
      {tableData?.length !== 0 &&
        (hidePaginationCountForOnePage && pageCount === 1 ? null : (
          <Flex
            alignItem="center"
            justifyContent="flex-end"
            margin={paginationInfoMargin}
            direction={paginatedInfoDirection}
          >
            {paginationInfo ? (
              <Text
                textColor={theme.color.grey2}
                fontWeight="regular"
                fontSize="normal"
                margin={
                  rtl || paginatedInfoDirection === 'rtl' ? '0 0 0 25px' : '0 25px 0 0'
                }
              >
                {paginationInfo}
              </Text>
            ) : (
              <Text
                textColor={theme.color.grey2}
                fontWeight="regular"
                fontSize="normal"
                margin={
                  rtl || paginatedInfoDirection === 'rtl' ? '0 0 0 25px' : '0 25px 0 0'
                }
              >
                {t('info.paginatedTableInfo', {
                  min: memoizedPaginations.min,
                  max: memoizedPaginations.max,
                  total: memoizedPaginations.total
                })}
              </Text>
            )}
            <Flex alignItem="center">
              <Tooltip
                id={`prev-page-${uniqueId}`}
                tooltipContent={t('tooltip.previous')}
                cursor={canPreviousPage && !isLoading ? 'pointer' : 'not-allowed'}
                place="top"
              >
                <SvgStyled active={canPreviousPage || isLoading} svgColor={chevronColor}>
                  <Svg
                    onClick={isLoading ? null : previousPage}
                    margin={
                      rtl || paginatedInfoDirection === 'rtl'
                        ? '0 0 0 22px'
                        : '0 22px 0 0'
                    }
                    svgTransform={
                      rtl || paginatedInfoDirection === 'rtl' ? 'rotate(180deg)' : null
                    }
                    cursor={canPreviousPage ? 'pointer' : 'not-allowed'}
                    data-qa={dataQaAttributes.previousPage || 'previous-page'}
                  >
                    <ChevronLeft />
                  </Svg>
                </SvgStyled>
              </Tooltip>

              <Flex alignItem="center">
                <Flex
                  background={pageCountBackground}
                  padding="4px 12px"
                  borderRadius="8px"
                  margin={
                    rtl || paginatedInfoDirection === 'rtl'
                      ? '0px 0px 0px 8px'
                      : '0px 8px 0px 0px'
                  }
                  alignContent="center"
                  justifyContent="center"
                >
                  <Text
                    textColor={theme.color.grey1}
                    fontWeight="bold"
                    fontSize="normal"
                    data-qa={dataQaAttributes.currentPage || 'current-page'}
                  >
                    {pageIndex + 1}
                  </Text>
                </Flex>
                <Text
                  textColor={theme.color.grey1}
                  fontWeight="regular"
                  fontSize="normal"
                  margin="0px 0px 0px 4px"
                  data-qa="total-pages"
                >
                  / &nbsp;{pageOptions.length}
                </Text>
              </Flex>
              <Tooltip
                id={`next-page-${uniqueId}`}
                tooltipContent={t('tooltip.next')}
                cursor={canNextPage && !isLoading ? 'pointer' : 'not-allowed'}
                place="top"
              >
                <SvgStyled active={canNextPage || isLoading} svgColor={chevronColor}>
                  <Svg
                    svgStroke={chevronColor}
                    onClick={isLoading ? null : nextPage}
                    margin={
                      rtl || paginatedInfoDirection === 'rtl'
                        ? '0 22px 0 0'
                        : '0  0 0 22px'
                    }
                    cursor={canNextPage ? 'pointer' : 'not-allowed'}
                    svgTransform={
                      rtl || paginatedInfoDirection === 'rtl' ? 'rotate(180deg)' : null
                    }
                    data-qa={dataQaAttributes.nextPage || 'next-page'}
                  >
                    <ChevronRight />
                  </Svg>
                </SvgStyled>
              </Tooltip>
            </Flex>
          </Flex>
        ))}
    </Flex>
  );
};

export default PaginatedStickyTable;
