import React from 'react';
import { Row } from 'react-table';
import styled from 'styled-components';
import theme from '../../theme';
import { directionTypes } from '../Flex';

export type TableProps = {
  tableData: any;
  tableColumns: any;
  rows?: number;
  backgroundColor?: string;
  headBorderBottom?: string;
  headMarginBottom?: string;
  rowBorderTop?: string;
  noWrap?: boolean;
  minWidth?: string;
  customRow?: (row: Row<any>) => any;
  showNoDataBanner?: boolean;
  totalCount?: number;
  pageNumber?: number;
  fetchData?: (pageObject: any) => void;
  manualPagination?: boolean;
  paginationInfo?: string;
  totalPageCount?: number;
  isLoading?: boolean;
  controlled?: {
    pageNumber: number;
    onPrev: (arg: any) => void;
    onNext: (arg: any) => void;
  };
  emptyStateTitle?: string;
  emptyStateText?: string;
  height?: string;
  scrollbarTrackColor?: string;
  scrollbarThumbColor?: string;
  emptyStateIcon?: React.ReactNode;
  hidePaginationCountForOnePage?: boolean;
  rowPadding?: string;
  rtl?: boolean;
  stickyHeader?: boolean;
  pageCountBackground?: string;
  columnWidth?: string;
  columnMinWidth?: string;
  bodyHeight?: string;
  bodyMaxHeight?: string;
  hiddenColumns?: string[];
  hideTable?: boolean;
  manualSortBy?: boolean;
  onSort?: (arg: any) => void;
  emptyStateBtn?: JSX.Element;
  chevronColor?: string;
  paginatedInfoMargin?: string;
  scrollToRight?: boolean;
  paginatedInfoDirection?: directionTypes;
  reverseColumnsDirection?: boolean;
  isSticky?: boolean;
  headerTextAlignment?: 'right' | 'left' | 'center' | 'unset';
  showInlineLoader?: boolean;
  dataQaAttributes?: {
    nextPage?: string;
    previousPage?: string;
    currentPage?: string;
  };
  disableSortBy?: boolean;
  emptyStateTextMaxWidth?: string;
  manualWidths?: boolean;
};

type TableContainerProp = {
  backgroundColor?: string;
  rowBorderTop?: string;
  headBorderBottom?: string;
  headMarginBottom?: string;
  noWrap?: boolean;
  minWidth?: string;
  height?: string;
  scrollbarTrackColor?: string;
  scrollbarThumbColor?: string;
  rowPadding?: string;
  hideLeftShadow?: boolean;
  hideRightShadow?: boolean;
  stickyHeader?: boolean;
  columnWidth?: string;
  columnMinWidth?: string;
  bodyHeight?: string;
  bodyMaxHeight?: string;
  rtl?: boolean;
  borderRadius?: string;
  headerTextAlignment?: 'right' | 'left' | 'center' | 'unset';
};

