import React from 'react';

import PaginatedStickyTable from './PaginatedStickyTable';
import { TableProps } from './table.constants';

const PaginatedTable: React.FC<TableProps> = (props: TableProps) => (
  <PaginatedStickyTable {...props} />
);

export default PaginatedTable;
