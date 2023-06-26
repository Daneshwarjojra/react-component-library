import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';
import GlobalStyles from '../../utils/globalStyles';

const BasicLayout = ({ children }: any) => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        {children}
      </>
    </ThemeProvider>
  );
};

export default BasicLayout;
