import React from 'react';
import styled from 'styled-components';

type ThemeProp = (prop: any) => string;
export interface ImageProps {
  src: any;
  alt: string;
  width?: string;
  height?: string;
  onClick?: any;
  onLoad?: any;
  cursor?: string;
  margin?: string;
  borderRadius?: string;
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  imageTransform?: string | ThemeProp;
  imageTransition?: string;
}
const ImageContainer = styled.img<ImageProps>`
  width: ${props => (props.width ? props.width : `19px`)};
  height: ${props => (props.height ? props.height : `19px`)};
  cursor: ${({ cursor }) => cursor};
  margin: ${({ margin }) => margin};
  border-radius: ${({ borderRadius }) => borderRadius};
  object-fit: ${({ objectFit }) => objectFit};
  transform: ${({ imageTransform }) => imageTransform};
  transition: ${({ imageTransition: transition }) => transition};
`;
const Image: React.FC<ImageProps> = ({ ...props }: ImageProps) => (
  <ImageContainer
    {...props}
    src={props.src}
    alt={props.alt}
    width={props.width}
    height={props.height}
    cursor={props.cursor}
    onLoad={props.onLoad}
  />
);

export default Image;
