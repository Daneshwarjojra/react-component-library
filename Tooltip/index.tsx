import React, { useRef } from 'react';
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import styled from 'styled-components';
import theme from '../../theme';
import Flex from '../Flex';
import Text from '../Text';

type contentWithTitleType = {
  title?: React.ReactNode | string;
  description?: React.ReactNode | string;
};

export type CustomTooltipProps = TooltipProps & {
  children: JSX.Element | React.ReactNode;
  id: string;
  isMultiline?: boolean;
  backgroundColor?: string;
  tooltipContent?: any;
  textColor?: string;
  borderColor?: string;
  boxShadow?: string;
  display?: string;
  margin?: string;
  maxWidth?: string;
  hideTooltip?: boolean;
  position?: 'absolute';
  contentWithTitle?: contentWithTitleType;
  customEvent?: string;
  customEventOff?: string;
  cursor?: string;
};

const ContentWithTitle = ({ title, description }: contentWithTitleType) => (
  <Flex
    className="tooltip-content-withheader-container"
    flexDirection="column"
    rowGap="8px"
  >
    <Text fontSize="normal" fontWeight="semiBold" textColor={theme.color.grey1}>
      {title}
    </Text>
    <Text fontSize="normal" fontWeight="regular" textColor={theme.color.grey2}>
      {description}
    </Text>
  </Flex>
);

type TooltipDivProps = {
  boxShadow?: string;
  display?: string;
  margin?: string;
  maxWidth?: string;
  isContentWithTitle?: boolean;
  maxHeight?: string;
  overflow?: string;
};

const TooltipDiv = styled.div<TooltipDivProps>`
  display: ${props => (props.display ? props.display : 'block')};
  margin: ${props => (props.margin ? props.margin : '0')};
  .info-tooltip {
    z-index: 10000;
    padding: ${({ isContentWithTitle }) =>
      isContentWithTitle ? '16px 20px 20px' : '8px 12px'};
    border-radius: 6px;
    font-size: 0.75rem;
    max-width: ${props => (props.maxWidth ? props.maxWidth : '500px')};
    opacity: 1 !important;
    box-shadow: ${({ boxShadow }) => boxShadow};
    max-height: ${props => (props.maxHeight ? props.maxHeight : 'unset')};
    overflow: ${props => (props.overflow ? props.overflow : 'unset')};
  }
`;

const Tooltip: React.FC<CustomTooltipProps> = ({
  children,
  id,
  place = 'bottom',
  isMultiline = true,
  backgroundColor = theme.color.white,
  borderColor = theme.color.white,
  textColor = theme.color.grey2,
  boxShadow = `${theme.shadow.elevation09} ${theme.color.tooltipBoxShadowColor}`,
  hideTooltip = false,
  tooltipContent,
  position,
  contentWithTitle,
  display,
  margin,
  maxWidth,
  cursor = 'default',
  customEvent = 'mouseover mouseenter',
  customEventOff = 'mouseleave mouseout scroll mousewheel blur',
  ...extraProps
}: CustomTooltipProps) => {
  const tooltipRef = useRef();
  const isContentWithTitle = !!contentWithTitle;
  const displayedTooltipContent = isContentWithTitle ? (
    <ContentWithTitle
      title={contentWithTitle?.title}
      description={contentWithTitle?.description}
    />
  ) : (
    tooltipContent
  );

  return (
    <TooltipDiv
      boxShadow={boxShadow}
      isContentWithTitle={isContentWithTitle}
      display={display}
      margin={margin}
      maxWidth={maxWidth}
    >
      <ReactTooltip
        id={id}
        place={place}
        multiline={isMultiline}
        backgroundColor={backgroundColor}
        disable={hideTooltip}
        borderColor={borderColor}
        border={true}
        textColor={textColor}
        event={customEvent}
        eventOff={customEventOff}
        effect="solid"
        className="info-tooltip"
        getContent={() => displayedTooltipContent}
        ref={tooltipRef}
        afterHide={() => {
          const node = tooltipRef?.current as HTMLElement;
          if (node?.style) {
            node.style.left = null;
            node.style.top = null;
          }
        }}
        {...extraProps}
      />
      <div
        className="tooltip-info-wrapper"
        data-for={id}
        data-tip={displayedTooltipContent ?? ''}
        style={{ width: 'fit-content', cursor: `${cursor}` }}
      >
        {children}
      </div>
    </TooltipDiv>
  );
};

export default Tooltip;
