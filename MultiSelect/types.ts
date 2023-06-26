import { ReactNode, Ref } from 'react';
import { MenuPlacement } from 'react-select';

export type optionsState = {
  label: string;
  value: any;
};
export interface MultiSelectProps {
  options: optionsState[];
  handleSelectedOptions: (selected: any) => void;
  optionsSelected: optionsState[];
  placeholder?: string;
  isSearchable?: boolean;
  width?: string;
  showHelperTextOnlyOnError?: boolean;
  error?: boolean;
  helperText?: string;
  isLoading?: boolean;
  name?: string;
  onBlur?: () => void;
  menuPosition?: 'fixed' | 'absolute';
  maxMenuHeight?: number;
  menuPlacement?: MenuPlacement;
  menuPortalTarget?: HTMLElement | null;
  dataQA?: string;
  itemMessage?: string;
}

export interface MultiSelectContainerProps {
  readonly isOpen: boolean;
  readonly target: ReactNode;
  readonly children: JSX.Element | ReactNode;
  readonly onClose: () => void;
  readonly valueWrapperRef: Ref<HTMLDivElement>;
  readonly width: string;
}
