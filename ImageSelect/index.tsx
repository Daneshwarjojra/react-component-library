import React from 'react';
import Flex from '../Flex';
import Image, { ImageProps } from '../Image';
import theme from '../../theme';

type ImageOptionType = { label: string; value: string; url: string };

type ImageStyleType = Partial<ImageProps> & {
  width?: string;
  height?: string;
  containerWidth?: string;
  containerHeight?: string;
  containerBackground?: string;
  containerMargin?: string;
  selectedImageBorder?: string;
  cursor?: string;
  borderRadius?: string;
};

interface ImageSelectProps {
  selectedImage: string | number; // value in option
  onSelectImage: (selected: ImageOptionType) => void;
  options: Array<ImageOptionType>;
  imageStyleProps?: ImageStyleType;
}

const ImageSelect: React.FC<ImageSelectProps> = ({
  selectedImage,
  onSelectImage,
  options,
  imageStyleProps
}: ImageSelectProps) => {
  return (
    <Flex className="imageselect-container">
      {options.map(optionImage => {
        const { label, value, url } = optionImage;
        const {
          width = '24px',
          height = '48px',
          containerWidth = '72px',
          containerHeight = '72px',
          containerBackground = theme.color.grey5,
          containerMargin = '0 24px 0 0',
          selectedImageBorder = `1px solid ${theme.color.primary01}`,
          cursor = 'pointer',
          borderRadius = '8px',
          ...restImageStyleProps
        } = imageStyleProps ?? {};
        const isSelected = value === selectedImage;

        return (
          <Flex
            className="imageselect-image-container"
            justifyContent={'center'}
            alignItem={'center'}
            key={value}
            background={containerBackground}
            border={isSelected ? selectedImageBorder : 'none'}
            width={containerWidth}
            height={containerHeight}
            onClick={() => {
              onSelectImage(optionImage);
            }}
            margin={containerMargin}
            cursor={cursor}
            borderRadius={borderRadius}
          >
            <Image
              {...restImageStyleProps}
              src={url}
              alt={label}
              width={width}
              height={height}
            />
          </Flex>
        );
      })}
    </Flex>
  );
};

export default ImageSelect;
