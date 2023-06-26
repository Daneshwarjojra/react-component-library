import React from 'react';

import PaginatedStickyTable from './PaginatedStickyTable';
import { TableProps } from './table.constants';

const StickyTable: React.FC<TableProps> = (props: TableProps) => (
  <PaginatedStickyTable {...props} isSticky={true} />
);

export default StickyTable;
