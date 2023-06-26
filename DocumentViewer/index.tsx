import React from 'react';
import DocViewer, { DocViewerRenderers } from '@loconav-tech/react-doc-viewer';
import theme from '../../theme';
import ChevronRight from '../../../public/svg/chevronRight.svg';
import ChevronLeft from '../../../public/svg/chevronLeft.svg';
import styled from 'styled-components';
import Svg from '../Svg';
import Button from '../Button';
import Flex from '../Flex';
import Text from '../Typography';

export type DocViewerProps = {
  documents: any;
  config?: any;
  width?: string;
  height?: string;
  customStyle?: any;
};

const DocViewerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const MyDocViewer = styled(DocViewer)`
  background: transparent !important;
  width: 100%;
  .react-pdf__Document {
    width: 100%;
    .react-pdf__Page__canvas {
      width: 100% !important;
    }
  }
`;

const ChevronWrapper = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  &.chevron {
    position: absolute;
    z-index: 1;
    top: 50%;
  }
  &.chevronRight {
    left: 12px;
    right: auto;
  }
  &.chevronLeft {
    right: 12px;
    left: auto;
  }
  button {
    &:disabled {
      opacity: 0.5;
    }
  }
`;

const myHeader = (state, previousDocument, nextDocument) => {
  if (!state.currentDocument || state.config?.header?.disableFileName) {
    return null;
  }
  return (
    <Flex width="100%" flexDirection="row" alignItem="flex-start">
      <Text
        textColor={`${theme.color.grey2}`}
        fontWeight="semiBold"
        fontSize="h4"
        margin="0 0 24px 0"
      >
        {state.currentDocument?.title || ''}
      </Text>
      <ChevronWrapper className="chevron chevronRight">
        <Button
          kind="secondary"
          borderRadius="60px"
          backgroundColor={theme.color.white}
          width="48px"
          minWidth="48px"
          minHeight="48px"
          onClick={previousDocument}
          disabled={state.currentFileNo === 0}
        >
          <Svg
            width={30}
            height={30}
            svgStroke={theme.color.white}
            svgFill={theme.color.white}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ChevronLeft />
          </Svg>
        </Button>
      </ChevronWrapper>
      <ChevronWrapper className="chevron chevronLeft">
        <Button
          kind="secondary"
          borderRadius="60px"
          width="48px"
          minWidth="48px"
          minHeight="48px"
          disabled={state.currentFileNo >= state.documents.length - 1}
          onClick={() => {
            nextDocument();
          }}
          backgroundColor={theme.color.white}
        >
          <Svg
            width={30}
            height={30}
            svgStroke={theme.color.white}
            svgFill={theme.color.white}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ChevronRight />
          </Svg>
        </Button>
      </ChevronWrapper>
    </Flex>
  );
};

const DocumentViewer: React.FC<DocViewerProps> = ({
  // Array of objects with format like
  // uri is important
  //{uri: 'path either local or url'}
  documents,
  ...props
}) => {
  return (
    <DocViewerWrapper>
      <MyDocViewer
        pluginRenderers={DocViewerRenderers}
        documents={documents}
        config={{
          header: {
            overrideComponent: myHeader,
            disableFileName: false,
            retainURLParams: false
          }
        }}
        style={props.customStyle}
        {...props}
      />
    </DocViewerWrapper>
  );
};

export default DocumentViewer;
