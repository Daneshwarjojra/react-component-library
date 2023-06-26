import React from 'react';
import styled from 'styled-components';
import { SliderProps } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Flex from '../Flex';
import Card from '../Card';
import theme from '../../theme';
import ToolTipSlider from './ToolTipSlider';

interface ExtendedSliderProps extends SliderProps {
  width?: string;
  min: number;
  max: number;
  value: number;
  handleSliderChange: any;
  trackStyle: any;
  railStyle: any;
  dotStyle: any;
  handleStyle: any;
  textValue: any;
  tipFormatter?: (value: number) => React.ReactNode;
  tipProps: any;
}

const StyledToolTip = styled.div`
  .rc-slider-tooltip-inner {
    background-color: ${theme.color.white};
    box-shadow: none;
  }
`;

const SliderComponent: React.FC<ExtendedSliderProps> = ({
  width = '100%',
  min,
  max,
  value,
  handleSliderChange,
  trackStyle,
  railStyle,
  handleStyle,
  textValue,
  dotStyle,
  tipFormatter,
  tipProps,
  ...props
}) => {
  return (
    <Card padding="0" margin="0" width={width}>
      <StyledToolTip className="StyledToolip">
        <Flex alignItem="center" margin="0" width="100%">
          <ToolTipSlider
            min={min}
            tipFormatter={tipFormatter}
            tipProps={tipProps}
            max={max}
            value={value}
            marks={{
              [min]: {
                style: {
                  color: theme.color.grey2,
                  marginTop: '10px',
                  fontSize: '14px'
                },
                label: min
              },
              10: {
                style: {
                  color: theme.color.grey2,
                  marginTop: '10px',
                  fontSize: '14px'
                },
                label: 10
              },
              [max]: {
                style: {
                  color: theme.color.grey2,
                  marginTop: '10px',
                  fontSize: '14px'
                },

                label: max
              }
            }}
            onChange={handleSliderChange}
            trackStyle={trackStyle}
            railStyle={railStyle}
            handleStyle={handleStyle}
            dotStyle={dotStyle}
            {...props}
          />
        </Flex>
      </StyledToolTip>
    </Card>
  );
};

export default SliderComponent;