export const TableContainer = styled.div<TableContainerProp>`
  overflow: auto;
  position: relative;
  z-index: 0;

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-track {
    background: ${props => props.scrollbarTrackColor};
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${props => props.scrollbarThumbColor};
    border-radius: 3px;
  }

  height: ${props => props.height};

  // common css
  th {
    text-align: ${({ headerTextAlignment, rtl }) =>
      headerTextAlignment ?? (rtl ? 'right' : 'left')};
  }

  // paginated table css
  table:not(.table) {
    border-collapse: collapse;
    width: 100%;

    thead {
      background-color: ${props =>
        props.backgroundColor ? props.backgroundColor : theme.color.grey4};
      border-bottom: ${props => props.headBorderBottom};
      text-align: left;
      height: 52px;
      border-radius: 50px;
      font-size: 14px;
      font-weight: 600;
      color: ${theme.color.grey1};
      .number-right-align {
        text-align: ${props => (props.rtl ? 'left' : 'right')};
      }
      ${props =>
        props.stickyHeader &&
        `
        position: sticky;
        top: 0;
        z-index: 10;
      `}
    }
    th {
      padding: 1rem;
      white-space: ${props => (props.noWrap ? 'nowrap' : 'unset')};
      color: ${theme.color.grey2};
      font-weight: 600;
    }

    td {
      padding: ${props => (props.rowPadding ? props.rowPadding : '16px')};
      font-size: 14px;
      font-weight: 400;
      color: ${theme.color.grey2};
      white-space: ${props => (props.noWrap ? 'nowrap' : 'unset')};
    }

    // Set border-radius on the top-left and bottom-left of the first table data on the table row
    tbody {
      tr {
        border-top: ${props => props.rowBorderTop ?? `2px solid ${theme.color.grey5}`};
      }
      tr:first-child {
        td:first-child {
          border-radius: ${props => (props.rtl ? '0 0 0 10px' : '10px 0 0 0')};
        }
        td:last-child {
          border-radius: ${props => (props.rtl ? '0 0 10px 0' : '0 10px 0 0')};
        }
      }
      tr:last-child {
        td:first-child {
          border-radius: 0 0 0 10px;
        }
        td:last-child {
          border-radius: 0 0 10px 0;
        }
      }
    }
    thead {
      tr {
        th:first-child {
          border-radius: ${props => (props.rtl ? '0 10px 10px 0' : '10px 0 0 10px')};
        }
      }
    }

    thead {
      tr {
        th:last-child {
          border-radius: ${props => (props.rtl ? '10px 0 0 10px' : '0 10px 10px 0')};
        }
      }
    }

    tr {
      height: 52px;
      text-align: left;
    }

    footer {
      bottom: 0;
      box-shadow: 0px -3px 3px #ccc;
    }

    tbody:before {
      content: '@';
      display: block;
      background-color: transparent;
      line-height: ${({ headMarginBottom }) => headMarginBottom || '8px'};
      visibility: hidden;
      opacity: 0;
    }

    tbody > tr {
      background-color: ${theme.color.white};
      border-top: ${props => props.rowBorderTop};
    }

    .number-right-align {
      text-align: ${props => (props.rtl ? 'left' : 'right')};
    }
  }

  // The below styling is for sticky table
  .table {
    border-radius: 10px;
    display: block;
    width: 100%;

    .reverse_direction {
      direction: rtl;
    }

    .tr {
      border-radius: 10px;
    }

    & > .tr {
      border-bottom: 8px solid ${theme.color.grey5};
      text-align: left;
      font-size: 14px;
      font-weight: 600;
      color: ${theme.color.grey1};
      .number-right-align {
        text-align: ${props => (props.rtl ? 'left' : 'right')};
      }
    }

    .th,
    .td {
      overflow: hidden;
      :last-child {
        border-right: 0;
      }

      .resizer {
        display: inline-block;
        width: 5px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;

        &.isResizing {
          background: ${theme.color.red01};
        }
      }
    }

    .th {
      font-size: 14px;
      padding: ${props => (props.rowPadding ? props.rowPadding : '16px')};
      white-space: ${props => (props.noWrap ? 'nowrap' : 'unset')};
      color: ${theme.color.grey2};
      background-color: ${props =>
        props.backgroundColor ? props.backgroundColor : theme.color.grey4};
      border-bottom: ${({ headBorderBottom }) => headBorderBottom};
      &:first-child {
        border-radius: ${props => (props.rtl ? '0 10px 10px 0' : '10px 0 0 10px')};
        left: ${props => !props.rtl && '0'};
        right: ${props => props.rtl && '0'};
      }
      &:last-child {
        border-radius: ${props => (props.rtl ? '10px 0 0 10px' : '0 10px 10px 0')};
      }
    }

    .td {
      background-color: ${theme.color.white};
      padding: ${props => (props.rowPadding ? props.rowPadding : '16px')};
      font-size: 14px;
      font-weight: 400;
      color: ${theme.color.grey2};
      white-space: ${props => (props.noWrap ? 'nowrap' : 'unset')};
    }

    [role='cell'] {
      display: inline-flex !important;
      align-items: center;
    }

    .body > .tr {
      border-top: ${props => props.rowBorderTop ?? `2px solid ${theme.color.grey5}`};
    }

    .tr:first-child {
      > .td {
        &:first-child {
          border-radius: 10px 0 0 0;
        }
        &:last-child {
          border-radius: 0 10px 0 0;
        }
      }
    }

    .tr .th {
      width: auto;
    }

    &.sticky {
      overflow: auto;
      .header,
      .footer {
        width: 100%;
        position: sticky;
        z-index: 1;
      }

      &::-webkit-scrollbar {
        width: 5px;
        height: 5px;
      }
      &::-webkit-scrollbar-track {
        background: ${props => props.scrollbarTrackColor};
      }
      &::-webkit-scrollbar-thumb {
        background: ${props => props.scrollbarThumbColor};
      }

      thead {
        display: block;
        &.header {
          top: 0;
          margin-bottom: ${({ headMarginBottom }) => headMarginBottom || '8px'};
        }
      }
      .th {
        ${props =>
          props.columnWidth &&
          `
          width: ${props.columnWidth} ;
        `}
        ${props =>
          props.columnMinWidth &&
          `
          min-width: ${props.columnMinWidth} ;
        `}
        white-space: ${props => (props.noWrap ? 'nowrap' : 'unset')};
        font-weight: 600;
        line-height: 2;
      }
      .tr {
        > .td {
          &:first-child {
            left: ${props => !props.rtl && '0'};
            right: ${props => props.rtl && '0'};
          }
        }
        justify-content: space-between;
        ${props =>
          props.columnWidth &&
          `
          width: ${props.columnWidth} ;
        `}
      }

      .td {
        ${props =>
          props.columnWidth &&
          `
          width: ${props.columnWidth} ;
        `}
        ${props =>
          props.columnMinWidth &&
          `
          min-width: ${props.columnMinWidth} ;
        `}
      }

      .footer {
        bottom: 0;
        box-shadow: 0px -3px 3px #ccc;
      }

      .body {
        ${props =>
          props.bodyMaxHeight &&
          `
          max-height: ${props.bodyMaxHeight} ;
        `}

        ${props =>
          props.bodyHeight &&
          `
          height: ${props.bodyHeight} ;
        `}
        
        display: block;
        position: relative;
        z-index: 0;
      }

      [data-sticky-td] {
        position: sticky;
        z-index: 0 !important;
      }

      [data-sticky-last-left-td] {
        box-shadow: ${({ hideLeftShadow }) =>
          hideLeftShadow ? 'unset' : '2px 0px 20px rgb(90 106 157 / 12%)'};
      }

      [data-sticky-first-right-td] {
        box-shadow: ${({ hideRightShadow }) =>
          hideRightShadow ? 'unset' : '-2px 0px 20px rgb(90 106 157 / 12%)'};
      }
    }
  }
`;

export enum SORT_ORDER {
  DESC = 'DESC',
  ASC = 'ASC'
}
