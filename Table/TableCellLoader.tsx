import React from 'react';
import ContentLoader from 'react-content-loader';
import theme from '../../theme';

const TableCellLoader: React.FC = () => (
  <ContentLoader
    speed={1}
    width="100%"
    height="35px"
    backgroundColor={theme.color.grey5}
    foregroundColor={theme.color.grey4}
  >
    <rect x="0" y="0" rx="12" ry="12" width="100%" height="35px" />
  </ContentLoader>
);

export default TableCellLoader;
